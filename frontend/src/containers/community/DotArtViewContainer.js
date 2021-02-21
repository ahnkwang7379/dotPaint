import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readDotArt, unloadDotArt } from '../../modules/dotArts';
import { deleteDotArt } from '../../lib/api/dotArt';
import DotArtView from '../../components/community/DotArtView';
import DotArtViewActionButtons from '../../components/community/DotArtViewActionButtons';
import { loadDotArt } from '../../modules/dot';
import { setOriginalDotArtPost } from '../../modules/write';

const DotArtViewContainer = ({ match, history }) => {
  const { dotArtId } = match.params;
  const dispatch = useDispatch();
  const { user, dotArt, error, loading } = useSelector(
    ({ user, dotArts, loading }) => ({
      user: user.user,
      dotArt: dotArts.dotArt,
      error: dotArts.error,
      loading: loading['dotArts/READ_DOTART'],
    }),
  );

  useEffect(() => {
    dispatch(readDotArt(dotArtId));

    return () => {
      dispatch(unloadDotArt());
    };
  }, [dispatch, dotArtId]);

  const onEdit = () => {
    dispatch(setOriginalDotArtPost(dotArt));
    history.push('/write');
  };

  const onRemove = async () => {
    try {
      await deleteDotArt(dotArtId);
      history.push('/'); // 홈으로 이동
    } catch (e) {
      console.log(e);
    }
  };

  const onLoadDotArt = () => {
    dispatch(loadDotArt(dotArt.dotArt, dotArt._id));
    history.push('/dot');
  };

  const ownDotArt = (user && user._id) === (dotArt && dotArt.user._id);

  return (
    <DotArtView
      dotArt={dotArt}
      loading={loading}
      error={error}
      onLoadDotArt={onLoadDotArt}
      actionButtons={
        ownDotArt && (
          <DotArtViewActionButtons onEdit={onEdit} onRemove={onRemove} />
        )
      }
    />
  );
};

export default withRouter(DotArtViewContainer);
