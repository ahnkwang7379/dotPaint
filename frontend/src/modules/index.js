import { combineReducers } from 'redux';
import dot from './dot';
import colorPicker from './colorPicker';
import colorPalette from './colorPalette';

const rootReducer = combineReducers({ dot, colorPicker, colorPalette });

export default rootReducer;
