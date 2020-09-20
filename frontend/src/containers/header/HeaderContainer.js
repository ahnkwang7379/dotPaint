import React from 'react';
import Header from '../../components/header/Header';

const HeaderContainer = ({ children, path }) => {
  return <Header window={document.window} children={children} path={path} />;
};

export default HeaderContainer;
