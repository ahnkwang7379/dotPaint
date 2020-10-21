import { createAction, handleActions } from 'redux-actions';

const CHANGE_TYPE_AND_OPEN = 'dialog/CHANGE_TYPE_AND_OPEN';
const CLOSE_DIALOG = 'dialog/CLOSE_DIALOG';

export const changeTypeAndOpen = createAction(
  CHANGE_TYPE_AND_OPEN,
  (dialogType) => dialogType,
);
export const closeDialog = createAction(CLOSE_DIALOG);

const initialState = {
  dialogType: '',
  open: false,
};

const dialog = handleActions(
  {
    [CHANGE_TYPE_AND_OPEN]: (state, { payload: dialogType }) => ({
      ...state,
      dialogType: dialogType,
      open: true,
    }),
    [CLOSE_DIALOG]: (state) => ({
      ...state,
      open: false,
    }),
  },
  initialState,
);

export default dialog;
