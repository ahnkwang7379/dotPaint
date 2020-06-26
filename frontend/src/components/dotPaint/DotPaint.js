import React, { useCallback } from 'react';
import styled from 'styled-components';
import DotPaintLine from './DotPaintLine';

const DotPaintBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: auto;
  height: auto;
  margin: 0 auto;
  padding: 0;
  border: 1px solid black;
  box-sizing: border-box;
  overflow: hidden;
`;

const DotPaint = ({
  dotSet,
  border,
  dotSize,
  onChangePaintState,
  onDotActionHandle,
}) => {
  const onMouseDownHandler = useCallback(
    (e, rowIdx, columnIdx) => {
      e.preventDefault();
      onChangePaintState('DRAGGING');
      onDotActionHandle(rowIdx, columnIdx);
    },
    [onChangePaintState, onDotActionHandle],
  );
  const onMouseUpHandler = useCallback(
    (e) => {
      e.preventDefault();
      onChangePaintState('IDLE');
    },
    [onChangePaintState],
  );
  const onMouseOverHandler = useCallback(
    (e, rowIdx, columnIdx) => {
      e.preventDefault();
      onDotActionHandle(rowIdx, columnIdx);
    },
    [onDotActionHandle],
  );
  // const onMouseClickHandler = useCallback(
  //   (e, rowIdx, columnIdx) => {
  //     e.preventDefault();
  //     onChangePaintState('CLICK');
  //     onDotActionHandle(rowIdx, columnIdx);
  //   },
  //   [onChangePaintState, onDotActionHandle],
  // );
  return (
    <DotPaintBlock onMouseLeave={onMouseUpHandler}>
      {dotSet.map((dotLine, idx) => {
        return (
          <DotPaintLine
            dotLine={dotLine}
            key={idx}
            dotLineIdx={idx}
            dotSize={dotSize}
            border={border}
            onMouseDownHandler={onMouseDownHandler}
            onMouseUpHandler={onMouseUpHandler}
            onMouseOverHandler={onMouseOverHandler}
          />
        );
      })}
    </DotPaintBlock>
  );
};

export default DotPaint;
