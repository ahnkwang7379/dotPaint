import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTypeAndOpen } from '../../modules/dialog';
import { changeAnimationDuration } from '../../modules/dot';
import { changeTypingState } from '../../modules/observer';
import PreViewTools from '../../components/dotArtTools/PreViewTools';

const PreViewContainer = () => {
  const dispatch = useDispatch();
  const {
    dotFrameList,
    layerList,
    rowCount,
    columnCount,
    animationDuration,
    layerData,
  } = useSelector(({ dotArt: { present: { dot } } }) => ({
    dotFrameList: dot.dotFrameList,
    layerList: dot.dotFrameList[dot.activeIdx].layerList,
    rowCount: dot.rowCount,
    columnCount: dot.columnCount,
    animationDuration: dot.animationDuration,
    layerData: dot.layerData,
  }));
  const { backgroundImg } = useSelector(({ observer }) => ({
    backgroundImg: observer.backgroundImg,
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
      dotFrameList={dotFrameList}
      layerList={layerList}
      rowCount={rowCount}
      columnCount={columnCount}
      layerData={layerData}
      backgroundImg={backgroundImg}
      handleOpenDialog={handleOpenDialog}
      handleChangeAnimationDuration={handleChangeAnimationDuration}
      handleChangeTyping={handleChangeTyping}
    />
  );
};

export default React.memo(PreViewContainer);
