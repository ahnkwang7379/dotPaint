import React from 'react';
import Pagination from '../../components/community/Pagination';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PaginationContainer = ({ location }) => {
  const { lastPage, dotArts, loading } = useSelector(
    ({ dotArts, loading }) => ({
      lastPage: dotArts.lastPage,
      dotArts: dotArts.dotArts,
      loading: loading['dotArts/LIST_DOTARTS'],
    }),
  );

  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!dotArts || loading) return null;

  // page가 없으면 1을 기본값으로 사용
  const { tag, username, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      tag={tag}
      username={username}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default withRouter(PaginationContainer);
