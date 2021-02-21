import React from 'react';
import { Route } from 'react-router-dom';
import DotArtPage from './DotArtPage';
import CommunityPage from './CommunityPage';
import DotArtViewPage from './DotArtViewPage';
import LoginPage from './LoignPage';
import SignUpPage from './SignUpPage';
import WritePage from './WritePage';
import { Helmet } from 'react-helmet-async';

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>DOTART</title>
      </Helmet>
      <Route path={['/', '/@:username']} component={CommunityPage} exact />
      <Route path="/dot" component={DotArtPage} />
      <Route path={'/@:username/:dotArtId'} component={DotArtViewPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/write" component={WritePage} />
    </>
  );
};

export default MainPage;
