import React from 'react';
import DotPaintContainer from '../containers/DotPaintContainer';
import PaintToolContainer from '../containers/DotHeader/PaintToolContainer';
import Palette from '../containers/DotHeader/PaletteContainer';
import RightMenuContainer from '../containers/dotArtTools/RightMenuContainer';

const DotArtPage = () => {
  return (
    <React.Fragment>
      <DotPaintContainer />
      <PaintToolContainer />
      <Palette />
    </React.Fragment>
  );
};

export default DotArtPage;
