import React, { useEffect, useState } from 'react';
import { Paper, Container, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PaletteIcon from '@material-ui/icons/Palette';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  paper: {
    // background: '#dfdfdf',
    marginTop: theme.spacing(10),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  palette: {
    fontSize: '50px',
    color: theme.palette.primary.dark,
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

const titleMap = {
  login: 'Login',
  signup: 'SignUp',
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AuthTemplate = ({
  type,
  onSubmit,
  onChange,
  form,
  history,
  validError,
  userAuthError,
  onResetAuthError,
}) => {
  const title = titleMap[type];
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onResetAuthError();
  };

  useEffect(() => {
    if (userAuthError) {
      setOpen(true);
    }
  }, [userAuthError]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title} fail</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {userAuthError}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="xs">
        <CssBaseline />
        <Paper className={classes.paper}>
          <PaletteIcon className={classes.palette} />
          <Typography component="h1" variant="h5">
            Dot Art
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
              color="secondary"
              onChange={onChange}
              value={form.username}
              variant="outlined"
              required
              margin="normal"
              fullWidth
              name="username"
              label="User"
              id="username"
              helperText={validError.username}
              error={validError.username ? true : false}
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              color="secondary"
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
              helperText={validError.password}
              error={validError.password ? true : false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            {type === 'signup' && (
              <TextField
                color="secondary"
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
                helperText={validError.passwordConfirm}
                error={validError.passwordConfirm ? true : false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              {type === 'login' ? 'Log In' : 'Sign Up'}
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              {type === 'login' ? (
                <Grid item>
                  <Link
                    color="secondary"
                    onClick={() => history.push('/signup')}
                  >
                    Don't have an account?
                  </Link>
                </Grid>
              ) : (
                <Grid item>
                  <Link
                    color="secondary"
                    onClick={() => history.push('/login')}
                  >
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
