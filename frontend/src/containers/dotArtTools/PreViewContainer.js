import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTypeAndOpen } from '../../modules/dialog';
import { changeAnimationDuration, changePixelSize } from '../../modules/dot';
import { changeTypingState } from '../../modules/observer';
import PreViewTools from '../../components/dotArtTools/PreViewTools';

const PreViewContainer = () => {
  const dispatch = useDispatch();
  const { animationDuration, pixelSize } = useSelector(({ dotArt }) => ({
    animationDuration: dotArt.present.dot.animationDuration,
    pixelSize: dotArt.present.dot.pixelSize,
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

  const handelChangePixelSize = useCallback(
    (pixelSize) => {
      dispatch(changePixelSize(pixelSize));
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
      pixelSize={pixelSize}
      handleOpenDialog={handleOpenDialog}
      handleChangeAnimationDuration={handleChangeAnimationDuration}
      handelChangePixelSize={handelChangePixelSize}
      handleChangeTyping={handleChangeTyping}
    />
  );
};

export default React.memo(PreViewContainer);
