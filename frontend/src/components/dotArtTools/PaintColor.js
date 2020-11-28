import React, { useState } from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

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

  const handleLeftColorChange = (pick) => {
    changeLeftColor(pick.hex);
  };

  const handleRightColorChange = (pick) => {
    changeRightColor(pick.hex);
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
    } else {
      setDisplayRightColorPicker(false);
    }
  };

  return (
    <Wrapper>
      <LeftClickBox>
        <ColorBox
          onClick={() => handleOpenColorPicker('LEFT')}
          color={leftColor}
        />
        {displayLeftColorPicker ? (
          <ColorPickerBlock>
            <Cover onClick={() => handleClose('LEFT')} />
            <SketchPicker
              disableAlpha
              color={leftColor}
              onChange={handleLeftColorChange}
            />
          </ColorPickerBlock>
        ) : null}
      </LeftClickBox>
      <RightClickBox>
        <ColorBox
          onClick={() => handleOpenColorPicker('RIGHT')}
          color={rightColor}
        />
        {displayRightColorPicker ? (
          <ColorPickerBlock>
            <Cover onClick={() => handleClose('RIGHT')} />
            <SketchPicker
              disableAlpha
              color={rightColor}
              onChange={handleRightColorChange}
            />
          </ColorPickerBlock>
        ) : null}
      </RightClickBox>
    </Wrapper>
  );
};

export default React.memo(PaintColor);
