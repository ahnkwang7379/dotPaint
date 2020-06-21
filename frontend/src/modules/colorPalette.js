import { createAction, handleActions } from 'redux-actions';

// palette 세로줄 수와 가로 색 갯수 지정 (짝수는 +1 해줘야함)
export const PALETTE_ROW = 5;
export const PALETTE_COLUMN = 5;
const COLOR = '#FFFFF2';
const COLORSET = [
  '#9DC8C8',
  '#30A9DE',
  '#EFDC05',
  '#E53A40',
  '#FBFFB9',
  '#FDD692',
  '#8EC0E4',
  '#F8F8FF',
  '#f199bc',
  '#a3c9c7',
  '#fffff5',
  '#eb9f9f',
  '#7f9eb2',
  '#1c140d',
  '#fbd14b',
  '#45d9fd',
  '#D1B6E1',
  '#519D9E',
  '#A593E0',
  '#E0E3DA',
  '#566270',
  '#EC7357',
  '#754F44',
];

function paletteMaker(row, column) {
  var resultLength = row * column + Math.floor(column / 2);
  var resultArray = new Array(resultLength).fill(COLOR);

  // 준비된 colorSet보다 크게 만들면 남은 칸은 대충 채운다
  if (resultLength > COLORSET.length) {
    for (let x = 0; x < COLORSET.length; x++) {
      resultArray[x] = COLORSET[x];
    }
  } else {
    for (let y = 0; y < resultLength; y++) {
      resultArray[y] = COLORSET[y];
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
  paletteSet: paletteMaker(PALETTE_ROW, PALETTE_COLUMN),
  selectedId: 0,
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
