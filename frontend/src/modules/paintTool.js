import { createAction, handleActions } from 'redux-actions';

// paintTool
export const DOT = 'DOT';
export const BUCKET = 'BUCKET';
export const PICKER = 'PICKER';
export const ERASER = 'ERASER';

const TOGGLE_PAINT_TOOL = 'paintTool/TOGGLE_PAINT_TOOL';
const CHANGE_PAINT_TOOL = 'paintTool/CHANGE_PAINT_TOOL';
const CHANGE_PAINT_STATE = 'paintTool/CHANGE_PAINT_STATE';

export const togglePaintTool = createAction(
  TOGGLE_PAINT_TOOL,
  (paintTool) => paintTool,
);
export const changePaintTool = createAction(
  CHANGE_PAINT_TOOL,
  (paintTool) => paintTool,
);
export const changePaintState = createAction(
  CHANGE_PAINT_STATE,
  (paintState) => paintState,
);

const initialState = {
  paintToolSet: { DOT: true, BUCKET: false, PICKER: false, ERASER: false },
  selectedPaintTool: 'DOT',
  paintState: 'IDLE',
};

const paintTool = handleActions(
  {
    [TOGGLE_PAINT_TOOL]: (state, { payload: paintTool }) => ({
      ...state,
      paintToolSet: {
        ...state.paintToolSet,
        [paintTool]: !state.paintToolSet[paintTool],
      },
    }),
    [CHANGE_PAINT_TOOL]: (state, { payload: paintTool }) => ({
      ...state,
      selectedPaintTool: paintTool,
    }),
    [CHANGE_PAINT_STATE]: (state, { payload: paintState }) => ({
      ...state,
      paintState: paintState,
    }),
  },
  initialState,
);

export default paintTool;
