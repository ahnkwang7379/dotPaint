import React, { useState, useCallback, useEffect } from 'react';
import Preview from '../../components/common/Preview';
import styled, { css } from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';

const CustomDiv = styled.div`
  position: relative;
  display: grid;
  width: 16px;
  left: 48px;
  margin: 0px;
  padding: 0px;
  & > * + * {
    margin-top: 16px;
  }
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
      border: solid 1.5px #b22222;
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
  width: 72px;
  height: 24px;
  font-size: 16px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.7);
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
    <CardDiv active={true}>
      <Preview dotSet={dot} column={columnCount} size={2} />
      <CustomDiv>
        <StyleButton onClick={() => handleRemoveDotArt(idx)}>
          <DeleteIcon fontSize="inherit" />
        </StyleButton>
        <StyleButton onClick={() => handleCopyDotArt(idx)}>
          <FileCopyRoundedIcon fontSize="inherit" />
        </StyleButton>
      </CustomDiv>
      <IntervalInput
        value={aniInterval}
        type="number"
        onChange={onChangeInput}
        onBlur={(e) => onBlurHandle(e)}
        disabled={lastIndex} // 애니메이션의 마지막은 100%로 고정
        step="0.1"
      />
    </CardDiv>
  ) : (
    <CardDiv active={false} onClick={() => handleChangeIdx(idx)}>
      <Preview dotSet={dot} column={columnCount} size={2} />
      <CustomDiv>
        <StyleButton disabled={true}>
          <DeleteIcon fontSize="inherit" />
        </StyleButton>
        <StyleButton disabled={true}>
          <FileCopyRoundedIcon fontSize="inherit" />
        </StyleButton>
      </CustomDiv>
      <IntervalInput value={interval} disabled />
    </CardDiv>
  );
};

export default React.memo(DotListBlock);
