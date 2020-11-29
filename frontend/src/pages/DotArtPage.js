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
import PaintColorContainer from '../containers/dotArtTools/PaintColorContainer';
import KeyBingingsContainer from '../containers/dotArtTools/KeyBindingsContainer';
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
`;

const LeftToolBox = styled.div`
  position: sticky;
  left: 0px;
  width: 150px;
  & > * {
    margin: 8px 0px;
    max-width: 240px;
  }
`;

const DotPaintBox = styled.div`
  width: 100%;
  max-width: 100%;
  height: 90vh;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  background: gray;
  padding: 16px;
`;

const RightToolBox = styled.div`
  position: sticky;
  & > * {
    margin: 8px 0px;
    max-width: 240px;
  }
`;

const DotArtPage = () => {
  return (
    <React.Fragment>
      <DialogContainer />
      <MainWrapper>
        <LeftToolBox>
          <SaveLoadContainer />
          <PaintToolContainer />
          <UndoRedoContainer />
          <DotBorderContainer />
          <DotSizeContainer />
          <DotAreaContainer />
          <PaintColorContainer />
        </LeftToolBox>
        <DotListContainer />
        <DotPaintBox>
          <DotPaintContainer />
        </DotPaintBox>
        <RightToolBox>
          <PreViewContainer />
          <PalettesContainer />
        </RightToolBox>
      </MainWrapper>
      <KeyBingingsContainer />
    </React.Fragment>
  );
};

export default DotArtPage;
