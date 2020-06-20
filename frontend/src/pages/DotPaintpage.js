import React from 'react';
import DotPaintContainer from '../containers/Dot/DotPaintContainer';
import ColorPickerContainer from '../containers/Dot/DotHeader/ColorPickerContainer';
import DotBorderContainer from '../containers/Dot/DotHeader/DotBorderContainer';
import DotSizeContainer from '../containers/Dot/DotHeader/DotSizeContainer';
import DotAreaContainer from '../containers/Dot/DotHeader/DotAreaContainer';
import ColorPaletteContainer from '../containers/Dot/DotHeader/ColorPaletteContainer';

const DotPaintpage = () => {
  return (
    <>
      <ColorPickerContainer />
      <DotBorderContainer />
      <DotAreaContainer />
      <DotSizeContainer />
      <ColorPaletteContainer />
      <DotPaintContainer />
    </>
  );
};

export default DotPaintpage;
