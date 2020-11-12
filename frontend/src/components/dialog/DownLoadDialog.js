import React, { useState } from 'react';
import Preview from '../common/Preview';
import CustomButton from '../common/CustomButton';
import styled from 'styled-components';

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
  margin-bottom: 8px;
  & > * {
    margin: 8px;
    height: 40px;
    width: 80px;
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
  margin-top: 8px;
  margin-bottom: 8px;
`;

const DownLoadDialog = ({ dot, saveFileHandler }) => {
  const [type, setType] = useState('single');
  const {
    dotList,
    columnCount,
    rowCount,
    activeIdx,
    pixelSize,
    animationDuration,
  } = dot;
  return (
    <Wrapper>
      <ButtonWrapper>
        <CustomButton
          selected={type === 'single'}
          onClick={() => setType('single')}
        >
          single
        </CustomButton>
        <CustomButton selected={type === 'gif'} onClick={() => setType('gif')}>
          gif
        </CustomButton>
        <CustomButton
          selected={type === 'sprite'}
          onClick={() => setType('sprite')}
        >
          sprite
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
            animation={type === 'gif' ? true : false}
            duration={animationDuration}
          />
        </PreviewBlock>
      </PreviewScrollWrapper>
      <CustomButton
        baseColor="#0f0f0f"
        width="160"
        onClick={() => saveFileHandler(type)}
      >
        download!
      </CustomButton>
    </Wrapper>
  );
};

export default DownLoadDialog;
