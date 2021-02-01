import { combineReducers } from 'redux';
import { cloneDotSet, defaultDotMaker } from '../util/dotArrayUtil';
import { createAction, handleActions } from 'redux-actions';
import dot, {
  CLEAR_DOT,
  NEW_DOT_ART_PROJECT,
  LOAD_DOT_ART,
  INCREASE_COLUMN,
  DECREASE_COLUMN,
  INCREASE_ROW,
  DECREASE_ROW,
  CHANGE_DOT_AREA,
  CHANGE_ACTIVE_IDX,
  REMOVE_ACTIVE_DOT_ART,
  COPY_ACTIVE_DOT_ART,
  ADD_NEW_DOT_ART,
  CHANGE_ANIMATION_INTERVAL,
  REORDER_DOT_LIST,
  UPDATE_DOT_ART,
  ADD_NEW_LAYER,
  REMOVE_LAYER,
  MERGE_LAYER,
  MOVE_UP_LAYER,
  MOVE_DOWN_LAYER,
  SELECT_LAYER_IDX,
  RENAME_LAYER,
} from './dot';
import paintTool, {
  DOT,
  BUCKET,
  PICKER,
  ERASER,
  CHANGE_PAINT_TOOL,
  MOVE,
  SAMECOLOR,
  DITHERING,
  RECTANGLE,
} from './paintTool';
import palettes from './palettes';
import dialog from './dialog';
import observer from './observer';
import keybind from './keybind';
import undoable, { includeAction } from 'redux-undo';

const DOT_ACTIONS = 'index/DOT_ACTIONS';
const CLEAR_FAKE_DOT_ART = 'index/CLEAR_FAKE_DOT_ART';

export const dotActions = createAction(
  DOT_ACTIONS,
  ({ rowIdx, columnIdx }) => ({
    rowIdx,
    columnIdx,
  }),
);
export const clearFakeDotArt = createAction(CLEAR_FAKE_DOT_ART);

// undo redo 기능을 활용할 부분만 따로 combine
const combineDotArt = combineReducers({
  dot,
});

const combineReducer = combineReducers({
  dotArt: undoable(combineDotArt, {
    limit: 100,
    // debug: true,
    ignoreInitialState: true,
    filter: includeAction([
      CLEAR_DOT,
      NEW_DOT_ART_PROJECT,
      LOAD_DOT_ART,
      INCREASE_COLUMN,
      DECREASE_COLUMN,
      INCREASE_ROW,
      DECREASE_ROW,
      CHANGE_DOT_AREA,
      CHANGE_ACTIVE_IDX,
      REMOVE_ACTIVE_DOT_ART,
      COPY_ACTIVE_DOT_ART,
      ADD_NEW_DOT_ART,
      CHANGE_ANIMATION_INTERVAL,
      REORDER_DOT_LIST,
      UPDATE_DOT_ART,
      ADD_NEW_LAYER,
      REMOVE_LAYER,
      MERGE_LAYER,
      MOVE_UP_LAYER,
      MOVE_DOWN_LAYER,
      SELECT_LAYER_IDX,
      RENAME_LAYER,
    ]),
  }),
  palettes,
  paintTool,
  dialog,
  observer,
  keybind,
});

const floodFill = (dotArt, dotId, color, rowCount, columnCount) => {
  const cellCollection = [];
  let auxId;

  // right
  if ((dotId + 1) % columnCount !== 0) {
    auxId = dotId + 1;
    if (dotArt[auxId] === color) cellCollection.push(auxId);
  }
  // left
  if (dotId % columnCount !== 0) {
    auxId = dotId - 1;
    if (dotArt[auxId] === color) cellCollection.push(auxId);
  }
  // top
  if (dotId >= columnCount) {
    auxId = dotId - columnCount;
    if (dotArt[auxId] === color) cellCollection.push(auxId);
  }
  // bottom
  if (dotId < columnCount * rowCount - columnCount) {
    auxId = dotId + columnCount;
    if (dotArt[auxId] === color) cellCollection.push(auxId);
  }
  return cellCollection;
};

const bucketDotArt = (
  dotArt,
  dotIdx,
  dotColor,
  paletteColor,
  rowCount,
  columnCount,
) => {
  const queue = [dotIdx];
  let newDotArt = dotArt.slice();
  let currentId;
  let adjacents;
  let adjacentId;
  let adjacentColor;

  while (queue.length > 0) {
    currentId = queue.pop();
    newDotArt[currentId] = paletteColor;

    adjacents = floodFill(
      newDotArt,
      currentId,
      dotColor,
      rowCount,
      columnCount,
    );

    for (let i = 0; i < adjacents.length; i++) {
      adjacentId = adjacents[i];
      adjacentColor = dotArt[adjacentId];
      if (queue.indexOf(adjacentId) === -1 && adjacentColor !== paletteColor) {
        queue.push(adjacentId);
      }
    }
  }

  return newDotArt;
};

