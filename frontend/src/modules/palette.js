import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import shortid from 'shortid';
import { put, throttle, takeLatest } from 'redux-saga/effects';

// 하나의 palette에 최대 10개의 색 까지. palette는 10개까지
const DEFAULT_PALETTE = [
  {
    id: shortid.generate(),
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
    nick: 'Ocean',
    colors: ['#4b73a4', '#667883', '#937e6a', '#b89d80', '#dadbd6', '#faf9fb'],
  },
  {
    id: shortid.generate(),
    nick: 'City',
    colors: ['#03070a', '#374552', '#3c8999', '#959ea7', '#9ccce3', '#b8cde0'],
  },
  {
    id: shortid.generate(),
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

const SELECT_COLOR = 'palette/SELECT_COLOR';
const CHANGE_COLOR = 'palette/CHANGE_COLOR';
const INSERT_COLOR = 'palette/INSERT_COLOR';
const DELETE_COLOR = 'palette/DELETE_COLOR';
const CHANGE_NICK = 'palette/CHANGE_NICK';
const INSERT_PALETTE = 'palette/INSERT_PALETTE';
const DELETE_PALETTE = 'palette/DELETE_PALETTE';

export const selectColor = createAction(
  SELECT_COLOR,
  (selectData) => selectData,
);
export const changeColor = createAction(CHANGE_COLOR);
export const insertColor = createAction(INSERT_COLOR, (paletteId) => paletteId);
export const deleteColor = createAction(
  DELETE_COLOR,
  (selectData) => selectData,
);
export const changeNick = createAction(
  CHANGE_NICK,
  ({ paletteId, newNick }) => ({ paletteId, newNick }),
);
export const insertPalette = createAction(INSERT_PALETTE);
export const deletePalette = createAction(
  DELETE_PALETTE,
  (paletteId) => paletteId,
);

const initialState = {
  paletteSet: DEFAULT_PALETTE,
  paletteSetCount: '',
  selectColorId: {
    paletteId: DEFAULT_PALETTE[0]['id'],
    colorId: 0,
  },
};

function randomColor(arrayLength) {
  let resultArr = [];
  for (let i = 0; i < arrayLength; i++) {
    resultArr.push('#' + Math.round(Math.random() * 0xffffff).toString(16));
  }
  return resultArr;
}

const palette = handleActions(
  {
    [SELECT_COLOR]: (state, { payload: selectData }) =>
      produce(state, (draft) => {
        draft.selectColorId = {
          paletteId: selectData.palette,
          colorId: selectData.color,
        };
      }),
    [CHANGE_COLOR]: () => {},
    [INSERT_COLOR]: (state, { payload: paletteId }) =>
      produce(state, (draft) => {
        draft.paletteSet.map((paletteSet) =>
          paletteSet.id === paletteId
            ? paletteSet.colors.push(randomColor(1))
            : paletteSet,
        );
      }),
    [DELETE_COLOR]: (state, { payload: selectData }) =>
      produce(state, (draft) => {
        const palette = draft.paletteSet.find(
          (paletteSet) => paletteSet.id === selectData.palette,
        );
        palette.colors = palette.colors.filter(
          (color, idx) => idx !== selectData.color,
        );
        // 파레트 colors 길이가 0보다 크면 해당 파레트에서 선택한 paletteCell을 바꿔줌
        if (palette.colors.length > 0) {
          // 선택되있던 Cell이 0보다 크면 그 값에서 -1
          selectData.color > 0
            ? (draft.selectColorId.color = selectData.color - 1)
            : (draft.selectColorId.color = 0);
        } else {
          // 만약 palette.colors의 길이가 0이 되어버렸다면?
          palette.colors.push(randomColor(1));
          draft.selectColorId.color = 0;
        }
      }),
    [CHANGE_NICK]: (state, { payload: { paletteId, newNick } }) =>
      produce(state, (draft) => {
        draft.paletteSet.map((paletteSet) =>
          paletteSet.id === paletteId
            ? (paletteSet.nick = newNick)
            : paletteSet,
        );
      }),
    [INSERT_PALETTE]: (state) =>
      produce(state, (draft) => {
        draft.paletteSet.push({
          id: shortid.generate(),
          nick: 'New Palette',
          colors: randomColor(5),
        });
      }),
    [DELETE_PALETTE]: (state, { payload: paletteId }) =>
      produce(state, (draft) => {
        draft.paletteSet = draft.paletteSet.filter(
          (paletteSet) => paletteSet.id !== paletteId,
        );

        // palette 삭제 후 paletteSet에 아무것도 없다면 새로 추가
        if (draft.paletteSet.length === 0) {
          draft.paletteSet.push({
            id: shortid.generate(),
            nick: 'Must Have One',
            colors: randomColor(5),
          });
        }

        // 새로 selectColorId 지정
        draft.selectColorId = {
          paletteId: draft.paletteSet[0].id,
          colorId: 0,
        };
      }),
  },
  initialState,
);

export default palette;
