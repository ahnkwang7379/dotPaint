import { createAction, handleActions } from 'redux-actions';

const CHANGE_TYPING_STATE = 'typing/CHANGE_TYPING_STATE';

export const changeTypingState = createAction(
  CHANGE_TYPING_STATE,
  (isTyping) => isTyping,
);

const initialState = {
  isTyping: false,
};

const typing = handleActions(
  {
    [CHANGE_TYPING_STATE]: (state, { payload: isTyping }) => ({
      ...state,
      isTyping: isTyping,
    }),
  },
  initialState,
);

export default typing;
