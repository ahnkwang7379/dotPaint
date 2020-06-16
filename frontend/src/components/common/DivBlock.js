import React, { useState } from 'react';
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
  transition: all 0.5s linear, width 0.3s linear, height 0.3s linear;
  ${(props) =>
    css`
      width: ${props.dotSize}rem;
      height: ${props.dotSize}rem;
      background: ${props.dotColor};
    `}
  ${(props) =>
    props.border &&
    css`
      border: ${props.border.size}px solid ${props.border.color};
    `}
`;
const StyledDivBlock = styled.div`
  ${divStyled}
`;

const DivBlock = ({
  number,
  dotColor,
  dotSize,
  border,
  colorLeft,
  colorRight,
  fillDotLeftColor,
  fillDotRightColor,
}) => {
  const [backgroundColor, setBackGroundColor] = useState(dotColor);
  const onLeftClick = () => {
    if (backgroundColor !== colorLeft) {
      setBackGroundColor(colorLeft);
      fillDotLeftColor(number[0], number[1]);
    }
  };
  const onRightClick = (e) => {
    e.preventDefault();
    if (backgroundColor !== colorRight) {
      setBackGroundColor(colorRight);
      fillDotRightColor(number[0], number[1]);
    }
  };
  const Dot = (
    <StyledDivBlock
      dotColor={dotColor}
      dotSize={dotSize}
      border={border}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    />
  );
  return <>{Dot} </>;
};

DivBlock.defaultProps = {
  dotColor: '#f0f0f0',
  dotSize: 0.5,
  border: { size: 0.5, color: '#d0d0fc' },
};

DivBlock.propTypes = {
  dotColor: PropTypes.string,
  dotSize: PropTypes.number,
  border: PropTypes.object,
};

export default DivBlock;