const dotActionsHandler = (
  state,
  paintTool,
  paintToolState,
  direction,
  rowIdx,
  columnIdx,
) => {
  // selectedPaintTool -> PaintToolState -> rowIdx, columnIdx 체크 순
  if (paintToolState === 'IDLE' || paintToolState !== 'DRAGGING')
    return { ...state };
  switch (paintTool) {
    case DOT:
      if (paintToolState === 'DRAGGING') {
        const color =
          direction === 'LEFT'
            ? state.palettes.leftColor
            : state.palettes.rightColor;

        let fakeDotSet = state.dotArt.present.dot.fakeDotArt.map((arr) =>
          arr.slice(),
        );
        fakeDotSet[rowIdx][columnIdx] = color;

        return {
          ...state,
          dotArt: {
            ...state.dotArt,
            present: {
              ...state.dotArt.present,
              dot: {
                ...state.dotArt.present.dot,
                fakeDotArt: fakeDotSet,
              },
            },
          },
        };
      } else return { ...state };
    case BUCKET:
      if (paintToolState === 'DRAGGING') {
        const paletteColor =
          direction === 'LEFT'
            ? state.palettes.leftColor
            : state.palettes.rightColor;

        const dot = state.dotArt.present.dot;

        const { rowCount, columnCount } = dot;

        // 2차배열 1차배열로 풀어서 넣어줌
        const dotArt = dot.fakeDotArt.reduce((acc, cur) => acc.concat(cur));
        const selectedDotId = rowIdx * columnCount + columnIdx;

        const dotColor = dotArt[selectedDotId];
        const newDotArt = bucketDotArt(
          dotArt,
          selectedDotId,
          dotColor,
          paletteColor,
          rowCount,
          columnCount,
        );

        let returnDotArt = [];
        let idx = 0;
        for (let i = 0; i < rowCount; i++) {
          let row = [];
          for (let j = 0; j < columnCount; j++) {
            row.push(newDotArt[idx]);
            idx++;
          }
          returnDotArt.push(row);
          row = [];
        }

        return {
          ...state,
          dotArt: {
            ...state.dotArt,
            present: {
              ...state.dotArt.present,
              dot: {
                ...state.dotArt.present.dot,
                fakeDotArt: returnDotArt,
              },
            },
          },
        };
      } else {
        return { ...state };
      }
    case PICKER:
      if (paintToolState === 'DRAGGING') {
        const dotColor = state.dotArt.present.dot.fakeDotArt[rowIdx][columnIdx];

        // 색이 없는 셀을 클릭했다면
        if (!dotColor) return { ...state };

        if (direction === 'LEFT') {
          return {
            ...state,
            palettes: {
              ...state.palettes,
              leftColor: dotColor,
            },
          };
        } else {
          return {
            ...state,
            palettes: {
              ...state.palettes,
              rightColor: dotColor,
            },
          };
        }
      } else {
        return { ...state };
      }
    case ERASER:
      if (paintToolState === 'DRAGGING') {
        let fakeDotSet = state.dotArt.present.dot.fakeDotArt.map((arr) =>
          arr.slice(),
        );
        fakeDotSet[rowIdx][columnIdx] = '';

        return {
          ...state,
          dotArt: {
            ...state.dotArt,
            present: {
              ...state.dotArt.present,
              dot: {
                ...state.dotArt.present.dot,
                fakeDotArt: fakeDotSet,
              },
            },
          },
        };
      } else return { ...state };
    case MOVE:
      if (paintToolState === 'DRAGGING') {
        const startX = state.observer.startPosition.x;
        const startY = state.observer.startPosition.y;

        const mouseX = state.observer.mousePosition.x;
        const mouseY = state.observer.mousePosition.y;

        const diffX = mouseX - startX;
        const diffY = mouseY - startY;

        const dot = state.dotArt.present.dot;
        const { columnCount, layerSelectIdx } = dot;
        const dotFrameIdx = dot.layerData[layerSelectIdx].dotFrameIdx;

        let returnDotArt = cloneDotSet(
          dot.dotFrameList[dot.activeIdx].layerList[dotFrameIdx],
        );
        let removedDiffY;

        // 테두리를 넘어간 부분을 반대편에서 나오게 해줌
        // y축 범위를 먼저 좁혀주고 X축 계산 후 y축에 빈 배열을 추가해주는 방식
        if (state.observer.altDown) {
          if (diffY > 0) {
            removedDiffY = returnDotArt.slice(returnDotArt.length - diffY);
            returnDotArt = removedDiffY.concat(
              returnDotArt.slice(0, returnDotArt.length - diffY),
            );
          } else if (diffY < 0) {
            removedDiffY = returnDotArt.slice(0, -diffY);
            returnDotArt = returnDotArt.slice(-diffY).concat(removedDiffY);
          }

          if (diffX > 0) {
            returnDotArt = returnDotArt.map((row) =>
              row.slice(-diffX).concat(row.slice(0, row.length - diffX)),
            );
          } else if (diffX < 0) {
            returnDotArt = returnDotArt.map((row) =>
              row.slice(-diffX).concat(row.slice(0, -diffX)),
            );
          }
        } else {
          // 그냥 이동
          if (diffY > 0) {
            returnDotArt = returnDotArt.slice(0, returnDotArt.length - diffY);
          } else if (diffY < 0) {
            returnDotArt = returnDotArt.slice(-diffY);
          }

          if (diffX > 0) {
            returnDotArt = returnDotArt.map((row) =>
              new Array(diffX)
                .fill('')
                .concat(row.slice(0, row.length - diffX)),
            );
          } else if (diffX < 0) {
            returnDotArt = returnDotArt.map((row) =>
              row.slice(-diffX).concat(new Array(-diffX).fill('')),
            );
          }

          if (diffY > 0) {
            returnDotArt = defaultDotMaker(diffY, columnCount).concat(
              returnDotArt,
            );
          } else if (diffY < 0) {
            returnDotArt = returnDotArt.concat(
              defaultDotMaker(-diffY, columnCount),
            );
          }
        }

        return {
          ...state,
          dotArt: {
            ...state.dotArt,
            present: {
              ...state.dotArt.present,
              dot: {
                ...state.dotArt.present.dot,
                fakeDotArt: returnDotArt,
              },
            },
          },
        };
      } else {
        return { ...state };
      }
    case SAMECOLOR:
      if (paintToolState === 'DRAGGING') {
        const color =
          direction === 'LEFT'
            ? state.palettes.leftColor
            : state.palettes.rightColor;

        let fakeDotSet = state.dotArt.present.dot.fakeDotArt.map((arr) =>
          arr.slice(),
        );

        const selectedDotColor = fakeDotSet[rowIdx][columnIdx];

        fakeDotSet = fakeDotSet.map((dotLine) =>
          dotLine.map((dot) => {
            if (dot === selectedDotColor) {
              return color;
            }
            return dot;
          }),
        );

        return {
          ...state,
          dotArt: {
            ...state.dotArt,
            present: {
              ...state.dotArt.present,
              dot: {
                ...state.dotArt.present.dot,
                fakeDotArt: fakeDotSet,
              },
            },
          },
        };
      } else return { ...state };
    case DITHERING:
      if (paintToolState === 'DRAGGING') {
        let flag = 1;

        if (rowIdx % 2 === 1) flag = flag * -1;
        if (columnIdx % 2 === 1) flag = flag * -1;

        if (direction === 'RIGHT') flag = flag * -1;

        const color =
          flag === 1 ? state.palettes.rightColor : state.palettes.leftColor;

        let fakeDotSet = cloneDotSet(state.dotArt.present.dot.fakeDotArt);
        fakeDotSet[rowIdx][columnIdx] = color;

        return {
          ...state,
          dotArt: {
            ...state.dotArt,
            present: {
              ...state.dotArt.present,
              dot: {
                ...state.dotArt.present.dot,
                fakeDotArt: fakeDotSet,
              },
            },
          },
        };
      } else return { ...state };
    case RECTANGLE:
      if (paintToolState === 'DRAGGING') {
        const color =
          direction === 'LEFT'
            ? state.palettes.leftColor
            : state.palettes.rightColor;

        const dot = state.dotArt.present.dot;

        let fakeDotSet = defaultDotMaker(dot.rowCount, dot.columnCount);

        let startX = state.observer.startPosition.x;
        let startY = state.observer.startPosition.y;

        let mouseX = state.observer.mousePosition.x;
        let mouseY = state.observer.mousePosition.y;

        // 시작점이 마우스위치보다 높으면 반전해준다
        if (startX > mouseX) {
          let tempX = mouseX;
          mouseX = startX;
          startX = tempX;
        }
        if (startY > mouseY) {
          let tempY = mouseY;
          mouseY = startY;
          startY = tempY;
        }

        const diffX = mouseX - startX;

        // 맨 위와 맨 아래
        let colors = [].concat(new Array(diffX + 1).fill(color));

        fakeDotSet[startY] = []
          .concat(fakeDotSet[startY].slice(0, startX))
          .concat(colors)
          .concat(fakeDotSet[startY].slice(mouseX + 1));
        fakeDotSet[mouseY] = []
          .concat(fakeDotSet[mouseY].slice(0, startX))
          .concat(colors)
          .concat(fakeDotSet[mouseY].slice(mouseX + 1));

        // 맨 위 맨 아래 그 사이 (좌 우 1칸씩)
        for (let i = startY + 1; i < mouseY; i++) {
          fakeDotSet[i][startX] = color;
          fakeDotSet[i][mouseX] = color;
        }

        return {
          ...state,
          dotArt: {
            ...state.dotArt,
            present: {
              ...state.dotArt.present,
              dot: {
                ...state.dotArt.present.dot,
                fakeDotArt: fakeDotSet,
              },
            },
          },
        };
      } else return { ...state };
    default:
      return { ...state };
  }
};

