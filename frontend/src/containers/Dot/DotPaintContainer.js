import React, { useCallback, useEffect } from 'react';
import DotPaint from '../../components/dotPaint/DotPaint';
import { useSelector, useDispatch } from 'react-redux';
import { changeDot, selectDot } from '../../modules/dot';

const DotpaintContainer = () => {
  const dispatch = useDispatch();
  const {
    dotSet,
    border,
    dotSize,
    selectedDot,
    colorLeft,
    colorRight,
  } = useSelector(({ dot, colorPicker }) => ({
    dotSet: dot.dotSet,
    border: dot.border,
    dotSize: dot.dotSize,
    selectedDot: dot.selectedDot,
    colorLeft: colorPicker.colorLeft,
    colorRight: colorPicker.colorRight,
  }));

  const fillDotLeftColor = useCallback(
    (rowIdx, columnIdx) =>
      dispatch(
        selectDot({ rowIdx: rowIdx, columnIdx: columnIdx, direct: 'Left' }),
      ),
    [],
  );
  const fillDotRightColor = useCallback(
    (rowIdx, columnIdx) =>
      dispatch(
        selectDot({ rowIdx: rowIdx, columnIdx: columnIdx, direct: 'Right' }),
      ),
    [],
  );

  useEffect(() => {
    dispatch(
      changeDot({
        rowIdx: selectedDot['rowIdx'],
        columnIdx: selectedDot['columnIdx'],
        color: selectedDot['direct'] === 'Left' ? colorLeft : colorRight,
      }),
    );
  }, [selectedDot]);

  return (
    <>
      <DotPaint
        dotSet={dotSet}
        border={border}
        dotSize={dotSize}
        fillDotLeftColor={fillDotLeftColor}
        fillDotRightColor={fillDotRightColor}
      />
    </>
  );
};

export default DotpaintContainer;
