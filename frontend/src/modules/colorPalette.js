import { createAction, handleActions } from 'redux-actions';

// palette 세로줄 수와 가로 색 갯수 지정 (짝수는 +1 해줘야함)
const ROW = 5;
const COLUMN = 3;
const COLORSET = [
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
  '#f2c9d2',
];

function paletteMaker(row, column) {
  var resultLength = 0;
  var resultArray = [];
  for (let i = 0; i < column; i++) {
    resultLength += i % 2 !== 1 ? row : row + 1;
  }
  // 준비된 colorSet보다 크게 만들면 남은 칸은 대충 채운다
  if (resultLength > COLORSET.length) {
    for (let x = 0; x < resultLength; x++) {
      resultArray.push(COLORSET[x]);
    }
  } else {
    for (let y = 0; y < resultLength; y++) {
      resultArray.push(COLORSET[y]);
    }
  }
  return resultArray;
}

const SELECT_COLOR = 'colorPalette/SELECT_COLOR';
const CHANGE_PALETTE_COLOR = 'colorPalette/CHANGE_PALETTE_COLOR';

export const selectColor = createAction(SELECT_COLOR, (id) => id);
export const changePaletteColor = createAction(
  CHANGE_PALETTE_COLOR,
  ({ id, newColor }) => ({ id, newColor }),
);

// palette에 이미 있는 색상이라면 추가 안함

const initialState = {
  paletteSet: [
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
    '#f2c9d2',
  ],
  selectedId: '',
};

const colorPalette = handleActions(
  {
    [SELECT_COLOR]: (state, { payload: id }) => ({
      ...state,
      selectedId: id,
    }),
    [CHANGE_PALETTE_COLOR]: (state, { payload: { id, newColor } }) => ({
      ...state,
      paletteSet: state.paletteSet.map((oldColor, idx) =>
        idx !== id ? oldColor : newColor,
      ),
    }),
  },
  initialState,
);

export default colorPalette;
