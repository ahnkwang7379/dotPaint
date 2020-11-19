import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import HeaderContainer from '../containers/header/HeaderContainer';
import DotArtPage from '../pages/DotArtPage';

const MainPage = ({ match }) => {
  return (
    <BrowserRouter>
      <HeaderContainer path={match.path}>
        <Switch>
          <Route
            path={[match.path, `${match.path}/dot`]}
            component={DotArtPage}
          />
          {/* <Route path={`${match.path}/community`} component={} exact /> */}
        </Switch>
      </HeaderContainer>
    </BrowserRouter>
  );
};

export default withRouter(MainPage);
