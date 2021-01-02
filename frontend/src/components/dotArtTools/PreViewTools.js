import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import CustomButton from '../../components/common/CustomButton';
import {
  MdFullscreen,
  MdFullscreenExit,
  MdPlayArrow,
  MdPause,
  MdContentCopy,
} from 'react-icons/md';
import Slider from '@material-ui/core/Slider';
import Preview from '../common/Preview';
import {
  layerListMerge,
  mergeLayersByDotFrameList,
} from '../../util/dotArrayUtil';
import White from '../../img/white.png';
import Black from '../../img/black.png';

const PreviewWrapper = styled.div`
  background-image: ${(props) =>
    props.backgroundImg === 1 ? `url(${White})` : `url(${Black})`};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 2px solid #9e9e9e;
`;

const PreviewBlock = styled.div`
  width: ${(props) =>
    props.zoomIn
      ? `${props.columnCount * props.pixelSize * 2}px`
      : `${props.columnCount * props.pixelSize}px`};
  height: ${(props) =>
    props.zoomIn
      ? `${props.rowCount * props.pixelSize * 2}px`
      : `${props.rowCount * props.pixelSize}px`};
  max-width: 200px;
  max-height: 200px;
  overflow: hidden;
  border: 3px solid orange;
  box-sizing: content-box;
`;

const ButtonBox = styled.div`
  z-index: 10;
  position: absolute;
  display: flex;
  width: 80px;
  height: 30px;
  top: 0.5rem;
  right: 0.5rem;
  opacity: ${(props) => (props.hovered ? 1 : 0)};
  transition: opacity 0.3s;
  & > * {
    margin: 0px 2px;
  }
`;

const StyledButton = styled(CustomButton)`
  width: 32px;
  height: 22px;
  padding: 0;
  box-shadow: 0 0.2rem #666;
  font-size: 14px;
  border-radius: 0.3rem;

  ${(props) =>
    props.selected === true &&
    css`
      color: #fff;
      background: ${(props) =>
        props.selectColor ? `${props.selectColor}` : `skyblue`};
      box-shadow: 0 0.05rem #666;
      transform: translateY(4px);
    `}
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
  dotFrameList,
  layerList,
  rowCount,
  columnCount,
  layerData,
  backgroundImg,
  handleOpenDialog,
  handleChangeAnimationDuration,
}) => {
  const [play, setPlay] = useState(true);
  const [zoomIn, setZoomIn] = useState(false);
  const [hoverPreviewBox, setHoverPreviewBox] = useState(false);
  // dotList는 애니메이션때문에 넣어둠
  const [dotList, setDotList] = useState(
    mergeLayersByDotFrameList(dotFrameList, layerData),
  );
  const [pixelSize, setPixelSize] = useState();

  useEffect(() => {
    setDotList(mergeLayersByDotFrameList(dotFrameList, layerData));
  }, [play, dotFrameList, layerData]);

  useEffect(() => {
    const newPixelSize = Math.floor(
      columnCount > rowCount ? 100 / columnCount : 100 / rowCount,
    );
    if (newPixelSize !== pixelSize) {
      setPixelSize(newPixelSize);
      if (newPixelSize === 0) {
        setPixelSize(1);
      }
    }
  }, [rowCount, columnCount, pixelSize]);

  const togglePlay = () => {
    setPlay(!play);
  };

  const toggleZoom = () => {
    setZoomIn(!zoomIn);
  };

  const onChangeAnimationDuration = (e, newValue) => {
    handleChangeAnimationDuration(newValue);
  };

  const onChangeHoverPreviewBox = (bool) => {
    setHoverPreviewBox(bool);
  };

  return (
    <div
      onMouseOver={() => onChangeHoverPreviewBox(true)}
      onMouseOut={() => onChangeHoverPreviewBox(false)}
    >
      <ButtonBox hovered={hoverPreviewBox}>
        <StyledButton
          onClick={togglePlay}
          selected={play}
          selectColor="#f05556"
          color={play ? '#b71b2d' : '#008000'}
          baseColor="#3db12a"
        >
          {play ? <MdPause /> : <MdPlayArrow />}
        </StyledButton>

        <StyledButton onClick={toggleZoom}>
          {zoomIn ? <MdFullscreenExit /> : <MdFullscreen />}
        </StyledButton>

        <StyledButton onClick={() => handleOpenDialog('Preview')}>
          <MdContentCopy />
        </StyledButton>
      </ButtonBox>
      <PreviewWrapper backgroundImg={backgroundImg}>
        <PreviewBlock
          zoomIn={zoomIn}
          pixelSize={pixelSize}
          columnCount={columnCount}
          rowCount={rowCount}
        >
          {!play && (
            <Preview
              dotSet={layerListMerge(layerList, layerData)}
              column={columnCount}
              size={zoomIn ? pixelSize * 2 : pixelSize}
            />
          )}
          {play && (
            <Preview
              dotList={dotList}
              column={columnCount}
              size={zoomIn ? pixelSize * 2 : pixelSize}
              animation={play}
              duration={animationDuration}
            />
          )}
        </PreviewBlock>
      </PreviewWrapper>
      <SliderBox>
        <SliderSpan>Duration {animationDuration}S</SliderSpan>
        <Slider
          defaultValue={2}
          aria-labelledby="vertical-slider"
          valueLabelDisplay="auto"
          step={1}
          color="secondary"
          min={1}
          max={10}
          onChange={onChangeAnimationDuration}
        />
      </SliderBox>
    </div>
  );
};

export default React.memo(PreViewTools);
