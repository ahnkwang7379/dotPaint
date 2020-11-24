import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import dot from './dot';
import paintTool, { DOT, BUCKET, PICKER, ERASER } from './paintTool';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import palettes from './palettes';
import dialog from './dialog';
import typing from './typing';
import { produce } from 'immer';
import undoable from 'redux-undo';

export const DOT_ACTIONS = 'index/DOT_ACTIONS';

export const dotActions = createAction(
  DOT_ACTIONS,
  ({ rowIdx, columnIdx }) => ({
    rowIdx,
    columnIdx,
  }),
);

// undo redo 기능을 활용할 부분만 따로 combine
const combineDotArt = combineReducers({
  dot: dot,
  // palettes: palettes,
});

const combineReducer = combineReducers({
  dotArt: undoable(combineDotArt, {
    limit: 100,
    // debug: true,
    ignoreInitialState: true,
  }),
  palettes,
  paintTool,
  auth,
  dialog,
  user,
  loading,
  typing,
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

const dotActionsHandler = (
  state,
  paintTool,
  paintToolState,
  direction,
  rowIdx,
  columnIdx,
) => {
  // selectedPaintTool -> PaintToolState -> rowIdx, columnIdx 체크 순
  if (paintToolState === 'IDLE') return { ...state };
  switch (paintTool) {
    case DOT:
      if (paintToolState === 'DRAGGING') {
        const color =
          direction === 'LEFT'
            ? state.palettes.leftColor
            : state.palettes.rightColor;

        const activeIdx = state.dotArt.present.dot.activeIdx;
        return produce(state, (draft) => {
          draft.dotArt.present.dot.dotList[activeIdx].dot[rowIdx][
            columnIdx
          ] = color;
        });
      } else return { ...state };
    case BUCKET:
      if (paintToolState === 'DRAGGING') {
        const paletteColor =
          direction === 'LEFT'
            ? state.palettes.leftColor
            : state.palettes.rightColor;

        const dot = state.dotArt.present.dot;
        const activeIdx = dot.activeIdx;

        const { rowCount, columnCount } = dot;
        // 2차배열 1차배열로 풀어서 넣어줌
        const dotArt = dot.dotList[activeIdx].dot.reduce((acc, cur) =>
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
        return produce(state, (draft) => {
          draft.dotArt.present.dot.dotList[activeIdx].dot = returnDotArt;
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
        const activeIdx = state.dotArt.present.dot.activeIdx;
        return produce(state, (draft) => {
          draft.dotArt.present.dot.dotList[activeIdx].dot[rowIdx][columnIdx] =
            '';
        });
      }
      return { ...state };
    default:
      return { ...state };
  }
};

const crossSilceReducer = handleActions(
  {
    [DOT_ACTIONS]: (state, { payload: { rowIdx, columnIdx } }) =>
      dotActionsHandler(
        state,
        state.paintTool.selectedPaintTool,
        state.paintTool.paintState,
        state.paintTool.direction,
        rowIdx,
        columnIdx,
      ),
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