const fakeDotArtSetHandle = (state) => {
  const defaultDot = defaultDotMaker(
    state.dotArt.present.dot.rowCount,
    state.dotArt.present.dot.columnCount,
  );
  const { activeIdx, layerSelectIdx, layerData } = state.dotArt.present.dot;
  const layerIdx = layerData[layerSelectIdx].dotFrameIdx;
  switch (state.paintTool.selectedPaintTool) {
    case DOT:
    case RECTANGLE:
    case DITHERING:
      return {
        ...state,
        dotArt: {
          ...state.dotArt,
          present: {
            ...state.dotArt.present,
            dot: {
              ...state.dotArt.present.dot,
              fakeDotArt: defaultDot,
            },
          },
        },
        observer: {
          ...state.observer,
          startPosition: { x: '', y: '' },
        },
      };
    case ERASER:
    case BUCKET:
    case MOVE:
    case SAMECOLOR:
    case PICKER:
      return {
        ...state,
        dotArt: {
          ...state.dotArt,
          present: {
            ...state.dotArt.present,
            dot: {
              ...state.dotArt.present.dot,
              fakeDotArt:
                state.dotArt.present.dot.dotFrameList[activeIdx].layerList[
                  layerIdx
                ],
            },
          },
        },
        observer: {
          ...state.observer,
          startPosition: { x: '', y: '' },
        },
      };
    case PICKER:
      return { ...state };
    default:
      return { ...state };
  }
};

