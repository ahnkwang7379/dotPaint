import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import dot, { dotSaga } from './dot';
import colorPalette from './colorPalette';
import palette from './palette';
import paintTool, { DOT, BUCKET, PICKER, ERASER } from './paintTool';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import { produce } from 'immer';

export const DOT_ACTIONS = 'index/DOT_ACTIONS';

export const dotActions = createAction(
  DOT_ACTIONS,
  ({ rowIdx, columnIdx }) => ({
    rowIdx,
    columnIdx,
  }),
);

const combineReducer = combineReducers({
  dot: dot,
  colorPalette: colorPalette,
  paintTool: paintTool,
  palette: palette,
  auth: auth,
  user,
  loading,
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
  switch (paintTool) {
    case DOT:
      if (paintToolState === 'DRAGGING') {
        const paletteId = state.palette.selectColorId.paletteId;
        const colorId = state.palette.selectColorId.colorId;
        const palette = state.palette.paletteSet.filter(
          (val) => val['id'] === paletteId,
        );
        const color = palette[0]['colors'][colorId];
        return produce(state, (draft) => {
          draft.dot.dotSet[rowIdx][columnIdx] = color;
        });
      } else return { ...state };
    case BUCKET:
      if (paintToolState === 'DRAGGING') {
        const paletteId = state.palette.selectColorId.paletteId;
        const colorId = state.palette.selectColorId.colorId;
        const palette = state.palette.paletteSet.filter(
          (val) => val['id'] === paletteId,
        );
        const paletteColor = palette[0]['colors'][colorId];
        const rowCount = state.dot.row;
        const columnCount = state.dot.column;
        const dotArt = state.dot.dotSet.reduce((acc, cur) => acc.concat(cur));
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
          draft.dot.dotSet = returnDotArt;
        });
      } else {
        return { ...state };
      }
    case PICKER:
      if (paintToolState === 'DRAGGING') {
        const color = state.dot.dotSet[rowIdx][columnIdx];
        // 색이 없는 셀을 클릭했다면
        if (!color) return { ...state };
        else
          return produce(state, (draft) => {
            const paletteId = draft.palette.selectColorId.paletteId;
            const colorId = draft.palette.selectColorId.colorId;
            const palette = draft.palette.paletteSet.find(
              (palette) => palette['id'] === paletteId,
            );
            palette['colors'][colorId] = color;
          });
      } else {
        return { ...state };
      }
    case ERASER:
      if (paintToolState === 'DRAGGING') {
        return {
          ...state,
          dot: {
            ...state.dot,
            dotSet: state.dot.dotSet.map((dotLine, lineIdx) =>
              lineIdx !== rowIdx
                ? dotLine
                : dotLine.map((originColor, idx) =>
                    idx !== columnIdx ? originColor : '',
                  ),
            ),
          },
        };
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
  yield all([dotSaga(), authSaga(), userSaga()]);
}

export default rootReducer;
