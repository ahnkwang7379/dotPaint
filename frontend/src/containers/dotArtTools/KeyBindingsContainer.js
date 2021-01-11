import React, { useCallback } from 'react';
import KeyBingings from '../../components/dotArtTools/KeyBindings';
import { useSelector, useDispatch } from 'react-redux';
import { changeTypeAndOpen } from '../../modules/dialog';

const KeyBindingsContainer = () => {
  const dispatch = useDispatch();

  const { isTyping, dotSize } = useSelector(({ observer }) => ({
    isTyping: observer.isTyping,
    dotSize: observer.dotSize,
  }));

  const { paintTools, color, storage, misc } = useSelector(({ keybind }) => ({
    paintTools: keybind.paintTools,
    color: keybind.color,
    storage: keybind.storage,
    misc: keybind.misc,
  }));

  const openKeyBindDialog = useCallback(() => {
    dispatch(changeTypeAndOpen('KeyBind'));
  }, [dispatch]);

  return (
    <KeyBingings
      isTyping={isTyping}
      dotSize={dotSize}
      paintTools={paintTools}
      color={color}
      storage={storage}
      misc={misc}
      openKeyBindDialog={openKeyBindDialog}
    />
  );
};

export default KeyBindingsContainer;
