import DotArt from '../../models/dotArt';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
};

/*
  POST /api/dotArt
  {
    name: '이름',
    dotFrameList: [
      {
        id: '랜덤아이디',
        layerList: [],
        interval: Number,
      },
    ],
    rowCount: Number,
    columnCount: Number,
    animationDuration: Number,
  }
*/
export const createDotArt = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(50),
    dotArt: Joi.object().keys({
      id: Joi.string(),
      dotFrameList: Joi.array().items(
        Joi.object().keys({
          id: Joi.string(),
          layerList: Joi.array(),
          interval: Joi.number(),
        }),
      ),
      layerData: Joi.array().items(Joi.object()),
      rowCount: Joi.number(),
      columnCount: Joi.number(),
      animationDuration: Joi.number(),
    }),
    tags: Joi.array().items(Joi.string()),
  });

  const isValid = schema.validate(ctx.request.body);

  if (isValid.error) {
    ctx.status = 400;
    ctx.body = isValid.error;
    return;
  }

  const { title, tags } = ctx.request.body;

  const {
    dotFrameList,
    rowCount,
    columnCount,
    id,
    animationDuration,
    layerData,
  } = ctx.request.body.dotArt;

  const dotArt = new DotArt({
    user: ctx.state.user,
    title,
    dotArt: {
      dotFrameList,
      rowCount,
      columnCount,
      id,
      animationDuration,
      layerData,
    },
    tags,
  });

  try {
    await dotArt.save();
    ctx.body = dotArt;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/dotArt?username=&tag=&page=
*/
export const getDotArtsList = async (ctx) => {
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, username } = ctx.query;

  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const dotArts = await DotArt.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const dotArtCount = await DotArt.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(dotArtCount / 10));
    ctx.body = dotArts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/dotArt
 */
export const getDotArtsByUser = async (ctx) => {
  const { _id } = ctx.state.user;

  try {
    const dotArt = await DotArt.find({ user: _id });

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

/*
  GET /api/dotArt/:id
  */
export const getDotArtById = async (ctx) => {
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
    ctx.body = dotArt;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  DELETE  /api/dotArt/:id
*/
export const deleteDotArt = async (ctx) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    await DotArt.findByIdAndRemove(id).exec();
    ctx.status = 204; // not content
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  PATCH /api/dotArt/:id
*/
export const updateDotArt = async (ctx) => {
  const { id } = ctx.params;
  try {
    const dotArt = await DotArt.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!dotArt) {
      ctx.status = 404;
      return;
    }
    ctx.body = dotArt;
  } catch (e) {
    ctx.throw(500, e);
  }
};
