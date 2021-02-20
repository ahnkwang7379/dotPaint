import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readDotArt, unloadDotArt } from '../../modules/dotArts';
import DotArtView from '../../components/community/DotArtView';

const DotArtViewContainer = ({ match, history }) => {
  const { dotArtId } = match.params;
  const dispatch = useDispatch();
  const { dotArt, error, loading } = useSelector(({ dotArts, loading }) => ({
    dotArt: dotArts.dotArt,
    error: dotArts.error,
    loading: loading['dotArts/READ_DOTART'],
  }));

  useEffect(() => {
    dispatch(readDotArt(dotArtId));

    return () => {
      dispatch(unloadDotArt());
    };
  }, [dispatch, dotArtId]);

  return <DotArtView dotArt={dotArt} loading={loading} error={error} />;
};

export default withRouter(DotArtViewContainer);