const crossSilceReducer = handleActions(
  {
    // mousePosition startPosition 잡아주기
    [DOT_ACTIONS]: (state, { payload: { rowIdx, columnIdx } }) => {
      let newState = {
        ...state,
        observer: {
          ...state.observer,
          mousePosition: { x: columnIdx, y: rowIdx },
          startPosition:
            state.paintTool.paintState === 'DRAGGING' &&
            state.observer.startPosition.x === '' &&
            state.observer.startPosition.y === ''
              ? { x: columnIdx, y: rowIdx }
              : state.observer.startPosition,
        },
      };
      return dotActionsHandler(
        newState,
        state.paintTool.selectedPaintTool,
        state.paintTool.paintState,
        state.paintTool.direction,
        rowIdx,
        columnIdx,
      );
    },
    // dot의 특정 액션들 후에 fakeDotArt 재설정을 위해 필요함
    [CLEAR_DOT]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [LOAD_DOT_ART]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [NEW_DOT_ART_PROJECT]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [REMOVE_ACTIVE_DOT_ART]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [CHANGE_PAINT_TOOL]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [CLEAR_FAKE_DOT_ART]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [UPDATE_DOT_ART]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [INCREASE_COLUMN]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [DECREASE_COLUMN]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [INCREASE_ROW]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [DECREASE_ROW]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [CHANGE_DOT_AREA]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [CHANGE_ACTIVE_IDX]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [ADD_NEW_DOT_ART]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [REMOVE_LAYER]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [MERGE_LAYER]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [MOVE_UP_LAYER]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [MOVE_DOWN_LAYER]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [SELECT_LAYER_IDX]: (state) => {
      return fakeDotArtSetHandle(state);
    },
    [RENAME_LAYER]: (state) => {
      return fakeDotArtSetHandle(state);
    },
  },
  {},
);

function rootReducer(state, action) {
  const intermediateState = combineReducer(state, action);
  const finalState = crossSilceReducer(intermediateState, action);
  return finalState;
}

// export function* rootSaga() {
//   yield all([authSaga(), userSaga()]);
// }

export default rootReducer;
