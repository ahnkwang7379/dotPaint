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
const CHANGE_ANIMATION_INTERVAL = 'dot/CHANGE_ANIMATION_INTERVAL';

// initialState
export const INITIAL_ROW = 16;
export const INITIAL_COLUMN = 16;
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
export const changeAnimationInterval = createAction(
  CHANGE_ANIMATION_INTERVAL,
  (interval, activeIdx) => ({ interval, activeIdx }),
);

// const defaultDotMaker = (row, column) => {
//   return new Array(row).fill().map(() => new Array(column).fill(''));
// };

const defaultDotMaker = (row, column) => {
  return new Array(row * column).fill('');
};

const initialState = {
  dotSet: defaultDotMaker(INITIAL_ROW, INITIAL_COLUMN),
  dotList: [
    {
      id: shortid.generate(),
      dot: ["#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffcdd2", "#ffffff", "#ffffff", "#ffcdd2", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#000000", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#607d8b", "#607d8b", "#607d8b", "#607d8b", "#607d8b", "#ffffff", "#ffffff", "#607d8b", "#607d8b", "#607d8b", "#ffffff", "#ffffff", "#607d8b", "#607d8b", "#607d8b", "#607d8b"], // prettier-ignore
      interval: 25,
    },
    {
      id: shortid.generate(),
      dot: ["#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffcdd2", "#ffffff", "#ffffff", "#ffcdd2", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#607d8b", "#607d8b", "#607d8b", "#607d8b", "#607d8b", "#ffffff", "#ffffff", "#607d8b", "#607d8b", "#607d8b", "#ffffff", "#ffffff", "#607d8b", "#607d8b", "#607d8b", "#607d8b"], // prettier-ignore
      interval: 50,
    },
    {
      id: shortid.generate(),
      dot: ["#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffcdd2", "#ffffff", "#ffffff", "#ffcdd2", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#607d8b", "#607d8b", "#607d8b", "#607d8b", "#607d8b", "#ffffff", "#ffffff", "#607d8b", "#607d8b", "#607d8b", "#ffffff", "#ffffff", "#607d8b", "#607d8b", "#607d8b", "#607d8b"], // prettier-ignore
      interval: 75,
    },
    {
      id: shortid.generate(),
      dot: ["#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffcdd2", "#ffffff", "#ffffff", "#ffcdd2", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffcdd2", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffcdd2", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#ffffff", "#ffffff", "#303f46", "#303f46", "#303f46", "#303f46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#303f46", "#303f46", "#607d8b", "#607d8b", "#607d8b", "#607d8b", "#607d8b", "#ffffff", "#ffffff", "#607d8b", "#607d8b", "#607d8b", "#ffffff", "#ffffff", "#607d8b", "#607d8b", "#607d8b", "#607d8b"], // prettier-ignore
      interval: 100,
    },
  ],
  activeIdx: 0,
  border: INITIAL_DOT_BORDER,
  dotSize: INITIAL_DOT_DOTSIZE,
  rowCount: INITIAL_ROW,
  columnCount: INITIAL_COLUMN,
};

const intervalSetter = (dotList) =>
  produce(dotList, (draft) => {
    const quotient = 100 / draft.length;
    draft.map(
      (dotSet, idx) =>
        (dotSet.interval =
          idx === dotList.length
            ? 100
            : Math.round((idx + 1) * quotient * 100) / 100),
    );
  });

const dot = handleActions(
  {
    [CLEAR_DOT]: (state) => ({
      ...state,
      dotSet: defaultDotMaker(state.rowCount, state.columnCount),
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
        draft.activeIdx = draft.dotList.length - 1;
        draft.dotList = intervalSetter(draft.dotList);
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
  },
  initialState,
);

export default dot;
