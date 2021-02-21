import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/community/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  writeDotArtPost,
  updateDotArtPost,
  postRequiredValueCheck,
} from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const {
    title,
    dotArt,
    dotArtPost,
    tags,
    dotArtPostError,
    originalDotArtPostId,
  } = useSelector(({ write }) => ({
    title: write.title,
    dotArt: write.dotArt,
    tags: write.tags,
    dotArtPost: write.dotArtPost,
    dotArtPostError: write.dotArtPostError,
    originalDotArtPostId: write.originalDotArtPostId,
  }));

  // 포스트 등록
  const onPublish = () => {
    if (!title) {
      dispatch(
        postRequiredValueCheck({
          errorType: 'title',
          errorText: '제목 값이 비어있습니다.',
        }),
      );
      return;
    }
    if (!dotArt) {
      dispatch(
        postRequiredValueCheck({
          errorType: 'dotArt',
          errorText: '도트를 선택해주세요.',
        }),
      );
      return;
    }
    if (originalDotArtPostId) {
      dispatch(
        updateDotArtPost({
          dotArtId: originalDotArtPostId,
          title,
          dotArt,
          tags,
        }),
      );
      return;
    }
    dispatch(
      writeDotArtPost({
        title,
        dotArt,
        tags,
      }),
    );
  };

  // 취소
  const onCancel = () => {
    history.goBack();
  };

  // 성공 혹은 실패시 할 작업
  useEffect(() => {
    if (dotArtPost) {
      const { _id, user } = dotArtPost;
      history.push(`/@${user.username}/${_id}`);
    }
    if (dotArtPostError) {
      console.log(dotArtPostError);
    }
  }, [history, dotArtPost, dotArtPostError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalDotArtPostId}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
