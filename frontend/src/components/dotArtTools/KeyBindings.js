import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  changePaintTool,
  DOT,
  BUCKET,
  PICKER,
  ERASER,
} from '../../modules/paintTool';
import { ActionCreators } from 'redux-undo';
import {
  increaseColumn,
  decreaseColumn,
  increaseRow,
  decreaseRow,
  increaseDotSize,
  decreaseDotSize,
} from '../../modules/dot';
import {
  swapLeftRightColor,
  moveUpPaletteCell,
  moveDownPaletteCell,
  moveLeftPaletteCell,
  moveRightPaletteCell,
} from '../../modules/palettes';
import { TiKeyboard } from 'react-icons/ti';
import styled from 'styled-components';
import tinykeys from 'tinykeys';

const Button = styled.div`
  border: 3px solid #6e6e6e;
  color: #6e6e6e;
  border-radius: 5px;
  width: 3rem;
  height: 3rem;
  text-align: center;
  position: sticky;
  left: 64px;
  bottom: 16px;

  &:hover {
    color: #87ceeb;
    border: 3px solid #87ceeb;
  }
`;

const KeyBindings = ({ isTyping, openKeyBindDialog, keySet }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let keyCombinations = {};

    function keyCombinationMaker(keySet) {
      for (let keyData of keySet) {
        keyCombinations[keyData.code] = (event) => {
          event.preventDefault();
          keybindActionMaker(keyData.action);
        };
      }
    }
    keyCombinationMaker(keySet);

    const keybindActionMaker = (action) => {
      switch (action) {
        case 'UNDO':
          return dispatch(ActionCreators.undo());
        case 'REDO':
          return dispatch(ActionCreators.redo());
        case 'SWAP':
          return dispatch(swapLeftRightColor());
        case 'PALETTE_UP':
          return dispatch(moveUpPaletteCell());
        case 'PALETTE_DOWN':
          return dispatch(moveDownPaletteCell());
        case 'PALETTE_LEFT':
          return dispatch(moveLeftPaletteCell());
        case 'PALETTE_RIGHT':
          return dispatch(moveRightPaletteCell());
        case 'DOT':
          return dispatch(changePaintTool(DOT));
        case 'BUCKET':
          return dispatch(changePaintTool(BUCKET));
        case 'PIKCER':
          return dispatch(changePaintTool(PICKER));
        case 'ERASER':
          return dispatch(changePaintTool(ERASER));
        case 'INCREASE_COLUMN':
          return dispatch(increaseColumn());
        case 'DECREASE_COLUMN':
          return dispatch(decreaseColumn());
        case 'INCREASE_ROW':
          return dispatch(increaseRow());
        case 'DECREASE_ROW':
          return dispatch(decreaseRow());
        case 'INCREASE_DOTSIZE':
          return dispatch(increaseDotSize());
        case 'DECREASE_DOTSIZE':
          return dispatch(decreaseDotSize());
        default:
          return console.log('bind error');
      }
    };

    const unsubscribe = tinykeys(window, keyCombinations);

    if (isTyping) {
      unsubscribe();
    }

    return () => {
      unsubscribe();
    };
  }, [isTyping, keySet, dispatch]);
  return (
    <Button>
      <TiKeyboard size="2.5rem" onClick={openKeyBindDialog} />
    </Button>
  );
};

export default KeyBindings;
