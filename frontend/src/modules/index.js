import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
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
} from './paintTool';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import palettes from './palettes';
import dialog from './dialog';
import observer from './observer';
import keybind from './keybind';
import { produce } from 'immer';
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
    // filter: excludeAction(DOT_ACTIONS),
  }),
  palettes,
  paintTool,
  auth,
  dialog,
  user,
  loading,
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
    currentId = queue.shift();
    newDotArt = produce(newDotArt, (draft) => {
      draft[currentId] = paletteColor;
    });
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

const defaultDotMaker = (row, column) => {
  return new Array(row).fill().map(() => new Array(column).fill(''));
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

        return produce(state, (draft) => {
          draft.dotArt.present.dot.fakeDotArt[rowIdx][columnIdx] = color;
        });
      } else return { ...state };
    case BUCKET:
      if (paintToolState === 'DRAGGING') {
        const paletteColor =
          direction === 'LEFT'
            ? state.palettes.leftColor
            : state.palettes.rightColor;

        const dot = state.dotArt.present.dot;
        // const activeIdx = dot.activeIdx;

        const { rowCount, columnCount } = dot;
        // 2차배열 1차배열로 풀어서 넣어줌
        // const dotArt = dot.dotList[activeIdx].dot.reduce((acc, cur) =>
        //   acc.concat(cur),
        // );
        const dotArt = state.dotArt.present.dot.fakeDotArt.reduce((acc, cur) =>
          acc.concat(cur),
        );
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
        // return produce(state, (draft) => {
        //   draft.dotArt.present.dot.dotList[activeIdx].dot = returnDotArt;
        // });
        return produce(state, (draft) => {
          draft.dotArt.present.dot.fakeDotArt = returnDotArt;
        });
      } else {
        return { ...state };
      }
    case PICKER:
      if (paintToolState === 'DRAGGING') {
        const dot = state.dotArt.present.dot;
        const activeIdx = dot.activeIdx;
        const dotColor = dot.dotList[activeIdx].dot[rowIdx][columnIdx];
        const selectPaletteId = state.palettes.selectColorId.paletteId;
        const selectColorId = state.palettes.selectColorId.colorId;

        // 색이 없는 셀을 클릭했다면
        if (!dotColor) return { ...state };

        // 해당 색상이 이미 palette안에 있는지 순회
        const palettes = state.palettes.palettes;
        let existedColor = '';
        palettes.map((palette) =>
          palette.colors.map((color, colorIdx) =>
            color === dotColor
              ? (existedColor = { paletteId: palette.id, colorId: colorIdx })
              : '',
          ),
        );
        if (existedColor) {
          return produce(state, (draft) => {
            draft.palettes.selectColorId = existedColor;
            direction === 'LEFT'
              ? (draft.palettes.leftColor = dotColor)
              : (draft.palettes.rightColor = dotColor);
          });
        } else {
          if (
            state.palettes.trashCan.filter((color) => color === dotColor)
              .length > 0
          ) {
            return produce(state, (draft) => {
              direction === 'LEFT'
                ? (draft.palettes.leftColor = dotColor)
                : (draft.palettes.rightColor = dotColor);
            });
          } else {
            return produce(state, (draft) => {
              direction === 'LEFT'
                ? (draft.palettes.leftColor = dotColor)
                : (draft.palettes.rightColor = dotColor);

              draft.palettes.palettes.map((palette) => {
                if (palette.id === selectPaletteId) {
                  draft.palettes.trashCan.unshift(
                    palette.colors[selectColorId],
                  );
                  palette.colors[selectColorId] = dotColor;
                }
              });
            });
          }
        }
      } else {
        return { ...state };
      }
    case ERASER:
      if (paintToolState === 'DRAGGING') {
        return produce(state, (draft) => {
          draft.dotArt.present.dot.fakeDotArt[rowIdx][columnIdx] = '';
        });
      }
    case MOVE:
      if (paintToolState === 'DRAGGING') {
        const startX = state.observer.startPosition.x;
        const startY = state.observer.startPosition.y;

        const mouseX = state.observer.mousePosition.x;
        const mouseY = state.observer.mousePosition.y;

        const diffX = mouseX - startX;
        const diffY = mouseY - startY;

        const dot = state.dotArt.present.dot;
        const { columnCount } = dot;

        let returnDotArt = dot.dotList[dot.activeIdx].dot.slice();
        let removedDiffY;

        // 그냥 이동
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
          // 테두리를 넘어간 부분을 반대편에서 나오게 해줌
          // y축 범위를 먼저 좁혀주고 X축 계산 후 y축에 빈 배열을 추가해주는 방식
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
      }
    default:
      return { ...state };
  }
};

const fakeDotArtSetHandle = (state) => {
  switch (state.paintTool.selectedPaintTool) {
    case DOT:
      return produce(state, (draft) => {
        draft.dotArt.present.dot.fakeDotArt = defaultDotMaker(
          draft.dotArt.present.dot.rowCount,
          draft.dotArt.present.dot.columnCount,
        );
        draft.observer.startPosition = { x: '', y: '' };
      });
    case BUCKET:
    case ERASER:
    case MOVE:
      return produce(state, (draft) => {
        draft.dotArt.present.dot.fakeDotArt =
          draft.dotArt.present.dot.dotList[
            draft.dotArt.present.dot.activeIdx
          ].dot;
        draft.observer.startPosition = { x: '', y: '' };
      });
    case PICKER:
      return produce(state, (draft) => {});
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
  },
  {},
);

function rootReducer(state, action) {
  const intermediateState = combineReducer(state, action);
  const finalState = crossSilceReducer(intermediateState, action);
  return finalState;
}

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
