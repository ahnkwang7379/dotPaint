import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const IndexPage = (props) => {
  useEffect(() => {
    // guest account도 관리해야함
    const token = localStorage.getItem('dotArt_user');

    // token이 없으면 login 페이지로
    if (!token) {
      props.history.push('/login');
    } else {
      props.history.push('/main');
    }
  }, []);
  return <div></div>;
};

export default withRouter(IndexPage);
