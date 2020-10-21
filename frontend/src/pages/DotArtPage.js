import React from 'react';
import DialogContainer from '../containers/dotArtTools/DialogContainer';
import DotListContainer from '../containers/dotArtTools/DotListContainer';
import PreViewContainer from '../containers/dotArtTools/PreViewContainer';
import DotPaintContainer from '../containers/DotPaintContainer';
import PaintToolContainer from '../containers/DotHeader/PaintToolContainer';
import BottomToolsContainer from '../containers/dotArtTools/BottomToolsContainer';
import UndoRedoContainer from '../containers/dotArtTools/UndoRedoContainer';
import styled from 'styled-components';

const ToolBox = styled.div`
  display: flex;
`;

const DotArtPage = () => {
  return (
    <React.Fragment>
      <DialogContainer />
      <DotListContainer />
      {/* <RightMenuContainer /> */}
      <DotPaintContainer />
      {/* <Palette /> */}
      <ToolBox>
        <div>
          <PaintToolContainer />
          <UndoRedoContainer />
        </div>
        <PreViewContainer />
      </ToolBox>
      <BottomToolsContainer />
    </React.Fragment>
  );
};

export default DotArtPage;
