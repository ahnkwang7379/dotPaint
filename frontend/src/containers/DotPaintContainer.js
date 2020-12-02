import React, { useCallback } from 'react';
import DotPaint from '../components/dotPaint/DotPaint';
import { useSelector, useDispatch } from 'react-redux';
import { changePaintState, setDirection } from '../modules/paintTool';
import { increaseDotSize, decreaseDotSize } from '../modules/dot';
import { dotActions } from '../modules/index';

const DotpaintContainer = () => {
  const dispatch = useDispatch();
  const { border, dotSize, backgroundColor, rowCount } = useSelector(({ dotArt: { present: { dot }}}) => 
    ({
      border: dot.border,
      dotSize: dot.dotSize,
      backgroundColor: dot.backgroundColor,
      rowCount: dot.rowCount,
    }),
  ); // prettier-ignore

  const onWheelHandler = useCallback(
    (e) => {
      if (e.deltaY > 0) {
        dispatch(decreaseDotSize());
      } else {
        dispatch(increaseDotSize());
      }
    },
    [dispatch],
  );

  const onChangePaintState = useCallback(
    (paintState, direct) => dispatch(changePaintState(paintState, direct)),
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

  const onSetDirection = useCallback(
    (direction) => dispatch(setDirection(direction)),
    [dispatch],
  );

  return (
    <DotPaint
      border={border}
      dotSize={dotSize}
      backgroundColor={backgroundColor}
      rowCount={rowCount}
      onWheelHandler={onWheelHandler}
      onChangePaintState={onChangePaintState}
      onDotActionHandle={onDotActionHandle}
      onSetDirection={onSetDirection}
    />
  );
};

export default DotpaintContainer;
