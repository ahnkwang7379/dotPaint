import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import shortid from 'shortid';
import { DOT, ERASER, BUCKET, PICKER, MOVE } from './paintTool';
import { exampleCat, exampleCatTwo } from '../util/json-example';

export const CLEAR_DOT = 'dot/CLEAR_DOT';
export const NEW_DOT_ART_PROJECT = 'dot/NEW_DOT_ART_PROJECT';
export const LOAD_DOT_ART = 'dot/LOAD_DOT_ART';

export const INCREASE_COLUMN = 'dot/INCREASE_COLUMN';
export const DECREASE_COLUMN = 'dot/DECREASE_COLUMN';
export const INCREASE_ROW = 'dot/INCREASE_ROW';
export const DECREASE_ROW = 'dot/DECREASE_ROW';
export const CHANGE_DOT_AREA = 'dot/CHANGE_DOT_AREA';

export const CHANGE_ACTIVE_IDX = 'dot/CHANGE_ACTIVE_IDX';
export const REMOVE_ACTIVE_DOT_ART = 'dot/REMOVE_ACTIVE_DOT_ART';
export const COPY_ACTIVE_DOT_ART = 'dot/COPY_ACTIVE_DOT_ART';
export const ADD_NEW_DOT_ART = 'dot/ADD_NEW_DOT_ART';
export const CHANGE_ANIMATION_INTERVAL = 'dot/CHANGE_ANIMATION_INTERVAL';
const CHANGE_ANIMATION_DURATION = 'dot/CHANGE_ANIMATION_DURATION';
const CHANGE_PIXEL_SIZE = 'dot/CHANGE_PIXEL_SIZE';
export const REORDER_DOT_LIST = 'dot/REORDER_DOT_LIST';
export const UPDATE_DOT_ART = 'dot/UPDATE_DOT_ART';

// Layer
export const ADD_NEW_LAYER = 'dot/ADD_NEW_LAYER';
export const REMOVE_LAYER = 'dot/REMOVE_LAYER';
export const MERGE_LAYER = 'dot/MERGE_LAYER';
export const MOVE_UP_LAYER = 'dot/MOVE_UP_LAYER';
export const MOVE_DOWN_LAYER = 'dot/MOVE_DOWN_LAYER';
export const SELECT_LAYER_IDX = 'dot/SELECT_LAYER_IDX';
export const RENAME_LAYER = 'dot/RENAME_LAYER';

