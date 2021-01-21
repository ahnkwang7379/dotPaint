import React from 'react';
import DialogContainer from '../containers/dialog/DialogContainer';
import DotListContainer from '../containers/dotArtTools/DotListContainer';
import PreViewContainer from '../containers/dotArtTools/PreViewContainer';
import DotPaintContainer from '../containers/dotPaint/DotPaintContainer';
import PaintToolContainer from '../containers/dotArtTools/PaintToolContainer';
import SaveLoadContainer from '../containers/dotArtTools/SaveLoadContainer';
import PalettesContainer from '../containers/dotArtTools/PalettesContainer';
import DotBorderContainer from '../containers/dotArtTools/DotBorderContainer';
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
  left: 0px;
  width: 250px;
  min-width: 250px;
  margin-right: 4px;
  & > * {
    margin-bottom: 16px;
  }
`;

const RightToolBox = styled.div`
  position: sticky;
  max-height: 90vh;
  width: 204px;
  & > *:not(:first-child) {
    margin: 4px 0px;
  }
`;

const DotArtPage = () => {
  return (
    <React.Fragment>
      <DialogContainer />
      <MainWrapper>
        <LeftToolBox>
          <SaveLoadContainer />
          <DotAreaContainer />
          <PaintToolContainer />
          <PalettesContainer />
          <PaintColorContainer />
        </LeftToolBox>
        <DotListContainer />
        <DotPaintContainer />
        <RightToolBox>
          <PreViewContainer />
          <DotBorderContainer />
          <LayerControlContainer />
          <ObserberContainer />
        </RightToolBox>
      </MainWrapper>
      <KeyBingingsContainer />
    </React.Fragment>
  );
};

export default DotArtPage;
