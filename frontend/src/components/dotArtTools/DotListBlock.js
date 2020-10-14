import React from 'react';
import Preview from '../../components/common/Preview';
import styled, { css } from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';

const CustomDiv = styled.div`
  position: relative;
  display: grid;
  width: 16px;
  left: 40px;
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

const DotListBlock = ({
  active,
  idx,
  dot,
  columnCount,
  handleChangeIdx,
  handleCopyDotArt,
  handleRemoveDotArt,
}) => {
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
    </CardDiv>
  ) : (
    <CardDiv active={false} onClick={() => handleChangeIdx(idx)}>
      <Preview dotSet={dot} column={columnCount} size={2.5} />
      <CustomDiv>
        <StyleButton disabled={true}>
          <DeleteIcon fontSize="inherit" />
        </StyleButton>
        <StyleButton disabled={true}>
          <FileCopyRoundedIcon fontSize="inherit" />
        </StyleButton>
      </CustomDiv>
    </CardDiv>
  );
};

export default React.memo(DotListBlock);
