import React, { useCallback } from 'react';
import styled from 'styled-components';
import DotPaintLine from './DotPaintLine';

const DotPaintWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px;
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
  overflow: hidden;
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
    (e, dotIdx) => {
      e.preventDefault();
      onChangePaintState('DRAGGING');
      onDotActionHandle(dotIdx);
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
    >
      <DotPaintBlock>
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
              />
            );
          })}
      </DotPaintBlock>
    </DotPaintWrapper>
  );
};

export default DotPaint;
