import React, { useCallback } from 'react';
import Palettes from '../../components/dotArtTools/Palettes';
import {
  reorderPalettes,
  movePaletteToTrashCan,
  moveCellToTrashCan,
  reorderPaletteCell,
} from '../../modules/palettes';
import { useSelector, useDispatch } from 'react-redux';

const PalettesConatiner = () => {
  const dispatch = useDispatch();
  const { palettes, trashCan } = useSelector(({ palettes }) => ({
    palettes: palettes.palettes,
    trashCan: palettes.trashCan,
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
    (selectIdx) => {
      dispatch(movePaletteToTrashCan({ selectIdx }));
    },
    [dispatch],
  );

  const handleMoveCellToTrashCan = useCallback(
    (paletteId, selectIdx) => {
      dispatch(moveCellToTrashCan({ paletteId, selectIdx }));
    },
    [dispatch],
  );

  return (
    <Palettes
      palettes={palettes}
      trashCan={trashCan}
      handleReorderPalettes={handleReorderPalettes}
      handleReorderCell={handleReorderCell}
      handleMovePaletteToTrashCan={handleMovePaletteToTrashCan}
      handleMoveCellToTrashCan={handleMoveCellToTrashCan}
    />
  );
};

export default React.memo(PalettesConatiner);
