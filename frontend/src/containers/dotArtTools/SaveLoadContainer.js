import React, { useCallback, useEffect, useState } from 'react';
import SaveLoad from '../../components/dotArtTools/SaveLoad';
import { saveDotArtToStorage } from '../../util/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { changeTypeAndOpen } from '../../modules/dialog';
import {
  getDotArtDataFromStorage,
  initialStorage,
} from '../../util/localStorage';
import { newDotArtProject, loadDotArt } from '../../modules/dot';
import { loadPalettes } from '../../modules/palettes';
import shortid from 'shortid';
import { useSnackbar } from 'notistack';

const SaveLoadContainer = () => {
  const [saveStart, setSaveStart] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const {
    dotList,
    dotFrameList,
    columnCount,
    rowCount,
    animationDuration,
    layerData,
  } = useSelector(({ dotArt: { present: { dot } } }) => ({
    dotList: dot.dotList,
    dotFrameList: dot.dotFrameList,
    columnCount: dot.columnCount,
    rowCount: dot.rowCount,
    animationDuration: dot.animationDuration,
    layerData: dot.layerData,
  }));
  const { palettes } = useSelector(({ palettes }) => ({
    palettes: palettes.palettes,
  }));
  const { dotBorder, backgroundColor } = useSelector(({ observer }) => ({
    dotBorder: observer.dotBorder,
    backgroundColor: observer.backgroundColor,
  }));

  // first load
  useEffect(() => {
    let loadedData = getDotArtDataFromStorage(localStorage);
    if (loadedData) {
      dispatch(loadDotArt(loadedData.dotArt[loadedData.current].dot));
      dispatch(loadPalettes(loadedData.dotArt[loadedData.current].palettes));
    } else {
      initialStorage(localStorage);
      loadedData = getDotArtDataFromStorage(localStorage);
      dispatch(loadDotArt(loadedData.dotArt[loadedData.current].dot));
      dispatch(loadPalettes(loadedData.dotArt[loadedData.current].palettes));
    }
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
        palettes: palettes,
        observer: {
          dotBorder: dotBorder,
          backgroundColor: backgroundColor,
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