// redux actions
export const clearDot = createAction(CLEAR_DOT);
export const newDotArtProject = createAction(NEW_DOT_ART_PROJECT);
export const loadDotArt = createAction(
  LOAD_DOT_ART,
  (loadedData) => loadedData,
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
export const updateDotArt = createAction(
  UPDATE_DOT_ART,
  (selectedPaintTool) => selectedPaintTool,
);
export const addNewLayer = createAction(ADD_NEW_LAYER);
export const removeLayer = createAction(REMOVE_LAYER);
export const margeLayer = createAction(MERGE_LAYER);
export const moveUpLayer = createAction(
  MOVE_UP_LAYER,
  (shiftDown) => shiftDown,
);
export const moveDownLayer = createAction(
  MOVE_DOWN_LAYER,
  (shiftDown) => shiftDown,
);
export const selectLayerIdx = createAction(SELECT_LAYER_IDX, (idx) => idx);
export const renameLayer = createAction(RENAME_LAYER, (name) => name);

const defaultDotMaker = (row, column) => {
  return new Array(row).fill().map(() => new Array(column).fill(''));
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

const initialState = {
  fakeDotArt: defaultDotMaker(16, 16),
  dotList: [
    {
      id: shortid.generate(),
      dot: defaultDotMaker(16, 16),
      interval: 100,
    },
  ],
  dotFrameList: [
    {
      id: shortid.generate(),
      layerList: exampleCatTwo.dotList,
      interval: 100,
    },
  ],
  columnCount: 16,
  rowCount: 16,
  animationDuration: 2,
  activeIdx: 0,
  layerSelectIdx: 1,
  layerNameSet: [...exampleCatTwo.layerNameSet],
  pixelSize: 10,
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
      fakeDotArt: defaultDotMaker(loadedData.rowCount, loadedData.columnCount),
      activeIdx: 0,
      ...loadedData,
    }),
    [INCREASE_COLUMN]: (state) =>
      produce(state, (draft) => {
        draft.columnCount = draft.columnCount + 1;
        for (let i = 0; i < draft.dotList.length; i++) {
          draft.dotList[i].dot.map((column) => column.push(''));
        }
        draft.fakeDotArt = defaultDotMaker(draft.rowCount, draft.columnCount);
      }),
    [DECREASE_COLUMN]: (state) =>
      produce(state, (draft) => {
        if (draft.columnCount > 2) {
          draft.columnCount = draft.columnCount - 1;
          for (let i = 0; i < draft.dotList.length; i++) {
            draft.dotList[i].dot.map((column) => column.pop());
          }
          draft.fakeDotArt = defaultDotMaker(draft.rowCount, draft.columnCount);
        }
      }),
    [INCREASE_ROW]: (state) =>
      produce(state, (draft) => {
        draft.rowCount = draft.rowCount + 1;
        for (let i = 0; i < draft.dotList.length; i++) {
          draft.dotList[i].dot.push(new Array(draft.columnCount).fill(''));
        }
        draft.fakeDotArt = defaultDotMaker(draft.rowCount, draft.columnCount);
      }),
    [DECREASE_ROW]: (state) =>
      produce(state, (draft) => {
        if (draft.rowCount > 2) {
          draft.rowCount = draft.rowCount - 1;
          for (let i = 0; i < draft.dotList.length; i++) {
            draft.dotList[i].dot.pop();
          }
          draft.fakeDotArt = defaultDotMaker(draft.rowCount, draft.columnCount);
        }
      }),
    [CHANGE_DOT_AREA]: (state, { payload: { newRow, newColumn } }) =>
      produce(state, (draft) => {
        if (newRow < 1 || newColumn < 1) {
          return;
        }
        const originRow = draft.rowCount;
        const originColumn = draft.columnCount;

        for (let listIdx = 0; listIdx < draft.dotList.length; listIdx++) {
          if (newColumn > originColumn) {
            for (let i = originColumn; i < newColumn; i++) {
              draft.dotList[listIdx].dot.map((column) => column.push(''));
            }
          }

          if (newColumn < originColumn) {
            for (let i = newColumn; i < originColumn; i++) {
              draft.dotList[listIdx].dot.map((column) => column.pop());
            }
          }

          if (newRow > originRow) {
            for (let i = originRow; i < newRow; i++) {
              draft.dotList[listIdx].dot.push(new Array(newColumn).fill(''));
            }
          }

          if (newRow < originRow) {
            for (let i = newRow; i < originRow; i++) {
              draft.dotList[listIdx].dot.pop();
            }
          }
        }

        draft.rowCount = newRow;
        draft.columnCount = newColumn;
        draft.fakeDotArt = defaultDotMaker(draft.rowCount, draft.columnCount);
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
    [UPDATE_DOT_ART]: (state, { payload: selectedPaintTool }) => {
      if (selectedPaintTool === PICKER) return { ...state };

      let newDotArt;

      if (selectedPaintTool === DOT) {
        newDotArt = dotArtMerge(
          state.fakeDotArt,
          state.dotList[state.activeIdx].dot,
          state.rowCount,
          state.columnCount,
        );
      }
      if (selectedPaintTool === ERASER) {
        newDotArt = state.fakeDotArt;
      }
      if (selectedPaintTool === BUCKET) {
        newDotArt = state.fakeDotArt;
      }
      if (selectedPaintTool === MOVE) {
        newDotArt = state.fakeDotArt;
      }

      return produce(state, (draft) => {
        draft.dotList[draft.activeIdx].dot = newDotArt;
      });
    },
    [ADD_NEW_LAYER]: (state) => {
      const layerLength = state.dotFrameList[0].layerList.length;
      const addLayer = {
        id: shortid.generate(),
        name: `Layer ${layerLength + 1}`,
        dot: defaultDotMaker(state.rowCount, state.columnCount),
      };

      const returnDotFrame = state.dotFrameList.map((dotFrame) => {
        return {
          ...dotFrame,
          layerList: []
            .concat(dotFrame.layerList.slice(0, state.layerSelectIdx + 1))
            .concat(addLayer)
            .concat(
              dotFrame.layerList.slice(state.layerSelectIdx + 1, layerLength),
            ),
        };
      });

      return {
        ...state,
        dotFrameList: returnDotFrame,
        layerSelectIdx: state.layerSelectIdx + 1,
      };
    },
    [REMOVE_LAYER]: (state) => {
      const layerLength = state.dotFrameList[0].layerList.length;

      if (layerLength === 1) return { ...state }; // 최소 하나의 layer는 있어야 함

      const returnDotFrame = state.dotFrameList.map((dotFrame) => {
        return {
          ...dotFrame,
          layerList: dotFrame.layerList.filter(
            (layer, idx) => idx !== state.layerSelectIdx,
          ),
        };
      });

      return {
        ...state,
        dotFrameList: returnDotFrame,
        layerSelectIdx:
          state.layerSelectIdx === layerLength - 1
            ? state.layerSelectIdx - 1
            : state.layerSelectIdx,
      };
    },
    [MERGE_LAYER]: (state) => {
      const layerLength = state.dotFrameList[0].layerList.length;

      if (layerLength === 1) return { ...state }; // 하나의 layer만 있으면 실행 불가
      if (state.layerSelectIdx === 0) return { ...state }; // 맨 아래 layer는 merge가 불가능

      const returnDotFrame = state.dotFrameList.map((dotFrame) => {
        return {
          ...dotFrame,
          layerList: []
            .concat(dotFrame.layerList.slice(0, state.layerSelectIdx - 1))
            .concat({
              id: shortid.generate(),
              name: dotFrame.layerList[state.layerSelectIdx].name,
              dot: dotArtMerge(
                dotFrame.layerList[state.layerSelectIdx].dot,
                dotFrame.layerList[state.layerSelectIdx - 1].dot,
                state.rowCount,
                state.columnCount,
              ),
            })
            .concat(
              dotFrame.layerList.slice(state.layerSelectIdx + 1, layerLength),
            ),
        };
      });

      return {
        ...state,
        dotFrameList: returnDotFrame,
        layerSelectIdx: state.layerSelectIdx - 1,
      };
    },
    [MOVE_UP_LAYER]: (state, { payload: shiftDown }) => {
      const layerLength = state.dotFrameList[0].layerList.length;
      const layerSelectIdx = state.layerSelectIdx;

      if (state.layerSelectIdx === layerLength - 1) return { ...state }; // 맨 위는 더 이동 불가

      let returnDotFrame;
      let returnSelectIdx;
      if (!shiftDown) {
        // 한 칸 위로 이동
        returnDotFrame = state.dotFrameList.map((dotFrame) => {
          return {
            ...dotFrame,
            layerList: []
              .concat(
                dotFrame.layerList.slice(
                  0,
                  layerSelectIdx === 0 ? 0 : layerSelectIdx,
                ),
              )
              .concat(
                dotFrame.layerList.slice(
                  layerSelectIdx + 1,
                  layerSelectIdx + 2,
                ),
              )
              .concat(
                dotFrame.layerList.slice(layerSelectIdx, layerSelectIdx + 1),
              )
              .concat(dotFrame.layerList.slice(layerSelectIdx + 2)),
          };
        });
        returnSelectIdx = state.layerSelectIdx + 1;
      } else {
        // 맨 위로 이동
        returnDotFrame = state.dotFrameList.map((dotFrame) => {
          return {
            ...dotFrame,
            layerList: []
              .concat(
                dotFrame.layerList.slice(
                  0,
                  layerSelectIdx === 0 ? 0 : layerSelectIdx,
                ),
              )
              .concat(dotFrame.layerList.slice(layerSelectIdx + 1))
              .concat(
                dotFrame.layerList.slice(layerSelectIdx, layerSelectIdx + 1),
              ),
          };
        });
        returnSelectIdx = layerLength - 1;
      }

      return {
        ...state,
        dotFrameList: returnDotFrame,
        layerSelectIdx: returnSelectIdx,
      };
    },
    [MOVE_DOWN_LAYER]: (state, { payload: shiftDown }) => {
      if (state.layerSelectIdx === 0) return { ...state }; // 맨 아래는 더 이동 불가

      const layerSelectIdx = state.layerSelectIdx;

      let returnDotFrame;
      let returnSelectIdx;
      if (!shiftDown) {
        // 한 칸 아래로 이동
        returnDotFrame = state.dotFrameList.map((dotFrame) => {
          return {
            ...dotFrame,
            layerList: []
              .concat(
                dotFrame.layerList.slice(
                  0,
                  layerSelectIdx - 1, // idx가 0인 것은 맨 처음 걸러냈음
                ),
              )
              .concat(
                dotFrame.layerList.slice(layerSelectIdx, layerSelectIdx + 1),
              )
              .concat(
                dotFrame.layerList.slice(layerSelectIdx - 1, layerSelectIdx),
              )
              .concat(dotFrame.layerList.slice(layerSelectIdx + 1)),
          };
        });
        returnSelectIdx = layerSelectIdx - 1;
      } else {
        // 맨 아래로 이동
        returnDotFrame = state.dotFrameList.map((dotFrame) => {
          return {
            ...dotFrame,
            layerList: []
              .concat(
                dotFrame.layerList.slice(layerSelectIdx, layerSelectIdx + 1),
              )
              .concat(dotFrame.layerList.slice(0, layerSelectIdx))
              .concat(dotFrame.layerList.slice(layerSelectIdx + 1)),
          };
        });
        returnSelectIdx = 0;
      }

      return {
        ...state,
        dotFrameList: returnDotFrame,
        layerSelectIdx: returnSelectIdx,
      };
    },
    [SELECT_LAYER_IDX]: (state, { payload: idx }) => ({
      ...state,
      layerSelectIdx: idx,
    }),
    [RENAME_LAYER]: (state, { payload: name }) => ({
      ...state,
    }),
  },
  initialState,
);

function dotArtMerge(firstDotArt, secondDotArt, rowCount, columnCount) {
  let mergedDotArt = defaultDotMaker(rowCount, columnCount);
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      firstDotArt[i][j] !== ''
        ? (mergedDotArt[i][j] = firstDotArt[i][j])
        : (mergedDotArt[i][j] = secondDotArt[i][j]);
    }
  }
  return mergedDotArt;
}

export default dot;
