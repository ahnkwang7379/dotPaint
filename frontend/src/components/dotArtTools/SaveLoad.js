import React, { useCallback } from 'react';
import styled from 'styled-components';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import CustomButton from '../common/CustomButton';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import SaveIcon from '@material-ui/icons/Save';

const ButtonBlock = styled.div`
  display: flex;
  height: 40px;
`;

const SaveLoad = ({ newProjectHandle, saveHandle, dialogOpenHandle }) => {
  const onClickNewProject = useCallback(() => {
    newProjectHandle();
  }, [newProjectHandle]);

  return (
    <React.Fragment>
      <ButtonBlock>
        <CustomButton onClick={onClickNewProject}>
          <FiberNewIcon fontSize="large" />
        </CustomButton>
        <CustomButton onClick={saveHandle}>
          <PublishIcon />
        </CustomButton>
        <CustomButton onClick={() => dialogOpenHandle('Load')}>
          <GetAppIcon />
        </CustomButton>
      </ButtonBlock>
      <ButtonBlock>
        <CustomButton onClick={() => dialogOpenHandle('DownLoad')}>
          <SaveIcon />
        </CustomButton>
        <CustomButton onClick={() => dialogOpenHandle('Css')}>css</CustomButton>
      </ButtonBlock>
    </React.Fragment>
  );
};

export default SaveLoad;
