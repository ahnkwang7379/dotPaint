import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SketchPicker, ChromePicker } from 'react-color';

const Wrapper = styled.div`
  display: flex;
`;

const LeftClickBox = styled.div`
  z-index: 10;
`;

const RightClickBox = styled.div`
  z-index: 9;
  margin-top: 24px;
  margin-left: -16px;
`;

const ColorBox = styled.div`
  background: ${(props) => (props.color ? props.color : '#ffffff')};
  width: 40px;
  height: 40px;
  border: 3px solid #afafaf;
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

const PaintColor = ({
  leftColor,
  rightColor,
  changeLeftColor,
  changeRightColor,
}) => {
  const [displayLeftColorPicker, setDisplayLeftColorPicker] = useState(false);
  const [displayRightColorPicker, setDisplayRightColorPicker] = useState(false);
  const [leftSelectColor, setLeftSelectColor] = useState('');
  const [rightSelectColor, setRightSelectColor] = useState('');

  useEffect(() => {
    setLeftSelectColor(leftColor);
    setRightSelectColor(rightColor);
  }, [leftColor, rightColor]);

  const handleLeftColorChange = (pick) => {
    setLeftSelectColor(pick.hex);
  };

  const handleRightColorChange = (pick) => {
    setRightSelectColor(pick.hex);
  };

  const handleOpenColorPicker = (type) => {
    if (type === 'LEFT') {
      setDisplayLeftColorPicker(!displayLeftColorPicker);
    } else {
      setDisplayRightColorPicker(!displayRightColorPicker);
    }
  };

  const handleClose = (type) => {
    if (type === 'LEFT') {
      setDisplayLeftColorPicker(false);
      changeLeftColor(leftSelectColor);
    } else {
      setDisplayRightColorPicker(false);
      changeRightColor(rightSelectColor);
    }
  };

  return (
    <Wrapper>
      <LeftClickBox>
        <ColorBox
          onClick={() => handleOpenColorPicker('LEFT')}
          color={leftSelectColor}
        />
        {displayLeftColorPicker ? (
          <ColorPickerBlock>
            <Cover onClick={() => handleClose('LEFT')} />
            <ChromePicker
              disableAlpha
              color={leftSelectColor}
              onChange={handleLeftColorChange}
            />
          </ColorPickerBlock>
        ) : null}
      </LeftClickBox>
      <RightClickBox>
        <ColorBox
          onClick={() => handleOpenColorPicker('RIGHT')}
          color={rightSelectColor}
        />
        {displayRightColorPicker ? (
          <ColorPickerBlock>
            <Cover onClick={() => handleClose('RIGHT')} />
            <ChromePicker
              disableAlpha
              color={rightSelectColor}
              onChange={handleRightColorChange}
            />
          </ColorPickerBlock>
        ) : null}
      </RightClickBox>
    </Wrapper>
  );
};

export default React.memo(PaintColor);
