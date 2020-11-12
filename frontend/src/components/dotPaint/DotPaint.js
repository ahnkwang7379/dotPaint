import React, { useCallback } from 'react';
import styled from 'styled-components';
import DotPaintLine from './DotPaintLine';

const DotPaintWrapper = styled.div`
  display: flex;
  width: auto;
  height: auto;
  /* min-width: 250px;
  min-height: 200px; */
  /* max-width: calc(100% - 40px);
  max-height: calc(100% - 40px); */
  box-sizing: border-box;
  /* padding: 30px; */
  touch-action: none;
  overflow: auto;
`;

const DotPaintBlock = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  flex-direction: column;
  width: auto;
  height: auto;
  margin: 0 auto;
  padding: 0;
  border: 1px solid black;
  box-sizing: border-box;
  & > * {
    display: flex;
  }
`;

const DotPaint = ({
  dotSet,
  border,
  dotSize,
  columnCount,
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
  const onTouchStartHandler = useCallback(
    (e) => {
      e.preventDefault();
      onChangePaintState('DRAGGING');
    },
    [onChangePaintState],
  );
  const onTouchMoveHandler = useCallback(
    (e, dotIdx) => {
      e.preventDefault();
      onDotActionHandle(dotIdx);
    },
    [onDotActionHandle],
  );
  return (
    <DotPaintWrapper
      onMouseLeave={(e) => onMouseUpHandler(e)}
      onMouseUp={(e) => onMouseUpHandler(e)}
      onTouchStart={(e) => onTouchStartHandler(e)}
      // onTouchMove={(e) => onTouchMoveHandler(e)}
      onTouchEnd={(e) => onMouseUpHandler(e)}
    >
      <DotPaintBlock dotSize={dotSize} columnCount={columnCount}>
        {dotSet &&
          dotSet.map((dotLine, idx) => {
            return (
              <DotPaintLine
                dotLine={dotLine}
                key={idx}
                dotLineIdx={idx}
                columnCount={columnCount}
                dotSize={dotSize}
                border={border}
                onMouseDownHandler={onMouseDownHandler}
                onMouseUpHandler={onMouseUpHandler}
                onMouseOverHandler={onMouseOverHandler}
                onTouchMoveHandler={onTouchMoveHandler}
              />
            );
          })}
      </DotPaintBlock>
    </DotPaintWrapper>
  );
};

export default DotPaint;
