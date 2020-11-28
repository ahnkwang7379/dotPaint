import React, { useCallback } from 'react';
import styled from 'styled-components';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import CustomButton from '../common/CustomButton';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import { useSnackbar } from 'notistack';

const SaveLoadBlock = styled.div`
  display: flex;
  /* width: 240px; */
  height: 40px;
`;

const SaveLoad = ({ newProjectHandler, saveHandler, dialogOpenHandler }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onClickNewProject = useCallback(() => {
    newProjectHandler();
  }, [newProjectHandler]);

  const onClickSave = () => {
    if (saveHandler()) {
      enqueueSnackbar('Save DotArt To LocalStorage', { variant: 'success' });
    } else {
      enqueueSnackbar('Save Fail!', { variant: 'error' });
    }
  };

  return (
    <SaveLoadBlock>
      <CustomButton onClick={onClickNewProject}>
        <FiberNewIcon fontSize="large" />
      </CustomButton>
      <CustomButton onClick={onClickSave}>
        <PublishIcon />
      </CustomButton>
      <CustomButton onClick={() => dialogOpenHandler('Load')}>
        <GetAppIcon />
      </CustomButton>
      <CustomButton onClick={() => dialogOpenHandler('DownLoad')}>
        Down
      </CustomButton>
      <CustomButton onClick={() => dialogOpenHandler('Css')}>Css</CustomButton>
    </SaveLoadBlock>
  );
};

export default SaveLoad;
