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
  const { title, dotArt, tags, post, postError, originalPostId } = useSelector(
    ({ write }) => ({
      title: write.title,
      dotArt: write.dotArt,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    }),
  );

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
    if (originalPostId) {
      dispatch(updateDotArtPost({ title, dotArt, tags, id: originalPostId }));
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
    if (post) {
      const { _id, user } = post;
      history.push(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);
  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      idEdit={!!originalPostId}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
