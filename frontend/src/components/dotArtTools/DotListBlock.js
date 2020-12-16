import React, { useState, useCallback, useEffect } from 'react';
import Preview from '../../components/common/Preview';
import styled, { css } from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import { Draggable } from 'react-beautiful-dnd';

const ButtonDiv = styled.div`
  position: relative;
  display: grid;
  width: 16px;
  left: 56px;
  margin: 0px;
  padding: 0px;
  & > * + * {
    margin-top: 24px;
  }
`;

const IndexBox = styled.div`
  background: orange;
  color: black;
  text-align: center;
  width: 16px;
  height: 16px;
  position: absolute;
  z-index: 2;
  font-weight: 900;
  font-size: 12px;
`;

const CardDiv = styled.div`
  overflow: hidden;
  background: rgb(255, 255, 255);
  opacity: 0.6;
  border: solid 1px black;
  box-sizing: border-box;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      opacity: 1;
      border: solid 1px #b22222;
    `}
`;

const StyleButton = styled.div`
  background: #9e9e9e;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
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
  position: absolute;
  width: 78px;
  height: 22px;
  border: none;
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
  columnCount,
  interval,
  handleChangeIdx,
  handleCopyDotArt,
  handleRemoveDotArt,
  handleChangeInterval,
  lastIndex,
}) => {
  const [aniInterval, setAniInterval] = useState(interval);

  useEffect(() => {
    setAniInterval(interval);
  }, [interval]);

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

  return active === true ? (
    <Draggable key={idx} draggableId={`dotArt-${idx}`} index={idx}>
      {(provided) => (
        <CardDiv
          active={true}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <IndexBox>{idx + 1}</IndexBox>
          <Preview dotSet={dot} column={columnCount} size={3} />
          <ButtonDiv>
            <StyleButton onClick={handleRemoveDotArt}>
              <DeleteIcon fontSize="inherit" />
            </StyleButton>
            <StyleButton onClick={handleCopyDotArt}>
              <FileCopyRoundedIcon fontSize="inherit" />
            </StyleButton>
          </ButtonDiv>
          <IntervalInput
            value={aniInterval}
            type="number"
            onChange={onChangeInput}
            onBlur={(e) => onBlurHandle(e)}
            disabled={lastIndex} // 애니메이션의 마지막은 100%로 고정
            step="0.1"
          />
        </CardDiv>
      )}
    </Draggable>
  ) : (
    <Draggable key={idx} draggableId={`dotArt-${idx}`} index={idx}>
      {(provided) => (
        <CardDiv
          active={false}
          onClick={() => handleChangeIdx(idx)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <IndexBox>{idx + 1}</IndexBox>
          <Preview dotSet={dot} column={columnCount} size={3} />
          <ButtonDiv>
            <StyleButton disabled={true}>
              <DeleteIcon fontSize="inherit" />
            </StyleButton>
            <StyleButton disabled={true}>
              <FileCopyRoundedIcon fontSize="inherit" />
            </StyleButton>
          </ButtonDiv>
          <IntervalInput value={interval} disabled />
        </CardDiv>
      )}
    </Draggable>
  );
};

export default React.memo(DotListBlock);
