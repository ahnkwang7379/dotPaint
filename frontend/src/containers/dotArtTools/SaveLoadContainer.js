import React, { useCallback } from 'react';
import SaveLoad from '../../components/dotArtTools/SaveLoad';
import { saveDotArtToStorage } from '../../util/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar } from '../../modules/snackbar';
import shortid from 'shortid';

const SaveLoadContainer = () => {
  const dispatch = useDispatch();
  const {
    dotList,
    border,
    dotSize,
    columnCount,
    rowCount,
    animationDuration,
  } = useSelector(({ dotArt: { present: { dot } } }) => ({
    dotList: dot.dotList,
    border: dot.border,
    dotSize: dot.dotSize,
    columnCount: dot.columnCount,
    rowCount: dot.rowCount,
    animationDuration: dot.animationDuration,
  }));

  const snackbarHandler = useCallback(
    (message, type) => {
      dispatch(openSnackbar(message, type));
    },
    [dispatch],
  );

  const saveHandler = () => {
    const saveDotArtData = {
      id: shortid.generate(),
      dotList: dotList,
      border: border,
      dotSize: dotSize,
      columnCount: columnCount,
      rowCount: rowCount,
      animationDuration: animationDuration,
    };

    return saveDotArtToStorage(localStorage, saveDotArtData);
  };

  return (
    <SaveLoad saveHandler={saveHandler} snackbarHandler={snackbarHandler} />
  );
};

export default React.memo(SaveLoadContainer);
