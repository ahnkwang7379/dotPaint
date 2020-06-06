import React from 'react';
import DotPaint from '../../components/dotPaint/DotPaint';
import DotBlock from '../../components/dotPaint/DotBlock';
import { useSelector, useDispatch } from 'react-redux';
import { changeDot } from '../../modules/dot';

const DotpaintContainer = () => {
  const dispatch = useDispatch();
  const { dotSet, border, dotSize, dotColor } = useSelector(({ dot }) => ({
    dotSet: dot.dotSet,
    border: dot.border,
    dotSize: dot.dotSize,
    dotColor: dot.dotColor,
    width: dot.width,
    height: dot.height,
  }));

  const { colorLeft, colorRight } = useSelector(({ colorPicker }) => ({
    colorLeft: colorPicker.colorLeft,
    colorRight: colorPicker.colorRight,
  }));

  const fillDotLeftColor = (key1, key2) => {
    dispatch(changeDot({ key1: key1, key2: key2, color: colorLeft }));
  };

  const fillDotRightColor = (key1, key2) => {
    dispatch(changeDot({ key1: key1, key2: key2, color: colorRight }));
  };
  return (
    <>
      <DotPaint
        dotSet={dotSet}
        border={border}
        dotSize={dotSize}
        fillDotLeftColor={fillDotLeftColor}
        fillDotRightColor={fillDotRightColor}
      />
      {/* <DotBlock /> */}
    </>
  );
};

export default DotpaintContainer;
