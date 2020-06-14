import React from 'react';
import DotPaintContainer from '../containers/Dot/DotPaintContainer';
import ColorPickerContainer from '../containers/Dot/ColorPickerContainer';
import DotBorderContainer from '../containers/Dot/DotBorderContainer';
import DotSizeContainer from '../containers/Dot/DotSizeContainer';
import DotAreaContainer from '../containers/Dot/DotAreaContainer';

const DotPaintpage = () => {
  return (
    <>
      <ColorPickerContainer />
      <DotBorderContainer />
      <DotAreaContainer />
      <DotSizeContainer />
      <DotPaintContainer />
    </>
  );
};

export default DotPaintpage;
