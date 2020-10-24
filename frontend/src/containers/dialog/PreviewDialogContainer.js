import React, { useCallback } from 'react';
import PreviewDialog from '../../components/dialog/PreviewDialog';
import { changeAnimationDuration } from '../../modules/dot';
import { useDispatch } from 'react-redux';

const PreviewDialogContainer = ({
  dotList,
  activeIdx,
  rowCount,
  columnCount,
  animationDuration,
}) => {
  const dispatch = useDispatch();
  const handleChangeAnimationDuration = useCallback(
    (duration) => {
      dispatch(changeAnimationDuration(duration));
    },
    [dispatch],
  );
  return (
    <PreviewDialog
      dotList={dotList}
      activeIdx={activeIdx}
      rowCount={rowCount}
      columnCount={columnCount}
      animationDuration={animationDuration}
      handleChangeAnimationDuration={handleChangeAnimationDuration}
    />
  );
};

export default PreviewDialogContainer;
