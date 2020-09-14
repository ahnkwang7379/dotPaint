import Router from 'koa-router';
import * as dotArtCtrl from './dotArt.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const dotArt = new Router();

dotArt.get(
  '/:id',
  dotArtCtrl.getDotArtById,
  checkLoggedIn,
  dotArtCtrl.getDotArt,
);

dotArt.post('/', checkLoggedIn, dotArtCtrl.createDotArt);
dotArt.patch('/');

export default dotArt;
