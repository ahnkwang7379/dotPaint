import { createAction, handleActions } from 'redux-actions';

// paintTool
export const DOT = 'DOT';
export const BUCKET = 'BUCKET';
export const PICKER = 'PICKER';
export const ERASER = 'ERASER';
export const MOVE = 'MOVE';
export const SAMECOLOR = 'SAMECOLOR';

export const CHANGE_PAINT_TOOL = 'paintTool/CHANGE_PAINT_TOOL';
const CHANGE_PAINT_STATE = 'paintTool/CHANGE_PAINT_STATE';
const SET_DIRECTION = 'paintTool/SET_DIRECTION';

export const changePaintTool = createAction(
  CHANGE_PAINT_TOOL,
  (paintTool) => paintTool,
);
export const changePaintState = createAction(
  CHANGE_PAINT_STATE,
  (paintState) => paintState,
);
export const setDirection = createAction(
  SET_DIRECTION,
  (direction) => direction,
);

const initialState = {
  selectedPaintTool: DOT,
  paintState: 'IDLE',
  direction: 'LEFT',
};

const paintTool = handleActions(
  {
    [CHANGE_PAINT_TOOL]: (state, { payload: paintTool }) => ({
      ...state,
      selectedPaintTool: paintTool,
    }),
    [CHANGE_PAINT_STATE]: (state, { payload: paintState }) => ({
      ...state,
      paintState: paintState,
    }),
    [SET_DIRECTION]: (state, { payload: direction }) => ({
      ...state,
      direction: direction,
    }),
  },
  initialState,
);

export default paintTool;
