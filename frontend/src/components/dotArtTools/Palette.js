import React from 'react';
import PaletteCell from './PaletteCell';
import styled from 'styled-components';

const PaletteBlock = styled.div`
  display: flex;
  margin-top: 8px;
  &:nth-child(odd) {
    margin-left: 15px;
  }
`;

const Palette = ({
  palette,
  selectedPalette,
  handleSelectLeftColor,
  handleSelectRightColor,
}) => {
  return (
    <PaletteBlock>
      {palette.colors.map((color, cellIdx) => (
        <PaletteCell
          color={color}
          paletteId={palette.id}
          cellIdx={cellIdx}
          key={`${palette.id}${cellIdx}`}
          selectedPalette={selectedPalette}
          handleSelectLeftColor={handleSelectLeftColor}
          handleSelectRightColor={handleSelectRightColor}
        />
      ))}
    </PaletteBlock>
  );
};

export default Palette;
