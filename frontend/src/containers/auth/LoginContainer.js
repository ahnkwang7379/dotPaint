import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeForm,
  login,
  resetError,
} from '../../modules/auth';
import AuthTemplate from '../../components/common/AuthTemplate';
import { withRouter } from 'react-router-dom';
import { check } from '../../modules/user';

const LoginContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [validError, setValidError] = useState({ username: '', password: '' });
  const [userAuthError, setUserAuthError] = useState('');
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;

    // error 제거
    let newError = { ...validError };
    newError[name] = '';
    setValidError(newError);
    setUserAuthError('');

    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setUserAuthError('');

    const { username, password } = form;

    let err = '';
    if (username === '') err = { ...err, username: 'User is blank' };
    if (password === '') err = { ...err, password: 'Password is blank' };

    if (err) {
      setValidError(err);
      return;
    }

    dispatch(login({ username, password }));
  };

  const onResetAuthError = () => {
    setUserAuthError('');
    dispatch(resetError());
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 401) {
        setUserAuthError('Email and Password did not match.');
        dispatch(changeField({ form: 'login', key: 'password', value: '' }));
        return;
      }
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('dotArt_user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working!');
      }
      history.push('/');
    }
  }, [history, user]);

  return (
    <AuthTemplate
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      validError={validError}
      userAuthError={userAuthError}
      onResetAuthError={onResetAuthError}
    />
  );
};

export default withRouter(LoginContainer);
