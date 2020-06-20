import React, { useState } from 'react';
import styled from 'styled-components';
import { SketchPicker, ChromePicker } from 'react-color';

const ColorBlock = styled.div`
  margin: 0 auto;
  padding: 2px;
  cursor: pointer;
  border: 0.01rem solid #8e8e8e;
  display: inline-block;
`;

const Color = styled.div`
  border-radius: 2px;
  width: 36px;
  height: 14px;
  background: ${(props) => props.backgroundColor || 'white'};
  color: white;
  font-size: 0.5rem;
`;

const ColorPickerBlock = styled.div`
  position: absolute;
  z-index: 2;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const ColorPicker = ({ backgroundColor, onChangeColor }) => {
  const [color, setColor] = useState(backgroundColor);
  const [localColor, setLocalColor] = useState(backgroundColor);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleChange = (pick) => {
    setColor(pick.hex);
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
    if (color !== localColor) {
      setLocalColor(color);
      onChangeColor(color);
    }
  };

  return (
    <div>
      <ColorBlock onClick={handleClick}>
        <Color backgroundColor={color}>{color}</Color>
      </ColorBlock>
      {displayColorPicker ? (
        <ColorPickerBlock>
          <Cover onClick={handleClose} />
          <ChromePicker disableAlpha color={color} onChange={handleChange} />
        </ColorPickerBlock>
      ) : null}
    </div>
  );
};

export default ColorPicker;
