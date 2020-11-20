import React from 'react';
import DialogContainer from '../containers/dialog/DialogContainer';
import DotListContainer from '../containers/dotArtTools/DotListContainer';
import PreViewContainer from '../containers/dotArtTools/PreViewContainer';
import DotPaintContainer from '../containers/DotPaintContainer';
import PaintToolContainer from '../containers/DotHeader/PaintToolContainer';
import UndoRedoContainer from '../containers/dotArtTools/UndoRedoContainer';
import SaveLoadContainer from '../containers/dotArtTools/SaveLoadContainer';
import PalettesContainer from '../containers/dotArtTools/PalettesContainer';
import DotBorderContainer from '../containers/DotHeader/DotBorderContainer';
import DotSizeContainer from '../containers/DotHeader/DotSizeContainer';
import DotAreaContainer from '../containers/DotHeader/DotAreaContainer';
import KeyBingingsContainer from '../containers/dotArtTools/KeyBindingsContainer';
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
`;

const LeftToolBox = styled.div`
  & > * {
    margin: 8px 0px;
    max-width: 240px;
  }
`;

const RightToolBox = styled.div`
  & > * {
    margin: 8px 0px;
    max-width: 240px;
  }
`;

const DotArtPage = () => {
  return (
    <React.Fragment>
      <DialogContainer />
      <DotListContainer />
      <MainWrapper>
        <LeftToolBox>
          <SaveLoadContainer />
          <PaintToolContainer />
          <UndoRedoContainer />
          <PalettesContainer />
        </LeftToolBox>
        <RightToolBox>
          <DotBorderContainer />
          <DotSizeContainer />
          <DotAreaContainer />
          <PreViewContainer />
        </RightToolBox>
      </MainWrapper>
      <DotPaintContainer />
      <KeyBingingsContainer />
    </React.Fragment>
  );
};

export default DotArtPage;
