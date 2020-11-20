import React from 'react';
import DownLoadDialog from '../../components/dialog/DownLoadDialog';
import saveFileDotArt from '../../util/saveFileDotArt';

const DownLoadDialogContainer = ({ dot, dialogType }) => {
  const saveFileHandler = (type) => {
    saveFileDotArt(type, dot);
  };
  return (
    <DownLoadDialog
      dot={dot}
      dialogType={dialogType}
      saveFileHandler={saveFileHandler}
    />
  );
};

export default DownLoadDialogContainer;
