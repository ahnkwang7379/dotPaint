import React, { useCallback } from 'react';
import ColorPalette from '../../components/dotPaint/colorPalette/ColorPalette';
import styled from './styled-components';
import { selectColor, changePaletteColor } from '../../modules/colorPalette';
import { useSelector, useDispatch } from 'react-redux';

const ColorPaletteBlock = styled.div`
  background: rgba(10, 10, 10, 0.2);
  display: flex;
`;

const ColorPaletteContainer = () => {
  const dispatch = useDispatch();
  const { paletteSet, selectedId } = useSelector(({ present }) => ({
    paletteSet: present.colorPalette.paletteSet,
    selectedId: present.colorPalette.selectedId,
  }));
  const onSelectedColor = useCallback(
    (selectId) => {
      dispatch(selectColor(selectId));
    },
    [dispatch],
  );
  const onChangeColor = useCallback(
    (color) => {
      dispatch(changePaletteColor({ id: selectedId, newColor: color }));
    },
    [dispatch, selectedId],
  );

  return (
    <ColorPaletteBlock>
      <ColorPalette
        paletteSet={paletteSet}
        selectedId={selectedId}
        onSelectedColor={onSelectedColor}
        onChangeColor={onChangeColor}
      />
    </ColorPaletteBlock>
  );
};

export default ColorPaletteContainer;
