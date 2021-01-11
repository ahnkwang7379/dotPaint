import React from 'react';
import KeyBindDialog from '../../components/dialog/KeyBindDialog';
import { useSelector } from 'react-redux';

const KeyBindDialogContainer = () => {
  const { paintTools, color, storage, misc } = useSelector(({ keybind }) => ({
    paintTools: keybind.paintTools,
    color: keybind.color,
    storage: keybind.storage,
    misc: keybind.misc,
  }));
  return (
    <KeyBindDialog
      paintTools={paintTools}
      color={color}
      storage={storage}
      misc={misc}
    />
  );
};

export default KeyBindDialogContainer;
