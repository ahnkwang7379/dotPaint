import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const NonoGramBoxContainer = () => {
  const dispatch = useDispatch();
  const { nonogram, border, dotSize, dotColor, width, height } = useSelector(
    ({ nonoGram }) => ({
      nonogram: nonoGram.nonogram,
      border: nonoGram.border,
      dotSize: nonoGram.dotSize,
      dotColor: nonoGram.dotColor,
      width: nonoGram.width,
      height: nonoGram.height,
    }),
  );
  return <></>;
};

export default NonoGramBoxContainer;
