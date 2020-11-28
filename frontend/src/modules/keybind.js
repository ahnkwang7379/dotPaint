import { createAction, handleActions } from 'redux-actions';
import { initShortcut } from '../util/shortcutData';

const CHANGE_KEY_BIND = 'keybind/CHANGE_KEY_BIND';

export const changeKeyBind = createAction(
  CHANGE_KEY_BIND,
  ({ action, key }) => ({
    action,
    key,
  }),
);

const initialState = { ...initShortcut };

const keybind = handleActions(
  {
    [CHANGE_KEY_BIND]: (state) => ({ ...state }),
  },
  initialState,
);

export default keybind;
