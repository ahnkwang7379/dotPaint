import { createAction, handleActions } from 'redux-actions';

// const CHANGE_DOT = 'dot/CHANGE_DOT';
const CLEAR_DOT = 'dot/CLEAR_DOT';
const CHANGE_DOT_BORDER_SIZE = 'dot/CHANGE_DOT_BORDER_SIZE';
const CHANGE_DOT_BORDER_COLOR = 'dot/CHANGE_DOT_BORDER_COLOR';
const CHANGE_DOT_SIZE = 'dot/CHANGE_DOT_SIZE';
const CHANGE_DOT_AREA = 'dot/CHANGE_DOT_AREA';

// initialState
export const INITIAL_ROW = 32;
export const INITIAL_COLUMN = 32;
export const INITIAL_DOT_DOTSIZE = 1;
export const INITIAL_DOT_COLOR = '#f0f0f0';
export const INITIAL_DOT_BORDER = { size: 0.5, color: '#d0d0fc' };

// export const changeDot = createAction(
//   CHANGE_DOT,
//   ({ rowIdx, columnIdx, color }) => ({
//     rowIdx,
//     columnIdx,
//     color,
//   }),
// );
export const clearDot = createAction(CLEAR_DOT);
export const changeDotBorderSize = createAction(
  CHANGE_DOT_BORDER_SIZE,
  (size) => size,
);
export const changeDotBorderColor = createAction(
  CHANGE_DOT_BORDER_COLOR,
  (color) => color,
);
export const changeDotSize = createAction(
  CHANGE_DOT_SIZE,
  (dotSize) => dotSize,
);
export const changeDotArea = createAction(
  CHANGE_DOT_AREA,
  ({ width, height }) => ({ width, height }),
);

const defaultDotSetMaker = (row, column) => {
  return new Array(column).fill().map(() => new Array(row).fill(''));
};

const initialState = {
  dotSet: defaultDotSetMaker(INITIAL_ROW, INITIAL_COLUMN),
  border: INITIAL_DOT_BORDER,
  dotSize: INITIAL_DOT_DOTSIZE,
  row: INITIAL_ROW,
  column: INITIAL_COLUMN,
  // selectedDot: { rowIdx: -1, columnIdx: -1 },
  // paintState: 'IDLE',
  // paintTool: 'DOT',
};

const dot = handleActions(
  {
    // [CHANGE_DOT]: (state, { payload: { rowIdx, columnIdx, color } }) => ({
    //   ...state,
    //   dotSet: state.dotSet.map((dotLine, lineIdx) =>
    //     lineIdx !== rowIdx
    //       ? dotLine
    //       : dotLine.map((originColor, idx) =>
    //           idx !== columnIdx ? originColor : color,
    //         ),
    //   ),
    // }),
    [CHANGE_DOT_BORDER_SIZE]: (state, { payload: size }) => ({
      ...state,
      border: {
        ...state.border,
        size: size,
      },
    }),
    [CHANGE_DOT_BORDER_COLOR]: (state, { payload: color }) => ({
      ...state,
      border: {
        ...state.border,
        color: color,
      },
    }),
    [CHANGE_DOT_SIZE]: (state, { payload: dotSize }) => ({
      ...state,
      dotSize: dotSize,
    }),
    [CHANGE_DOT_AREA]: (state, { payload: { width, height } }) => ({
      ...state,
      width: width,
      height: height,
    }),
    [CLEAR_DOT]: (state) => ({
      ...state,
      dotSet: defaultDotSetMaker(INITIAL_ROW, INITIAL_COLUMN),
    }),
  },
  initialState,
);

export default dot;
