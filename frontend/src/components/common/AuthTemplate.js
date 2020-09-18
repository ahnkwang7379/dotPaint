import React from 'react';
import { Paper, Container, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PaletteIcon from '@material-ui/icons/Palette';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import MoodIcon from '@material-ui/icons/Mood';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  palette: {
    fontSize: '50px',
    color: theme.palette.primary.main,
  },
  form: {
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    '& + &': {
      margin: theme.spacing(0, 0, 2),
    },
  },
}));

const AuthTemplate = ({ type, onSubmit, onChange, form, history }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="xs">
        <CssBaseline />
        <Paper className={classes.paper}>
          <PaletteIcon className={classes.palette} />
          <Typography component="h1" variant="h5">
            Dot Art
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
              onChange={onChange}
              value={form.username}
              variant="outlined"
              required
              margin="normal"
              fullWidth
              name="username"
              label="User"
              id="username"
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircleIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              onChange={onChange}
              value={form.password}
              variant="outlined"
              required
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            {type === 'signup' && (
              <TextField
                onChange={onChange}
                value={form.passwordConfirm}
                variant="outlined"
                required
                margin="normal"
                fullWidth
                name="passwordConfirm"
                label="PasswordConfirm"
                type="password"
                id="passwordConfirm"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {type === 'login' ? 'Log In' : 'Sign Up'}
            </Button>
            {type === 'login' && (
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={classes.submit}
                startIcon={<MoodIcon />}
              >
                Access Guest Account
              </Button>
            )}
            <Grid container>
              <Grid item xs></Grid>
              {type === 'login' ? (
                <Grid item>
                  <Link onClick={() => history.push('/signup')}>
                    Don't have an account?
                  </Link>
                </Grid>
              ) : (
                <Grid item>
                  <Link onClick={() => history.push('/login')}>
                    have account?
                  </Link>
                </Grid>
              )}
            </Grid>
          </form>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(AuthTemplate);
