import Router from 'koa-router';
import * as userCtrl from './user.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const user = new Router();

user.patch('/save', checkLoggedIn, userCtrl.saveUserPreset);

export default user;
