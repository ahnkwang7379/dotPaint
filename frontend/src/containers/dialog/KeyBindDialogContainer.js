import React from 'react';
import KeyBindDialog from '../../components/dialog/KeyBindDialog';
import { useSelector } from 'react-redux';

const KeyBindDialogContainer = () => {
  const { keySet } = useSelector(({ keybind }) => ({
    keySet: keybind.keySet,
  }));
  return <KeyBindDialog keySet={keySet} />;
};

export default KeyBindDialogContainer;
