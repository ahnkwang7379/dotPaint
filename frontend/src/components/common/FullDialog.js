import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Preview from './Preview';

const FullDialog = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {};
  return (
    <Dialog open={open} onClose={handleClose} scroll="paper" fullScrenn={true}>
      <DialogTitle>dialog 창 만드는중</DialogTitle>
      <DialogContent dividers={true}>
        <div>
          <Preview />
        </div>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default FullDialog;
