import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/header/Header';
import { logout } from '../../modules/user';

const HeaderContainer = ({ children, path }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Header
      window={document.window}
      path={path}
      user={user}
      onLogout={onLogout}
    >
      {children}
    </Header>
  );
};

export default React.memo(HeaderContainer);
