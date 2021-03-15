import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import dot from './dot';
import paintTool from './paintTool';
import palettes from './palettes';
import dialog from './dialog';
import observer from './observer';
import keybind from './keybind';
import dotArts, { dotArtsSaga } from './dotArts';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import loading from './loading';
import undoable, { includeAction } from 'redux-undo';
import {
  undoableIncludeActions,
  dotActionTypes,
  dotActionsHandler,
  fakeDotArtSetHandle,
} from './reducerUtil';

const DOT_ACTIONS = 'index/DOT_ACTIONS';
const CLEAR_FAKE_DOT_ART = 'index/CLEAR_FAKE_DOT_ART';

export const dotActions = createAction(
  DOT_ACTIONS,
  ({ rowIdx, columnIdx, altDown }) => ({
    rowIdx,
    columnIdx,
    altDown,
  }),
);
// redo, undo 이후 fackDotArt에 남아있는 데이터를 지워주기 위한 액션
export const clearFakeDotArt = createAction(CLEAR_FAKE_DOT_ART);

// undo redo 기능을 활용할 부분만 따로 combine
const combineDotArt = combineReducers({
  dot,
});

const combineReducer = combineReducers({
  dotArt: undoable(combineDotArt, {
    limit: 100,
    ignoreInitialState: true,
    filter: includeAction(undoableIncludeActions),
  }),
  palettes,
  paintTool,
  dialog,
  observer,
  keybind,
  dotArts,
  loading,
  auth,
  user,
  write,
});

const crossSilceReducer = (state, action) => {
  if (action.type === DOT_ACTIONS) {
    const { columnIdx, rowIdx, altDown } = action.payload;
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
      altDown,
    );
  }
  if (
    dotActionTypes.includes(action.type) ||
    action.type === CLEAR_FAKE_DOT_ART
  ) {
    return fakeDotArtSetHandle(state);
  } else {
    return state;
  }
};

function rootReducer(state, action) {
  const intermediateState = combineReducer(state, action);
  const finalState = crossSilceReducer(intermediateState, action);
  return finalState;
}

export function* rootSaga() {
  yield all([dotArtsSaga(), authSaga(), userSaga(), writeSaga()]);
}

export default rootReducer;
