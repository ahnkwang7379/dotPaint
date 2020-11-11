import React, { useCallback } from 'react';
import DotPaint from '../components/dotPaint/DotPaint';
import { useSelector, useDispatch } from 'react-redux';
import { changePaintState } from '../modules/paintTool';
import { dotActions } from '../modules/index';

const DotpaintContainer = () => {
  const dispatch = useDispatch();
  const { dot, border, dotSize, columnCount } = useSelector(({ dotArt: { present: { dot }}}) => 
    ({
      // dotSet: dot.dotSet,
      dot: dot.dotList[dot.activeIdx].dot,
      border: dot.border,
      dotSize: dot.dotSize,
      columnCount: dot.columnCount,
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
    dot && (
      <DotPaint
        dotSet={dot}
        border={border}
        dotSize={dotSize}
        columnCount={columnCount}
        onChangePaintState={onChangePaintState}
        onDotActionHandle={onDotActionHandle}
      />
    )
  );
};

export default DotpaintContainer;
