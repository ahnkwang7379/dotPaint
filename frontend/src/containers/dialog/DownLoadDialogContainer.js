import React from 'react';
import DownLoadDialog from '../../components/dialog/DownLoadDialog';
import saveFileDotArt from '../../util/saveFileDotArt';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

const DownLoadDialogContainer = ({ dot }) => {
  const dispatch = useDispatch();
  const saveFileHandler = (type) => {
    saveFileDotArt(type, dot);
  };
  return <DownLoadDialog dot={dot} saveFileHandler={saveFileHandler} />;
};

export default DownLoadDialogContainer;
