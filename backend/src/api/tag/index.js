import Router from 'koa-router';
import * as tagCtrl from './tag.ctrl';

const tag = new Router();

tag.get('/');

export default tag;
