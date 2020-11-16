import { createAction, handleActions } from 'redux-actions';

// paintTool
export const DOT = 'DOT';
export const BUCKET = 'BUCKET';
export const PICKER = 'PICKER';
export const ERASER = 'ERASER';

const CHANGE_PAINT_TOOL = 'paintTool/CHANGE_PAINT_TOOL';
const CHANGE_PAINT_STATE = 'paintTool/CHANGE_PAINT_STATE';

export const changePaintTool = createAction(
  CHANGE_PAINT_TOOL,
  (paintTool) => paintTool,
);
export const changePaintState = createAction(
  CHANGE_PAINT_STATE,
  (paintState) => paintState,
);

const initialState = {
  selectedPaintTool: DOT,
  paintState: 'IDLE',
};

const paintTool = handleActions(
  {
    [CHANGE_PAINT_TOOL]: (state, { payload: paintTool }) => ({
      ...state,
      // 같은걸 누르면 기본인 DOT로 바뀌게
      // selectedPaintTool:
      //   state.selectedPaintTool === paintTool ? DOT : paintTool,
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
