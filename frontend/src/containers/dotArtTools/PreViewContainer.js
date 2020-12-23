import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTypeAndOpen } from '../../modules/dialog';
import { changeAnimationDuration } from '../../modules/dot';
import { changeTypingState } from '../../modules/observer';
import PreViewTools from '../../components/dotArtTools/PreViewTools';

const PreViewContainer = () => {
  const dispatch = useDispatch();
  const { animationDuration } = useSelector(({ dotArt }) => ({
    animationDuration: dotArt.present.dot.animationDuration,
  }));

  const handleOpenDialog = useCallback(
    (type) => {
      dispatch(changeTypeAndOpen(type));
    },
    [dispatch],
  );

  const handleChangeAnimationDuration = useCallback(
    (duration) => {
      dispatch(changeAnimationDuration(duration));
    },
    [dispatch],
  );

  const handleChangeTyping = useCallback(
    (typing) => {
      dispatch(changeTypingState(typing));
    },
    [dispatch],
  );

  return (
    <PreViewTools
      animationDuration={animationDuration}
      handleOpenDialog={handleOpenDialog}
      handleChangeAnimationDuration={handleChangeAnimationDuration}
      handleChangeTyping={handleChangeTyping}
    />
  );
};

export default React.memo(PreViewContainer);
