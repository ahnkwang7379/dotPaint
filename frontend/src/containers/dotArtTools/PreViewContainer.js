import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTypeAndOpen } from '../../modules/dialog';
import { changeAnimationDuration } from '../../modules/dot';
import PreViewTools from '../../components/dotArtTools/PreViewTools';

const PreViewContainer = () => {
  const dispatch = useDispatch();
  const { dotSet, dotList, rowCount, columnCount } = useSelector(
    ({ dotArt }) => ({
      dotSet: dotArt.present.dot.dotList[dotArt.present.dot.activeIdx].dot,
      dotList: dotArt.present.dot.dotList,
      rowCount: dotArt.present.dot.rowCount,
      columnCount: dotArt.present.dot.columnCount,
    }),
  );

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

  return (
    <PreViewTools
      dotSet={dotSet}
      dotList={dotList}
      rowCount={rowCount}
      columnCount={columnCount}
      handleOpenDialog={handleOpenDialog}
      handleChangeAnimationDuration={handleChangeAnimationDuration}
    />
  );
};

export default React.memo(PreViewContainer);
