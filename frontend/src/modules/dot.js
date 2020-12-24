import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import shortid from 'shortid';
import { DOT, ERASER, BUCKET, PICKER, MOVE, SAMECOLOR } from './paintTool';
import { defaultDotMaker, dotArrayMerge } from '../util/dotArrayUtil';

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
export const removeActiveDotArt = createAction(REMOVE_ACTIVE_DOT_ART);
export const copyActiveDotArt = createAction(COPY_ACTIVE_DOT_ART);
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
export const addNewLayer = createAction(
  ADD_NEW_LAYER,
  (shiftDown) => shiftDown,
);
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

function intervalSetter(dotList) {
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
}

const initialState = {
  fakeDotArt: defaultDotMaker(16, 16),
  dotFrameList: [
    {
      id: shortid.generate(),
      layerList: [defaultDotMaker(16, 16)],
      interval: 100,
    },
  ],
  columnCount: 16,
  rowCount: 16,
  animationDuration: 2,
  activeIdx: 0,
  layerSelectIdx: 0,
  layerData: [{ layerName: 'Layer 1', dotFrameIdx: 0 }],
  pixelSize: 32,
};

const dot = handleActions(
  {
    [CLEAR_DOT]: (state) =>
      produce(state, (draft) => {
        const layerIdx = draft.layerData[draft.layerSelectIdx].dotFrameIdx;
        draft.dotFrameList[state.activeIdx].layerList[
          layerIdx
        ] = defaultDotMaker(draft.rowCount, draft.columnCount);
      }),
    [NEW_DOT_ART_PROJECT]: () => ({
      ...initialState,
    }),
    [LOAD_DOT_ART]: (state, { payload: loadedData }) => ({
      ...state,
      activeIdx: 0,
      fakeDotArt: defaultDotMaker(loadedData.rowCount, loadedData.columnCount),
      layerSelectIdx: 0,
      ...loadedData,
    }),
    [INCREASE_COLUMN]: (state) =>
      produce(state, (draft) => {
        draft.columnCount = draft.columnCount + 1;
        for (let i = 0; i < draft.dotFrameList.length; i++) {
          draft.dotFrameList[i].layerList.map((layer) =>
            layer.map((column) => column.push('')),
          );
        }
      }),
    [DECREASE_COLUMN]: (state) =>
      produce(state, (draft) => {
        if (draft.columnCount > 1) {
          draft.columnCount = draft.columnCount - 1;
          for (let i = 0; i < draft.dotFrameList.length; i++) {
            draft.dotFrameList[i].layerList.map((layer) =>
              layer.map((column) => column.pop()),
            );
          }
        }
      }),
    [INCREASE_ROW]: (state) =>
      produce(state, (draft) => {
        draft.rowCount = draft.rowCount + 1;
        for (let i = 0; i < draft.dotFrameList.length; i++) {
          draft.dotFrameList[i].layerList.map((layer) =>
            layer.push(new Array(draft.columnCount).fill('')),
          );
        }
        draft.fakeDotArt = defaultDotMaker(draft.rowCount, draft.columnCount);
      }),
    [DECREASE_ROW]: (state) =>
      produce(state, (draft) => {
        if (draft.rowCount > 1) {
          draft.rowCount = draft.rowCount - 1;
          for (let i = 0; i < draft.dotFrameList.length; i++) {
            draft.dotFrameList[i].layerList.map((layer) => layer.pop());
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

        for (let listIdx = 0; listIdx < draft.dotFrameList.length; listIdx++) {
          if (newColumn > originColumn) {
            for (let i = originColumn; i < newColumn; i++) {
              draft.dotFrameList[listIdx].layerList.map((layer) =>
                layer.map((column) => column.push('')),
              );
            }
          }

          if (newColumn < originColumn) {
            for (let i = newColumn; i < originColumn; i++) {
              draft.dotFrameList[listIdx].layerList.map((layer) =>
                layer.map((column) => column.pop()),
              );
            }
          }

          if (newRow > originRow) {
            for (let i = originRow; i < newRow; i++) {
              draft.dotFrameList[listIdx].layerList.map((layer) =>
                layer.push(new Array(newColumn).fill('')),
              );
            }
          }

          if (newRow < originRow) {
            for (let i = newRow; i < originRow; i++) {
              draft.dotFrameList[listIdx].layerList.map((layer) => layer.pop());
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
    [REMOVE_ACTIVE_DOT_ART]: (state) => {
      if (state.dotFrameList.length === 1) return { ...state }; // 단일 dotFrame은 삭제 불가

      const { dotFrameList, activeIdx } = state;

      const returnDotFrameList = intervalSetter(
        []
          .concat(dotFrameList.slice(0, activeIdx))
          .concat(dotFrameList.slice(activeIdx + 1)),
      );

      return {
        ...state,
        dotFrameList: returnDotFrameList,
        activeIdx:
          activeIdx > returnDotFrameList.length - 1 ? activeIdx - 1 : activeIdx,
      };
    },
    [COPY_ACTIVE_DOT_ART]: (state) => {
      const { dotFrameList, activeIdx } = state;

      const returnDotFrameList = intervalSetter(
        []
          .concat(dotFrameList.slice(0, activeIdx + 1))
          .concat({ ...dotFrameList[activeIdx], id: shortid.generate() })
          .concat(dotFrameList.slice(activeIdx + 1)),
      );

      return {
        ...state,
        dotFrameList: returnDotFrameList,
        activeIdx: activeIdx + 1,
      };
    },
    [ADD_NEW_DOT_ART]: (state) => {
      const defaultDot = defaultDotMaker(state.rowCount, state.columnCount);
      const newDotFrame = {
        id: shortid.generate(),
        layerList: new Array(state.layerData.length).fill(defaultDot),
        interval: 0,
      };

      const returnDotFrameList = intervalSetter(
        [].concat(state.dotFrameList.slice()).concat(newDotFrame),
      );

      return {
        ...state,
        dotFrameList: returnDotFrameList,
        activeIdx: returnDotFrameList.length - 1,
      };
    },
    [CHANGE_ANIMATION_INTERVAL]: (
      state,
      { payload: { interval, activeIdx } },
    ) =>
      produce(state, (draft) => {
        const dotList = draft.dotFrameList;
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
        const intervals = draft.dotFrameList.reduce(
          (acc, cur) => (acc = acc.concat(cur.interval)),
          [],
        );

        const [removed] = draft.dotFrameList.splice(startIdx, 1);
        draft.dotFrameList.splice(endIdx, 0, removed);

        // interval 다시 세팅
        intervals.map(
          (interval, idx) => (draft.dotFrameList[idx].interval = interval),
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
        const layerIdx = state.layerData[state.layerSelectIdx].dotFrameIdx;
        newDotArt = dotArrayMerge(
          state.fakeDotArt,
          state.dotFrameList[state.activeIdx].layerList[layerIdx],
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
      if (selectedPaintTool === SAMECOLOR) {
        newDotArt = state.fakeDotArt;
      }

      return produce(state, (draft) => {
        draft.dotFrameList[draft.activeIdx].layerList[
          draft.layerData[draft.layerSelectIdx].dotFrameIdx
        ] = newDotArt;
      });
    },
    [ADD_NEW_LAYER]: (state, { payload: shiftDown }) => {
      const { layerSelectIdx, layerData } = state;
      const layerLength = layerData.length;
      const dotFrameIdx = layerData[layerSelectIdx].dotFrameIdx;

      let addLayer = [];
      let addLayerData;
      let returnDotFrame;
      if (shiftDown) {
        // 레이어 복사
        for (let i = 0; i < state.dotFrameList.length; i++) {
          addLayer = addLayer.concat([
            state.dotFrameList[i].layerList[dotFrameIdx].slice(),
          ]);
        }

        addLayerData = {
          layerName: `${layerData[layerSelectIdx].layerName} (copy)`,
          dotFrameIdx: layerLength,
        };

        returnDotFrame = state.dotFrameList.map((dotFrame, idx) => {
          return {
            ...dotFrame,
            layerList: []
              .concat(dotFrame.layerList.slice())
              .concat([addLayer[idx]]),
          };
        });
      } else {
        // 신규 레이어
        addLayer = [defaultDotMaker(state.rowCount, state.columnCount)];

        addLayerData = {
          layerName: `Layer ${layerLength + 1}`,
          dotFrameIdx: layerLength,
        };

        returnDotFrame = state.dotFrameList.map((dotFrame) => {
          return {
            ...dotFrame,
            layerList: [].concat(dotFrame.layerList.slice()).concat(addLayer),
          };
        });
      }

      const returnLayerData = []
        .concat(layerData.slice(0, layerSelectIdx + 1))
        .concat(addLayerData)
        .concat(layerData.slice(layerSelectIdx + 1));

      return {
        ...state,
        dotFrameList: returnDotFrame,
        layerSelectIdx: layerSelectIdx + 1,
        layerData: returnLayerData,
      };
    },
    [REMOVE_LAYER]: (state) => {
      if (state.layerData.length === 1) return { ...state }; // 최소 하나의 layer는 보장해야 함
      const { layerSelectIdx, layerData } = state;
      const layerLength = layerData.length;
      const dotFrameIdx = layerData[layerSelectIdx].dotFrameIdx;

      const returnDotFrame = state.dotFrameList.map((dotFrame) => {
        return {
          ...dotFrame,
          layerList: []
            .concat(dotFrame.layerList.slice(0, dotFrameIdx))
            .concat(dotFrame.layerList.slice(dotFrameIdx + 1)),
        };
      });
      let returnLayerData = []
        .concat(layerData.slice(0, layerSelectIdx))
        .concat(layerData.slice(layerSelectIdx + 1));

      // dotFrameIdx 다시 잡아주기. select된 layer의 dotFrameIdx보다 높거나 같은 친구들을 하나씩 낮춰주자
      returnLayerData = returnLayerData.map((data) => {
        if (data.dotFrameIdx > dotFrameIdx) {
          return {
            ...data,
            dotFrameIdx: data.dotFrameIdx - 1,
          };
        } else {
          return { ...data };
        }
      });

      return {
        ...state,
        dotFrameList: returnDotFrame,
        layerData: returnLayerData,
        layerSelectIdx:
          state.layerSelectIdx === layerLength - 1
            ? state.layerSelectIdx - 1
            : state.layerSelectIdx,
      };
    },
    [MERGE_LAYER]: (state) => {
      const { layerSelectIdx, layerData, dotFrameList } = state;
      const layerLength = layerData.length;

      if (layerLength === 1) return { ...state }; // 하나의 layer만 있으면 실행 불가
      if (layerSelectIdx === 0) return { ...state }; // 맨 아래 layer는 merge가 불가능

      const topLayerIdx = layerData[layerSelectIdx].dotFrameIdx;
      const bottomLayerIdx = layerData[layerSelectIdx - 1].dotFrameIdx;

      let returnDotFrameList = [];
      for (let i = 0; i < dotFrameList.length; i++) {
        let topLayer = dotFrameList[i].layerList[topLayerIdx].slice();
        let bottomLayer = dotFrameList[i].layerList[bottomLayerIdx].slice();

        let returnLayer = dotFrameList[i].layerList.reduce((acc, cur, idx) => {
          if (idx === topLayerIdx) {
            return acc.concat([
              dotArrayMerge(
                topLayer,
                bottomLayer,
                state.rowCount,
                state.columnCount,
              ),
            ]);
          } else if (idx === bottomLayerIdx) {
            return acc;
          } else {
            return acc.concat([cur]);
          }
        }, []);

        let result = {
          id: dotFrameList[i].id,
          layerList: returnLayer,
          interval: dotFrameList[i].interval,
        };

        returnDotFrameList.push(result);
      }

      let returnLayerData = []
        .concat(layerData.slice(0, layerSelectIdx - 1))
        .concat(layerData.slice(layerSelectIdx));

      const dotFrameIdx = layerData[layerSelectIdx - 1].dotFrameIdx; // remove와는 다르다 주의할 것

      // dotFrameIdx 다시 잡아주기. 선택된 layer의 dotFrameIdx보다 높은 친구들을 하나씩 낮춰주자
      returnLayerData = returnLayerData.map((data) => {
        if (data.dotFrameIdx > dotFrameIdx) {
          return {
            ...data,
            dotFrameIdx: data.dotFrameIdx - 1,
          };
        } else {
          return { ...data };
        }
      });

      return {
        ...state,
        dotFrameList: returnDotFrameList,
        layerSelectIdx: state.layerSelectIdx - 1,
        layerData: returnLayerData,
      };
    },
    [MOVE_UP_LAYER]: (state, { payload: shiftDown }) => {
      const layerLength = state.layerData.length;
      const { layerSelectIdx, layerData } = state;

      if (layerSelectIdx === layerLength - 1) return { ...state }; // 맨 위는 이동 불가

      let returnLayerData;
      let returnSelectIdx;

      if (!shiftDown) {
        // 한 칸 위로 이동
        returnLayerData = []
          .concat(layerData.slice(0, layerSelectIdx === 0 ? 0 : layerSelectIdx))
          .concat(layerData.slice(layerSelectIdx + 1, layerSelectIdx + 2))
          .concat(layerData.slice(layerSelectIdx, layerSelectIdx + 1))
          .concat(layerData.slice(layerSelectIdx + 2));
        returnSelectIdx = layerSelectIdx + 1;
      } else {
        // 맨 위로 이동
        returnLayerData = []
          .concat(layerData.slice(0, layerSelectIdx === 0 ? 0 : layerSelectIdx))
          .concat(layerData.slice(layerSelectIdx + 1))
          .concat(layerData.slice(layerSelectIdx, layerSelectIdx + 1));
        returnSelectIdx = layerLength - 1;
      }

      return {
        ...state,
        layerSelectIdx: returnSelectIdx,
        layerData: returnLayerData,
      };
    },
    [MOVE_DOWN_LAYER]: (state, { payload: shiftDown }) => {
      const { layerSelectIdx, layerData } = state;

      if (layerSelectIdx === 0) return { ...state }; // 맨 아래는 더 이동 불가

      let returnLayerData;
      let returnSelectIdx;

      if (!shiftDown) {
        // 한 칸 아래로 이동
        returnLayerData = []
          .concat(layerData.slice(0, layerSelectIdx - 1)) // idx가 0인 경우는 위에서 걸러놨음
          .concat(layerData.slice(layerSelectIdx, layerSelectIdx + 1))
          .concat(layerData.slice(layerSelectIdx - 1, layerSelectIdx))
          .concat(layerData.slice(layerSelectIdx + 1));
        returnSelectIdx = layerSelectIdx - 1;
      } else {
        // 맨 아래로 이동
        returnLayerData = []
          .concat(layerData.slice(layerSelectIdx, layerSelectIdx + 1))
          .concat(layerData.slice(0, layerSelectIdx))
          .concat(layerData.slice(layerSelectIdx + 1));
        returnSelectIdx = 0;
      }

      return {
        ...state,
        layerSelectIdx: returnSelectIdx,
        layerData: returnLayerData,
      };
    },
    [SELECT_LAYER_IDX]: (state, { payload: idx }) => ({
      ...state,
      layerSelectIdx: idx,
    }),
    [RENAME_LAYER]: (state, { payload: name }) => ({
      ...state,
      layerData: state.layerData.map((data, idx) =>
        idx === state.layerSelectIdx
          ? { ...data, layerName: name }
          : { ...data },
      ),
    }),
  },
  initialState,
);

export default dot;
