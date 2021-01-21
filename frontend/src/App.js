import React from 'react';
import MainPage from './pages/MainPage';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F2E8DC',
      light: '#F2F2F2',
      dark: '#59564F',
      contrastText: '#0D0D0D',
    },
    secondary: {
      main: '#59564F',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        disableWindowBlurListener={true}
      >
        <MainPage />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
