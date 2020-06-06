import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const DotStyled = css`
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 auto;
  color: white;
  box-sizing: border-box;

  ${(props) =>
    props.size
      ? css`
          width: ${props.size}rem;
          height: ${props.size}rem;
        `
      : css`
          width: 0.5rem;
          height: 0.5rem;
        `}

  ${(props) =>
    props.dotColor
      ? css`
          background: ${props.dotColor};
        `
      : css`
          background: #f0f0f0;
        `}

    ${(props) =>
      props.border
        ? css`
            border: 0.1rem solid ${props.border};
          `
        : css`
            border: 0.1rem solid #d6d6f1;
          `}
`;

const StyledDotBlock = styled.div`
  ${DotStyled}
`;

const DotBlock = ({
  number,
  dotColor,
  dotSize,
  border,
  fillDotLeftColor,
  fillDotRightColor,
}) => {
  const [dotColor, setDotColor] = useState(dotColor);

  return <>asdasda</>;
};
// 여기 수정해야함
export default DotBlock;
