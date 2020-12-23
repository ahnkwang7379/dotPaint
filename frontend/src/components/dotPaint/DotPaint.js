import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import DotPaintLine from './DotPaintLine';
import DotLayerContainer from '../../containers/dotPaint/DotLayerContainer';
import White from '../../img/white.png';

const DotPaintWrapper = styled.div`
  width: 100%;
  height: 90vh;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  background: #afafaf;
  padding: 16px;
  margin-right: 8px;
  // align-items: center;
`;

const DotPaintBox = styled.div`
  display: flex;
  box-sizing: border-box;
  touch-action: none;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
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
  background-image: url(${White});
  display: inline-flex;
  justify-content: flex-start;
  flex-direction: column;
  width: auto;
  height: fit-content;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  ${(props) =>
    props.border &&
    css`
      border: ${props.border.size}px solid ${props.border.color};
    `};
  & > :nth-child(n + 2) {
    display: flex;
    & > * {
      z-index: 99;
      cursor: cell;
      box-sizing: border-box;
      :hover {
        background: rgba(255, 255, 255, 0.2);
      }
      ${(props) =>
        props.border &&
        css`
          border: ${props.border.size}px solid ${props.border.color};
          width: ${props.dotSize}px;
          height: ${props.dotSize}px;
          min-width: ${props.dotSize}px;
          min-height: ${props.dotSize}px;
        `};
    }
  }
`;

const ScrollLockButton = styled.button`
  width: 240px;
  height: 40px;
`;

const DotPaint = ({
  border,
  dotSize,
  rowCount,
  onWheelHandle,
  onChangePaintStateHandle,
  onDotActionHandle,
  onSetDirectionHandle,
  onLeavesPaintAreaHandle,
}) => {
  // const [lock, setLock] = useState(false);
  // const lockHandle = () => {
  //   setLock(!lock);
  //   console.log(!lock);
  // };

  // useEffect(() => {
  //   const paintBox = document.getElementById('paintBox');
  //   const lockedX = paintBox.scrollTop;
  //   const lockedY = paintBox.scrollLeft;

  //   console.log(paintBox.scrollHeight);
  //   console.log(paintBox.scrollWidth);

  //   const lockTest = (e) => {
  //     let paintBox = document.getElementById('paintBox');
  //     if (lock) {
  //       paintBox.scrollTo(lockedX, lockedY);
  //       e.preventDefault();
  //     }
  //   };

  //   if (lock) {
  //     paintBox.addEventListener('scroll', lockTest, false);
  //   }

  //   return () => {
  //     paintBox.removeEventListener('scroll', lockTest, false);
  //   };
  // }, [lock]);

  const onMouseDownHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (e.button === 1) return;

      onSetDirectionHandle(e.button === 0 ? 'LEFT' : 'RIGHT');
      onChangePaintStateHandle('DRAGGING');
    },
    [onChangePaintStateHandle, onSetDirectionHandle],
  );
  const onMouseOverHandler = useCallback(
    (e, rowIdx, columnIdx) => {
      e.preventDefault();
      onDotActionHandle(rowIdx, columnIdx);
    },
    [onDotActionHandle],
  );

  const dotLineMaker = useCallback(() => {
    let dotLineArr = [];
    for (let i = 0; i < rowCount; i++) {
      dotLineArr.push(
        <DotPaintLine
          key={i}
          dotLineIdx={i}
          onMouseDownHandler={onMouseDownHandler}
          onMouseOverHandler={onMouseOverHandler}
        />,
      );
    }
    return dotLineArr;
    // }, [rowCount, onMouseDownHandler, onMouseUpHandler, onMouseOverHandler]);
  }, [rowCount, onMouseDownHandler, onMouseOverHandler]);

  return (
    <DotPaintWrapper
      // onWheel={(e) => (lock ? onWheelHandle(e) : console.log('not lock'))}
      onWheel={(e) => onWheelHandle(e)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* <ScrollLockButton onClick={lockHandle}>Scroll Lock?</ScrollLockButton> */}
      <DotPaintBox
        id="paintBox"
        // onMouseLeave={(e) => onMouseUpHandler(e)}
        // onMouseUp={(e) => onMouseUpHandler(e)}
      >
        <DotPaintBlock
          dotSize={dotSize}
          border={border}
          onMouseLeave={onLeavesPaintAreaHandle}
          onMouseDownCapture={onMouseDownHandler} // 캡쳐링으로 state를 먼저 바꿔줘야함
          onContextMenu={(e) => e.preventDefault()}
        >
          <DotLayerContainer />
          {/* <TestLayerContainer /> */}
          {dotLineMaker()}
        </DotPaintBlock>
      </DotPaintBox>
    </DotPaintWrapper>
  );
};

export default React.memo(DotPaint);
