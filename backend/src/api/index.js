import Router from 'koa-router';
import palette from './palette';
import paletteSet from './paletteSet';
import auth from './auth';
import user from './user';
import dotArt from './dotArt';
import color from './color';

const api = new Router();

api.use('/palette', palette.routes());
api.use('/auth', auth.routes());
api.use('/user', user.routes());
api.use('/paletteSet', paletteSet.routes());
api.use('/dotArt', dotArt.routes());
api.use('/color', color.routes());

export default api;
