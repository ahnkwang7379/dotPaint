import { createAction, handleActions } from 'redux-actions';

const CHANGE_DOT = 'dot/CHANGE_DOT';
const CLEAR_DOT = 'dot/CLEAR_DOT';

// default 세팅
const WIDTH = 25;
const HEIGHT = 25;
const SIZE = '1rem';
const DOTCOLOR = '#f0f0f0';
const BORDER = 'blue';

export const changeDot = createAction(CHANGE_DOT, ({ key1, key2, color }) => ({
  key1,
  key2,
  color,
}));
export const clearDot = createAction(CLEAR_DOT);

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
  border: BORDER,
  size: SIZE,
  dotColor: DOTCOLOR,
  width: WIDTH,
  height: HEIGHT,
};

const dot = handleActions(
  {
    [CHANGE_DOT]: (state, { payload: { key1, key2, color } }) => ({
      ...state,
      dotSet: state.dotSet.map((dotLine, lineIdx) =>
        lineIdx !== key1
          ? dotLine
          : dotLine.map((dot, idx) => (idx !== key2 ? dot : color)),
      ),
    }),
    [CLEAR_DOT]: () => ({
      initalState,
    }),
  },
  initalState,
);

export default dot;
