import React, { useCallback, useEffect } from 'react';
import DotPaint from '../../components/dotPaint/DotPaint';
import { useSelector, useDispatch } from 'react-redux';
import { changeDot, selectDot, changePaintState } from '../../modules/dot';

const DotpaintContainer = () => {
  const dispatch = useDispatch();
  const { dotSet, border, dotSize, paletteSet, selectedId } = useSelector(
    ({ dot, colorPalette }) => ({
      dotSet: dot.dotSet,
      border: dot.border,
      dotSize: dot.dotSize,
      paletteSet: colorPalette.paletteSet,
      selectedId: colorPalette.selectedId,
    }),
  );

  const onChangePaintState = useCallback(
    (paintState) => dispatch(changePaintState(paintState)),
    [dispatch],
  );

  const onChangeDot = useCallback(
    (rowIdx, columnIdx) => {
      dispatch(
        changeDot({
          rowIdx: rowIdx,
          columnIdx: columnIdx,
          color: paletteSet[selectedId],
        }),
      );
    },
    [dispatch, paletteSet, selectedId],
  );
  return (
    <div>
      <DotPaint
        dotSet={dotSet}
        border={border}
        dotSize={dotSize}
        onChangePaintState={onChangePaintState}
        onChangeDot={onChangeDot}
      />
    </div>
  );
};

export default DotpaintContainer;
