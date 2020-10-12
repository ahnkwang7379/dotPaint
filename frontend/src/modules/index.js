import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import dot from './dot';
import colorPalette from './colorPalette';
import palette from './palette';
import paintTool, { DOT, BUCKET, PICKER, ERASER } from './paintTool';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
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
  palette: palette,
});

const combineReducer = combineReducers({
  dotArt: undoable(combineDotArt, {
    limit: 100,
    debug: true,
    ignoreInitialState: true,
  }),
  colorPalette: colorPalette,
  paintTool: paintTool,
  auth: auth,
  user,
  loading,
});

// const combineReducer = (state, action) => ({
//   dotArt: undoable(pipeReducers([dot, palette])(state, action), {
//     debug: true,
//     ignoreInitialState: true,
//   }),
//   colorPalette: colorPalette,
//   paintTool: paintTool,
//   auth: auth,
//   user,
//   loading,
// });

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
  selectedDotId,
  dotColor,
  paletteColor,
  rowCount,
  columnCount,
) => {
  const queue = [selectedDotId];
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
  rowIdx,
  columnIdx,
) => {
  // selectedPaintTool -> PaintToolState -> rowIdx, columnIdx 체크 순
  if (paintToolState === 'IDLE') return { ...state };
  switch (paintTool) {
    case DOT:
      if (paintToolState === 'DRAGGING') {
        const palette = state.dotArt.present.palette;
        const { paletteId, colorId } = palette.selectColorId;

        // 선택된 색상 추출
        const color = palette.paletteSet.reduce(
          (acc, palette) =>
            palette['id'] === paletteId ? palette['colors'][colorId] : acc,
          [],
        );

        const activeIdx = state.dotArt.present.dot.activeIdx;
        return produce(state, (draft) => {
          draft.dotArt.present.dot.dotList[activeIdx].dot[rowIdx][
            columnIdx
          ] = color;
        });
      } else return { ...state };
    case BUCKET:
      if (paintToolState === 'DRAGGING') {
        const palette = state.dotArt.present.palette;

        const { paletteId, colorId } = palette.selectColorId;
        const paletteColor = palette.paletteSet.reduce(
          (acc, palette) =>
            palette['id'] === paletteId ? palette['colors'][colorId] : acc,
          [],
        );

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
        // 색이 없는 셀을 클릭했다면
        if (!dotColor) return { ...state };
        else {
          const palette = state.dotArt.present.palette;
          const { paletteId, colorId } = palette.selectColorId;
          return produce(state, (draft) => {
            draft.dotArt.present.palette.paletteSet.reduce(
              (acc, cur) =>
                cur['id'] === paletteId
                  ? acc.concat((cur['colors'][colorId] = dotColor))
                  : acc.concat(cur),
              [],
            );
          });
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
