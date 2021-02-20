import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listDotArts } from '../../modules/dotArts';
import DotArtsList from '../../components/community/DotArtsList';

const DotArtsContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { dotArts, error, loading, user } = useSelector(
    ({ dotArts, loading, user }) => ({
      dotArts: dotArts.dotArts,
      error: dotArts.error,
      loading: loading['dotArts/LIST_DOTARTS'],
      user: user.user,
    }),
  );

  useEffect(() => {
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listDotArts({ tag, page }));
  }, [dispatch, location.search]);

  return (
    <DotArtsList
      loading={loading}
      error={error}
      dotArts={dotArts}
      showWriteButton={user}
    />
  );
};

export default withRouter(DotArtsContainer);
