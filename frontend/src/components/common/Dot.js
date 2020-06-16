import React from 'react';
import styled from '../dotPaint/dotHeader/styled-components';

const Stlyed = css`
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
`;

const DotStyled = styled.div`
  ${Styled}
`;

const Dot = (props) => {
  return <DotStyled {...props} />;
};

Dot.defaultProps = {
  dotColor: '#f0f0f0',
  dotSize: '0.5',
  border: '#d6d6f1',
};

export default Dot;
