import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import DotPaintLine from './DotPaintLine';
import DotLayerContainer from '../../containers/dotPaint/DotLayerContainer';
import White from '../../img/white.png';
import Black from '../../img/black.png';

const DotPaintWrapper = styled.div`
  width: 100%;
  height: 90vh;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  background: #afafaf;
  /* padding: 16px; */
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
  background-image: ${(props) =>
    props.backgroundImg === 1 ? `url(${White})` : `url(${Black})`};
  display: inline-flex;
  justify-content: flex-start;
  flex-direction: column;
  width: auto;
  height: fit-content;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  ${(props) =>
    css`
      border: ${props.borderSize}px solid ${props.borderColor};
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
        css`
          border: ${props.borderSize}px solid ${props.borderColor};
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
  columnCount,
  backgroundImg,
  onWheelHandle,
  onChangePaintStateHandle,
  onDotActionHandle,
  onSetDirectionHandle,
  onLeavesPaintAreaHandle,
}) => {
  useEffect(() => {
    const paintBox = document.getElementById('paintBox');

    const preventDefault = (e) => {
      e.preventDefault();
    };

    paintBox.addEventListener('wheel', preventDefault);

    return () => {
      paintBox.removeEventListener('wheel', preventDefault);
    };
  }, []);

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
  }, [rowCount, onMouseDownHandler, onMouseOverHandler]);

  return (
    <DotPaintWrapper
      onWheel={(e) => onWheelHandle(e)}
      onContextMenu={(e) => e.preventDefault()}
    >
      <DotPaintBox id="paintBox">
        <DotPaintBlock
          dotSize={dotSize}
          borderColor={border.color}
          borderSize={dotSize > 16 ? border.size : dotSize > 4 ? 1 : 0}
          backgroundImg={backgroundImg}
          onMouseLeave={onLeavesPaintAreaHandle}
          onMouseDownCapture={onMouseDownHandler} // 캡쳐링으로 state를 먼저 바꿔줘야함
          onContextMenu={(e) => e.preventDefault()}
        >
          <DotLayerContainer />
          {dotLineMaker()}
        </DotPaintBlock>
      </DotPaintBox>
    </DotPaintWrapper>
  );
};

export default React.memo(DotPaint);
