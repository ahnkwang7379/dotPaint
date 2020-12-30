import React, { useCallback, useEffect, useState } from 'react';
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
  initialStorage,
} from '../../util/localStorage';
import { newDotArtProject, loadDotArt } from '../../modules/dot';
import { loadPalettes } from '../../modules/palettes';
import { loadData } from '../../modules/observer';
import shortid from 'shortid';
import { useSnackbar } from 'notistack';

const SaveLoadContainer = () => {
  const [saveStart, setSaveStart] = useState(false);
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
  const { palettes } = useSelector(({ palettes }) => ({
    palettes: palettes.palettes,
  }));
  const { dotBorder, backgroundImg } = useSelector(({ observer }) => ({
    dotBorder: observer.dotBorder,
    backgroundImg: observer.backgroundImg,
  }));

  // first load
  useEffect(() => {
    let loadedData = getDotArtDataFromStorage(localStorage);
    let loadedPrivateData = getPrivateSettingFromStorage(localStorage);
    if (loadedData) {
      dispatch(loadDotArt(loadedData.dotArt[loadedData.current].dot));
    } else {
      initialStorage(localStorage);
      loadedData = getDotArtDataFromStorage(localStorage);
      dispatch(loadDotArt(loadedData.dotArt[loadedData.current].dot));
    }
    // observer는 상관없음
    dispatch(loadData(loadedPrivateData));
  }, []);

  const newProjectHandle = useCallback(() => {
    dispatch(newDotArtProject());
  }, [dispatch]);

  const dialogOpenHandle = useCallback(
    (type) => {
      dispatch(changeTypeAndOpen(type));
    },
    [dispatch],
  );

  useEffect(() => {
    if (saveStart) {
      const saveDotArtData = {
        dot: {
          id: shortid.generate(),
          dotFrameList: dotFrameList,
          columnCount: columnCount,
          rowCount: rowCount,
          animationDuration: animationDuration,
          layerData: layerData,
        },
      };

      const result = saveDotArtToStorage(localStorage, saveDotArtData);
      if (result) {
        enqueueSnackbar('Save DotArt To LocalStorage', { variant: 'success' });
      } else {
        enqueueSnackbar('Save Fail!', { variant: 'error' });
      }
      setSaveStart(false);
    }
  }, [saveStart]);

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

  const saveHandle = () => {
    setSaveStart(true);
  };

  return (
    <SaveLoad
      newProjectHandle={newProjectHandle}
      saveHandle={saveHandle}
      dialogOpenHandle={dialogOpenHandle}
    />
  );
};

export default React.memo(SaveLoadContainer);
