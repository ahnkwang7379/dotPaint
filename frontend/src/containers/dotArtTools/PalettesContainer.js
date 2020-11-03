import React, { useCallback } from 'react';
import Palettes from '../../components/dotArtTools/Palettes';
import { reorderPalettes, reorderPaletteCell } from '../../modules/palettes';
import { useSelector, useDispatch } from 'react-redux';

const PalettesConatiner = () => {
  const dispatch = useDispatch();
  const { palettes } = useSelector(({ palettes }) => ({
    palettes: palettes.palettes,
  }));

  const handleReorderPalettes = useCallback(
    (startIdx, endIdx) => {
      dispatch(reorderPalettes({ startIdx, endIdx }));
    },
    [dispatch],
  );

  const handleReorderCell = useCallback(
    (paletteId, startIdx, endIdx) => {
      dispatch(reorderPaletteCell({ paletteId, startIdx, endIdx }));
    },
    [dispatch],
  );
  return (
    <Palettes
      palettes={palettes}
      handleReorderPalettes={handleReorderPalettes}
      handleReorderCell={handleReorderCell}
    />
  );
};

export default React.memo(PalettesConatiner);
