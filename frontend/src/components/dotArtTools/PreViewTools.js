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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FullDialog from '../common/FullDialog';

const PreviewWrapper = styled.div`
  display: flex;
`;

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
  margin-top: 5px;
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

const PreviewControlBlock = styled.div``;

const DialogBlock = styled.div.attrs(
  ({ pixelSize, columnCount, rowCount }) => ({
    style: {
      width: pixelSize * columnCount + columnCount + 'px',
      height: pixelSize * rowCount + rowCount + 'px',
    },
  }),
)`
  background: rgb(130, 130, 130);
`;

const InputStyle = styled.input`
  width: 72px;
  height: 24px;
  font-size: 16px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.7);
  /* text-align: center; */
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
  handleOpenDialog,
}) => {
  const [play, setPlay] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [duration, setDuration] = useState(2);
  const [pixelSize, setPixelSize] = useState(8);
  const [open, setOpen] = useState(false);

  const togglePlay = () => {
    setPlay(!play);
  };

  const toggleZoom = () => {
    setZoomIn(!zoomIn);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  const onBlurDuration = (e) => {
    if (e.target.value <= 0 || e.target.value === '') {
      setDuration(0.1);
    }
  };

  const onChangePixel = (e) => {
    setPixelSize(e.target.value);
  };
  const onBlurPixel = (e) => {
    if (e.target.value <= 0 || e.target.value === '') {
      setPixelSize(0.1);
    }
  };
  const openDialog = (type) => {
    handleOpenDialog(type);
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

          {/* <CustomButton onClick={handleOpen}> */}
          <CustomButton onClick={() => handleOpenDialog('PreView')}>
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
            size={zoomIn ? 16 : 8}
            animation={play}
            duration={duration}
          />
        </PreviewBlock>
      </Box>
      <PreviewControlBlock>
        <InputStyle
          value={duration}
          type="number"
          onChange={(e) => onChangeDuration(e)}
          onBlur={(e) => onBlurDuration(e)}
        />
        <InputStyle
          value={pixelSize}
          type="number"
          onChange={(e) => onChangePixel(e)}
          onBlur={(e) => onBlurPixel(e)}
        />
      </PreviewControlBlock>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        fullScreen={true}
      >
        <DialogTitle>asdasd </DialogTitle>
        <DialogContent dividers={true}>
          <DialogBlock
            columnCount={columnCount}
            rowCount={rowCount}
            pixelSize={pixelSize}
          >
            <Preview
              dotSet={dotSet}
              dotList={dotList}
              column={columnCount}
              size={pixelSize}
              animation={play}
              duration={duration}
            />
          </DialogBlock>
        </DialogContent>
      </Dialog>
    </PreviewWrapper>
  );
};

export default React.memo(PreViewTools);
