import React from 'react';
import DownLoadDialog from '../../components/dialog/DownLoadDialog';
import saveFileDotArt from '../../util/saveFileDotArt';

const DownLoadDialogContainer = ({ dot }) => {
  const saveFileHandler = (type) => {
    saveFileDotArt(type, dot);
  };
  return <DownLoadDialog dot={dot} saveFileHandler={saveFileHandler} />;
};

export default DownLoadDialogContainer;
