import React from 'react';
import KeyBingings from '../../components/dotArtTools/KeyBindings';
import { useSelector } from 'react-redux';

const KeyBindingsContainer = () => {
  const { isTyping } = useSelector(({ typing }) => ({
    isTyping: typing.isTyping,
  }));
  return !isTyping && <KeyBingings />;
};

export default KeyBindingsContainer;
