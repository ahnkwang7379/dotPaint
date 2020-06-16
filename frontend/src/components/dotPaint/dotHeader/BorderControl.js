import React from 'react';
import styled from 'styled-components';
import SketchPicker from '../../common/SketchPicker';

const BorderBox = styled.div`
  display: flex;
`;
const BorderRangeBar = styled.input``;

const BorderControl = ({
  borderSize,
  onSizeChange,
  backgroundColor,
  onChangeColor,
}) => {
  return (
    <BorderBox>
      <span>테두리 크기 : {borderSize}px</span>
      <BorderRangeBar
        type="range"
        min="0"
        max="50"
        value={borderSize * 10}
        onChange={onSizeChange}
        step="5"
      />
      색상:
      <SketchPicker
        backgroundColor={backgroundColor}
        onChangeColor={onChangeColor}
      />
    </BorderBox>
  );
};

export default BorderControl;
