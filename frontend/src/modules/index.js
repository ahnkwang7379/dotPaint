import { combineReducers } from 'redux';
import dot from './dot';
import colorPicker from './colorPicker';
import nonoGram from './nonoGram';

const rootReducer = combineReducers({ dot, colorPicker, nonoGram });

export default rootReducer;
