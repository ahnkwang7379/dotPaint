import React, { useCallback } from 'react';
import styled from 'styled-components';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import CustomButton from '../common/CustomButton';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import SaveIcon from '@material-ui/icons/Save';
import { useSnackbar } from 'notistack';

const ButtonBlock = styled.div`
  display: flex;
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
    <React.Fragment>
      <ButtonBlock>
        <CustomButton onClick={onClickNewProject}>
          <FiberNewIcon fontSize="large" />
        </CustomButton>
        <CustomButton onClick={onClickSave}>
          <PublishIcon />
        </CustomButton>
        <CustomButton onClick={() => dialogOpenHandler('Load')}>
          <GetAppIcon />
        </CustomButton>
      </ButtonBlock>
      <ButtonBlock>
        <CustomButton onClick={() => dialogOpenHandler('DownLoad')}>
          <SaveIcon />
        </CustomButton>
        <CustomButton onClick={() => dialogOpenHandler('Css')}>
          css
        </CustomButton>
      </ButtonBlock>
    </React.Fragment>
  );
};

export default SaveLoad;
