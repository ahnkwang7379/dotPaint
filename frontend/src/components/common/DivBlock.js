import React from 'react';
import styled, { css } from 'styled-components';
import { INITIAL_DOT_COLOR } from '../../modules/dot';

const DotStyled = styled.div`
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 auto;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.5s linear, width 0.3s linear, height 0.3s linear;
  ${(props) =>
    css`
      width: ${props.dotSize}rem;
      height: ${props.dotSize}rem;
      background: ${props.dotColor || INITIAL_DOT_COLOR};
    `}
  ${(props) =>
    props.border &&
    css`
      border: ${props.border.size}px solid ${props.border.color};
    `}
`;

const DivBlock = ({
  rowIdx,
  columnIdx,
  dotColor,
  dotSize,
  border,
  onDotSelect,
}) => {
  const onLeftClick = () => {
    onDotSelect(rowIdx, columnIdx);
  };
  const Dot = (
    <DotStyled
      dotColor={dotColor}
      dotSize={dotSize}
      border={border}
      onMouseDown={onLeftClick}
      onMouseOver={onLeftClick}
      onClick={onLeftClick}
    />
  );
  return <>{Dot} </>;
};

export default React.memo(DivBlock);
