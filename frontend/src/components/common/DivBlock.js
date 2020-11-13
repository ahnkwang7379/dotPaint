import React from 'react';
import styled, { css } from 'styled-components';
import { INITIAL_DOT_COLOR } from '../../modules/dot';

const DotStyled = styled.div`
  border: none;
  cursor: cell;
  padding: 0;
  margin: 0 auto;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
  /* transition: all 0.3s linear, width 0.1s linear, height 0.1s linear; */
  ${(props) =>
    css`
      background: ${props.dotColor || INITIAL_DOT_COLOR};
    `}
`;

const DivBlock = ({
  rowIdx,
  columnIdx,
  dotColor,
  onMouseDownHandler,
  onMouseUpHandler,
  onMouseOverHandler,
  // onTouchMoveHandler,
}) => {
  return (
    <DotStyled
      dotColor={dotColor}
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => onMouseDownHandler(e, rowIdx, columnIdx)}
      onMouseOver={(e) => onMouseOverHandler(e, rowIdx, columnIdx)}
      onMouseUp={(e) => onMouseUpHandler(e)}
      // onTouchStart={(e) => onMouseDownHandler(e, dotIdx)}
      // onTouchMove={(e) => onTouchMoveHandler(e, dotIdx)}
    />
  );
};

export default React.memo(DivBlock);
