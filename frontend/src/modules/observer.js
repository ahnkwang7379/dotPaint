import { createAction, handleActions } from 'redux-actions';

const CHANGE_TYPING_STATE = 'observer/CHANGE_TYPING_STATE';
const MOUSE_LEAVES_PAINT_AREA = 'observer/MOUSE_LEAVES_PAINT_AREA';
const CHANGE_DOT_BORDER_SIZE = 'observer/CHANGE_DOT_BORDER_SIZE';
const CHANGE_DOT_BORDER_COLOR = 'observer/CHANGE_DOT_BORDER_COLOR';
const INCREASE_DOT_SIZE = 'observer/INCREASE_DOT_SIZE';
const DECREASE_DOT_SIZE = 'observer/DECREASE_DOT_SIZE';
const CHANGE_DOT_SIZE = 'observer/CHANGE_DOT_SIZE';
const CHANGE_BACKGROUND_COLOR = 'observer/CHANGE_BACKGROUND_COLOR';
const ALT_DOWN = 'observer/ALT_DOWN';
const SHIFT_DOWN = 'observer/SHIFT_DOWN';
const LOAD_DATA = 'observer/LOAD_DATA';

export const changeTypingState = createAction(
  CHANGE_TYPING_STATE,
  (isTyping) => isTyping,
);
export const mouseLeavesPaintArea = createAction(MOUSE_LEAVES_PAINT_AREA);

export const changeDotBorderSize = createAction(
  CHANGE_DOT_BORDER_SIZE,
  (size) => size,
);
export const changeDotBorderColor = createAction(
  CHANGE_DOT_BORDER_COLOR,
  (color) => color,
);
export const increaseDotSize = createAction(INCREASE_DOT_SIZE);
export const decreaseDotSize = createAction(DECREASE_DOT_SIZE);
export const changeDotSize = createAction(
  CHANGE_DOT_SIZE,
  (dotSize) => dotSize,
);
export const changeBackgroundColor = createAction(
  CHANGE_BACKGROUND_COLOR,
  (color) => color,
);
export const altDown = createAction(ALT_DOWN, (bool) => bool);
export const shiftDown = createAction(SHIFT_DOWN, (bool) => bool);
export const loadData = createAction(LOAD_DATA, (observerData) => observerData);

const initialState = {
  isTyping: false,
  mousePosition: { x: '', y: '' },
  startPosition: { x: '', y: '' },
  dotSize: 32,
  dotBorder: { size: 0.5, color: '#d0d0fc' },
  backgroundColor: '#777777',
  altDown: false,
  shiftDown: false,
};

const observer = handleActions(
  {
    [CHANGE_TYPING_STATE]: (state, { payload: isTyping }) => ({
      ...state,
      isTyping: isTyping,
    }),
    [MOUSE_LEAVES_PAINT_AREA]: (state) => ({
      ...state,
      mousePosition: { x: '', y: '' },
    }),
    [CHANGE_DOT_BORDER_SIZE]: (state, { payload: size }) => ({
      ...state,
      dotBorder: {
        ...state.dotBorder,
        size: size,
      },
    }),
    [CHANGE_DOT_BORDER_COLOR]: (state, { payload: color }) => ({
      ...state,
      dotBorder: {
        ...state.dotBorder,
        color: color,
      },
    }),
    [INCREASE_DOT_SIZE]: (state) => ({
      ...state,
      dotSize: state.dotSize < 101 ? state.dotSize + 4 : state.dotSize,
    }),
    [DECREASE_DOT_SIZE]: (state) => ({
      ...state,
      dotSize: state.dotSize > 4 ? state.dotSize - 4 : state.dotSize,
    }),
    [CHANGE_DOT_SIZE]: (state, { payload: dotSize }) => ({
      ...state,
      dotSize: dotSize,
    }),
    [CHANGE_BACKGROUND_COLOR]: (state, { payload: color }) => ({
      ...state,
      backgroundColor: color,
    }),
    [ALT_DOWN]: (state, { payload: bool }) => ({
      ...state,
      altDown: bool,
    }),
    [SHIFT_DOWN]: (state, { payload: bool }) => ({
      ...state,
      shiftDown: bool,
    }),
    [LOAD_DATA]: (state, { payload: observerData }) => ({
      ...state,
      ...observerData,
    }),
  },
  initialState,
);

export default observer;
