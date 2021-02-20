import Router from 'koa-router';
import auth from './auth';
import dotArt from './dotArt';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/dotArt', dotArt.routes());

export default api;
