import React, { useCallback } from 'react';
import ColorPalette from '../../../components/dotPaint/colorPalette/ColorPalette';
import styled from 'styled-components';
import { selectColor, changePaletteColor } from '../../../modules/colorPalette';
import { useSelector, useDispatch } from 'react-redux';
import ColorPicker from '../../../components/common/ColorPicker';

const ColorPaletteBlock = styled.div`
  background: rgba(10, 10, 10, 0.2);
  display: flex;
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
  const onChangeColor = useCallback(
    (color) => {
      dispatch(changePaletteColor({ id: selectedId, newColor: color }));
    },
    [selectedId],
  );

  return (
    <ColorPaletteBlock>
      <ColorPalette
        paletteSet={paletteSet}
        selectedId={selectedId}
        onSelectedColor={onSelectedColor}
      />
      <ColorPicker
        backgroundColor={paletteSet[selectedId]}
        onChangeColor={onChangeColor}
      />
    </ColorPaletteBlock>
  );
};

export default ColorPaletteContainer;
