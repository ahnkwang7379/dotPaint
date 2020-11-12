import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTypeAndOpen } from '../../modules/dialog';
import { changeAnimationDuration, changePixelSize } from '../../modules/dot';
import PreViewTools from '../../components/dotArtTools/PreViewTools';

const PreViewContainer = () => {
  const dispatch = useDispatch();
  const {
    dotSet,
    dotList,
    rowCount,
    columnCount,
    animationDuration,
    pixelSize,
  } = useSelector(({ dotArt }) => ({
    dotSet: dotArt.present.dot.dotList[dotArt.present.dot.activeIdx].dot,
    dotList: dotArt.present.dot.dotList,
    rowCount: dotArt.present.dot.rowCount,
    columnCount: dotArt.present.dot.columnCount,
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

  return (
    <PreViewTools
      dotSet={dotSet}
      dotList={dotList}
      rowCount={rowCount}
      columnCount={columnCount}
      animationDuration={animationDuration}
      pixelSize={pixelSize}
      handleOpenDialog={handleOpenDialog}
      handleChangeAnimationDuration={handleChangeAnimationDuration}
      handelChangePixelSize={handelChangePixelSize}
    />
  );
};

export default React.memo(PreViewContainer);
