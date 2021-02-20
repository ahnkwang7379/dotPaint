import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as dotArtsAPI from '../lib/api/dotArt';
import { takeLatest } from 'redux-saga/effects';
import { mergeLayersByDotFrameList } from '../util/dotArrayUtil';

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key 값 바꾸기
const [
  WRITE_DOTART_POST,
  WRITE_DOTART_POST_SUCCESS,
  WRITE_DOTART_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_DOTART_POST'); // 포스트 작성
const SET_ORIGINAL_DOTART_POST = 'write/SET_ORIGINAL_DOTART_POST';
const [
  UPDATE_DOTART_POST,
  UPDATE_DOTART_POST_SUCCESS,
  UPDATE_DOTART_POST_FAILURE,
] = createRequestActionTypes('write/UPDATE_DOTART_POST');
const REQUIRED_VALUE_EMPTY_ERROR = 'write/REQUIRED_VALUE_EMPTY_ERROR'; // title, body중 비어있는 값이 생기면
const LOAD_DOTART = 'write/LOAD_DOTART';
const UNLOAD_DOTART = 'write/UNLOAD_DOTART';

export const setOriginalPost = createAction(
  SET_ORIGINAL_DOTART_POST,
  (post) => post,
);
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writeDotArtPost = createAction(
  WRITE_DOTART_POST,
  ({ title, dotArt, tags }) => ({
    title,
    dotArt,
    tags,
  }),
);
export const updateDotArtPost = createAction(
  UPDATE_DOTART_POST,
  ({ id, title, dotArt, tags }) => ({ id, title, dotArt, tags }),
);
export const postRequiredValueCheck = createAction(
  REQUIRED_VALUE_EMPTY_ERROR,
  ({ errorType, errorText }) => ({ errorType, errorText }),
);
export const loadDotArt = createAction(LOAD_DOTART, (dotArt) => dotArt);
export const unloadDotArt = createAction(UNLOAD_DOTART);

// saga 생성
const writeDotArtPostSaga = createRequestSaga(
  WRITE_DOTART_POST,
  dotArtsAPI.saveDotArt,
);
const updateDotArtPostSaga = createRequestSaga(
  UPDATE_DOTART_POST,
  dotArtsAPI.saveDotArt,
);

export function* writeSaga() {
  yield takeLatest(WRITE_DOTART_POST, writeDotArtPostSaga);
  yield takeLatest(UPDATE_DOTART_POST, updateDotArtPostSaga);
}

const initialState = {
  title: '',
  dotArt: '',
  tags: [],
  dotArtPost: null,
  dotArtPostError: null,
  requiredValueEmptyError: {},
  originalDotArtPostId: null,
};

const write = handleActions(
  {
    [INITIALIZE]: () => initialState, // initialState를 넣으면 초기상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    [WRITE_DOTART_POST]: (state) => ({
      ...state,
      // post와 postError를 초기화
      post: null,
      postError: null,
    }),
    // 포스트 작성 성공
    [WRITE_DOTART_POST_SUCCESS]: (state, { payload: dotArt }) => ({
      ...state,
      dotArt,
    }),
    // 포스트 작성 실패
    [WRITE_DOTART_POST_FAILURE]: (state, { payload: dotArtPostError }) => ({
      ...state,
      dotArtPostError,
    }),
    [SET_ORIGINAL_DOTART_POST]: (state, { payload: dotArtPost }) => ({
      ...state,
      title: dotArtPost.title,
      dotArt: dotArtPost.dotArt,
      tags: dotArtPost.tags,
      originalDotArtPostId: dotArtPost._id,
    }),
    [UPDATE_DOTART_POST_SUCCESS]: (state, { payload: dotArt }) => ({
      ...state,
      dotArt,
    }),
    [UPDATE_DOTART_POST_FAILURE]: (state, { payload: dotArtPostError }) => ({
      ...state,
      dotArtPostError,
    }),
    [REQUIRED_VALUE_EMPTY_ERROR]: (
      state,
      { payload: { errorType, errorText } },
    ) => ({
      ...state,
      requiredValueEmptyError: { [errorType]: errorText },
    }),
    [LOAD_DOTART]: (state, { payload: dotArt }) => ({
      ...state,
      // dotArt: {
      //   ...dotArt,
      //   dotFrameList: mergeLayersByDotFrameList(
      //     dotArt.dotFrameList,
      //     dotArt.layerData,
      //   ),
      // },
      dotArt: dotArt,
    }),
    [UNLOAD_DOTART]: (state) => ({ ...state, dotArt: '' }),
  },
  initialState,
);

export default write;
