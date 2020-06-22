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
    paletteSet,
    selectedId,
  } = useSelector(({ dot, colorPalette }) => ({
    dotSet: dot.dotSet,
    border: dot.border,
    dotSize: dot.dotSize,
    selectedDot: dot.selectedDot,
    paletteSet: colorPalette.paletteSet,
    selectedId: colorPalette.selectedId,
  }));

  const onDotSelect = useCallback(
    (rowIdx, columnIdx) =>
      dispatch(
        selectDot({ rowIdx: rowIdx, columnIdx: columnIdx, direct: 'Left' }),
      ),
    [],
  );

  useEffect(() => {
    dispatch(
      changeDot({
        rowIdx: selectedDot['rowIdx'],
        columnIdx: selectedDot['columnIdx'],
        color: paletteSet[selectedId],
      }),
    );
  }, [selectedDot]);

  return (
    <>
      <DotPaint
        dotSet={dotSet}
        border={border}
        dotSize={dotSize}
        onDotSelect={onDotSelect}
      />
    </>
  );
};

export default DotpaintContainer;
