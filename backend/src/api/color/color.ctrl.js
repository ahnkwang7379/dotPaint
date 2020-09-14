import Color from '../../models/color';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

/*
  GET /api/color/:id
 */
export const getColorByCode = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status(400);
    return;
  }

  try {
    const color = await Color.findById(id);
    if (!color) {
      ctx.status = 404;
      return;
    }
    ctx.body = color;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/color?tag=
 */
export const getColorsByTag = async (ctx, next) => {
  // 페이지네이션
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }
  const { tag } = ctx.query;
  const query = { ...(tag ? { tags: tag } : {}) };

  try {
    const colors = await Color.find(query)
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const colorCount = await Color.countDocuments(query).exec();
    ctx.set('Last-page', Math.ceil(colorCount / 10));
    ctx.body = colors;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*

 */
// color 모델이 업데이트 될 경우는? => palette에 색상이 들어왔다. tag가 추가되었다 등
export const updateColorData = async (ctx, next) => {
  try {
  } catch (e) {
    ctx.throw(500, e);
  }
};
