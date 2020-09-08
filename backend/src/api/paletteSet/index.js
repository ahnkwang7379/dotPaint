import Router from 'koa-router';
import * as paletteSetCtrl from './paletteSet.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const paletteSet = new Router();

// paletteSet.get('/:id');
paletteSet.post('/', checkLoggedIn, paletteSetCtrl.addPaletteSet);

export default paletteSet;
