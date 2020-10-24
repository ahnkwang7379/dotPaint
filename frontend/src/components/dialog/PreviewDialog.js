import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Preview from '../common/Preview';
import CustomButton from '../common/CustomButton';
import styled from 'styled-components';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
  },
}));

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 5px;
  & > * {
    margin: 8px;
    max-width: 150px;
  }
`;

const PreviewScrollWrapper = styled.div`
  overflow: auto;
  max-width: 100%;
  max-height: 100%;
`;

const PreviewBlock = styled.div.attrs(
  ({ pixelSize, columnCount, rowCount }) => ({
    style: {
      width: `${columnCount * pixelSize}px`,
      height: `${rowCount * pixelSize}px`,
    },
  }),
)`
  margin-top: 5px;
`;

const PreviewDialog = ({
  dotList,
  activeIdx,
  rowCount,
  columnCount,
  animationDuration,
  handleChangeAnimationDuration,
}) => {
  const classes = useStyles();
  const [animation, setAnimation] = useState(false);
  const [pixelSize, setpixelSize] = useState(10);
  const toggleAnimation = () => {
    setAnimation(!animation);
  };

  const onChangePixelSize = (e) => {
    setpixelSize(e.target.value);
  };

  const onChangeAnimationDuration = (e) => {
    setAnimation(false);
    if (e.target.value <= 0 || e.target.value === '') {
      handleChangeAnimationDuration(0);
    } else {
      handleChangeAnimationDuration(e.target.value);
    }
  };

  return (
    <Wrapper>
      <ButtonWrapper>
        <TextField
          size="small"
          variant="outlined"
          type="number"
          label="Duration"
          value={animationDuration}
          onChange={(e) => onChangeAnimationDuration(e)}
        />
        <TextField
          size="small"
          variant="outlined"
          type="number"
          label="PixelSize"
          value={pixelSize}
          onChange={(e) => onChangePixelSize(e)}
        />
        <CustomButton
          onClick={toggleAnimation}
          selected={animation}
          selectColor="#f05556"
          color={animation ? '#b71b2d' : '#008000'}
          width="40"
          height="40"
          baseColor="#3db12a"
        >
          {animation ? <MdPause /> : <MdPlayArrow />}
        </CustomButton>
      </ButtonWrapper>
      <PreviewScrollWrapper>
        <PreviewBlock
          pixelSize={pixelSize}
          columnCount={columnCount}
          rowCount={rowCount}
        >
          <Preview
            dotSet={dotList[activeIdx].dot}
            dotList={dotList}
            column={columnCount}
            size={pixelSize}
            animation={animation}
            duration={animationDuration}
          />
        </PreviewBlock>
      </PreviewScrollWrapper>
    </Wrapper>
  );
};

export default PreviewDialog;
