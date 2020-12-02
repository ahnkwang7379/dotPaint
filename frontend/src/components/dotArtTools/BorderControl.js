import React, { useState } from 'react';
import styled from 'styled-components';
import SketchPicker from '../common/ColorPicker';
import Slider from '@material-ui/core/Slider';

const ColorBox = styled.div`
  display: flex;
`;

const BorderControl = ({
  borderSize,
  backgroundColor,
  onChangeDotBorderSize,
  onChangeBorderColor,
}) => {
  // Slider default value / set은 쓰지 말 것
  const [defaultValue, setDefaultValue] = useState(borderSize);

  return (
    <React.Fragment>
      <ColorBox>
        <label>색상</label>
        <SketchPicker
          backgroundColor={backgroundColor}
          onChangeColor={onChangeBorderColor}
        />
      </ColorBox>
      <Slider
        defaultValue={defaultValue}
        aria-labelledby="vertical-slider"
        valueLabelDisplay="auto"
        value={borderSize}
        step={0.5}
        color="secondary"
        marks
        min={0}
        max={5}
        onChange={onChangeDotBorderSize}
      />
    </React.Fragment>
  );
};

export default BorderControl;
