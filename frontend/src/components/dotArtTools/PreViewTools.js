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
import ToolTip from '../common/ToolTip';
import White from '../../img/white.png';
import Black from '../../img/black.png';

const PreviewToolsWrapper = styled.div`
  border: 2px solid #59564f;
  border-radius: 3px;
`;

const PreviewWrapper = styled.div`
  background-color: #a69e94;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  overflow: hidden;
`;

const ButtonBox = styled.div`
  z-index: 10;
  position: absolute;
  display: flex;
  width: 80px;
  height: 30px;
  top: 0.5rem;
  left: 1rem;
  opacity: ${(props) => (props.hovered ? 1 : 0)};
  transition: opacity 0.3s;
  & > * {
    margin: 0px 2px;
  }
`;

const StyledButton = styled(CustomButton)`
  width: 22px;
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
  width: 200px;
  height: 40px;
  display: flex;
  background: #f2e8dc;
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
  const [zoomIn, setZoomIn] = useState(true);
  const [pixelSize, setPixelSize] = useState(1);
  const [hoverPreviewBox, setHoverPreviewBox] = useState(false);
  // dotList는 애니메이션때문에 넣어둠
  const [dotList, setDotList] = useState(
    mergeLayersByDotFrameList(dotFrameList, layerData),
  );

  useEffect(() => {
    setDotList(mergeLayersByDotFrameList(dotFrameList, layerData));
  }, [play, dotFrameList, layerData]);

  useEffect(() => {
    const previewBlock = document.getElementById('previewBlock');

    let maxSize = zoomIn ? 200 : 100;
    let pixel =
      rowCount < columnCount ? maxSize / columnCount : maxSize / rowCount;
    setPixelSize(pixel);

    previewBlock.style.backgroundImage = backgroundImg
      ? `url(${White})`
      : `url(${Black})`;
    previewBlock.style.position = 'absolute';
    previewBlock.style.width = `${Math.min(pixel * columnCount, maxSize)}px`;
    previewBlock.style.height = `${Math.min(pixel * rowCount, maxSize)}px`;
  }, [rowCount, columnCount, backgroundImg, zoomIn]);

  useEffect(() => {
    const paintBox = document.getElementById('paintBox');
    const parentNode = paintBox.parentNode;
    const childNode = paintBox.childNodes[0];

    const previewBlock = document.getElementById('previewBlock');
    let viewBox = document.createElement('div');
    viewBox.style.position = 'absolute';
    viewBox.style.zIndex = 1;
    viewBox.style.border = '3px solid red';
    viewBox.style.display = 'none';
    viewBox.style.cursor = 'pointer';
    viewBox.attributes.draggable = false;

    previewBlock.appendChild(viewBox);

    const scrollEvent = (e) => {
      const overTop = paintBox.offsetTop === parentNode.offsetTop;
      const overLeft = paintBox.offsetLeft === childNode.offsetLeft;

      if (overTop || overLeft) {
        viewBox.style.display = 'block';

        if (overTop) {
          viewBox.style.top = `${
            (paintBox.scrollTop / paintBox.scrollHeight) *
            previewBlock.clientHeight
          }px`;
          viewBox.style.height = `${
            (paintBox.clientHeight / paintBox.scrollHeight) *
            previewBlock.clientHeight
          }px`;
        } else {
          let viewBoxHeight = Math.min(
            (parentNode.clientHeight / paintBox.clientHeight) *
              previewBlock.clientHeight,
            200,
          );

          viewBox.style.height = `${viewBoxHeight}px`;
          viewBox.style.top = `-${
            (viewBoxHeight - previewBlock.clientHeight) / 2
          }px`;
        }

        if (overLeft) {
          viewBox.style.left = `${
            (paintBox.scrollLeft / paintBox.scrollWidth) *
            previewBlock.clientWidth
          }px`;
          viewBox.style.width = `${
            (paintBox.clientWidth / paintBox.scrollWidth) *
            previewBlock.clientWidth
          }px`;
        } else {
          let viewBoxWidth = Math.min(
            (paintBox.clientWidth / childNode.clientWidth) *
              previewBlock.clientWidth,
            200,
          );

          viewBox.style.width = `${viewBoxWidth}px`;
          viewBox.style.left = `-${
            (viewBoxWidth - previewBlock.clientWidth) / 2
          }px`;
        }
      } else {
        // viewBox가 표시 될 필요 없을 때
        viewBox.style.display = 'none';
      }
    };

    let isClick = false;

    const onMouseDownEvent = (e) => {
      isClick = true;
    };

    const onMouseUpEvent = (e) => {
      isClick = false;
    };

    const onMouseMoveEvent = (e) => {
      if (isClick) {
        const previewData = document
          .getElementById('previewWrapper')
          .getBoundingClientRect();

        const x = e.clientX - previewData.x;
        const y = e.clientY - previewData.y;

        // 움직임이 부자연스러우면 200을 변수로 바꿔줘야 함
        // previewBlock 크기 계산식 바꾸면서 200px로 나누면 zoomIn false일 때는 약간 부자연스러울 수 있음
        const moveX =
          (paintBox.scrollWidth / 200) * x - paintBox.clientWidth / 2;
        const moveY =
          (paintBox.scrollHeight / 200) * y - paintBox.clientHeight / 2;

        paintBox.scrollTo(moveX, moveY);
      }
    };

    // previewBlock을 감시하면서 width와 height에 변경이 생기면 viewBox를 재 설정해 주기 위함
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        scrollEvent();
      });
    });

    var config = {
      attributes: true,
    };

    observer.observe(previewBlock, config);

    paintBox.addEventListener('scroll', scrollEvent, {
      passive: true,
    });
    viewBox.addEventListener('mousedown', onMouseDownEvent, { passive: true });
    document.body.addEventListener('mouseup', onMouseUpEvent, {
      passive: true,
    });
    document.body.addEventListener('mousemove', onMouseMoveEvent, {
      passive: true,
    });

    return () => {
      paintBox.removeEventListener('scroll', scrollEvent, { passive: true });
    };
  }, []);

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
    <PreviewToolsWrapper
      onMouseOver={() => onChangeHoverPreviewBox(true)}
      onMouseOut={() => onChangeHoverPreviewBox(false)}
    >
      <ButtonBox hovered={hoverPreviewBox}>
        <ToolTip placement="bottom" tooltip={<>Toggle animation</>}>
          <StyledButton
            onClick={togglePlay}
            selected={play}
            selectColor="#f05556"
            color={play ? '#b71b2d' : '#008000'}
            baseColor="#3db12a"
          >
            {play ? <MdPause /> : <MdPlayArrow />}
          </StyledButton>
        </ToolTip>
        <ToolTip
          placement="bottom"
          tooltip={<>Preview zoom {zoomIn ? 'Out' : 'In'}</>}
        >
          <StyledButton onClick={toggleZoom}>
            {zoomIn ? <MdFullscreenExit /> : <MdFullscreen />}
          </StyledButton>
        </ToolTip>
        <ToolTip placement="bottom" tooltip={<>Open preview dialog</>}>
          <StyledButton onClick={() => handleOpenDialog('Preview')}>
            <MdContentCopy />
          </StyledButton>
        </ToolTip>
      </ButtonBox>
      <PreviewWrapper backgroundImg={backgroundImg} id="previewWrapper">
        <div id="previewBlock">
          {!play && (
            <Preview
              dotSet={layerListMerge(layerList, layerData)}
              column={columnCount}
              size={pixelSize}
            />
          )}
          {play && (
            <Preview
              dotList={dotList}
              column={columnCount}
              size={pixelSize}
              animation={play}
              duration={animationDuration}
            />
          )}
        </div>
      </PreviewWrapper>

      <ToolTip
        placement="bottom"
        tooltip={
          <>
            Show animation for {animationDuration} seconds
            <span>
              and animation divided by each frame what you set interval
            </span>
          </>
        }
      >
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
      </ToolTip>
    </PreviewToolsWrapper>
  );
};

export default React.memo(PreViewTools);
