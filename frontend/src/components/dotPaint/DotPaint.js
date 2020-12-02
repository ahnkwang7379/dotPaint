import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import DotPaintLine from './DotPaintLine';
import DotPaintBackground from './DotPaintBackground';

const DotPaintBox = styled.div`
  width: 100%;
  max-width: 100%;
  height: 90vh;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  background: #afafaf;
  padding: 16px;
  margin-right: 8px;
`;

const DotPaintWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  touch-action: none;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const DotPaintBlock = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  flex-direction: column;
  width: auto;
  height: fit-content;
  background: ${(props) =>
    props.backgroundColor ? props.backgroundColor : '#000000'};
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  & > * {
    display: flex;
    & > * {
      z-index: 99;
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
  backgroundColor,
  rowCount,
  onWheelHandler,
  onChangePaintState,
  onSetDirection,
  onDotActionHandle,
}) => {
  const [lock, setLock] = useState(false);
  const lockHandle = () => {
    setLock(!lock);
    console.log(!lock);
  };

  useEffect(() => {
    let paintBox = document.getElementById('paintBox');
    let lockedX = paintBox.scrollTop;
    let lockedY = paintBox.scrollLeft;

    const lockTest = (e) => {
      let paintBox = document.getElementById('paintBox');
      if (lock) {
        paintBox.scrollTo(lockedX, lockedY);
        e.preventDefault();
      }
    };

    if (lock) {
      paintBox.addEventListener('scroll', lockTest, false);
    }

    return () => {
      paintBox.removeEventListener('scroll', lockTest, false);
    };
  }, [lock]);

  const onMouseDownHandler = useCallback(
    (e, rowIdx, columnIdx) => {
      e.preventDefault();
      onSetDirection(e.button === 0 ? 'LEFT' : 'RIGHT');
      onChangePaintState('DRAGGING');
      onDotActionHandle(rowIdx, columnIdx);
    },
    [onChangePaintState, onDotActionHandle, onSetDirection],
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
    <DotPaintBox
      onWheel={(e) => (lock ? onWheelHandler(e) : console.log('is lock'))}
    >
      <button onClick={lockHandle}>asdf?</button>
      <DotPaintWrapper
        id="paintBox"
        onMouseLeave={(e) => onMouseUpHandler(e)}
        onMouseUp={(e) => onMouseUpHandler(e)}
        // onTouchStart={(e) => onTouchStartHandler(e)}
        // onTouchMove={(e) => onTouchMoveHandler(e)}
        // onTouchEnd={(e) => onMouseUpHandler(e)}
      >
        <DotPaintBlock
          dotSize={dotSize}
          border={border}
          backgroundColor={backgroundColor}
        >
          <DotPaintBackground />
          {dotLineMaker()}
        </DotPaintBlock>
      </DotPaintWrapper>
    </DotPaintBox>
  );
};

export default React.memo(DotPaint);
