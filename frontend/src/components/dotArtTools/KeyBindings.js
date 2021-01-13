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
  SAMECOLOR,
} from '../../modules/paintTool';
import { ActionCreators } from 'redux-undo';
import {
  increaseColumn,
  decreaseColumn,
  increaseRow,
  decreaseRow,
} from '../../modules/dot';
import {
  increaseDotSize,
  decreaseDotSize,
  saveStart,
} from '../../modules/observer';
import {
  swapLeftRightColor,
  moveUpPaletteCell,
  moveDownPaletteCell,
  moveLeftPaletteCell,
  moveRightPaletteCell,
} from '../../modules/palettes';
import { changeTypeAndOpen } from '../../modules/dialog';
import { TiKeyboard } from 'react-icons/ti';
import styled from 'styled-components';
import tinykeys from 'tinykeys';
import ToolTip from '../common/ToolTip';

const KeyBindWrapper = styled.div`
  position: fixed;
  bottom: 8px;
`;

const Button = styled.div`
  color: #59564f;
  border-radius: 5px;
  text-align: center;

  &:hover {
    color: #0d0d0d;
  }
`;

const KeyBindings = ({
  isTyping,
  dotSize,
  openKeyBindDialog,
  paintTools,
  color,
  storage,
  misc,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let keyCombinations = {};

    function keyCombinationMaker(keySet) {
      for (let keyData in keySet) {
        keyCombinations[keySet[keyData].code] = (event) => {
          event.preventDefault();
          keybindActionMaker(keyData);
        };
      }
    }

    keyCombinationMaker(paintTools);
    keyCombinationMaker(color);
    keyCombinationMaker(storage);
    keyCombinationMaker(misc);

    const paintBox = document.getElementById('paintBox');

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
        case DOT:
          dispatch(changePaintTool(DOT));
          return;
        case BUCKET:
          dispatch(changePaintTool(BUCKET));
          return;
        case PICKER:
          dispatch(changePaintTool(PICKER));
          return;
        case ERASER:
          dispatch(changePaintTool(ERASER));
          return;
        case MOVE:
          dispatch(changePaintTool(MOVE));
          return;
        case SAMECOLOR:
          dispatch(changePaintTool(SAMECOLOR));
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
        case 'MOVE_VIEWPORT_UP':
          paintBox.scrollBy(0, -dotSize);
          return;
        case 'MOVE_VIEWPORT_RIGHT':
          paintBox.scrollBy(dotSize, 0);
          return;
        case 'MOVE_VIEWPORT_DOWN':
          paintBox.scrollBy(0, dotSize);
          return;
        case 'MOVE_VIEWPORT_LEFT':
          paintBox.scrollBy(-dotSize, 0);
          return;
        case 'SAVE_DOTART':
          dispatch(saveStart(true));
          return;
        case 'LOAD_DOTART':
          console.log('?');
          dispatch(changeTypeAndOpen('Load'));
          return;
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
  }, [isTyping, dotSize, paintTools, color, storage, misc, dispatch]);
  return (
    <KeyBindWrapper>
      <ToolTip tooltip={<>Key bind help</>}>
        <Button>
          <TiKeyboard size="2.5rem" onClick={openKeyBindDialog} />
        </Button>
      </ToolTip>
    </KeyBindWrapper>
  );
};

export default React.memo(KeyBindings);
