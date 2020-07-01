import React from 'react';
import DotPaintContainer from '../containers/Dot/DotPaintContainer';
import DotBorderContainer from '../containers/Dot/DotHeader/DotBorderContainer';
import DotSizeContainer from '../containers/Dot/DotHeader/DotSizeContainer';
import DotAreaContainer from '../containers/Dot/DotHeader/DotAreaContainer';
import ColorPaletteContainer from '../containers/Dot/DotHeader/ColorPaletteContainer';
import PaintToolContainer from '../containers/Dot/DotHeader/PaintToolContainer';
import Palette from '../containers/Dot/DotHeader/PaletteContainer';

const DotPaintpage = () => {
  return (
    <>
      <DotBorderContainer />
      <DotAreaContainer />
      <DotSizeContainer />
      <PaintToolContainer />
      <ColorPaletteContainer />
      <Palette />
      <DotPaintContainer />
    </>
  );
};

export default DotPaintpage;
