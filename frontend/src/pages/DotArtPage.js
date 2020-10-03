import React from 'react';
import DotPaintContainer from '../containers/DotPaintContainer';
import PaintToolContainer from '../containers/DotHeader/PaintToolContainer';
import BottomToolsContainer from '../containers/dotArtTools/BottomToolsContainer';
import UndoRedoContainer from '../containers/dotArtTools/UndoRedoContainer';

const DotArtPage = () => {
  return (
    <React.Fragment>
      {/* <RightMenuContainer /> */}
      <DotPaintContainer />
      <PaintToolContainer />
      {/* <Palette /> */}
      <UndoRedoContainer />
      <BottomToolsContainer />
    </React.Fragment>
  );
};

export default DotArtPage;
