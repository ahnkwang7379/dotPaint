import React, { useState } from 'react';
import styled from 'styled-components';
import Preview from '../common/Preview';
import CustomButton from '../../components/common/CustomButton';
import {
  MdFullscreen,
  MdFullscreenExit,
  MdPlayArrow,
  MdPause,
  MdContentCopy,
} from 'react-icons/md';

const PreviewWrapper = styled.div`
  display: flex;
`;

const Box = styled.div``;

const ButtonBox = styled.div`
  display: flex;
  width: 100px;
  height: 30px;
`;

const PreviewBlock = styled.div`
  margin-top: 5px;
  width: ${(props) =>
    props.zoomIn ? `${props.columnCount * 8}px` : `${props.columnCount * 4}px`};
  height: ${(props) =>
    props.zoomIn ? `${props.rowCount * 8}px` : `${props.rowCount * 4}px`};
`;

const InputStyle = styled.input`
  width: 72px;
  height: 24px;
  font-size: 16px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  &:focus {
    background: rgba(230, 230, 230, 1);
    color: rgba(0, 0, 0, 0.7);
  }
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const PreViewTools = ({
  dotSet,
  dotList,
  rowCount,
  columnCount,
  animationDuration,
  pixelSize,
  handleOpenDialog,
  handleChangeAnimationDuration,
  handelChangePixelSize,
}) => {
  const [play, setPlay] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);

  const togglePlay = () => {
    setPlay(!play);
  };

  const toggleZoom = () => {
    setZoomIn(!zoomIn);
  };

  const onChangeAnimationDuration = (e) => {
    setPlay(false);
    if (e.target.value <= 0 || e.target.value === '') {
      handleChangeAnimationDuration(0);
    } else {
      handleChangeAnimationDuration(e.target.value);
    }
  };

  const onChangePixelSize = (e) => {
    handelChangePixelSize(e.target.value);
  };

  return (
    <PreviewWrapper>
      <Box>
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
        <PreviewBlock
          zoomIn={zoomIn}
          rowCount={rowCount}
          columnCount={columnCount}
        >
          <Preview
            dotSet={dotSet}
            dotList={dotList}
            column={columnCount}
            size={zoomIn ? 8 : 4}
            animation={play}
            duration={animationDuration}
          />
        </PreviewBlock>
      </Box>
      <div>
        <InputStyle
          value={animationDuration}
          type="number"
          onChange={(e) => onChangeAnimationDuration(e)}
        />
        <InputStyle
          value={pixelSize}
          type="number"
          onChange={(e) => onChangePixelSize(e)}
        />
      </div>
    </PreviewWrapper>
  );
};

export default React.memo(PreViewTools);
