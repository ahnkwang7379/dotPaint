import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearFakeDotArt } from '../../modules/index';
import {
  changePaintTool,
  DOT,
  BUCKET,
  PICKER,
  ERASER,
  MOVE,
} from '../../modules/paintTool';
import { ActionCreators } from 'redux-undo';
import {
  increaseColumn,
  decreaseColumn,
  increaseRow,
  decreaseRow,
} from '../../modules/dot';
import { increaseDotSize, decreaseDotSize } from '../../modules/observer';
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
  position: fixed;
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
          dispatch(ActionCreators.undo());
          dispatch(clearFakeDotArt());
          return;
        case 'REDO':
          dispatch(ActionCreators.redo());
          dispatch(clearFakeDotArt());
          return;
        case 'SWAP':
          dispatch(swapLeftRightColor());
          return;
        case 'PALETTE_UP':
          dispatch(moveUpPaletteCell());
          return;
        case 'PALETTE_DOWN':
          dispatch(moveDownPaletteCell());
          return;
        case 'PALETTE_LEFT':
          dispatch(moveLeftPaletteCell());
          return;
        case 'PALETTE_RIGHT':
          dispatch(moveRightPaletteCell());
          return;
        case 'DOT':
          dispatch(changePaintTool(DOT));
          return;
        case 'BUCKET':
          dispatch(changePaintTool(BUCKET));
          return;
        case 'PIKCER':
          dispatch(changePaintTool(PICKER));
          return;
        case 'ERASER':
          dispatch(changePaintTool(ERASER));
          return;
        case 'MOVE':
          dispatch(changePaintTool(MOVE));
          return;
        case 'INCREASE_COLUMN':
          dispatch(increaseColumn());
          return;
        case 'DECREASE_COLUMN':
          dispatch(decreaseColumn());
          return;
        case 'INCREASE_ROW':
          dispatch(increaseRow());
          return;
        case 'DECREASE_ROW':
          dispatch(decreaseRow());
          return;
        case 'INCREASE_DOTSIZE':
          dispatch(increaseDotSize());
          return;
        case 'DECREASE_DOTSIZE':
          dispatch(decreaseDotSize());
          return;
        // case 'MOVE_VIEWPORT_UP':
        //   return;
        // case 'MOVE_VIEWPORT_RIGHT':
        //   return;
        // case 'MOVE_VIEWPORT_DOWN':
        //   return;
        // case 'MOVE_VIEWPORT_LEFT':
        //   return;
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
