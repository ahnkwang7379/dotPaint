import Router from 'koa-router';
import palettes from './palettes';
import auth from './auth';

const api = new Router();

api.use('/palettes', palettes.routes());
api.use('/auth', auth.routes());

export default api;
