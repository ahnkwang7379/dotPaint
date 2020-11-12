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
      dispatch(changePixelSize(pixelSize));
    },
    [dispatch],
  );

  return (
    <PreviewDialog
      dot={dot}
      handleChangeAnimationDuration={handleChangeAnimationDuration}
      handleChangePixelSize={handleChangePixelSize}
    />
  );
};

export default PreviewDialogContainer;
