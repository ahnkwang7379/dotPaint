import { createAction, handleActions } from 'redux-actions';
import createRequestSage, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as dotArtAPI from '../lib/api/dotArt';
import { takeLatest } from 'redux-saga/effects';

const [
  READ_DOTART,
  READ_DOTART_SUCCESS,
  READ_DOTART_FAILURE,
] = createRequestActionTypes('dotArt/READ_DOTART');
const UNLOAD_DOTART = 'dotArt/UNLOAD_DOTART';

export const readDotArt = createAction(READ_DOTART, (id) => id);
export const unloadDotArt = createAction(UNLOAD_DOTART);

const readDotArtSaga = createRequestSage(READ_DOTART, dotArtAPI.readDotArt);

export function* dotArtViewSaga() {
  yield takeLatest(READ_DOTART, readDotArtSaga);
}

const initialState = {
  dotArt: null,
  error: null,
};

const dotArtView = handleActions(
  {
    [READ_DOTART_SUCCESS]: (state, { payload: dotArt }) => ({
      ...state,
      dotArt,
    }),
    [READ_DOTART_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_DOTART]: () => initialState,
  },
  initialState,
);

export default dotArtView;
