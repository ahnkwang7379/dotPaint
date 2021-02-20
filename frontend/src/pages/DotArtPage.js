import React from 'react';
import DialogContainer from '../containers/dialog/DialogContainer';
import DotListContainer from '../containers/dotArtTools/DotListContainer';
import DotPaintContainer from '../containers/dotPaint/DotPaintContainer';
import KeyBingingsContainer from '../containers/dotArtTools/KeyBindingsContainer';
import LeftToolContainer from '../containers/dotArt/LeftToolContainer';
import RightToolContainer from '../containers/dotArt/RightToolContainer';
import styled from 'styled-components';
import HeaderContainer from '../containers/header/HeaderContainer';

const MainWrapper = styled.div`
  padding-top: 8px;
  padding-bottom: 6px;
  display: flex;
  background-color: #f2e8dc;
  width: 100%;
`;

const DotArtPage = () => {
  return (
    <React.Fragment>
      <HeaderContainer />
      <DialogContainer />
      <MainWrapper>
        <LeftToolContainer />
        <DotListContainer />
        <DotPaintContainer />
        <RightToolContainer />
      </MainWrapper>
      <KeyBingingsContainer />
    </React.Fragment>
  );
};

export default DotArtPage;
