import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import SketchPicker from '../common/ColorPicker';

const DotSizeChanger = ({
  dotSize,
  backgroundColor,
  onChangeDotSize,
  onChangeBackgroundColor,
}) => {
  // Slider default value / set은 쓰지 말 것
  const [defaultValue, setDefaultValue] = useState(dotSize);
  return (
    <React.Fragment>
      배경색:
      <SketchPicker
        backgroundColor={backgroundColor}
        onChangeColor={onChangeBackgroundColor}
      />
      <Slider
        defaultValue={defaultValue}
        aria-labelledby="vertical-slider"
        valueLabelDisplay="auto"
        value={dotSize}
        step={4}
        color="secondary"
        marks
        min={4}
        max={100}
        onChange={onChangeDotSize}
      />
    </React.Fragment>
  );
};

export default DotSizeChanger;
