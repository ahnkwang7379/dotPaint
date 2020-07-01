import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { put, throttle, takeLatest } from 'redux-saga/effects';

// 하나의 palette에 최대 10개의 색 까지. palette는 10개까지
const DEFAULT_PALETTE = [
  {
    id: 0,
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
    id: 1,
    nick: 'Ocean',
    colors: ['#4b73a4', '#667883', '#937e6a', '#b89d80', '#dadbd6', '#faf9fb'],
  },
  {
    id: 2,
    nick: 'City',
    colors: ['#03070a', '#374552', '#3c8999', '#959ea7', '#9ccce3', '#b8cde0'],
  },
  {
    id: 3,
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
    id: 4,
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

export const selectColor = createAction(SELECT_COLOR);
export const changeColor = createAction(CHANGE_COLOR);

const initialState = {
  paletteSet: DEFAULT_PALETTE,
  paletteSetCount: '',
  selectColorId: 0,
};

const palette = handleActions({}, initialState);

export default palette;
