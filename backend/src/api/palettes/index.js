import Router from 'koa-router';
import * as palettesCtrl from './palettes.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const palettes = new Router();

palettes.get('/', palettesCtrl.palettesList);

palettes.post('/', checkLoggedIn, palettesCtrl.addPalette);

palettes.get('/:nick', palettesCtrl.findPaletteWithNick);

palettes.delete(
  '/:id',
  palettesCtrl.getPaletteById,
  checkLoggedIn,
  palettesCtrl.checkOwnPalette,
  palettesCtrl.removePaletteWithId,
);

palettes.patch(
  '/:id',
  palettesCtrl.getPaletteById,
  checkLoggedIn,
  palettesCtrl.checkOwnPalette,
  palettesCtrl.updatePalette,
);

export default palettes;
