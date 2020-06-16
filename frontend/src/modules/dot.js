import { createAction, handleActions } from 'redux-actions';

const CHANGE_DOT = 'dot/CHANGE_DOT';
const COMMIT_DOTSET = 'dot/COMMIT_DOTSET';
const CLEAR_DOT = 'dot/CLEAR_DOT';
const CHANGE_DOT_BORDER_SIZE = 'dot/CHANGE_DOT_BORDER_SIZE';
const CHANGE_DOT_BORDER_COLOR = 'dot/CHANGE_DOT_BORDER_COLOR';
const CHANGE_DOT_SIZE = 'dot/CHANGE_DOT_SIZE';
const CHANGE_DOT_AREA = 'dot/CHANGE_DOT_AREA';
const SELECT_DOT = 'dot/SELECT_DOT';

// default 세팅
const WIDTH = 2;
const HEIGHT = 2;
const DOTSIZE = 1;
const DOTCOLOR = '#f0f0f0';
const BORDER = { size: 0.5, color: '#d0d0fc' };

export const changeDot = createAction(
  CHANGE_DOT,
  ({ rowIdx, columnIdx, color }) => ({
    rowIdx,
    columnIdx,
    color,
  }),
);
export const clearDot = createAction(CLEAR_DOT);
export const commitDotSet = createAction(COMMIT_DOTSET);
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
export const selectDot = createAction(
  SELECT_DOT,
  ({ rowIdx, columnIdx, direct }) => ({ rowIdx, columnIdx, direct }),
);

function defaultDotMaker(width, height, color) {
  const dotSet = [];
  for (let i = 0; i < width; i++) {
    const dotArray = new Array(height);
    dotSet[i] = dotArray.fill(color);
  }
  return dotSet;
}

const initalState = {
  dotSet: defaultDotMaker(WIDTH, HEIGHT, DOTCOLOR),
  dotTemp: defaultDotMaker(WIDTH, HEIGHT, DOTCOLOR),
  selectedDot: [],
  border: BORDER,
  dotSize: DOTSIZE,
  width: WIDTH,
  height: HEIGHT,
};

const dot = handleActions(
  {
    [CHANGE_DOT]: (state, { payload: { rowIdx, columnIdx, color } }) => ({
      ...state,
      dotSet: state.dotSet.map((dotLine, lineIdx) =>
        lineIdx !== rowIdx
          ? dotLine
          : dotLine.map((originColor, idx) =>
              idx !== columnIdx ? originColor : color,
            ),
      ),
    }),
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
    [SELECT_DOT]: (state, { payload: { rowIdx, columnIdx, direct } }) => ({
      ...state,
      selectedDot: [rowIdx, columnIdx, direct],
    }),
    // [COMMIT_DOTSET]: (state) => ({
    //   ...state,
    //   dotSet: state,
    // }),
    [CLEAR_DOT]: (state) => ({
      ...state,
      dotSet: defaultDotMaker(WIDTH, HEIGHT, DOTCOLOR),
    }),
  },
  initalState,
);

export default dot;
