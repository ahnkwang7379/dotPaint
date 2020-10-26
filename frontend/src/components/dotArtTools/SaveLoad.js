import React, { useState } from 'react';
import styled from 'styled-components';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import CustomButton from '../common/CustomButton';
import Snackbar from '@material-ui/core/Snackbar';

const SaveLoadBlock = styled.div`
  display: flex;
  width: 240px;
  height: 40px;
`;

const SaveLoad = ({ saveHandler, snackbarHandler }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const onClickSave = () => {
    if (saveHandler()) {
      // setMessage('Save Your LocalStorage Success');
      snackbarHandler('Save Your LocalStorage Success', 'success');
    } else {
      // setMessage('Save Fail!');
      snackbarHandler('Save Fail!', 'error');
    }
    // setOpen(true);
  };

  const onOpenHandle = () => {
    setOpen(true);
  };
  const onCloseHandle = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <SaveLoadBlock>
      {/* <CustomButton onClick={onOpenHandle}> */}
      <CustomButton onClick={onClickSave}>
        <PublishIcon />
      </CustomButton>
      <CustomButton>
        <GetAppIcon />
      </CustomButton>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        onClose={onCloseHandle}
        autoHideDuration={3000}
        message={message}
      />
    </SaveLoadBlock>
  );
};

export default SaveLoad;
