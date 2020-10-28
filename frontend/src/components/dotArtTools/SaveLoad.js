import React from 'react';
import styled from 'styled-components';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import CustomButton from '../common/CustomButton';
import { useSnackbar } from 'notistack';

const SaveLoadBlock = styled.div`
  display: flex;
  width: 240px;
  height: 40px;
`;

const SaveLoad = ({ saveHandler, loadHandler }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onClickSave = () => {
    if (saveHandler()) {
      enqueueSnackbar('Save DotArt To LocalStorage', { variant: 'success' });
    } else {
      enqueueSnackbar('Save Fail!', { variant: 'error' });
    }
  };

  return (
    <SaveLoadBlock>
      <CustomButton onClick={onClickSave}>
        <PublishIcon />
      </CustomButton>
      <CustomButton onClick={() => loadHandler('Load')}>
        <GetAppIcon />
      </CustomButton>
    </SaveLoadBlock>
  );
};

export default SaveLoad;
