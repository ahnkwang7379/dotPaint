import PaletteSet from '../../models/paletteSet';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

/*
    POST /api/paletteSet
    {
        palette: [
            {
                nick: '닉',
                colors: ['색상코드1', '색상코드2' ...]
            } ...
        ],
    }
 */
export const addPaletteSet = async (ctx) => {
  const schema = Joi.object().keys({
    palette: Joi.array().items({
      nick: Joi.string().max(30),
      colors: Joi.array().items(Joi.string()).max(10),
    }),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { palette } = ctx.request.body;
  const paletteSet = new PaletteSet({
    user: ctx.state.user,
    palette: palette,
  });
  try {
    await paletteSet.save();
    ctx.body = paletteSet;
  } catch (e) {
    ctx.throw(500, e);
  }
};
