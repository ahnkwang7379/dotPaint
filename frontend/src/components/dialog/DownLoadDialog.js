import React, { useEffect, useRef, useState } from 'react';
import Preview from '../common/Preview';
import CustomButton from '../common/CustomButton';
import styled from 'styled-components';
import {
  getCssImageClassOutput,
  exportAnimationData,
} from '../../util/cssParser';
import {
  layerListMerge,
  mergeLayersByDotFrameList,
} from '../../util/dotArrayUtil';
import { useSnackbar } from 'notistack';

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
  border: 1px solid #9e9e9e;
  margin-bottom: 16px;
`;

const PreviewBlock = styled.div.attrs(
  ({ pixelSize, columnCount, rowCount }) => ({
    style: {
      width: `${columnCount * pixelSize}px`,
      height: `${rowCount * pixelSize}px`,
    },
  }),
)``;

const CssDiv = styled.div`
  width: 100%;
`;

const CssTextArea = styled.textarea`
  margin-top: 0.5em;
  width: 100%;
  padding: 1em 0.5em 0;
  text-align: left;
  display: block;
  resize: none;
  height: 20em;
  background: #089cd9;
  font-weight: bold;
  font-size: 15px;
  color: white;
`;

const DownLoadDialog = ({ dot, dialogType, saveFileHandler }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [dialog, setDialog] = useState('');
  const [type, setType] = useState('single');
  const textAreaRef = useRef(null);
  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    enqueueSnackbar('Copy Success!', { variant: 'success' });
  };
  const {
    dotFrameList,
    layerData,
    columnCount,
    rowCount,
    activeIdx,
    pixelSize,
    animationDuration,
  } = dot;
  useEffect(() => {
    setDialog(dialogType);
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
            selected={type === 'spritesheet'}
            onClick={() => setType('spritesheet')}
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
            dotSet={layerListMerge(
              dotFrameList[activeIdx].layerList,
              layerData,
            )}
            dotList={mergeLayersByDotFrameList(dotFrameList, layerData)}
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
        <CssDiv>
          <CustomButton width="240" height="40" onClick={copyToClipboard}>
            Copy To ClipBoard
          </CustomButton>
          <CssTextArea
            ref={textAreaRef}
            value={
              type === 'single'
                ? getCssImageClassOutput(
                    layerListMerge(
                      dotFrameList[activeIdx].layerList,
                      layerData,
                    ),
                    columnCount,
                    pixelSize,
                  )
                : exportAnimationData(
                    mergeLayersByDotFrameList(dotFrameList, layerData),
                    columnCount,
                    pixelSize,
                    animationDuration,
                  )
            }
            readOnly
          />
        </CssDiv>
      )}
    </Wrapper>
  );
};

export default DownLoadDialog;
