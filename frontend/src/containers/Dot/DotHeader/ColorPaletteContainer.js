import React, { useCallback } from 'react';
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
  const onSelectedColor = useCallback((selectId) => {
    dispatch(selectColor(selectId));
  }, []);
  return (
    <ColorPaletteBlock>
      <ColorPalette
        paletteSet={paletteSet}
        selectedId={selectedId}
        onSelectedColor={onSelectedColor}
      />
    </ColorPaletteBlock>
  );
};

export default ColorPaletteContainer;
