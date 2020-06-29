import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

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
  ({ newRow, newColumn }) => ({ newRow, newColumn }),
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
};

const dot = handleActions(
  {
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
    [CHANGE_DOT_AREA]: (state, { payload: { newRow, newColumn } }) =>
      produce(state, (draft) => {
        let originRow = draft.row;
        let originColumn = draft.column;

        if (newColumn > originColumn) {
          for (let i = originColumn; i < newColumn; i++) {
            draft.dotSet.map((column) => column.push(''));
          }
        }

        if (newColumn < originColumn) {
          for (let i = newColumn; i < originColumn; i++) {
            draft.dotSet.map((column) => column.pop());
          }
        }

        if (newRow > originRow) {
          for (let i = originRow; i < newRow; i++) {
            draft.dotSet.push(new Array(newColumn).fill(''));
          }
        }

        if (newRow < originRow) {
          for (let i = newRow; i < originRow; i++) {
            draft.dotSet.pop();
          }
        }

        draft.row = newRow;
        draft.column = newColumn;
      }),
    [CLEAR_DOT]: (state) => ({
      ...state,
      dotSet: defaultDotSetMaker(INITIAL_ROW, INITIAL_COLUMN),
    }),
  },
  initialState,
);

export default dot;
