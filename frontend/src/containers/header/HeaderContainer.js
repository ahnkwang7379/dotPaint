import React from 'react';
import Header from '../../components/header/Header';

const HeaderContainer = ({ children }) => {
  return <Header>{children}</Header>;
};

export default React.memo(HeaderContainer);
