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

  const { keySet } = useSelector(({ keybind }) => ({
    keySet: keybind.keySet,
  }));

  const openKeyBindDialog = useCallback(() => {
    dispatch(changeTypeAndOpen('KeyBind'));
  }, [dispatch]);

  return (
    <KeyBingings
      isTyping={isTyping}
      dotSize={dotSize}
      openKeyBindDialog={openKeyBindDialog}
      keySet={keySet}
    />
  );
};

export default KeyBindingsContainer;
