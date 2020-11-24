import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import DotPaintLine from './DotPaintLine';
import DotPaintBackground from './DotPaintBackground';

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
    & > * {
      z-index: 1;
      ${(props) =>
        props.border &&
        css`
          border: ${props.border.size}px solid ${props.border.color};
          width: ${props.dotSize}px;
          height: ${props.dotSize}px;
        `};
    }
  }
`;

const DotPaint = ({
  border,
  dotSize,
  rowCount,
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
  // const onTouchStartHandler = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     onChangePaintState('DRAGGING');
  //   },
  //   [onChangePaintState],
  // );
  // const onTouchMoveHandler = useCallback(
  //   (e, dotIdx) => {
  //     e.preventDefault();
  //     onDotActionHandle(dotIdx);
  //   },
  //   [onDotActionHandle],
  // );

  const dotLineMaker = useCallback(() => {
    let dotLineArr = [];
    for (let i = 0; i < rowCount; i++) {
      dotLineArr.push(
        <DotPaintLine
          key={i}
          dotLineIdx={i}
          onMouseDownHandler={onMouseDownHandler}
          onMouseUpHandler={onMouseUpHandler}
          onMouseOverHandler={onMouseOverHandler}
        />,
      );
    }
    return dotLineArr;
  }, [rowCount, onMouseDownHandler, onMouseUpHandler, onMouseOverHandler]);

  return (
    <DotPaintWrapper
      onMouseLeave={(e) => onMouseUpHandler(e)}
      onMouseUp={(e) => onMouseUpHandler(e)}
      // onTouchStart={(e) => onTouchStartHandler(e)}
      // onTouchMove={(e) => onTouchMoveHandler(e)}
      onTouchEnd={(e) => onMouseUpHandler(e)}
    >
      <DotPaintBlock dotSize={dotSize} border={border}>
        <DotPaintBackground />
        {dotLineMaker()}
      </DotPaintBlock>
    </DotPaintWrapper>
  );
};

export default DotPaint;
