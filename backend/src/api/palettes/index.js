import Router from 'koa-router';
import * as palettesCtrl from './palettes.ctrl';

const palettes = new Router();

palettes.get('/', palettesCtrl.palettesList);
palettes.post('/', palettesCtrl.addPalette);
palettes.get('/:nick', palettesCtrl.findPaletteWithNick);
palettes.delete('/:id', palettesCtrl.removePaletteWithId);
palettes.put('/:id', palettesCtrl.replacePalette);
palettes.patch('/:id', palettesCtrl.updatePalette);

export default palettes;
