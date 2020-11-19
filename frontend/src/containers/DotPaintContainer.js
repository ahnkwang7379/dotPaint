import React, { useCallback } from 'react';
import DotPaint from '../components/dotPaint/DotPaint';
import { useSelector, useDispatch } from 'react-redux';
import { changePaintState } from '../modules/paintTool';
import { dotActions } from '../modules/index';

const DotpaintContainer = () => {
  const dispatch = useDispatch();
  const { border, dotSize, rowCount } = useSelector(({ dotArt: { present: { dot }}}) => 
    ({
      border: dot.border,
      dotSize: dot.dotSize,
      rowCount: dot.rowCount,
    }),
  ); // prettier-ignore

  const onChangePaintState = useCallback(
    (paintState) => dispatch(changePaintState(paintState)),
    [dispatch],
  );

  const onDotActionHandle = useCallback(
    (rowIdx, columnIdx) =>
      dispatch(
        dotActions({
          rowIdx: rowIdx,
          columnIdx: columnIdx,
        }),
      ),
    [dispatch],
  );

  return (
    <DotPaint
      border={border}
      dotSize={dotSize}
      rowCount={rowCount}
      onChangePaintState={onChangePaintState}
      onDotActionHandle={onDotActionHandle}
    />
  );
};

export default DotpaintContainer;
