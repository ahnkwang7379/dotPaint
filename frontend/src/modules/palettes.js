import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { examplePalette } from '../util/json-example';

const REORDER_PALETTES = 'palettes/REDORDER_PALETTES';
const REORDER_PALETTE_CELL = 'palettes/REORDER_PALETTE_CELL';
const MOVE_PALETTE_TO_TRASH_CAN = 'palettes/MOVE_PALETTE_TO_TRASH_CAN';
const MOVE_CELL_TO_TRASH_CAN = 'palettes/MOVE_CELL_TO_TRASH_CAN';
const SELECT_COLOR_CELL = 'palettes/SELECT_COLOR_CELL';

export const reorderPalettes = createAction(
  REORDER_PALETTES,
  ({ startIdx, endIdx }) => ({
    startIdx,
    endIdx,
  }),
);
export const reorderPaletteCell = createAction(
  REORDER_PALETTE_CELL,
  ({ startPaletteId, endPaletteId, startIdx, endIdx }) => ({
    startPaletteId,
    endPaletteId,
    startIdx,
    endIdx,
  }),
);
export const movePaletteToTrashCan = createAction(
  MOVE_PALETTE_TO_TRASH_CAN,
  ({ dragIdx }) => ({ dragIdx }),
);
export const moveCellToTrashCan = createAction(
  MOVE_CELL_TO_TRASH_CAN,
  ({ paletteId, dragIdx }) => ({ paletteId, dragIdx }),
);
export const selectColorCell = createAction(
  SELECT_COLOR_CELL,
  ({ paletteId, selectIdx }) => ({ paletteId, selectIdx }),
);

const initialState = {
  palettes: examplePalette,
  selectColorId: {
    paletteId: examplePalette[0]['id'],
    colorId: 0,
  },
  trashCan: [],
};

const palettes = handleActions(
  {
    [REORDER_PALETTES]: (state, { payload: { startIdx, endIdx } }) =>
      produce(state, (draft) => {
        const [removed] = draft.palettes.splice(startIdx, 1);
        draft.palettes.splice(endIdx, 0, removed);
      }),
    [REORDER_PALETTE_CELL]: (
      state,
      { payload: { startPaletteId, endPaletteId, startIdx, endIdx } },
    ) =>
      produce(state, (draft) => {
        if (startPaletteId === endPaletteId) {
          const paletteIdx = draft.palettes.reduce(
            (acc, cur, idx) => (cur.id === endPaletteId ? idx : acc),
            [],
          );
          const [removed] = draft.palettes[paletteIdx].colors.splice(
            startIdx,
            1,
          );
          draft.palettes[paletteIdx].colors.splice(endIdx, 0, removed);
        } else {
          const color = draft.palettes.reduce(
            (acc, cur) =>
              cur.id === startPaletteId ? cur.colors.splice(startIdx, 1) : acc,
            [],
          );
          draft.palettes.map((palette) =>
            palette.id === endPaletteId
              ? palette.colors.splice(endIdx, 0, color)
              : '',
          );
        }
      }),
    [MOVE_PALETTE_TO_TRASH_CAN]: (state, { payload: { dragIdx } }) =>
      produce(state, (draft) => {
        const removed = draft.palettes[dragIdx].colors.splice(0);
        removed.map((color) => draft.trashCan.push(color));

        // if (draft.palettes[dragIdx].id === draft.selectColorId.paletteId) {
        //   draft.selectColorId = {

        //   }
        // };
      }),
    [MOVE_CELL_TO_TRASH_CAN]: (state, { payload: { paletteId, dragIdx } }) =>
      produce(state, (draft) => {
        const color = draft.palettes.reduce(
          (acc, cur) =>
            cur.id === paletteId ? cur.colors.splice(dragIdx, 1) : acc,
          [],
        );
        draft.trashCan.push(color[0]);
      }),
    [SELECT_COLOR_CELL]: (state, { payload: { paletteId, selectIdx } }) =>
      produce(state, (draft) => {
        draft.selectColorId = {
          paletteId: paletteId,
          colorId: selectIdx,
        };
      }),
  },
  initialState,
);

export default palettes;
