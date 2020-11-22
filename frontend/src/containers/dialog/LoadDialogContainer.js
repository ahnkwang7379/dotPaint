import React, { useState, useCallback } from 'react';
import LoadDialog from '../../components/dialog/LoadDialog';
import {
  getDotArtDataFromStorage,
  removeDotArtFromStorage,
  clearSavedDotArtFromStorage,
} from '../../util/localStorage';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { loadDotArt } from '../../modules/dot';
import { loadPalettes } from '../../modules/palettes';
import { closeDialog } from '../../modules/dialog';

const LoadDialogContainer = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loadedData, setLoadedData] = useState(
    getDotArtDataFromStorage(localStorage),
  );
  const removeDotArtHandle = (dotArtIdx) => {
    removeDotArtFromStorage(localStorage, dotArtIdx);
    setLoadedData(getDotArtDataFromStorage(localStorage));
  };
  const loadDotArtHandle = useCallback(
    (loadedData) => {
      dispatch(loadDotArt(loadedData.dot));
      dispatch(loadPalettes(loadedData.palettes));
      dispatch(closeDialog());
      enqueueSnackbar('Load DotArt From LocalStorage', { variant: 'success' });
    },
    [dispatch, enqueueSnackbar],
  );
  const clearStorageHandler = () => {
    clearSavedDotArtFromStorage(localStorage);
    setLoadedData(getDotArtDataFromStorage(localStorage));
    enqueueSnackbar('Clear DotArt From LocalStorage', { variant: 'success' });
  };
  return (
    <LoadDialog
      loadedData={loadedData}
      removeDotArtHandle={removeDotArtHandle}
      loadDotArtHandle={loadDotArtHandle}
      clearStorageHandler={clearStorageHandler}
    />
  );
};

export default LoadDialogContainer;
