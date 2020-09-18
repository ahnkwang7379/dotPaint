import React from 'react';
import DotPaintContainer from '../containers/DotPaintContainer';
import DotBorderContainer from '../containers/DotHeader/DotBorderContainer';
import DotSizeContainer from '../containers/DotHeader/DotSizeContainer';
import DotAreaContainer from '../containers/DotHeader/DotAreaContainer';
// import ColorPaletteContainer from '../containers/Dot/DotHeader/ColorPaletteContainer';
import PaintToolContainer from '../containers/DotHeader/PaintToolContainer';
import Palette from '../containers/DotHeader/PaletteContainer';

const DotPaintpage = () => {
  return (
    <>
      <DotBorderContainer />
      <DotAreaContainer />
      <DotSizeContainer />
      <PaintToolContainer />
      {/* <ColorPaletteContainer /> */}
      <Palette />
      <DotPaintContainer />
    </>
  );
};

export default DotPaintpage;
