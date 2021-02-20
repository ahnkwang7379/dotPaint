import React from 'react';
import HeaderContainer from '../containers/header/HeaderContainer';
import DotArtViewContainer from '../containers/community/DotArtViewContainer';
import styled from 'styled-components';

const DotArtViewWrapper = styled.div`
  background-color: #f2e8dc;
  height: 100vh;
  overflow: scroll;
`;

const DotArtViewPage = () => {
  return (
    <DotArtViewWrapper>
      <HeaderContainer />
      <DotArtViewContainer />
    </DotArtViewWrapper>
  );
};

export default DotArtViewPage;
