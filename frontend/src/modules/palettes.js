import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { examplePalette } from '../util/json-example';

const LOAD_PALETTES = 'palettes/LOAD_PALETTES';
const REORDER_PALETTES = 'palettes/REDORDER_PALETTES';
const REORDER_PALETTE_CELL = 'palettes/REORDER_PALETTE_CELL';
const MOVE_PALETTE_TO_TRASH_CAN = 'palettes/MOVE_PALETTE_TO_TRASH_CAN';
const MOVE_CELL_TO_TRASH_CAN = 'palettes/MOVE_CELL_TO_TRASH_CAN';
const MOVE_CELL_FROM_TRASH_CAN = 'palettes/MOVE_CELL_FROM_TRASH_CAN';
const SELECT_COLOR_CELL = 'palettes/SELECT_COLOR_CELL';
const INSERT_NEW_PALETTE = 'palettes/INSERT_NEW_PALETTE';

export const loadPalettes = createAction(
  LOAD_PALETTES,
  (loadedData) => loadedData,
);
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
export const moveCellFromTrashCan = createAction(
  MOVE_CELL_FROM_TRASH_CAN,
  ({ endPaletteId, startIdx, endIdx }) => ({ endPaletteId, startIdx, endIdx }),
);
export const selectColorCell = createAction(
  SELECT_COLOR_CELL,
  ({ paletteId, selectIdx }) => ({ paletteId, selectIdx }),
);
export const insertNewPalette = createAction(INSERT_NEW_PALETTE);

const initialState = {
  palettes: examplePalette,
  selectColorId: {
    paletteId: examplePalette[0]['id'],
    colorId: 0,
  },
  trashCan: [],
};

const checkTrashCanIsFull = (trashCan) => {
  if (trashCan.length < 30) {
    return trashCan;
  } else {
    return trashCan.splice(0, 30);
  }
};

const palettes = handleActions(
  {
    [LOAD_PALETTES]: (state, { payload: loadedData }) => ({
      ...state,
      ...loadedData,
    }),
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
        // 같은 palette 내 이동
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
          // 다른 palette로 이동
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

        // selectColorId 재설정
        draft.selectColorId = {
          paletteId: endPaletteId,
          colorId: endIdx,
        };
      }),
    [MOVE_PALETTE_TO_TRASH_CAN]: (state, { payload: { dragIdx } }) =>
      produce(state, (draft) => {
        const removed = draft.palettes.splice(dragIdx, 1);
        removed[0].colors.map((color) => draft.trashCan.unshift(color));
        draft.trashCan = checkTrashCanIsFull(draft.trashCan);

        // selectColorId 재설정
        if (removed[0].id === draft.selectColorId.paletteId) {
          for (let i = 0; i < draft.palettes.length; i++) {
            if (draft.palettes[i].colors.length > 0) {
              draft.selectColorId = {
                paletteId: draft.palettes[i].id,
                colorId: 0,
              };
              break;
            }
          }
        }
      }),
    [MOVE_CELL_TO_TRASH_CAN]: (state, { payload: { paletteId, dragIdx } }) =>
      produce(state, (draft) => {
        const selectPalette = draft.palettes.filter(
          (palette) => palette.id === paletteId,
        );
        const color = selectPalette[0].colors.splice(dragIdx, 1);
        draft.trashCan.unshift(color[0]);
        draft.trashCan = checkTrashCanIsFull(draft.trashCan);

        //  삭제한 셀의 palette에 선택한 셀이 있는지
        if (draft.selectColorId.paletteId === paletteId) {
          if (draft.selectColorId.colorId > dragIdx) {
            // 선택한 셀이 삭제한 셀보다 높으면 하나 낮춰서 위치를 다시 맞춰줌
            draft.selectColorId.colorId--;
          } else {
            // 아니면 length가 0이 됬는지 확인하고 0이면
            // palette에 아무 색이 없으니 selectCell을 초기화해줌
            if (selectPalette[0].colors.length <= 0) {
              for (let i = 0; i < draft.palettes.length; i++) {
                if (draft.palettes[i].colors.length > 0) {
                  draft.selectColorId = {
                    paletteId: draft.palettes[i].id,
                    colorId: 0,
                  };
                  break;
                }
              }
            }
          }
        }
      }),
    [MOVE_CELL_FROM_TRASH_CAN]: (
      state,
      { payload: { endPaletteId, startIdx, endIdx } },
    ) =>
      produce(state, (draft) => {
        const color = draft.trashCan.splice(startIdx, 1);
        draft.palettes.map((palette) =>
          palette.id === endPaletteId
            ? palette.colors.splice(endIdx, 0, color[0])
            : '',
        );
        // selectColorId를 살린 셀에 맞춰준다
        draft.selectColorId = {
          paletteId: endPaletteId,
          colorId: endIdx,
        };
      }),
    [SELECT_COLOR_CELL]: (state, { payload: { paletteId, selectIdx } }) => ({
      ...state,
      selectColorId: { paletteId: paletteId, colorId: selectIdx },
    }),
  },
  initialState,
);

export default palettes;
