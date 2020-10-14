import React, { useState } from 'react';
import styled from 'styled-components';
import Preview from '../common/Preview';
import CustomButton from '../../components/common/CustomButton';
import {
  MdFullscreen,
  MdFullscreenExit,
  MdPlayArrow,
  MdPause,
  MdFileDownload,
} from 'react-icons/md';

const Box = styled.div``;

const ButtonBox = styled.div`
  display: flex;
  width: 100px;
  height: 30px;
  /* & > * {
    margin-right: 5px;
  } */
`;

const PreviewBlock = styled.div`
  background: rgb(150, 150, 150);
  width: ${(props) =>
    props.zoomIn
      ? `${props.columnCount * 16 + 32}px`
      : `${props.columnCount * 8 + 16}px`};
  height: ${(props) =>
    props.zoomIn
      ? `${props.rowCount * 16 + 32}px`
      : `${props.rowCount * 8 + 16}px`};
`;

const PreViewTools = ({ dotSet, rowCount, columnCount }) => {
  const [play, setPlay] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);

  const onChangePlay = () => {
    setPlay(!play);
  };

  const onChangeZoom = () => {
    setZoomIn(!zoomIn);
  };

  return (
    <Box>
      <ButtonBox>
        <CustomButton
          onClick={onChangePlay}
          selected={play}
          selectColor="#f05556"
          color={play ? '#b71b2d' : '#008000'}
          baseColor="#3db12a"
        >
          {play ? <MdPause /> : <MdPlayArrow />}
        </CustomButton>

        <CustomButton onClick={onChangeZoom}>
          {zoomIn ? <MdFullscreenExit /> : <MdFullscreen />}
        </CustomButton>

        <CustomButton>
          <MdFileDownload />
        </CustomButton>
      </ButtonBox>
      <PreviewBlock
        zoomIn={zoomIn}
        rowCount={rowCount}
        columnCount={columnCount}
      >
        <Preview dotSet={dotSet} column={columnCount} size={zoomIn ? 16 : 8} />
      </PreviewBlock>
    </Box>
  );
};

export default React.memo(PreViewTools);
