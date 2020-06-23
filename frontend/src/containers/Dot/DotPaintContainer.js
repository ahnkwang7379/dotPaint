import React, { useCallback, useEffect } from 'react';
import DotPaint from '../../components/dotPaint/DotPaint';
import { useSelector, useDispatch } from 'react-redux';
import { changeDot, selectDot, changePaintState } from '../../modules/dot';

const DotpaintContainer = () => {
  const dispatch = useDispatch();
  const {
    dotSet,
    border,
    dotSize,
    selectedDot,
    paintState,
    paletteSet,
    selectedId,
  } = useSelector(({ dot, colorPalette }) => ({
    dotSet: dot.dotSet,
    border: dot.border,
    dotSize: dot.dotSize,
    selectedDot: dot.selectedDot,
    paintState: dot.paintState,
    paletteSet: colorPalette.paletteSet,
    selectedId: colorPalette.selectedId,
  }));

  const onDotSelect = useCallback(
    (rowIdx, columnIdx) =>
      dispatch(selectDot({ rowIdx: rowIdx, columnIdx: columnIdx })),
    [dispatch],
  );

  useEffect(() => {
    dispatch(
      changeDot({
        rowIdx: selectedDot['rowIdx'],
        columnIdx: selectedDot['columnIdx'],
        color: paletteSet[selectedId],
      }),
    );
  }, [dispatch, selectedDot, paletteSet, selectedId]);

  const onChangePaintState = useCallback(
    (paintState) => dispatch(changePaintState(paintState)),
    [dispatch],
  );

  const onChangeDot = useCallback(
    (rowIdx, columnIdx) => {
      if (paintState === 'DRAGGING') {
        dispatch(
          changeDot({
            rowIdx: rowIdx,
            columnIdx: columnIdx,
            color: paletteSet[selectedId],
          }),
        );
      }
    },
    [dispatch, paintState, paletteSet, selectedId],
  );

  return (
    <>
      <DotPaint
        dotSet={dotSet}
        border={border}
        dotSize={dotSize}
        onChangePaintState={onChangePaintState}
        onChangeDot={onChangeDot}
      />
    </>
  );
};

export default DotpaintContainer;
