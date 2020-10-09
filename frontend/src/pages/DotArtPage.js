import React from 'react';
import DotListContainer from '../containers/dotArtTools/DotListContainer';
import DotPaintContainer from '../containers/DotPaintContainer';
import PaintToolContainer from '../containers/DotHeader/PaintToolContainer';
import BottomToolsContainer from '../containers/dotArtTools/BottomToolsContainer';
import UndoRedoContainer from '../containers/dotArtTools/UndoRedoContainer';

const DotArtPage = () => {
  return (
    <React.Fragment>
      <DotListContainer />
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
