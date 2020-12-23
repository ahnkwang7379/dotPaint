import React, { useState } from 'react';
import styled from 'styled-components';
import PreviewBox from './PreviewBox';
import CustomButton from '../../components/common/CustomButton';
import {
  MdFullscreen,
  MdFullscreenExit,
  MdPlayArrow,
  MdPause,
  MdContentCopy,
} from 'react-icons/md';
import Slider from '@material-ui/core/Slider';

const ButtonBox = styled.div`
  display: flex;
  width: 100px;
  height: 30px;
`;

const SliderBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  background: #afafaf;
  padding: 8px;
  font-size: 8px;
`;

const SliderSpan = styled.div`
  font-size: 12px;
  line-height: 26px;
  margin-right: 8px;
  white-space: nowrap;
`;

const PreViewTools = ({
  animationDuration,
  handleOpenDialog,
  handleChangeAnimationDuration,
}) => {
  const [play, setPlay] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);

  const togglePlay = () => {
    setPlay(!play);
  };

  const toggleZoom = () => {
    setZoomIn(!zoomIn);
  };

  const onChangeAnimationDuration = (e, newValue) => {
    handleChangeAnimationDuration(newValue);
  };

  return (
    <React.Fragment>
      <PreviewBox
        zoomIn={zoomIn}
        animation={play}
        animationDuration={animationDuration}
      />
      <SliderBox>
        <SliderSpan>Duration {animationDuration}S</SliderSpan>
        <Slider
          defaultValue={1}
          aria-labelledby="vertical-slider"
          valueLabelDisplay="auto"
          step={1}
          color="secondary"
          min={1}
          max={10}
          onChange={onChangeAnimationDuration}
        />
      </SliderBox>
      <ButtonBox>
        <CustomButton
          onClick={togglePlay}
          selected={play}
          selectColor="#f05556"
          color={play ? '#b71b2d' : '#008000'}
          baseColor="#3db12a"
        >
          {play ? <MdPause /> : <MdPlayArrow />}
        </CustomButton>

        <CustomButton onClick={toggleZoom}>
          {zoomIn ? <MdFullscreenExit /> : <MdFullscreen />}
        </CustomButton>

        <CustomButton onClick={() => handleOpenDialog('Preview')}>
          <MdContentCopy />
        </CustomButton>
      </ButtonBox>
    </React.Fragment>
  );
};

export default React.memo(PreViewTools);
