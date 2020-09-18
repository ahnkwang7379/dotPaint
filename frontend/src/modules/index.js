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
  auth: auth,
  user,
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
      if (paintToolState === 'DRAGGING') {
        const paletteId = state.palette.selectColorId.paletteId;
        const colorId = state.palette.selectColorId.colorId;
        const palette = state.palette.paletteSet.filter(
          (val) => val['id'] === paletteId,
        );
        const color = palette[0]['colors'][colorId];
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
      } else return { ...state };
    case BUCKET: // 아직...
      return { ...state };
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
