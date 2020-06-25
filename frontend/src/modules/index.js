import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import dot from './dot';
import colorPalette from './colorPalette';
import paintTool from './paintTool';

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
});

const fillDotCheck = (state, rowIdx, columnIdx, color) => {
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
};

const crossSilceReducer = handleActions(
  {
    [DOT_ACTIONS]: (state, { payload: { rowIdx, columnIdx } }) =>
      state.paintTool.paintState !== 'DRAGGING'
        ? { ...state }
        : fillDotCheck(
            state,
            rowIdx,
            columnIdx,
            state.colorPalette.paletteSet[state.colorPalette.selectedId],
          ),
  },
  {},
);

function rootReducer(state, action) {
  const intermediateState = combineReducer(state, action);
  const finalState = crossSilceReducer(intermediateState, action);
  return finalState;
}

export default rootReducer;
