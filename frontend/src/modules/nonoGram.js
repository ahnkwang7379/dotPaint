import { createAction, handleActions } from 'redux-actions';

const FILL_DOT = 'nonoGram/FILL_DOT';
const CHANGE_NONOGRAM = 'nonoGram/CHANGE_NONOGRAM';

export const fillDot = createAction(FILL_DOT, ({ key1, key2, color }) => ({
  key1,
  key2,
  color,
}));
export const changeNonoGram = createAction(
  CHANGE_NONOGRAM,
  ({ width, height }) => ({
    width,
    height,
  }),
);

// default 세팅
const WIDTH = 25;
const HEIGHT = 25;
const DOTSIZE = '1.5';
const DOTCOLOR = '#f0f0f0';
const BORDER = '#a4a4f1';

const nonogramMaker = (width, height) =>
  new Array(height).fill(0).map(() => new Array(width).fill({}));

const initialState = {
  nonogram: nonogramMaker(WIDTH, HEIGHT),
  border: BORDER,
  dotSize: DOTSIZE,
  dotColor: DOTCOLOR,
  width: WIDTH,
  height: HEIGHT,
};

const nonoGram = handleActions(
  {
    [FILL_DOT]: (state, { payload: { key1, key2, color } }) => ({
      ...state,
      nonogram: state.nonogram.map((xLine, xIdx) =>
        xIdx !== key1
          ? xLine
          : xLine.map((dot, yIdx) => (yIdx !== key2 ? dot.color : color)),
      ),
    }),
    [CHANGE_NONOGRAM]: (state, { payload: { width, height } }) => ({
      ...state,
      nonogram: nonogramMaker(width, height),
    }),
  },
  initialState,
);

export default nonoGram;
