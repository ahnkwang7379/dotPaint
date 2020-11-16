import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePaintTool,
  DOT,
  BUCKET,
  PICKER,
  ERASER,
} from '../../modules/paintTool';
import { ActionCreators } from 'redux-undo';
import { changeDotArea } from '../../modules/dot';
import {
  moveUpPaletteCell,
  moveDownPaletteCell,
  moveLeftPaletteCell,
  moveRightPaletteCell,
} from '../../modules/palettes';
import tinykeys from 'tinykeys';

const KeyBindings = () => {
  const dispatch = useDispatch();
  const { columnCount, rowCount } = useSelector(({ dotArt }) => ({
    columnCount: dotArt.present.dot.columnCount,
    rowCount: dotArt.present.dot.rowCount,
  }));
  const onChangeArea = useCallback(
    (row, column) => {
      dispatch(
        changeDotArea({ newRow: parseInt(row), newColumn: parseInt(column) }),
      );
    },
    [dispatch],
  );
  useEffect(() => {
    const keyCombinations = {
      '$mod+KeyZ': (event) => {
        event.preventDefault();
        dispatch(ActionCreators.undo());
      },
      '$mod+Shift+KeyZ': (event) => {
        event.preventDefault();
        dispatch(ActionCreators.redo());
      },
      KeyW: (event) => {
        event.preventDefault();
        dispatch(moveUpPaletteCell());
      },
      KeyS: (event) => {
        event.preventDefault();
        dispatch(moveDownPaletteCell());
      },
      KeyA: (event) => {
        event.preventDefault();
        dispatch(moveLeftPaletteCell());
      },
      KeyD: (event) => {
        event.preventDefault();
        dispatch(moveRightPaletteCell());
      },
      KeyQ: (event) => {
        event.preventDefault();
        dispatch(changePaintTool(DOT));
      },
      KeyB: (event) => {
        event.preventDefault();
        dispatch(changePaintTool(BUCKET));
      },
      KeyP: (event) => {
        event.preventDefault();
        dispatch(changePaintTool(PICKER));
      },
      KeyE: (event) => {
        event.preventDefault();
        dispatch(changePaintTool(ERASER));
      },
      '$mod+ArrowRight': (event) => {
        event.preventDefault();
        onChangeArea(rowCount, columnCount + 1);
      },
      '$mod+ArrowLeft': (event) => {
        event.preventDefault();
        onChangeArea(rowCount, columnCount - 1);
      },
      '$mod+ArrowDown': (event) => {
        event.preventDefault();
        onChangeArea(rowCount + 1, columnCount);
      },
      '$mod+ArrowUp': (event) => {
        event.preventDefault();
        onChangeArea(rowCount - 1, columnCount);
      },
    };
    const unsubscribe = tinykeys(window, keyCombinations);
    return () => {
      unsubscribe();
    };
  });
  return <div />;
};

export default KeyBindings;
