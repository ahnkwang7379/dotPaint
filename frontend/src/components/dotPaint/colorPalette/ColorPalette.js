import React from 'react';
import styled, { css } from 'styled-components';
import ColorCell from './ColorCell';
import { PALETTE_ROW, PALETTE_COLUMN } from '../../../modules/colorPalette';
import ColorPicker from '../../../components/common/ColorPicker';

const PaletteWrapper = styled.div`
  display: flex;
`;

const ColorBlock = styled.div`
  margin-left: 11px;
  ${(props) =>
    props.odd &&
    css`
      margin-top: 17px;
    `}
`;

const ColorPalette = ({
  paletteSet,
  selectedId,
  onSelectedColor,
  onChangeColor,
}) => {
  const Cell = (color, idx) =>
    idx === selectedId ? (
      <ColorCell
        color={color}
        key={idx}
        id={idx}
        onSelectedColor={onSelectedColor}
        selected
      />
    ) : (
      <ColorCell
        color={color}
        key={idx}
        id={idx}
        onSelectedColor={onSelectedColor}
      />
    );
  const OddBlock = (startIdx) => {
    let result = [];
    for (let i = startIdx; i < startIdx + PALETTE_COLUMN; i++) {
      result.push(Cell(paletteSet[i], i));
    }
    return result;
  };
  const EvenBlock = (startIdx) => {
    let result = [];
    for (let i = startIdx; i < startIdx + PALETTE_COLUMN + 1; i++) {
      result.push(Cell(paletteSet[i], i));
    }
    return result;
  };
  return (
    <PaletteWrapper>
      <ColorBlock odd>{OddBlock(0)}</ColorBlock>
      <ColorBlock>{EvenBlock(5)}</ColorBlock>
      <ColorBlock odd>{OddBlock(11)}</ColorBlock>
      <ColorBlock>{EvenBlock(16)}</ColorBlock>
      <ColorBlock odd>{OddBlock(22)}</ColorBlock>
      <ColorPicker
        backgroundColor={paletteSet[selectedId]}
        onChangeColor={onChangeColor}
      />
    </PaletteWrapper>
  );
};

export default React.memo(ColorPalette);
