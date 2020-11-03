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

export const reorderPalettes = createAction(
  REORDER_PALETTES,
  ({ startIdx, endIdx }) => ({
    startIdx,
    endIdx,
  }),
);
export const reorderPaletteCell = createAction(
  REORDER_PALETTE_CELL,
  ({ paletteId, startIdx, endIdx }) => ({ paletteId, startIdx, endIdx }),
);

const initialState = {
  palettes: DEFAULT_PALETTE,
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
      { payload: { paletteId, startIdx, endIdx } },
    ) =>
      // {
      //   console.log(paletteId);
      //   const paletteIdx = state.palettes.reduce(
      //     (acc, cur, idx) => (cur.id === paletteId ? idx : acc),
      //     [],
      //   );
      //   console.log(paletteIdx);
      //   return { ...state };
      // },
      produce(state, (draft) => {
        const paletteIdx = draft.palettes.reduce(
          (acc, cur, idx) => (cur.id === paletteId ? idx : acc),
          [],
        );
        const [removed] = draft.palettes[paletteIdx].colors.splice(startIdx, 1);
        draft.palettes[paletteIdx].colors.splice(endIdx, 0, removed);
      }),
  },
  initialState,
);

export default palettes;
