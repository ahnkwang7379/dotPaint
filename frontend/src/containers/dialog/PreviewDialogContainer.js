import React, { useCallback } from 'react';
import PreviewDialog from '../../components/dialog/PreviewDialog';
import { changeAnimationDuration, changePixelSize } from '../../modules/dot';
import { useDispatch } from 'react-redux';

const PreviewDialogContainer = ({ dot }) => {
  const dispatch = useDispatch();
  const handleChangeAnimationDuration = useCallback(
    (duration) => {
      dispatch(changeAnimationDuration(duration));
    },
    [dispatch],
  );
  const handleChangePixelSize = useCallback(
    (pixelSize) => {
      dispatch(changePixelSize(parseInt(pixelSize)));
    },
    [dispatch],
  );

  return (
    <PreviewDialog
      dotFrameList={dot.dotFrameList}
      activeIdx={dot.activeIdx}
      rowCount={dot.rowCount}
      columnCount={dot.columnCount}
      animationDuration={dot.animationDuration}
      pixelSize={dot.pixelSize}
      layerData={dot.layerData}
      handleChangeAnimationDuration={handleChangeAnimationDuration}
      handleChangePixelSize={handleChangePixelSize}
    />
  );
};

export default PreviewDialogContainer;
