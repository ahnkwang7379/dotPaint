import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import shortid from 'shortid';

const CLEAR_DOT = 'dot/CLEAR_DOT';
const CHANGE_DOT_BORDER_SIZE = 'dot/CHANGE_DOT_BORDER_SIZE';
const CHANGE_DOT_BORDER_COLOR = 'dot/CHANGE_DOT_BORDER_COLOR';
const CHANGE_DOT_SIZE = 'dot/CHANGE_DOT_SIZE';
const CHANGE_DOT_AREA = 'dot/CHANGE_DOT_AREA';
const CHANGE_ACTIVE_IDX = 'dot/CHANGE_ACTIVE_IDX';
const REMOVE_ACTIVE_DOT_ART = 'dot/REMOVE_ACTIVE_DOT_ART';
const COPY_ACTIVE_DOT_ART = 'dot/COPY_ACTIVE_DOT_ART';
const ADD_NEW_DOT_ART = 'dot/ADD_NEW_DOT_ART';

// initialState
export const INITIAL_ROW = 10;
export const INITIAL_COLUMN = 15;
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
export const changeActiveIdx = createAction(CHANGE_ACTIVE_IDX, (idx) => idx);
export const removeActiveDotArt = createAction(
  REMOVE_ACTIVE_DOT_ART,
  (idx) => idx,
);
export const copyActiveDotArt = createAction(COPY_ACTIVE_DOT_ART, (idx) => idx);
export const addNewDotArt = createAction(ADD_NEW_DOT_ART);

const defaultDotSetMaker = (row, column) => {
  return new Array(row).fill().map(() => new Array(column).fill(''));
};

const defaultDotMaker = (row, column) => {
  return new Array(row).fill().map(() => new Array(column).fill(''));
};

const initialState = {
  dotSet: defaultDotSetMaker(INITIAL_ROW, INITIAL_COLUMN),
  dotList: [
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 25,
    },
  ],
  activeIdx: 0,
  border: INITIAL_DOT_BORDER,
  dotSize: INITIAL_DOT_DOTSIZE,
  rowCount: INITIAL_ROW,
  columnCount: INITIAL_COLUMN,
};

const dot = handleActions(
  {
    [CLEAR_DOT]: (state) => ({
      ...state,
      dotSet: defaultDotSetMaker(state.rowCount, state.columnCount),
    }),
    [CHANGE_DOT_BORDER_SIZE]: (state, { payload: size }) =>
      produce(state, (draft) => {
        draft.border.size = size;
      }),
    [CHANGE_DOT_BORDER_COLOR]: (state, { payload: color }) =>
      produce(state, (draft) => {
        draft.border.color = color;
      }),
    [CHANGE_DOT_SIZE]: (state, { payload: dotSize }) => ({
      ...state,
      dotSize: dotSize,
    }),
    [CHANGE_DOT_AREA]: (state, { payload: { newRow, newColumn } }) =>
      produce(state, (draft) => {
        let originRow = draft.rowCount;
        let originColumn = draft.columnCount;

        draft.dotList.map((dotSet) => {
          if (newColumn > originColumn) {
            for (let i = originColumn; i < newColumn; i++) {
              dotSet.dot.map((column) => column.push(''));
            }
          }

          if (newColumn < originColumn) {
            for (let i = newColumn; i < originColumn; i++) {
              dotSet.dot.map((column) => column.pop());
            }
          }

          if (newRow > originRow) {
            for (let i = originRow; i < newRow; i++) {
              dotSet.dot.push(new Array(newColumn).fill(''));
            }
          }

          if (newRow < originRow) {
            for (let i = newRow; i < originRow; i++) {
              dotSet.dot.pop();
            }
          }
        });

        draft.rowCount = newRow;
        draft.columnCount = newColumn;
      }),
    [CHANGE_ACTIVE_IDX]: (state, { payload: idx }) => ({
      ...state,
      activeIdx: idx,
    }),
    [REMOVE_ACTIVE_DOT_ART]: (state, { payload: idx }) =>
      produce(state, (draft) => {
        if (draft.dotList.length === 1) {
          draft.dotList = [
            {
              id: shortid.generate(),
              dot: defaultDotMaker(draft.rowCount, draft.columnCount),
              interval: 25,
            },
          ];
        } else {
          let dotList = draft.dotList;
          let tempDotList = dotList.slice(idx + 1, dotList.length);

          dotList = dotList.slice(0, idx);
          dotList = dotList.concat(tempDotList);
          draft.dotList = dotList;
          draft.activeIdx = idx > dotList.length - 1 ? idx - 1 : idx;
        }
      }),
    [COPY_ACTIVE_DOT_ART]: (state, { payload: idx }) =>
      produce(state, (draft) => {
        let dotList = draft.dotList;
        let copyDotArt = {
          ...dotList[idx],
          id: shortid.generate(),
        };

        let tempDotList = dotList.slice(idx + 1, dotList.length);
        dotList = dotList.slice(0, idx + 1);
        dotList = dotList.concat(copyDotArt);
        dotList = dotList.concat(tempDotList);
        draft.dotList = dotList;
        draft.activeIdx = idx + 1;
      }),
    [ADD_NEW_DOT_ART]: (state) =>
      produce(state, (draft) => {
        draft.dotList.push({
          id: shortid.generate(),
          dot: defaultDotMaker(draft.rowCount, draft.columnCount),
          interval: 25,
        });
        draft.activeIdx = draft.dotList.length - 1;
      }),
  },
  initialState,
);

export default dot;
