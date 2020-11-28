import React, { useCallback } from 'react';
import Palettes from '../../components/dotArtTools/Palettes';
import {
  selectLeftColor,
  selectRightColor,
  reorderPalettes,
  reorderPaletteCell,
  movePaletteToTrashCan,
  moveCellToTrashCan,
  moveCellFromTrashCan,
  selectColorCell,
} from '../../modules/palettes';
import { useSelector, useDispatch } from 'react-redux';
import { savePalettesToStorage } from '../../util/localStorage';

const PalettesConatiner = () => {
  const dispatch = useDispatch();
  const { palettes, trashCan, selectColorId } = useSelector(({ palettes }) => ({
    palettes: palettes.palettes,
    trashCan: palettes.trashCan,
    selectColorId: palettes.selectColorId,
  }));

  const handleReorderPalettes = useCallback(
    (startIdx, endIdx) => {
      dispatch(reorderPalettes({ startIdx, endIdx }));
    },
    [dispatch],
  );

  const handleReorderCell = useCallback(
    (startPaletteId, endPaletteId, startIdx, endIdx) => {
      dispatch(
        reorderPaletteCell({ startPaletteId, endPaletteId, startIdx, endIdx }),
      );
    },
    [dispatch],
  );

  const handleMovePaletteToTrashCan = useCallback(
    (dragIdx) => {
      dispatch(movePaletteToTrashCan({ dragIdx }));
    },
    [dispatch],
  );

  const handleMoveCellToTrashCan = useCallback(
    (paletteId, dragIdx) => {
      dispatch(moveCellToTrashCan({ paletteId, dragIdx }));
    },
    [dispatch],
  );

  const handleMoveCellFromTrashCan = useCallback(
    (endPaletteId, startIdx, endIdx) => {
      dispatch(moveCellFromTrashCan({ endPaletteId, startIdx, endIdx }));
    },
    [dispatch],
  );

  const handleSelectColorCell = useCallback(
    (paletteId, selectIdx) =>
      dispatch(selectColorCell({ paletteId, selectIdx })),
    [dispatch],
  );

  const handleSelectLeftColor = useCallback(
    (paletteId, selectIdx, color) =>
      dispatch(selectLeftColor({ paletteId, selectIdx, color })),
    [dispatch],
  );

  const handleSelectRightColor = useCallback(
    (event, color) => {
      event.preventDefault();
      dispatch(selectRightColor({ color }));
    },
    [dispatch],
  );

  const handleSavePalettes = useCallback(
    (palettesName) => {
      const palettesData = {
        palettesName: palettesName,
        palettes: [...palettes],
      };
      savePalettesToStorage(localStorage, palettesData);
    },
    [palettes],
  );

  return (
    <Palettes
      palettes={palettes}
      trashCan={trashCan}
      selectColorId={selectColorId}
      handleSelectLeftColor={handleSelectLeftColor}
      handleSelectRightColor={handleSelectRightColor}
      handleReorderPalettes={handleReorderPalettes}
      handleReorderCell={handleReorderCell}
      handleMovePaletteToTrashCan={handleMovePaletteToTrashCan}
      handleMoveCellToTrashCan={handleMoveCellToTrashCan}
      handleMoveCellFromTrashCan={handleMoveCellFromTrashCan}
      handleSelectColorCell={handleSelectColorCell}
      handleSavePalettes={handleSavePalettes}
    />
  );
};

export default React.memo(PalettesConatiner);
