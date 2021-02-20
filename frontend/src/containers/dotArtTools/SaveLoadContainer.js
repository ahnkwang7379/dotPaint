import React, { useCallback, useEffect } from 'react';
import SaveLoad from '../../components/dotArtTools/SaveLoad';
import {
  saveDotArtToStorage,
  savePrivateSettingToStorage,
  getPrivateSettingFromStorage,
} from '../../util/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { changeTypeAndOpen } from '../../modules/dialog';
import {
  getDotArtDataFromStorage,
  initialStorageDotArt,
} from '../../util/localStorage';
import { newDotArtProject, loadDotArt, clearDot } from '../../modules/dot';
import { loadData, saveStart } from '../../modules/observer';
import shortid from 'shortid';
import { useSnackbar } from 'notistack';

const SaveLoadContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const {
    dotFrameList,
    columnCount,
    rowCount,
    animationDuration,
    layerData,
  } = useSelector(({ dotArt: { present: { dot } } }) => ({
    dotFrameList: dot.dotFrameList,
    columnCount: dot.columnCount,
    rowCount: dot.rowCount,
    animationDuration: dot.animationDuration,
    layerData: dot.layerData,
  }));
  const { dotBorder, backgroundImg, saveState } = useSelector(
    ({ observer }) => ({
      dotBorder: observer.dotBorder,
      backgroundImg: observer.backgroundImg,
      saveState: observer.saveState,
    }),
  );
  const { storageShortcuts } = useSelector(({ keybind }) => ({
    storageShortcuts: keybind.storage,
  }));

  // first load
  useEffect(() => {
    let loadedDotArt = getDotArtDataFromStorage(localStorage);
    let loadedPrivateData = getPrivateSettingFromStorage(localStorage);
    if (loadedDotArt) {
      dispatch(loadDotArt(loadedDotArt.dotArt[loadedDotArt.current]));
    } else {
      initialStorageDotArt(localStorage);
      loadedDotArt = getDotArtDataFromStorage(localStorage);
      dispatch(loadDotArt(loadedDotArt.dotArt[loadedDotArt.current]));
    }

    // observer는 상관없음
    dispatch(loadData(loadedPrivateData));
  }, []);

  const newProjectHandle = useCallback(() => {
    dispatch(newDotArtProject());
  }, [dispatch]);

  const dotClearHandle = useCallback(() => {
    dispatch(clearDot());
  }, [dispatch]);

  const dialogOpenHandle = useCallback(
    (type) => {
      dispatch(changeTypeAndOpen(type));
    },
    [dispatch],
  );

  useEffect(() => {
    if (saveState) {
      const saveDotArtData = {
        id: shortid.generate(),
        dotFrameList: dotFrameList,
        columnCount: columnCount,
        rowCount: rowCount,
        animationDuration: animationDuration,
        layerData: layerData,
      };

      const result = saveDotArtToStorage(localStorage, saveDotArtData);
      if (result) {
        enqueueSnackbar('Save DotArt To LocalStorage', { variant: 'success' });
      } else {
        enqueueSnackbar('Save Fail!', { variant: 'error' });
      }
      dispatch(saveStart(false));
    }
  }, [saveState, dispatch]);

  // border나 background 관련 정보 수정 시 자동저장
  useEffect(() => {
    const savePrivateData = {
      dotBorder: dotBorder,
      backgroundImg: backgroundImg,
    };

    const autoSave = () => {
      savePrivateSettingToStorage(localStorage, savePrivateData);
    };

    window.addEventListener('beforeunload', autoSave, false);

    return () => {
      window.removeEventListener('beforeunload', autoSave, false);
    };
  }, [dotBorder, backgroundImg]);

  const saveHandle = useCallback(() => {
    dispatch(saveStart(true));
  }, [dispatch]);

  return (
    <SaveLoad
      storageShortcuts={storageShortcuts}
      newProjectHandle={newProjectHandle}
      dotClearHandle={dotClearHandle}
      saveHandle={saveHandle}
      dialogOpenHandle={dialogOpenHandle}
    />
  );
};

export default SaveLoadContainer;
