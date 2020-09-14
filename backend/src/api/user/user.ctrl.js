import User from '../../models/user';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

/*
  PATCH /api/user/save
 */
export const saveUserPreset = async (ctx, next) => {
  const schema = Joi.object().keys({
    palettePreset: Joi.array().items(Joi.string()),
    dotArtPreset: Joi.array().items(
      Joi.object().keys({
        name: Joi.string(),
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
      }),
    ),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.statue = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const { _id } = ctx.state.user;
    const saveUser = await User.findByIdAndUpdate(_id, ctx.request.body, {
      new: true,
    }).exec();

    if (!saveUser) {
      ctx.status = 400;
      return;
    }

    ctx.body = { message: 'success' };
  } catch (e) {
    ctx.throw(500, e);
  }
};
