import { createAction, handleActions } from 'redux-actions';

const OPEN_SNACKBAR = 'snackbar/OPEN_SNACKBAR';

export const openSnackbar = createAction(OPEN_SNACKBAR, (message, type) => ({
  message,
  type,
}));

const initialState = {
  open: true,
  message: 'Snack Bar!',
  type: 'info',
};

const snackbar = handleActions(
  {
    [OPEN_SNACKBAR]: (state, { payload: { message, type } }) => ({
      ...state,
      open: true,
      message: message,
      type: type,
    }),
  },
  [initialState],
);

export default snackbar;
