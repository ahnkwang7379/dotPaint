import React, { useCallback } from 'react';
import PaintColor from '../../components/dotArtTools/PaintColor';
import { useSelector, useDispatch } from 'react-redux';
import { selectLeftColor, selectRightColor } from '../../modules/palettes';
import { swapLeftRightColor } from '../../modules/palettes';

const PaintColorContainer = () => {
  const dispatch = useDispatch();
  const { leftColor, rightColor } = useSelector(({ palettes }) => ({
    leftColor: palettes.leftColor,
    rightColor: palettes.rightColor,
  }));
  const { colorShortcut } = useSelector(({ keybind }) => ({
    colorShortcut: keybind.color,
  }));

  const changeLeftColorHandle = useCallback(
    (color) => {
      dispatch(selectLeftColor({ color }));
    },
    [dispatch],
  );

  const changeRightColorHandle = useCallback(
    (color) => {
      dispatch(selectRightColor({ color }));
    },
    [dispatch],
  );

  const swapLeftRightColorHandle = useCallback(() => {
    dispatch(swapLeftRightColor());
  }, [dispatch]);

  return (
    <PaintColor
      leftColor={leftColor}
      rightColor={rightColor}
      colorShortcut={colorShortcut}
      changeLeftColorHandle={changeLeftColorHandle}
      changeRightColorHandle={changeRightColorHandle}
      swapLeftRightColorHandle={swapLeftRightColorHandle}
    />
  );
};

export default PaintColorContainer;
