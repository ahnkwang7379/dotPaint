import React, { useState, useEffect } from 'react';
import PaletteDialog from '../../components/dialog/PaletteDialog';
import { useDispatch } from 'react-redux';
import { EditPalette, closeDialog } from '../../modules/dialog';
import {
  getPalettesDataFromStorage,
  savePalettesToStorage,
  removePalettesFromStorage,
} from '../../util/localStorage';
import { loadPalettes } from '../../modules/palettes';
import { changeTypingState } from '../../modules/observer';
import { useSnackbar } from 'notistack';
import shortid from 'shortid';

const PaletteDialogContainer = ({ dialogType }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [palette, setPalette] = useState('');
  const [paletteName, setPaletteName] = useState('');
  const [paletteId, setPaletteId] = useState('');
  const [loadedPaletteData, setLoadedPaletteData] = useState('');

  useEffect(() => {
    let loadedPalette, loadedPaletteId, loadedPaletteName;
    let paletteData = getPalettesDataFromStorage(localStorage);

    if (dialogType === EditPalette) {
      loadedPalette = paletteData.palettes[paletteData.current].palette;
      loadedPaletteId = paletteData.palettes[paletteData.current].id;
      loadedPaletteName = paletteData.palettes[paletteData.current].name;
    } else {
      loadedPalette = [
        { id: shortid.generate(), colors: ['#ffffff', '#000000'] },
      ];
      loadedPaletteId = shortid.generate();
      loadedPaletteName = 'New Palette';
    }
    setPalette(loadedPalette);
    setPaletteId(loadedPaletteId);
    setPaletteName(loadedPaletteName);
    setLoadedPaletteData(paletteData);
  }, [dialogType]);

  const savePaletteHandle = (newPaletteData, newPaletteName) => {
    let result = savePalettesToStorage(localStorage, {
      id: paletteId,
      name: newPaletteName,
      palette: newPaletteData,
    });
    if (result) {
      enqueueSnackbar('Save Palette To LocalStorage', { variant: 'success' });
      let paletteData = getPalettesDataFromStorage(localStorage);
      dispatch(loadPalettes(paletteData.palettes[paletteData.current]));
    } else {
      enqueueSnackbar('Save Fail!', { variant: 'error' });
    }
    dispatch(closeDialog());
  };

  const deletePaletteHandle = () => {
    let result = removePalettesFromStorage(localStorage, paletteId);
    if (result) {
      enqueueSnackbar('Delete Palette To LocalStorage', { variant: 'success' });
      let paletteData = getPalettesDataFromStorage(localStorage);
      dispatch(loadPalettes(paletteData.palettes[paletteData.current]));
    } else {
      enqueueSnackbar('Delete Fail!', { variant: 'error' });
    }
    dispatch(closeDialog());
  };

  const closePaletteHandle = () => {
    dispatch(closeDialog());
  };

  const changeTypingHandle = (type) => {
    dispatch(changeTypingState(type));
  };

  return (
    palette && (
      <PaletteDialog
        palette={palette}
        paletteName={paletteName}
        savePaletteHandle={savePaletteHandle}
        deletePaletteHandle={
          dialogType === EditPalette && loadedPaletteData.palettes.length !== 1
            ? deletePaletteHandle
            : null
        }
        closePaletteHandle={closePaletteHandle}
        changeTypingHandle={changeTypingHandle}
      />
    )
  );
};

export default PaletteDialogContainer;
