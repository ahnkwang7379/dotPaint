import React from 'react';
import FullDialog from '../../components/common/FullDialog';
import { useSelector, useDispatch } from 'react-redux';
import { closeDialog } from '../../modules/dialog';

const DialogContainer = () => {
  const { dialogType, open } = useSelector(({ dialog }) => ({
    dialogType: dialog.dialogType,
    open: dialog.open,
  }));

  // return <FullDialog dialogType={dialogType} open={open} />;
  return <div></div>;
};

export default React.memo(DialogContainer);
