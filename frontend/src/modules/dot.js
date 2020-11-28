import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import shortid from 'shortid';

const CLEAR_DOT = 'dot/CLEAR_DOT';
const NEW_DOT_ART_PROJECT = 'dot/NEW_DOT_ART_PROJECT';
const LOAD_DOT_ART = 'dot/LOAD_DOT_ART';
const CHANGE_DOT_BORDER_SIZE = 'dot/CHANGE_DOT_BORDER_SIZE';
const CHANGE_DOT_BORDER_COLOR = 'dot/CHANGE_DOT_BORDER_COLOR';
const INCREASE_DOT_SIZE = 'dot/INCREASE_DOT_SIZE';
const DECREASE_DOT_SIZE = 'dot/DECREASE_DOT_SIZE';
const CHANGE_DOT_SIZE = 'dot/CHANGE_DOT_SIZE';
const INCREASE_COLUMN = 'dot/INCREASE_COLUMN';
const DECREASE_COLUMN = 'dot/DECREASE_COLUMN';
const INCREASE_ROW = 'dot/INCREASE_ROW';
const DECREASE_ROW = 'dot/DECREASE_ROW';
const CHANGE_DOT_AREA = 'dot/CHANGE_DOT_AREA';
const CHANGE_ACTIVE_IDX = 'dot/CHANGE_ACTIVE_IDX';
const REMOVE_ACTIVE_DOT_ART = 'dot/REMOVE_ACTIVE_DOT_ART';
const COPY_ACTIVE_DOT_ART = 'dot/COPY_ACTIVE_DOT_ART';
const ADD_NEW_DOT_ART = 'dot/ADD_NEW_DOT_ART';
const CHANGE_ANIMATION_INTERVAL = 'dot/CHANGE_ANIMATION_INTERVAL';
const CHANGE_ANIMATION_DURATION = 'dot/CHANGE_ANIMATION_DURATION';
const CHANGE_PIXEL_SIZE = 'dot/CHANGE_PIXEL_SIZE';
const REORDER_DOT_LIST = 'dot/REORDER_DOT_LIST';

// initialState
export const INITIAL_ROW = 8;
export const INITIAL_COLUMN = 8;
export const INITIAL_DOT_DOTSIZE = 16;
export const INITIAL_DOT_COLOR = '#f0f0f0';
export const INITIAL_DOT_BORDER = { size: 0.5, color: '#d0d0fc' };

export const clearDot = createAction(CLEAR_DOT);
export const newDotArtProject = createAction(NEW_DOT_ART_PROJECT);
export const loadDotArt = createAction(
  LOAD_DOT_ART,
  (loadedData) => loadedData,
);
export const changeDotBorderSize = createAction(
  CHANGE_DOT_BORDER_SIZE,
  (size) => size,
);
export const changeDotBorderColor = createAction(
  CHANGE_DOT_BORDER_COLOR,
  (color) => color,
);
export const increaseDotSize = createAction(INCREASE_DOT_SIZE);
export const decreaseDotSize = createAction(DECREASE_DOT_SIZE);
export const changeDotSize = createAction(
  CHANGE_DOT_SIZE,
  (dotSize) => dotSize,
);
export const increaseColumn = createAction(INCREASE_COLUMN);
export const decreaseColumn = createAction(DECREASE_COLUMN);
export const increaseRow = createAction(INCREASE_ROW);
export const decreaseRow = createAction(DECREASE_ROW);
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
export const changeAnimationInterval = createAction(
  CHANGE_ANIMATION_INTERVAL,
  (interval, activeIdx) => ({ interval, activeIdx }),
);
export const changeAnimationDuration = createAction(
  CHANGE_ANIMATION_DURATION,
  (duration) => duration,
);
export const changePixelSize = createAction(
  CHANGE_PIXEL_SIZE,
  (pixelSize) => pixelSize,
);
export const reorderDotList = createAction(
  REORDER_DOT_LIST,
  ({ startIdx, endIdx }) => ({ startIdx, endIdx }),
);

const defaultDotMaker = (row, column) => {
  return new Array(column).fill().map(() => new Array(row).fill(''));
};

const initialState = {
  dotList: [
    {
      id: shortid.generate(),
      dot: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
      interval: 100,
    },
  ],
  border: INITIAL_DOT_BORDER,
  dotSize: INITIAL_DOT_DOTSIZE,
  columnCount: INITIAL_COLUMN,
  rowCount: INITIAL_ROW,
  animationDuration: 2,
  activeIdx: 0,
  pixelSize: 10,
};

const intervalSetter = (dotList) => {
  const quotient = 100 / dotList.length;
  const returnDotList = dotList.map((dotSet, idx) => {
    return {
      ...dotSet,
      interval:
        idx === dotList.length
          ? 100
          : Math.round((idx + 1) * quotient * 100) / 100,
    };
  });
  return returnDotList;
};

