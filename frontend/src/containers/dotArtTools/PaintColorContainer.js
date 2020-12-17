import React, { useCallback } from 'react';
import PaintColor from '../../components/dotArtTools/PaintColor';
import { useSelector, useDispatch } from 'react-redux';
import { selectLeftColor, selectRightColor } from '../../modules/palettes';

const PaintColorContainer = () => {
  const dispatch = useDispatch();
  const { leftColor, rightColor } = useSelector(({ palettes }) => ({
    leftColor: palettes.leftColor,
    rightColor: palettes.rightColor,
  }));

  const changeLeftColor = useCallback(
    (color) => {
      dispatch(selectLeftColor({ color }));
    },
    [dispatch],
  );

  const changeRightColor = useCallback(
    (color) => {
      console.log(color);
      dispatch(selectRightColor({ color }));
    },
    [dispatch],
  );

  return (
    <PaintColor
      leftColor={leftColor}
      rightColor={rightColor}
      changeLeftColor={changeLeftColor}
      changeRightColor={changeRightColor}
    />
  );
};

export default PaintColorContainer;
