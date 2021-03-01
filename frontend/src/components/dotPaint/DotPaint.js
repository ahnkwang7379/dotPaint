import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import DotPaintLine from './DotPaintLine';
import DotLayerContainer from '../../containers/dotPaint/DotLayerContainer';
import White from '../../img/white.png';
import Black from '../../img/black.png';

const DotPaintWrapper = styled.div`
  z-index: 0;
  width: 100%;
  height: 92vh;
  max-height: 92vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  background: #a69e94;
  margin-right: 8px;
`;

const DotPaintBox = styled.div`
  display: flex;
  box-sizing: border-box;
  touch-action: none;
  overflow: auto;
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

const DotLines = React.memo(
  ({ rowCount, onMouseDownHandler, onMouseOverHandler }) => {
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
  },
);

const DotPaint = ({
  border,
  dotSize,
  rowCount,
  backgroundImg,
  onWheelHandle,
  onChangePaintStateHandle,
  onDotActionHandle,
  onSetDirectionHandle,
  onLeavesPaintAreaHandle,
}) => {
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

  return (
    <DotPaintWrapper
      onWheel={(e) => onWheelHandle(e)}
      onContextMenu={(e) => e.preventDefault()}
    >
      <DotPaintBox id="paintBox">
        <DotPaintBlock
          dotSize={dotSize}
          borderColor={border.color}
          borderSize={
            border.size === 0 || dotSize < 5
              ? 0
              : dotSize < 17
              ? 1
              : border.size
          }
          backgroundImg={backgroundImg}
          onMouseLeave={onLeavesPaintAreaHandle}
          onMouseDownCapture={onMouseDownHandler} // 캡쳐링으로 state를 먼저 바꿔줘야함
          onContextMenu={(e) => e.preventDefault()}
        >
          <DotLayerContainer />
          <DotLines
            rowCount={rowCount}
            onMouseDownHandler={onMouseDownHandler}
            onMouseOverHandler={onMouseOverHandler}
          />
        </DotPaintBlock>
      </DotPaintBox>
    </DotPaintWrapper>
  );
};

export default React.memo(DotPaint);
