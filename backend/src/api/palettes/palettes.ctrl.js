import Palette from '../../models/palette';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

export const getPaletteById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const palette = await Palette.findById(id);
    if (!palette) {
      ctx.status = 404;
      return;
    }
    ctx.state.palette = palette;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 수정, 삭제 시 id 체크
export const checkOwnPalette = (ctx, next) => {
  const { user, palette } = ctx.state;
  if (palette.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/*
  POST /api/palettes
  {
    nick: 'palette이름',
    colors: ['#색', '#색2' ...],
    tags: ['#태그1', '#태그2' ...]
   }
 */
export const addPalette = async (ctx) => {
  const schema = Joi.object().keys({
    // 검증 로직
    nick: Joi.string().required().max(30),
    colors: Joi.array().items(Joi.string()).required().max(10),
    tags: Joi.array().items(Joi.string()).max(10),
  });

  // 검증 후 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { nick, colors, tags } = ctx.request.body;
  const palette = new Palette({
    nick,
    colors,
    tags,
    user: ctx.state.user,
  });
  try {
    await palette.save();
    ctx.body = palette;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
   GET /api/Palettes?username=&tag=&page=
 */
export const palettesList = async (ctx) => {
  // 페이지네이션
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, username } = ctx.query;
  // tag, username 값이 유효할 시 넣고 그렇지 않으면 넣지 않음
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const palettes = await Palette.find(query)
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const paletteCount = await Palette.countDocuments(query).exec();
    ctx.set('Last-page', Math.ceil(paletteCount / 10));
    ctx.body = palettes;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/palettes/:nick
 */
export const findPaletteWithNick = async (ctx) => {
  const { nick } = ctx.params;
  try {
    const palette = await Palette.findByNick(nick).exec();
    if (!nick) {
      ctx.status = 404;
      return;
    }
    ctx.body = palette;
  } catch (e) {
    ctx.thorw(500, e);
  }
};

/*
  DELETE /api/palettes/:id
 */
export const removePaletteWithId = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Palette.findByIdAndRemove(id).exec();
    ctx.status = 204; // NO CONTENT
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  PATCH /api/palettes/:id
  {
    nick: '새 닉네임',
    colors: ['바뀐 색상들'...],
    tags: ['바뀐 태그들'...],
  }
 */
export const updatePalette = async (ctx) => {
  const { id } = ctx.params;

  const schema = Joi.object().keys({
    nick: Joi.string().max(30),
    colors: Joi.array().items(Joi.string()).max(10),
    tags: Joi.array().items(Joi.string()).max(10),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const palette = await Palette.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 업데이트 된 후의 새로운 데이터를 반환
    }).exec();
    if (!palette) {
      ctx.status = 404;
      return;
    }
    ctx.body = palette;
  } catch (e) {
    ctx.thorw(500, e);
  }
};
