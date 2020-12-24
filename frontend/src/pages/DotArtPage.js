import React from 'react';
import DialogContainer from '../containers/dialog/DialogContainer';
import DotListContainer from '../containers/dotArtTools/DotListContainer';
import PreViewContainer from '../containers/dotArtTools/PreViewContainer';
import DotPaintContainer from '../containers/dotPaint/DotPaintContainer';
import PaintToolContainer from '../containers/dotArtTools/PaintToolContainer';
import UndoRedoContainer from '../containers/dotArtTools/UndoRedoContainer';
import SaveLoadContainer from '../containers/dotArtTools/SaveLoadContainer';
import PalettesContainer from '../containers/dotArtTools/PalettesContainer';
import DotBorderContainer from '../containers/dotArtTools/DotBorderContainer';
import DotSizeContainer from '../containers/dotArtTools/DotSizeContainer';
import DotAreaContainer from '../containers/dotArtTools/DotAreaContainer';
import LayerControlContainer from '../containers/dotArtTools/LayerControlContainer';
import PaintColorContainer from '../containers/dotArtTools/PaintColorContainer';
import KeyBingingsContainer from '../containers/dotArtTools/KeyBindingsContainer';
import ObserberContainer from '../containers/dotArtTools/ObserverContainer';
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
`;

const LeftToolBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0px;
  width: 150px;
  & > * {
    margin: 8px 0px;
    max-width: 240px;
  }
`;

const RightToolBox = styled.div`
  position: sticky;
  max-height: 90vh;
  width: 200px;
  & > *:not(:first-child) {
    margin: 8px 0px;
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
        <DotPaintContainer />
        <RightToolBox>
          <PreViewContainer />
          <LayerControlContainer />
          <PalettesContainer />
          <ObserberContainer />
        </RightToolBox>
      </MainWrapper>
      <KeyBingingsContainer />
    </React.Fragment>
  );
};

export default DotArtPage;
