import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import IndexPage from './pages/IndexPage';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9e9e9e',
      light: '#b1b1b1',
      dark: '#6e6e6e',
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
          <Route component={MainPage} path="/main" />
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
