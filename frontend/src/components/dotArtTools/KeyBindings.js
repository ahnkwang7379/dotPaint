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
import tinykeys from 'tinykeys';

const KeyBindings = () => {
  const dispatch = useDispatch();
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
      // prettier-ignore
      'KeyQ': event => {
        event.preventDefault();
        dispatch(changePaintTool(DOT));
      },
      // prettier-ignore
      'KeyW': event => {
          event.preventDefault();
          dispatch(changePaintTool(BUCKET));
        },
      // prettier-ignore
      'KeyE': event => {
          event.preventDefault();
          dispatch(changePaintTool(PICKER));
        },
      // prettier-ignore
      'KeyR': event => {
          event.preventDefault();
          dispatch(changePaintTool(ERASER));
        },
      //   '$mod+ArrowRight': (event) => {
      //     event.preventDefault();
      //     dispatch(changeDimensions('columns', 1));
      //   },
      //   '$mod+ArrowLeft': (event) => {
      //     event.preventDefault();
      //     dispatch(changeDimensions('columns', -1));
      //   },
      //   '$mod+ArrowDown': (event) => {
      //     event.preventDefault();
      //     dispatch(changeDimensions('rows', 1));
      //   },
      //   '$mod+ArrowUp': (event) => {
      //     event.preventDefault();
      //     dispatch(changeDimensions('rows', -1));
      //   },
    };
    const unsubscribe = tinykeys(window, keyCombinations);
    return () => {
      unsubscribe();
    };
  });
  return <div />;
};

export default KeyBindings;
