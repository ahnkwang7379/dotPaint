import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ToolTip from '../common/ToolTip';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > span {
    &:hover {
      color: #db3e00;
    }
  }
`;

const ColorBox = styled.div`
  background: ${(props) => (props.color ? props.color : '#ffffff')};
  width: 50px;
  height: 50px;
  border: 3px solid #a69e94;
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
  colorShortcut,
  changeLeftColorHandle,
  changeRightColorHandle,
  swapLeftRightColorHandle,
}) => {
  const [displayLeftColorPicker, setDisplayLeftColorPicker] = useState(false);
  const [displayRightColorPicker, setDisplayRightColorPicker] = useState(false);
  const [leftSelectColor, setLeftSelectColor] = useState('');
  const [rightSelectColor, setRightSelectColor] = useState('');

  const [leftPresetColors, setLeftPresetColors] = useState(['#000000']);
  const [rightPresetColors, setRightPresetColors] = useState(['#ffffff']);

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
      if (
        leftPresetColors.filter((color) => color === leftSelectColor).length ===
        0
      ) {
        let leftPreset = leftPresetColors.concat(leftSelectColor);
        if (leftPreset.length > 8) {
          leftPreset.shift();
        }
        setLeftPresetColors(leftPreset);
      }
      changeLeftColorHandle(leftSelectColor);
    } else {
      setDisplayRightColorPicker(false);
      if (
        rightPresetColors.filter((color) => color === rightSelectColor)
          .length === 0
      ) {
        let rightPreset = rightPresetColors.concat(rightSelectColor);
        if (rightPreset.length > 8) {
          rightPreset.shift();
        }
        setRightPresetColors(rightPreset);
      }
      changeRightColorHandle(rightSelectColor);
    }
  };

  return (
    <Wrapper>
      <div>
        <ColorBox
          onClick={() => handleOpenColorPicker('LEFT')}
          color={leftSelectColor}
        />
        {displayLeftColorPicker && (
          <ColorPickerBlock>
            <Cover onClick={() => handleClose('LEFT')} />
            <SketchPicker
              presetColors={leftPresetColors}
              disableAlpha
              color={leftSelectColor}
              onChange={handleLeftColorChange}
            />
          </ColorPickerBlock>
        )}
      </div>
      <ToolTip
        placement="top"
        tooltip={
          <div>
            Swap left right color
            <span className="tooltip-shortcut">{`(${colorShortcut['SWAP'].key})`}</span>
          </div>
        }
      >
        <SwapHorizIcon onClick={swapLeftRightColorHandle} fontSize="large" />
      </ToolTip>
      <div>
        <ColorBox
          onClick={() => handleOpenColorPicker('RIGHT')}
          color={rightSelectColor}
        />
        {displayRightColorPicker && (
          <ColorPickerBlock>
            <Cover onClick={() => handleClose('RIGHT')} />
            <SketchPicker
              presetColors={rightPresetColors}
              disableAlpha
              color={rightSelectColor}
              onChange={handleRightColorChange}
            />
          </ColorPickerBlock>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(PaintColor);
