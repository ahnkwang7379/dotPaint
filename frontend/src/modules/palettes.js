import { createAction, handleActions } from 'redux-actions';
import {
  getPalettesDataFromStorage,
  initialStoragePalette,
  getPaletteNames,
} from '../util/localStorage';

const LOAD_PALETTES = 'palettes/LOAD_PALETTES';
const SELECT_LEFT_COLOR = 'palettes/SELECT_LEFT_COLOR';
const SELECT_RIGHT_COLOR = 'palettes/SELECT_RIGHT_COLOR';
const SWAP_LEFT_RIGHT_COLOR = 'palettes/SWAP_LEFT_RIGHT_COLOR';
const MOVE_UP_PALETTE_SELECT_LINE = 'palettes/MOVE_UP_PALETTE_SELECT_LINE';
const MOVE_DOWN_PALETTE_SELECT_LINE = 'palettes/MOVE_DOWN_PALETTE_SELECT_LINE';
const SELECT_COLOR_CELL_SHORTCUT = 'palettes/SELECT_COLOR_CELL_SHORTCUT';

export const loadPalettes = createAction(
  LOAD_PALETTES,
  (loadedData) => loadedData,
);
export const selectLeftColor = createAction(
  SELECT_LEFT_COLOR,
  (color) => color,
);
export const selectRightColor = createAction(
  SELECT_RIGHT_COLOR,
  (color) => color,
);
export const swapLeftRightColor = createAction(SWAP_LEFT_RIGHT_COLOR);
export const moveUpPaletteSelectLine = createAction(
  MOVE_UP_PALETTE_SELECT_LINE,
);
export const moveDownPaletteSelectLine = createAction(
  MOVE_DOWN_PALETTE_SELECT_LINE,
);
export const selectColorCellShortcut = createAction(
  SELECT_COLOR_CELL_SHORTCUT,
  (idx) => idx,
);

const initialPalette = () => {
  let loadedPalette = getPalettesDataFromStorage(localStorage);

  if (!loadedPalette || !loadedPalette.palettes) {
    initialStoragePalette(localStorage);
    loadedPalette = getPalettesDataFromStorage(localStorage);
  }

  return loadedPalette.palettes[loadedPalette.current].palette;
};

const initialState = {
  palettes: initialPalette(),
  paletteNames: getPaletteNames(localStorage),
  selectPaletteId: '',
  selectPaletteLine: 0,
  leftColor: '#000000',
  rightColor: '#ffffff',
};

const palettes = handleActions(
  {
    [LOAD_PALETTES]: (state, { payload: loadedData }) => ({
      ...state,
      palettes: [...loadedData.palette],
      selectPaletteId: loadedData.id,
      paletteNames: getPaletteNames(localStorage),
      selectPaletteLine: 0,
    }),
    [SELECT_LEFT_COLOR]: (state, { payload: { color } }) => ({
      ...state,
      leftColor: color,
    }),
    [SELECT_RIGHT_COLOR]: (state, { payload: { color } }) => ({
      ...state,
      rightColor: color,
    }),
    [SWAP_LEFT_RIGHT_COLOR]: (state) => ({
      ...state,
      leftColor: state.rightColor,
      rightColor: state.leftColor,
    }),
    [MOVE_UP_PALETTE_SELECT_LINE]: (state) => ({
      ...state,
      selectPaletteLine: Math.max(state.selectPaletteLine - 1, 0),
    }),
    [MOVE_DOWN_PALETTE_SELECT_LINE]: (state) => ({
      ...state,
      selectPaletteLine: Math.min(
        state.selectPaletteLine + 1,
        state.palettes.length - 1,
      ),
    }),
    [SELECT_COLOR_CELL_SHORTCUT]: (state, { payload: idx }) => ({
      ...state,
      leftColor: state.palettes[state.selectPaletteLine].colors[idx]
        ? state.palettes[state.selectPaletteLine].colors[idx]
        : state.leftColor,
    }),
  },
  initialState,
);

export default palettes;
