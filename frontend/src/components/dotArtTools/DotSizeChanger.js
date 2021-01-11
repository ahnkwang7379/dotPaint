import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';

const DotSizeChanger = ({ dotSize, onChangeDotSize }) => {
  const [defaultValue] = useState(dotSize);
  return (
    <React.Fragment>
      <Slider
        defaultValue={defaultValue}
        aria-labelledby="vertical-slider"
        valueLabelDisplay="auto"
        value={dotSize}
        step={2}
        color="secondary"
        min={4}
        max={100}
        onChange={onChangeDotSize}
      />
    </React.Fragment>
  );
};

export default DotSizeChanger;
