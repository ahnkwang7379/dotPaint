import React from 'react';
import HeaderContainer from '../containers/header/HeaderContainer';
import DotArtsContainer from '../containers/community/DotArtsContainer';
import PaginationContainer from '../containers/community/PaginationContainer';
import styled from 'styled-components';

const CommunityWrapper = styled.div`
  background-color: #f2e8dc;
  height: 100vh;
  overflow: scroll;
`;

const CommunityPage = () => {
  return (
    <CommunityWrapper>
      <HeaderContainer />
      <DotArtsContainer />
      <PaginationContainer />
    </CommunityWrapper>
  );
};

export default CommunityPage;
