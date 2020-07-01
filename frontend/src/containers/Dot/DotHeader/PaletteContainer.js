import React from 'react';
import Palette from '../../../components/dotPaint/dotHeader/Palette';
import { useSelector, useDispatch } from 'react-redux';
import {} from '../../../modules/palette';

const PaletteContainer = () => {
  const dispatch = useDispatch();
  const { paletteSet } = useSelector(({ palette }) => ({
    paletteSet: palette.paletteSet,
  }));
  return (
    <>
      <Palette paletteSet={paletteSet} />
    </>
  );
};

export default PaletteContainer;
