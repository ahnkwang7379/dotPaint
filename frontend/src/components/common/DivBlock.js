import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const divStyled = css`
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 auto;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
  ${(props) =>
    css`
      width: ${props.dotSize}rem;
      height: ${props.dotSize}rem;
      background: ${props.dotColor};
      border: 0.01rem solid ${props.border};
    `}
  

  /* ${(props) =>
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
    props.dotColor &&
    css`
      background: ${props.dotColor};
    `}
    
  ${(props) =>
    props.border &&
    css`
      border: 0.01rem solid ${props.border};
    `} */
`;
const StyledDivBlock = styled.div`
  ${divStyled}
`;

const DivBlock = ({
  number,
  dotColor,
  dotSize,
  border,
  fillDotLeftColor,
  fillDotRightColor,
}) => {
  return (
    <StyledDivBlock
      dotColor={dotColor}
      dotSize={dotSize}
      border={border}
      onClick={() => fillDotLeftColor(number[0], number[1])}
      onContextMenu={(e) => {
        e.preventDefault();
        fillDotRightColor(number[0], number[1]);
      }}
    />
  );
};

DivBlock.defaultProps = {
  dotColor: '#f0f0f0',
  dotSize: '0.5',
  border: '#d6d6f1',
};

DivBlock.propTypes = {
  dotColor: PropTypes.string,
  dotSize: PropTypes.string,
  border: PropTypes.string,
};

export default React.memo(DivBlock);
