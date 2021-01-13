import React, { useState, useCallback, useEffect } from 'react';
import Preview from '../../components/common/Preview';
import styled, { css } from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import { Draggable } from 'react-beautiful-dnd';
import ToolTip from '../common/ToolTip';
import White from '../../img/white.png';
import Black from '../../img/black.png';

const ButtonDiv = styled.span`
  z-index: 1;
  display: none;
  left: 72px;
  position: absolute;
  width: 24px;
  margin: 0px;
  padding: 0px;
  ${(props) =>
    props.offsetTop &&
    css`
      top: ${props.offsetTop}px;
    `};
`;

const IndexBox = styled.div`
  background: orange;
  color: black;
  text-align: center;
  width: 24px;
  height: 24px;
  line-height: 24px;
  position: absolute;
  z-index: 1;
  font-weight: 900;
  font-size: 12px;
`;

const CardDiv = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  outline: none;
  opacity: 0.8;
  border-radius: 0.3rem;
  border: solid 3px black;
  box-sizing: border-box;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      opacity: 1;
      border: solid 3px #b22222;
    `}
  &:hover {
    & > span {
      display: block;
    }
  }
`;

const PreviewBox = styled.div`
  width: 96px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewBlock = styled.div`
  background-image: ${(props) =>
    props.backgroundImg === 1 ? `url(${White})` : `url(${Black})`};
  ${(props) =>
    props.columnCount > props.rowCount
      ? css`
          width: 96px;
          height: ${(props) => `${props.rowCount * props.pixelSize}px`};
        `
      : css`
          height: 96px;
          width: ${(props) => `${props.columnCount * props.pixelSize}px`};
        `}
`;

const StyleButton = styled.div`
  background: #9e9e9e;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  font-size: 1rem;
  color: #f0f0f0;
  ${(props) =>
    !props.disabled &&
    css`
      &:hover {
        background: #6e6e6e;
        color: #fff;
      }
    `}
`;

const IntervalInput = styled.input`
  padding: 0px;
  margin: 0px;
  border: none;
  outline: none;
  border-top: solid 3px black;
  ${(props) =>
    props.active &&
    css`
      border-top: solid 3px #b22222;
    `}
  width: 96px;
  height: 19px;
  font-size: 16px;
  font-weight: bold;
  background: rgba(0, 0, 0, 1);
  text-align: center;
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

const DotListBlock = ({
  active,
  idx,
  dot,
  interval,
  columnCount,
  rowCount,
  backgroundImg,
  handleChangeIdx,
  handleCopyDotArt,
  handleRemoveDotArt,
  handleChangeInterval,
  lastIndex,
}) => {
  const [aniInterval, setAniInterval] = useState(interval);
  const [pixelSize, setPixelSize] = useState();

  useEffect(() => {
    setAniInterval(interval);
  }, [interval]);

  useEffect(() => {
    const newPixelSize = Math.floor(
      columnCount > rowCount ? 96 / columnCount : 96 / rowCount,
    );
    if (newPixelSize !== pixelSize) {
      setPixelSize(newPixelSize);
      if (newPixelSize === 0) {
        setPixelSize(1);
      }
    }
  }, [rowCount, columnCount, pixelSize]);

  const onChangeInput = (e) => {
    setAniInterval(e.target.value);
  };

  const onBlurHandle = useCallback(
    (e) => {
      if (e.target.value.length === 0) {
        setAniInterval(interval);
        return;
      } else {
        setAniInterval(interval);
        handleChangeInterval(Math.round(e.target.value * 100) / 100, idx);
      }
    },
    [handleChangeInterval, idx, interval],
  );

  return (
    <Draggable key={idx} draggableId={`dotArt-${idx}`} index={idx}>
      {(provided) => (
        <CardDiv
          active={active ? true : false}
          onClickCapture={() => handleChangeIdx(idx)} // capture로 changeIdx 먼저 실행
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <IndexBox>{idx + 1}</IndexBox>
          <ButtonDiv>
            <ToolTip tooltip={<>Delete frame </>}>
              <StyleButton onClick={handleRemoveDotArt}>
                <DeleteIcon fontSize="inherit" />
              </StyleButton>
            </ToolTip>
          </ButtonDiv>
          <ButtonDiv offsetTop="72">
            <ToolTip tooltip={<>Copy frame </>}>
              <StyleButton onClick={handleCopyDotArt}>
                <FileCopyRoundedIcon fontSize="inherit" />
              </StyleButton>
            </ToolTip>
          </ButtonDiv>
          <PreviewBox>
            <PreviewBlock
              columnCount={columnCount}
              rowCount={rowCount}
              backgroundImg={backgroundImg}
              pixelSize={pixelSize}
            >
              <Preview dotSet={dot} column={columnCount} size={pixelSize} />
            </PreviewBlock>
          </PreviewBox>
          <ToolTip
            placement="bottom"
            tooltip={
              <>
                Change interval of this frame
                {lastIndex && <span> But last frame is only 100</span>}
              </>
            }
          >
            <IntervalInput
              active={true}
              value={aniInterval}
              type="number"
              onChange={onChangeInput}
              onBlur={(e) => onBlurHandle(e)}
              disabled={lastIndex} // 애니메이션의 마지막은 100%로 고정
              step="0.1"
            />
          </ToolTip>
        </CardDiv>
      )}
    </Draggable>
  );
};

export default React.memo(DotListBlock);
