import React from 'react';
import ColorPicker from '../components/colorPicker/ColorPicker';
import { useDispatch, useSelector } from 'react-redux';
import { changeColorLeft, changeColorRight } from '../modules/colorPicker';
import styled from 'styled-components';

const ColorPickerBlock = styled.div`
  display: flex;
`;

const ColorPickerContainer = () => {
  const dispatch = useDispatch();
  const { colorLeft, colorRight } = useSelector(({ colorPicker }) => ({
    colorLeft: colorPicker.colorLeft,
    colorRight: colorPicker.colorRight,
  }));

  const onChangeLeftColor = (pick) => {
    dispatch(changeColorLeft(pick));
  };

  const onChangeRightColor = (pick) => {
    dispatch(changeColorRight(pick));
  };

  return (
    <ColorPickerBlock>
      <ColorPicker
        backgroundColor={colorLeft}
        onChangeColor={onChangeLeftColor}
      />
      <ColorPicker
        backgroundColor={colorRight}
        onChangeColor={onChangeRightColor}
      />
    </ColorPickerBlock>
  );
};

export default ColorPickerContainer;
