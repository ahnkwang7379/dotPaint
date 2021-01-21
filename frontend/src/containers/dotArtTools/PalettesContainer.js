import React, { useCallback, useEffect } from 'react';
import Palettes from '../../components/dotArtTools/Palettes';
import {
  selectLeftColor,
  selectRightColor,
  loadPalettes,
} from '../../modules/palettes';
import {
  getPalettesDataFromStorage,
  initialStoragePalette,
  selectPalette,
} from '../../util/localStorage';
import { useSelector, useDispatch } from 'react-redux';
import { changeTypeAndOpen } from '../../modules/dialog';

const PalettesConatiner = () => {
  const dispatch = useDispatch();
  const {
    palettes,
    paletteNames,
    selectPaletteId,
    selectPaletteLine,
  } = useSelector(({ palettes }) => ({
    palettes: palettes.palettes,
    paletteNames: palettes.paletteNames,
    selectPaletteId: palettes.selectPaletteId,
    selectPaletteLine: palettes.selectPaletteLine,
  }));

  useEffect(() => {
    let loadedPalette = getPalettesDataFromStorage(localStorage);
    if (loadedPalette && loadedPalette.palettes) {
      dispatch(loadPalettes(loadedPalette.palettes[loadedPalette.current]));
    } else {
      initialStoragePalette(localStorage);
      loadedPalette = getPalettesDataFromStorage(localStorage);
      dispatch(loadPalettes(loadedPalette.palettes[loadedPalette.current]));
    }
  }, []);

  const handleChange = useCallback(
    (event) => {
      if (selectPalette(localStorage, event.target.value)) {
        let loadedPalette = getPalettesDataFromStorage(localStorage);
        if (loadedPalette && loadedPalette.palettes) {
          dispatch(loadPalettes(loadedPalette.palettes[loadedPalette.current]));
        } else {
          initialStoragePalette(localStorage);
          loadedPalette = getPalettesDataFromStorage(localStorage);
          dispatch(loadPalettes(loadedPalette.palettes[loadedPalette.current]));
        }
      }
    },
    [dispatch],
  );

  const handleSelectLeftColor = useCallback(
    (color) => dispatch(selectLeftColor({ color })),
    [dispatch],
  );

  const handleSelectRightColor = useCallback(
    (event, color) => {
      event.preventDefault();
      dispatch(selectRightColor({ color }));
    },
    [dispatch],
  );

  const handleOpenPaletteDialog = useCallback(
    (type) => {
      dispatch(changeTypeAndOpen(type));
    },
    [dispatch],
  );

  return (
    palettes && (
      <Palettes
        palettes={palettes}
        paletteNames={paletteNames}
        selectPaletteId={selectPaletteId}
        selectPaletteLine={selectPaletteLine}
        handleChange={handleChange}
        handleSelectLeftColor={handleSelectLeftColor}
        handleSelectRightColor={handleSelectRightColor}
        handleOpenPaletteDialog={handleOpenPaletteDialog}
      />
    )
  );
};

export default React.memo(PalettesConatiner);
