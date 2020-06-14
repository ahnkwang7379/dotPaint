import { createAction, handleActions } from 'redux-actions';

const CHANGE_DOT = 'dot/CHANGE_DOT';
const COMMIT_DOTSET = 'dot/COMMIT_DOTSET';
const CLEAR_DOT = 'dot/CLEAR_DOT';
const TOGGLE_BORDER = 'dot/TOGGLE_BORDER';
const CHANGE_DOT_SIZE = 'dot/CHANGE_DOT_SIZE';
const CHANGE_DOT_AREA = 'dot/CHANGE_DOT_AREA';

// default 세팅
const WIDTH = 32;
const HEIGHT = 32;
const DOTSIZE = 0.5;
const DOTCOLOR = '#f0f0f0';
const BORDER = true;

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
export const toggleBorder = createAction(TOGGLE_BORDER);
export const changeDotSize = createAction(
  CHANGE_DOT_SIZE,
  (dotSize) => dotSize,
);
export const changeDotArea = createAction(
  CHANGE_DOT_AREA,
  ({ width, height }) => ({ width, height }),
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
  border: BORDER,
  dotSize: DOTSIZE,
  width: WIDTH,
  height: HEIGHT,
};

const dot = handleActions(
  {
    [CHANGE_DOT]: (state, { payload: { rowIdx, columnIdx, color } }) => ({
      ...state,
      dotTemp: state.dotTemp.map((dotLine, lineIdx) =>
        lineIdx !== rowIdx
          ? dotLine
          : dotLine.map((originColor, idx) =>
              idx !== columnIdx ? originColor : color,
            ),
      ),
    }),
    [TOGGLE_BORDER]: (state) => ({
      ...state,
      border: !state.border,
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
    // [COMMIT_DOTSET]: (state) => ({
    //   ...state,
    //   dotSet: state,
    // }),
    [CLEAR_DOT]: () => ({
      ...initalState,
    }),
  },
  initalState,
);

export default dot;
