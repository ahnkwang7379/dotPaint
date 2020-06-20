import React from 'react';
import ColorPalette from '../../../components/dotPaint/colorPalette/ColorPalette';
import styled from 'styled-components';
import { selectColor, changePaletteColor } from '../../../modules/colorPalette';
import { useSelector, useDispatch } from 'react-redux';

const ColorPaletteBlock = styled.div`
  /* display: flex; */
`;

const ColorPaletteContainer = () => {
  const dispatch = useDispatch();
  const { paletteSet, selectedId } = useSelector(({ colorPalette }) => ({
    paletteSet: colorPalette.paletteSet,
    selectedId: colorPalette.selectedId,
  }));
  return (
    <ColorPaletteBlock>
      <ColorPalette paletteSet={paletteSet} selectedId={selectedId} />
    </ColorPaletteBlock>
  );
};

export default ColorPaletteContainer;
