import { createAction, handleActions } from 'redux-actions';
import createRequestSage, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as dotArtAPI from '../lib/api/dotArt';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_DOTARTS,
  LIST_DOTARTS_SUCCESS,
  LIST_DOTARTS_FAILURE,
] = createRequestActionTypes('dotArts/LIST_DOTARTS');
const [
  READ_DOTART,
  READ_DOTART_SUCCESS,
  READ_DOTART_FAILURE,
] = createRequestActionTypes('dotArts/READ_DOTART');
const UNLOAD_DOTART = 'dotArts/UNLOAD_DOTART';

export const listDotArts = createAction(LIST_DOTARTS, ({ tag, page }) => ({
  tag,
  page,
}));
export const readDotArt = createAction(READ_DOTART, (id) => id);
export const unloadDotArt = createAction(UNLOAD_DOTART);

const listDotArtsSaga = createRequestSage(
  LIST_DOTARTS,
  dotArtAPI.getDotArtsList,
);
const readDotArtSaga = createRequestSage(READ_DOTART, dotArtAPI.readDotArt);

export function* dotArtsSaga() {
  yield takeLatest(LIST_DOTARTS, listDotArtsSaga);
  yield takeLatest(READ_DOTART, readDotArtSaga);
}

const initialState = {
  dotArts: null,
  dotArt: null,
  error: null,
  lastPage: 1,
};

const dotArts = handleActions(
  {
    [LIST_DOTARTS_SUCCESS]: (state, { payload: dotArts, meta: response }) => ({
      ...state,
      dotArts,
      lastPage: parseInt(response.headers['last-page'], 10),
    }),
    [LIST_DOTARTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [READ_DOTART_SUCCESS]: (state, { payload: dotArt }) => ({
      ...state,
      dotArt,
    }),
    [READ_DOTART_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_DOTART]: (state) => ({
      ...state,
      dotArt: null,
      error: null,
    }),
  },
  initialState,
);

export default dotArts;
