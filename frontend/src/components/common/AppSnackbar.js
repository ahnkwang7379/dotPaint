import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const AppSnackbar = ({ open, message, type }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {}, [open]);
  const onCloseHandle = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={snackbarOpen}
      onClose={onCloseHandle}
      autoHideDuration={3000}
    >
      <Alert variant="filled" severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
