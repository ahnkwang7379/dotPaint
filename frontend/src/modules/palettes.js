import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import shortid from 'shortid';

const DEFAULT_PALETTE = [
  {
    id: shortid.generate(),
    // id: 'p1',
    nick: 'Forest',
    colors: [
      '#393b2d',
      '#75651a',
      '#775b1c',
      '#788260',
      '#bab887',
      '#dfd6c5',
      '#e6e6e6',
      '#eee6d1',
      '#f8eacf',
    ],
  },
  {
    id: shortid.generate(),
    // id: 'p2',
    nick: 'Ocean',
    colors: ['#4b73a4', '#667883', '#937e6a', '#b89d80', '#dadbd6', '#faf9fb'],
  },
  {
    id: shortid.generate(),
    // id: 'p3',
    nick: 'City',
    colors: ['#03070a', '#374552', '#3c8999', '#959ea7', '#9ccce3', '#b8cde0'],
  },
  {
    id: shortid.generate(),
    // id: 'p4',
    nick: 'Robot',
    colors: [
      '#171516',
      '#303030',
      '#553634',
      '#92898c',
      '#a70d01',
      '#c4c2c3',
      '#d12a21',
    ],
  },
  {
    id: shortid.generate(),
    // id: 'p5',
    nick: 'Lizard',
    colors: [
      '#1d0e0b',
      '#393e54',
      '#5e260d',
      '#605d66',
      '#98894e',
      '#9f7441',
      '#dde2ff',
      '#eaac73',
    ],
  },
];

const REORDER_PALETTES = 'palettes/REDORDER_PALETTES';
const REORDER_PALETTE_CELL = 'palettes/REORDER_PALETTE_CELL';
const MOVE_PALETTE_TO_TRASH_CAN = 'palettes/MOVE_PALETTE_TO_TRASH_CAN';
const MOVE_CELL_TO_TRASH_CAN = 'palettes/MOVE_CELL_TO_TRASH_CAN';

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
  ({ selectIdx }) => ({ selectIdx }),
);
export const moveCellToTrashCan = createAction(
  MOVE_CELL_TO_TRASH_CAN,
  ({ paletteId, selectIdx }) => ({ paletteId, selectIdx }),
);

const initialState = {
  palettes: DEFAULT_PALETTE,
  trashCan: [],
};

const palettes = handleActions(
  {
    [REORDER_PALETTES]: (state, { payload: { startIdx, endIdx } }) =>
      produce(state, (draft) => {
        const [removed] = draft.palettes.splice(startIdx, 1);
        draft.palettes.splice(endIdx, 0, removed);
      }),
    // [REORDER_PALETTE_CELL]: (
    //   state,
    //   { payload: { paletteIdx, startIdx, endIdx } },
    // ) =>
    //   produce(state, (draft) => {
    //     const [removed] = draft.palettes[paletteIdx].splice(startIdx, 1);
    //     draft.palettes[paletteIdx].splice(endIdx, 0, removed);
    //   }),
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
    [MOVE_PALETTE_TO_TRASH_CAN]: (state, { payload: { selectIdx } }) =>
      produce(state, (draft) => {
        const removed = draft.palettes.splice(selectIdx, 1);
        removed[0].colors.map((color) => draft.trashCan.push(color));
      }),
    [MOVE_CELL_TO_TRASH_CAN]: (state, { payload: { paletteId, selectIdx } }) =>
      produce(state, (draft) => {
        const color = draft.palettes.reduce(
          (acc, cur) =>
            cur.id === paletteId ? cur.colors.splice(selectIdx, 1) : acc,
          [],
        );
        draft.trashCan.push(color[0]);
      }),
  },
  initialState,
);

export default palettes;