const dot = handleActions(
  {
    [CLEAR_DOT]: (state) =>
      produce(state, (draft) => {
        draft.dotList[draft.activeIdx].dot = defaultDotMaker(
          draft.rowCount,
          draft.columnCount,
        );
      }),
    [NEW_DOT_ART_PROJECT]: () => ({
      ...initialState,
    }),
    [LOAD_DOT_ART]: (state, { payload: loadedData }) => ({
      ...state,
      activeIdx: 0,
      ...loadedData,
    }),
    [CHANGE_DOT_BORDER_SIZE]: (state, { payload: size }) =>
      produce(state, (draft) => {
        draft.border.size = size;
      }),
    [CHANGE_DOT_BORDER_COLOR]: (state, { payload: color }) =>
      produce(state, (draft) => {
        draft.border.color = color;
      }),
    [INCREASE_DOT_SIZE]: (state) => ({
      ...state,
      dotSize: state.dotSize < 61 ? state.dotSize + 2 : state.dotSize,
    }),
    [DECREASE_DOT_SIZE]: (state) => ({
      ...state,
      dotSize: state.dotSize > 2 ? state.dotSize - 2 : state.dotSize,
    }),
    [CHANGE_DOT_SIZE]: (state, { payload: dotSize }) => ({
      ...state,
      dotSize: dotSize,
    }),
    [INCREASE_COLUMN]: (state) => ({
      ...state,
      columnCount: state.columnCount + 1,
    }),
    [DECREASE_COLUMN]: (state) => ({
      ...state,
      columnCount:
        state.columnCount > 2 ? state.columnCount - 1 : state.columnCount,
    }),
    [INCREASE_ROW]: (state) => ({
      ...state,
      rowCount: state.rowCount + 1,
    }),
    [DECREASE_ROW]: (state) => ({
      ...state,
      rowCount: state.rowCount > 2 ? state.rowCount - 1 : state.rowCount,
    }),
    [CHANGE_DOT_AREA]: (state, { payload: { newRow, newColumn } }) =>
      produce(state, (draft) => {
        if (newRow < 1 || newColumn < 1) {
          return;
        }
        const originRow = draft.rowCount;
        const originColumn = draft.columnCount;

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
              interval: 100,
            },
          ];
        } else {
          let dotList = draft.dotList;
          let tempDotList = dotList.slice(idx + 1, dotList.length);

          dotList = dotList.slice(0, idx);
          dotList = dotList.concat(tempDotList);
          draft.dotList = intervalSetter(dotList);
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
        draft.dotList = intervalSetter(dotList);
        draft.activeIdx = idx + 1;
      }),
    [ADD_NEW_DOT_ART]: (state) =>
      produce(state, (draft) => {
        draft.dotList.push({
          id: shortid.generate(),
          dot: defaultDotMaker(draft.rowCount, draft.columnCount),
          interval: 25,
        });
        draft.dotList = intervalSetter(draft.dotList);
        draft.activeIdx = draft.dotList.length - 1;
      }),
    [CHANGE_ANIMATION_INTERVAL]: (
      state,
      { payload: { interval, activeIdx } },
    ) =>
      produce(state, (draft) => {
        const dotList = draft.dotList;
        if (dotList[activeIdx + 1].interval < interval) {
          // 현재 interval이 다음 animation보다 늦어선 안되므로 최대치로 조정해준다
          dotList[activeIdx].interval = dotList[activeIdx + 1].interval;
          return;
        } else {
          if (activeIdx === 0) {
            dotList[activeIdx].interval = interval <= 0 ? 0.1 : interval;
          } else {
            dotList[activeIdx].interval =
              dotList[activeIdx - 1].interval > interval
                ? dotList[activeIdx - 1].interval
                : interval;
          }
        }
      }),
    [CHANGE_ANIMATION_DURATION]: (state, { payload: duration }) => ({
      ...state,
      animationDuration: duration,
    }),
    [CHANGE_PIXEL_SIZE]: (state, { payload: pixelSize }) => ({
      ...state,
      pixelSize: pixelSize,
    }),
    [REORDER_DOT_LIST]: (state, { payload: { startIdx, endIdx } }) =>
      produce(state, (draft) => {
        const intervals = draft.dotList.reduce(
          (acc, cur) => (acc = acc.concat(cur.interval)),
          [],
        );

        const [removed] = draft.dotList.splice(startIdx, 1);
        draft.dotList.splice(endIdx, 0, removed);

        // interval 다시 세팅
        intervals.map(
          (interval, idx) => (draft.dotList[idx].interval = interval),
        );

        const activeIdx = draft.activeIdx;
        // activeIdx 다시 잡아주기
        if (activeIdx === startIdx) {
          draft.activeIdx = endIdx;
        } else if (activeIdx > startIdx) {
          if (activeIdx <= endIdx) {
            draft.activeIdx -= 1;
          }
        } else {
          if (activeIdx >= endIdx) {
            draft.activeIdx += 1;
          }
        }
      }),
  },
  initialState,
);

export default dot;
