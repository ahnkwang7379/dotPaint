import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    height: '64px',
  },
  content: {
    width: `100%`,
    height: `100vh`,
    flexGrow: 1,
    padding: theme.spacing(1),
    background: `#F2E8DC`,
  },
}));

const Header = ({ children, history, user, onLogout }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="mainBox">
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            Dot Art
          </Typography>
          {user ? (
            <>
              <Typography variant="h6">{user.username}</Typography>
              <Button color="inherit" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => history.push('/login')}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default React.memo(withRouter(Header));
