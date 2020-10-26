import React from 'react';
import styled from 'styled-components';
import { INITIAL_DOT_COLOR } from '../../modules/dot';

const DotStyled = styled.div.attrs(({ dotColor, dotSize, border }) => ({
  style: {
    width: dotSize + 'rem',
    height: dotSize + 'rem',
    background: dotColor || INITIAL_DOT_COLOR,
    border: `${border.size}px solid ${border.color}`,
  },
}))`
  cursor: cell;
  padding: 0;
  margin: 0 auto;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
  /* transition: all 0.3s linear, width 0.1s linear, height 0.1s linear; */
`;

const DivBlock = ({
  dotIdx,
  dotColor,
  dotSize,
  border,
  onMouseDownHandler,
  onMouseUpHandler,
  onMouseOverHandler,
  onTouchMoveHandler,
}) => {
  return (
    <DotStyled
      dotColor={dotColor}
      dotSize={dotSize}
      border={border}
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => onMouseDownHandler(e, dotIdx)}
      onMouseOver={(e) => onMouseOverHandler(e, dotIdx)}
      onMouseUp={(e) => onMouseUpHandler(e)}
      onTouchStart={(e) => onMouseDownHandler(e, dotIdx)}
      onTouchMove={(e) => onTouchMoveHandler(e, dotIdx)}
    />
  );
};

export default React.memo(DivBlock);
