import React, { useState, useCallback } from 'react';
import LoadDialog from '../../components/dialog/LoadDialog';
import {
  getDataFromStorage,
  removeDotArtFromStorage,
  clearSavedDotArtFromStorage,
} from '../../util/localStorage';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { loadDotArt } from '../../modules/dot';
import { closeDialog } from '../../modules/dialog';

const LoadDialogContainer = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loadedData, setLoadedData] = useState(
    getDataFromStorage(localStorage),
  );
  const removeDotArtHandle = (dotArtIdx) => {
    removeDotArtFromStorage(localStorage, dotArtIdx);
    setLoadedData(getDataFromStorage(localStorage));
  };
  const loadDotArtHandle = useCallback(
    (loadedData) => {
      dispatch(loadDotArt(loadedData));
      dispatch(closeDialog());
      enqueueSnackbar('Load DotArt From LocalStorage', { variant: 'success' });
    },
    [dispatch],
  );
  const clearStorageHandler = () => {
    clearSavedDotArtFromStorage(localStorage);
    setLoadedData(getDataFromStorage(localStorage));
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
