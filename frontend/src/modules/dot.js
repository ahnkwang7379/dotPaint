import { createAction, handleActions } from 'redux-actions';

const CHANGE_DOT = 'dot/CHANGE_DOT';
const COMMIT_DOTSET = 'dot/COMMIT_DOTSET';
const CLEAR_DOT = 'dot/CLEAR_DOT';

// default 세팅
const WIDTH = 30;
const HEIGHT = 30;
const DOTSIZE = '1';
const DOTCOLOR = '#f0f0f0';
const BORDER = 'blue';

export const changeDot = createAction(CHANGE_DOT, ({ key1, key2, color }) => ({
  key1,
  key2,
  color,
}));
export const clearDot = createAction(CLEAR_DOT);
export const commitDotSet = createAction(COMMIT_DOTSET);

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
  dotColor: DOTCOLOR,
  width: WIDTH,
  height: HEIGHT,
};

const dot = handleActions(
  {
    [CHANGE_DOT]: (state, { payload: { key1, key2, color } }) => ({
      ...state,
      dotTemp: state.dotSet.map((dotLine, lineIdx) =>
        lineIdx !== key1
          ? dotLine
          : dotLine.map((dot, idx) => (idx !== key2 ? dot : color)),
      ),
    }),
    [COMMIT_DOTSET]: (state) => ({
      ...state,
      dotSet: state,
    }),
    [CLEAR_DOT]: () => ({
      initalState,
    }),
  },
  initalState,
);

export default dot;
