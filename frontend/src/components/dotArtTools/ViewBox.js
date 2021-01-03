import React from 'react';
import styled, { css } from 'styled-components';

const ViewDiv = styled.div`
  position: absolute;
  border: 2px solid red;
  z-index: 3;
  ${(props) => css`
    top: ${props.viewTop}px;
    left: ${props.viewLeft}px;
    height: ${props.viewHeight}px;
    width: ${props.viewWidth}px;
  `}
`;

const ViewBox = ({ top, left, width, height }) => {
  return (
    <ViewDiv
      viewTop={top}
      viewLeft={left}
      viewHeight={height}
      viewWidth={width}
    />
  );
};

export default ViewBox;
