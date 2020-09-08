import Router from 'koa-router';
import palettes from './palettes';
import auth from './auth';
import paletteSet from './paletteSet';

const api = new Router();

api.use('/palettes', palettes.routes());
api.use('/auth', auth.routes());
api.use('/paletteSet', paletteSet.routes());

export default api;
