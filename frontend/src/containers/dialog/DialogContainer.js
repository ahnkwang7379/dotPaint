import React, { useCallback } from 'react';
import Dialogs from '../../components/dialog/Dialogs';
import { useSelector, useDispatch } from 'react-redux';
import { closeDialog } from '../../modules/dialog';

const DialogContainer = () => {
  const dispatch = useDispatch();
  const { dialogType, open } = useSelector(({ dialog }) => ({
    dialogType: dialog.dialogType,
    open: dialog.open,
  }));

  const handleCloseDialog = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  return (
    open && (
      <Dialogs
        dialogType={dialogType}
        open={open}
        handleCloseDialog={handleCloseDialog}
      />
    )
  );
};

export default DialogContainer;
