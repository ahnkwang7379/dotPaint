import { createAction, handleActions } from 'redux-actions';
import { exampleCat } from '../util/json-example';
import produce from 'immer';
import shortid from 'shortid';

const CLEAR_DOT = 'dot/CLEAR_DOT';
const LOAD_DOT_ART = 'dot/LOAD_DOT_ART';
const CHANGE_DOT_BORDER_SIZE = 'dot/CHANGE_DOT_BORDER_SIZE';
const CHANGE_DOT_BORDER_COLOR = 'dot/CHANGE_DOT_BORDER_COLOR';
const CHANGE_DOT_SIZE = 'dot/CHANGE_DOT_SIZE';
const CHANGE_DOT_AREA = 'dot/CHANGE_DOT_AREA';
const CHANGE_ACTIVE_IDX = 'dot/CHANGE_ACTIVE_IDX';
const REMOVE_ACTIVE_DOT_ART = 'dot/REMOVE_ACTIVE_DOT_ART';
const COPY_ACTIVE_DOT_ART = 'dot/COPY_ACTIVE_DOT_ART';
const ADD_NEW_DOT_ART = 'dot/ADD_NEW_DOT_ART';
const CHANGE_ANIMATION_INTERVAL = 'dot/CHANGE_ANIMATION_INTERVAL';
const CHANGE_ANIMATION_DURATION = 'dot/CHANGE_ANIMATION_DURATION';
const REORDER_DOT_LIST = 'dot/REORDER_DOT_LIST';

// initialState
export const INITIAL_ROW = 16;
export const INITIAL_COLUMN = 16;
export const INITIAL_DOT_DOTSIZE = 1;
export const INITIAL_DOT_COLOR = '#f0f0f0';
export const INITIAL_DOT_BORDER = { size: 0.5, color: '#d0d0fc' };

export const clearDot = createAction(CLEAR_DOT);
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
export const changeAnimationInterval = createAction(
  CHANGE_ANIMATION_INTERVAL,
  (interval, activeIdx) => ({ interval, activeIdx }),
);
export const changeAnimationDuration = createAction(
  CHANGE_ANIMATION_DURATION,
  (duration) => duration,
);
export const reorderDotList = createAction(
  REORDER_DOT_LIST,
  ({ startIdx, endIdx }) => ({ startIdx, endIdx }),
);

const defaultDotMaker = (row, column) => {
  return new Array(row * column).fill('');
};

const initialState = {
  ...exampleCat,
  activeIdx: 0,
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
            let newDotSet = [];
            for (let i = 0; i < originRow; i++) {
              newDotSet = newDotSet
                .concat(
                  dotSet.dot.slice(i * originColumn, (i + 1) * originColumn),
                )
                .concat(new Array(newColumn - originColumn).fill(''));
            }
            dotSet.dot = newDotSet;
          }

          if (newColumn < originColumn) {
            let newDotSet = [];
            for (let i = 0; i < originRow; i++) {
              newDotSet = newDotSet.concat(
                dotSet.dot.slice(
                  i * originColumn,
                  (i + 1) * originColumn - (originColumn - newColumn),
                ),
              );
            }
            dotSet.dot = newDotSet;
          }

          if (newRow > originRow) {
            for (let i = originRow; i < newRow; i++) {
              dotSet.dot = dotSet.dot.concat(new Array(newColumn).fill(''));
            }
          }

          if (newRow < originRow) {
            for (let i = newRow; i < originRow; i++) {
              dotSet.dot = dotSet.dot.slice(0, newRow * newColumn);
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
