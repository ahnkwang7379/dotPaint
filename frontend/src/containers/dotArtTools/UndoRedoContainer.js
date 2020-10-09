import React, { useCallback } from 'react';
import { ActionCreators } from 'redux-undo';
import { useDispatch } from 'react-redux';
import UndoRedo from '../../components/dotArtTools/UndoRedo';

const UndoRedoContainer = () => {
  const dispatch = useDispatch();

  const undoHandle = useCallback(() => {
    dispatch(ActionCreators.undo());
  }, [dispatch]);
  const redoHandle = useCallback(() => {
    dispatch(ActionCreators.redo());
  }, [dispatch]);

  return <UndoRedo undoHandle={undoHandle} redoHandle={redoHandle} />;
};

export default UndoRedoContainer;