import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import dot, { dotSaga } from './dot';
import colorPalette from './colorPalette';
import palette from './palette';
import paintTool, { DOT, BUCKET, PICKER, ERASER } from './paintTool';
import loading from './loading';

const DOT_ACTIONS = 'index/DOT_ACTIONS';

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
  loading,
});

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
      const color =
        state.colorPalette.paletteSet[state.colorPalette.selectedId];
      if (paintToolState === 'DRAGGING') {
        return {
          ...state,
          dot: {
            ...state.dot,
            dotSet: state.dot.dotSet.map((dotLine, lineIdx) =>
              lineIdx !== rowIdx
                ? dotLine
                : dotLine.map((originColor, idx) =>
                    idx !== columnIdx ? originColor : color,
                  ),
            ),
          },
        };
      }
      return { ...state };
    case BUCKET: // 아직...
      return { ...state };
    case PICKER:
      if (paintToolState === 'DRAGGING') {
        const color = state.dot.dotSet[rowIdx][columnIdx];
        return {
          ...state,
          colorPalette: {
            ...state.colorPalette,
            paletteSet: state.colorPalette.paletteSet.map((originColor, idx) =>
              idx === state.colorPalette.selectedId ? color : originColor,
            ),
          },
        };
      }
      return { ...state };
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
  yield all([dotSaga()]);
}

export default rootReducer;
