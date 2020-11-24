import React from 'react';
import styled from 'styled-components';

const ColorBox = styled.div`
  background: ${(props) => (props.color ? props.color : '#ffffff')};
  width: 50px;
  height: 50px;
`;

const PaintColor = ({ leftColor, rightColor }) => {
  return (
    <div>
      <ColorBox color={leftColor} />
      <ColorBox color={rightColor} />
    </div>
  );
};

export default PaintColor;
