import React, { useCallback } from 'react';
import Palettes from '../../components/dotArtTools/Palettes';
import {
  reorderPalettes,
  reorderPaletteCell,
  movePaletteToTrashCan,
  moveCellToTrashCan,
  moveCellFromTrashCan,
  selectColorCell,
} from '../../modules/palettes';
import { useSelector, useDispatch } from 'react-redux';

const PalettesConatiner = () => {
  const dispatch = useDispatch();
  const { palettes, trashCan, selectColorId } = useSelector(({ dotArt }) => ({
    palettes: dotArt.present.palettes.palettes,
    trashCan: dotArt.present.palettes.trashCan,
    selectColorId: dotArt.present.palettes.selectColorId,
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

  return (
    <Palettes
      palettes={palettes}
      trashCan={trashCan}
      selectColorId={selectColorId}
      handleReorderPalettes={handleReorderPalettes}
      handleReorderCell={handleReorderCell}
      handleMovePaletteToTrashCan={handleMovePaletteToTrashCan}
      handleMoveCellToTrashCan={handleMoveCellToTrashCan}
      handleMoveCellFromTrashCan={handleMoveCellFromTrashCan}
      handleSelectColorCell={handleSelectColorCell}
    />
  );
};

export default React.memo(PalettesConatiner);
