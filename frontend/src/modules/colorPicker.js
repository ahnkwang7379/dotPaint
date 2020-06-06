import { createAction, handleActions } from 'redux-actions';

const CHANGE_COLOR_LEFT = 'colorpicker/CHANGE_COLOR_LEFT';
const CHANGE_COLOR_RIGHT = 'colorpicker/CHANGE_COLOR_RIGHT';

export const changeColorLeft = createAction(
  CHANGE_COLOR_LEFT,
  (color) => color,
);
export const changeColorRight = createAction(
  CHANGE_COLOR_RIGHT,
  (color) => color,
);

const initialState = {
  colorLeft: '#ffffff',
  colorRight: '#000000',
};

const colorpicker = handleActions(
  {
    [CHANGE_COLOR_LEFT]: (state, { payload: color }) => ({
      ...state,
      colorLeft: color,
    }),
    [CHANGE_COLOR_RIGHT]: (state, { payload: color }) => ({
      ...state,
      colorRight: color,
    }),
  },
  initialState,
);

export default colorpicker;
