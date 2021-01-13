import React, { useEffect } from 'react';
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
  width: 200px;
  margin-right: 4px;
  /* & > * {
    margin: 8px 0px;
    max-width: 240px;
    width: 200px;
  } */
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
  // toolTip의 위치 조절을 위해 넣어둠
  useEffect(() => {
    const toolTipLeftRight = document.getElementsByClassName('toolTip');
    for (let toolTip of toolTipLeftRight) {
      toolTip.style.marginTop = `-${toolTip.clientHeight / 2}px`;
    }
  }, []);
  return (
    <React.Fragment>
      <DialogContainer />
      <MainWrapper>
        <LeftToolBox>
          <SaveLoadContainer />
          <PaintToolContainer />
          <DotAreaContainer />
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
