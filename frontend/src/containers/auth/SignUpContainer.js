import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeForm,
  signup,
  resetError,
} from '../../modules/auth';
import { check } from '../../modules/user';
import AuthTemplate from '../../components/common/AuthTemplate';
import { withRouter } from 'react-router-dom';

const SignUpContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [userAuthError, setUserAuthError] = useState('');
  const [validError, setValidError] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.signup,
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
        form: 'signup',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setUserAuthError('');

    const { username, password, passwordConfirm } = form;

    let err = '';
    if (username === '') err = { ...err, username: 'User is blank' };
    if (password === '') err = { ...err, password: 'Password is blank' };
    if (password !== passwordConfirm) {
      err = {
        ...err,
        passwordConfirm: 'PasswordConfirm and Password is different',
      };
      dispatch(
        changeField({ form: 'signup', key: 'passwordConfirm', value: '' }),
      );
    }
    if (passwordConfirm === '') {
      err = { ...err, passwordConfirm: 'PasswordConfirm is blank' };
    }
    if (err) {
      setValidError(err);
      return;
    }

    dispatch(signup({ username, password }));
  };

  const onResetAuthError = () => {
    setUserAuthError('');
    dispatch(resetError());
  };

  useEffect(() => {
    dispatch(initializeForm('signup'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setUserAuthError(
          'User exist already, please signup another user instead',
        );
        dispatch(changeField({ form: 'signup', key: 'password', value: '' }));
        dispatch(
          changeField({ form: 'signup', key: 'passwordConfirm', value: '' }),
        );
        return;
      }
      setUserAuthError('Sign up failed, please try again');
      return;
    }
    if (auth) {
      console.log('회원 가입 성공');
      console.log(auth);
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
  }, [user]);

  return (
    <AuthTemplate
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      validError={validError}
      userAuthError={userAuthError}
      onResetAuthError={onResetAuthError}
    />
  );
};

export default withRouter(SignUpContainer);
