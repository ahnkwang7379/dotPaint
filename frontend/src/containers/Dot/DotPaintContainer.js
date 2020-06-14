import React, { useCallback } from 'react';
import DotPaint from '../../components/dotPaint/DotPaint';
import { useSelector, useDispatch } from 'react-redux';
import { changeDot } from '../../modules/dot';

const DotpaintContainer = () => {
  const dispatch = useDispatch();
  const { dotSet, border, dotSize, colorLeft, colorRight } = useSelector(
    ({ dot, colorPicker }) => ({
      dotSet: dot.dotSet,
      border: dot.border,
      dotSize: dot.dotSize,
      colorLeft: colorPicker.colorLeft,
      colorRight: colorPicker.colorRight,
    }),
  );

  const fillDotLeftColor = useCallback(
    (rowIdx, columnIdx) =>
      dispatch(
        changeDot({ rowIdx: rowIdx, columnIdx: columnIdx, color: colorLeft }),
      ),
    [dispatch, colorLeft],
  );

  const fillDotRightColor = useCallback(
    (rowIdx, columnIdx) =>
      dispatch(
        changeDot({ rowIdx: rowIdx, columnIdx: columnIdx, color: colorRight }),
      ),
    [dispatch, colorRight],
  );

  return (
    <>
      <DotPaint
        dotSet={dotSet}
        border={border}
        dotSize={dotSize}
        colorLeft={colorLeft}
        colorRight={colorRight}
        fillDotLeftColor={fillDotLeftColor}
        fillDotRightColor={fillDotRightColor}
      />
    </>
  );
};

export default DotpaintContainer;
