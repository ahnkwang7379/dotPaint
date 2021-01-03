import React, { useCallback } from 'react';
import DownLoadDialog from '../../components/dialog/DownLoadDialog';
import saveFileDotArt from '../../util/saveFileDotArt';
import { changeAnimationDuration, changePixelSize } from '../../modules/dot';
import { useDispatch } from 'react-redux';

const DownLoadDialogContainer = ({ dot, dialogType }) => {
  const dispatch = useDispatch();
  const saveFileHandler = (type) => {
    saveFileDotArt(type, dot);
  };
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
    <DownLoadDialog
      dot={dot}
      dialogType={dialogType}
      saveFileHandler={saveFileHandler}
      handleChangeAnimationDuration={handleChangeAnimationDuration}
      handleChangePixelSize={handleChangePixelSize}
    />
  );
};

export default DownLoadDialogContainer;
