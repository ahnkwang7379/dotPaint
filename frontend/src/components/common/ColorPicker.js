import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChromePicker, BlockPicker, TwitterPicker } from 'react-color';

const ColorBlock = styled.div`
  margin: 0 auto;
  padding: 2px;
  cursor: pointer;
  border: 0.01rem solid #8e8e8e;
  display: inline-block;
`;

const Color = styled.div.attrs((props) => ({
  style: {
    background: props.backgroundColor,
  },
}))`
  border-radius: 2px;
  width: 24px;
  height: 16px;
  color: white;
  font-size: 0.5rem;
  text-align: center;
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

  useEffect(() => {
    setColor(backgroundColor);
  }, [backgroundColor]);

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
        <Color backgroundColor={color} />
      </ColorBlock>
      {displayColorPicker ? (
        <ColorPickerBlock>
          <Cover onClick={handleClose} />
          {/* <ChromePicker disableAlpha color={color} onChange={handleChange} /> */}
          <TwitterPicker
            triangle={`top-right`}
            color={color}
            onChange={handleChange}
          />
        </ColorPickerBlock>
      ) : null}
    </div>
  );
};

export default React.memo(ColorPicker);
