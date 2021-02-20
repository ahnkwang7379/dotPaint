import Router from 'koa-router';
import * as dotArtCtrl from './dotArt.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const dotArt = new Router();

dotArt.get('/', dotArtCtrl.getDotArtsList);
dotArt.get('/:id', dotArtCtrl.checkObjectId, dotArtCtrl.getDotArtById);

// dotArt.get('/', checkLoggedIn, dotArtCtrl.getDotArtsByUser);
dotArt.post('/', checkLoggedIn, dotArtCtrl.createDotArt);
dotArt.delete(
  '/:id',
  checkLoggedIn,
  dotArtCtrl.checkObjectId,
  dotArtCtrl.deleteDotArt,
);
dotArt.patch(
  '/:id',
  checkLoggedIn,
  dotArtCtrl.checkObjectId,
  dotArtCtrl.updateDotArt,
);

export default dotArt;
