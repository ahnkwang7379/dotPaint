import { combineReducers } from 'redux';
import dot from './dot';
import colorPicker from './colorPicker';

const rootReducer = combineReducers({ dot, colorPicker });

export default rootReducer;
