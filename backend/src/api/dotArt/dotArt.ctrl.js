import DotArt from '../../models/dotArt';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

/*
  GET /api/dotArt
 */
export const getDotArtsByUser = async (ctx, next) => {
  const { user } = ctx.stats.user;

  try {
    const dotArt = await DotArt.find({ user: user });

    if (!dotArt) {
      // 저장된 dotArt가 없음
      ctx.status = 204;
      return;
    }

    ctx.body = dotArt;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// id기반으로 dotArt 찾아서 state에 넣음
export const getDotArtById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    const dotArt = await DotArt.findById(id);
    if (!dotArt) {
      ctx.status = 404;
      return;
    }
    ctx.state.dotArt = dotArt;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/dotArt:id
*/
export const getDotArt = async (ctx, next) => {
  ctx.body = ctx.state.DotArt;
};

/*
  POST /api/dotArt
  {
      name: '새 이름',
      dotFrame: [
          {
              dotSet: ['#색1', '#색2' ...],
              border: { size: '1', color: '#색상' },
              dotSize: '1',
              row: '16',
              column: '16',
          }
      ],
      openArt: true or false
  }
 */
export const createDotArt = async (ctx, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required().max(100),
    dotFrame: Joi.array().items(
      Joi.object().keys({
        dotSet: Joi.array(),
        border: Joi.object().keys({
          borderSize: Joi.string(),
          color: Joi.string(),
        }),
        dotSize: Joi.string(),
        row: Joi.string(),
        column: Joi.string(),
      }),
    ),
    openArt: Joi.boolean(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { name, dotFrame, openArt } = ctx.request.body;
  const dotArt = new DotArt({
    user: ctx.state.user,
    name,
    dotFrame,
    openArt,
  });
  try {
    await dotArt.save();
    ctx.body = dotArt;
  } catch (e) {
    ctx.throw(500, e);
  }
};
