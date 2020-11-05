import React, { useCallback } from 'react';
import Palettes from '../../components/dotArtTools/Palettes';
import {
  reorderPalettes,
  movePaletteToTrashCan,
  moveCellToTrashCan,
  reorderPaletteCell,
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
      handleSelectColorCell={handleSelectColorCell}
    />
  );
};

export default React.memo(PalettesConatiner);
