import { combineReducers } from 'redux';
import dot from './dot';
import colorPalette from './colorPalette';
import paintTool from './paintTool';

const rootReducer = combineReducers({ dot, colorPalette });

export default rootReducer;
