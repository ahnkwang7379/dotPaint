import React from 'react';
import styled, { css } from 'styled-components';

const divStyled = css`
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 auto;
  color: white;
  font-size: 1rem;
  width: 0.5rem;
  height: 0.5rem;
  box-sizing: border-box;

  ${(props) =>
    props.size &&
    css`
      width: ${props.size};
      height: ${props.size};
    `}

  ${(props) =>
    props.dotColor &&
    css`
      background: ${props.dotColor};
    `}
    
  ${(props) =>
    props.border &&
    css`
      border: 0.01rem solid ${props.border};
    `}
`;

const StyledDivBlock = styled.div`
  ${divStyled}
`;

const DivBlock = ({
  number,
  dotColor,
  size,
  border,
  fillDotLeftColor,
  fillDotRightColor,
}) => {
  return (
    <>
      <StyledDivBlock
        dotColor={dotColor}
        size={size}
        border={border}
        onClick={() => fillDotLeftColor(number[0], number[1])}
        onContextMenu={(e) => {
          e.preventDefault();
          fillDotRightColor(number[0], number[1]);
        }}
      />
    </>
  );
};

export default React.memo(DivBlock);
