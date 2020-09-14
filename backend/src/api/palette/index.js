import Router from 'koa-router';
import * as paletteCtrl from './palette.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const palette = new Router();

palette.get('/', paletteCtrl.paletteList);

palette.post('/', checkLoggedIn, paletteCtrl.addPalette);

palette.get('/:nick', paletteCtrl.findPaletteWithNick);

palette.delete(
  '/:id',
  paletteCtrl.getPaletteById,
  checkLoggedIn,
  paletteCtrl.checkOwnPalette,
  paletteCtrl.removePaletteWithId,
);

palette.patch(
  '/:id',
  paletteCtrl.getPaletteById,
  checkLoggedIn,
  paletteCtrl.checkOwnPalette,
  paletteCtrl.updatePalette,
);

export default palette;
