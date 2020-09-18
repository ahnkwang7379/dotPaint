import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DotPaintPage from './pages/DotPaintPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import IndexPage from './pages/IndexPage';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#757575',
      contrastText: '#fff',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={IndexPage} exact />
          <Route component={LoginPage} path="/login" exact />
          <Route component={SignUpPage} path="/signup" exact />
          <Route component={DotPaintPage} path="/dot" exact />
          <Route
            render={({ location }) => (
              <div>
                <h1>4 0 4</h1>
                <p>{location.pathname}는 없는 주소입니다</p>
              </div>
            )}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
