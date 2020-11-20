import React, { useEffect, useState } from 'react';
import Preview from '../common/Preview';
import CustomButton from '../common/CustomButton';
import styled from 'styled-components';
import {
  generateAnimationCSSData,
  generatePixelDrawCss,
} from '../../util/cssParser';

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

const DownLoadDialog = ({ dot, dialogType, saveFileHandler }) => {
  const [dialog, setDialog] = useState('');
  const [type, setType] = useState('single');
  const {
    dotList,
    columnCount,
    rowCount,
    activeIdx,
    pixelSize,
    animationDuration,
  } = dot;
  useEffect(() => {
    setDialog(dialogType);
    console.log(generateAnimationCSSData(dotList, columnCount, pixelSize));
  }, [dialogType]);
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
        {dialog === 'DownLoad' && (
          <CustomButton
            selected={type === 'sprite'}
            onClick={() => setType('sprite')}
          >
            sprite
          </CustomButton>
        )}
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
      {dialog === 'DownLoad' && (
        <CustomButton
          baseColor="#0f0f0f"
          width="160"
          onClick={() => saveFileHandler(type)}
        >
          download!
        </CustomButton>
      )}
      {dialog === 'Css' && (
        <textarea
          width="500px"
          hieght="500px"
          value={
            type === 'single'
              ? generatePixelDrawCss(
                  dotList[activeIdx].dot,
                  columnCount,
                  pixelSize,
                  'string',
                )
              : generateAnimationCSSData(dotList, columnCount, pixelSize)
          }
          readOnly
        />
      )}
    </Wrapper>
  );
};

export default DownLoadDialog;
