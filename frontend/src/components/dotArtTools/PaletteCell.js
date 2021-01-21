import React from 'react';
import ColorCell from '../common/ColorCell';

const PaletteCell = ({
  color,
  cellIdx,
  selectedPalette,
  handleSelectLeftColor,
  handleSelectRightColor,
}) => {
  return (
    <ColorCell
      color={color}
      selectedPalette={selectedPalette}
      cellIdx={cellIdx}
      onClick={() => handleSelectLeftColor(color)}
      onContextMenu={(e) => handleSelectRightColor(e, color)}
    />
  );
};

export default PaletteCell;
