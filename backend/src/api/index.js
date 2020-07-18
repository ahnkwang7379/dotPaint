import Router from 'koa-router';
import palettes from './palettes';

const api = new Router();

api.use('/palettes', palettes.routes());

export default api;
