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
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from 'notistack';
import ToolTip from '../common/ToolTip';
import { DownloadDialog, CssDialog } from '../../modules/dialog';

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
    height: 30px;
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

const PreviewBlock = styled.div`
  width: ${(props) => props.columnCount * props.pixelSize}px;
  height: ${(props) => props.rowCount * props.pixelSize}px;
`;

const CssTextArea = styled.textarea`
  border: none;
  margin-top: 0.5em;
  width: 100%;
  padding: 1em 0.5em 0;
  text-align: left;
  display: block;
  resize: none;
  height: 25em;
  background-color: #f2e8dc;
  font-weight: bold;
  font-size: 15px;
  color: #0d0d0d;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const DownLoadDialog = ({
  dot,
  dialogType,
  saveFileHandler,
  handleChangeAnimationDuration,
  handleChangePixelSize,
}) => {
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

  const onChangePixelSize = (e) => {
    handleChangePixelSize(e.target.value);
  };

  const onChangeAnimationDuration = (e) => {
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
          label="Animation"
          color="secondary"
          value={animationDuration}
          onChange={(e) => onChangeAnimationDuration(e)}
        />
        <TextField
          size="small"
          variant="outlined"
          type="number"
          label="PixelSize"
          color="secondary"
          value={pixelSize}
          onChange={(e) => onChangePixelSize(e)}
        />
        <ToolTip placement="bottom" tooltip={<>View in single</>}>
          <CustomButton
            selected={type === 'single'}
            onClick={() => setType('single')}
          >
            single
          </CustomButton>
        </ToolTip>
        <ToolTip placement="bottom" tooltip={<>View in gif format</>}>
          <CustomButton
            selected={type === 'gif'}
            onClick={() => setType('gif')}
          >
            gif
          </CustomButton>
        </ToolTip>
        {dialog === DownloadDialog && (
          <ToolTip placement="bottom" tooltip={<>View in spritesheet format</>}>
            <CustomButton
              selected={type === 'spritesheet'}
              onClick={() => setType('spritesheet')}
            >
              sprite
            </CustomButton>
          </ToolTip>
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
      {dialog === DownloadDialog && (
        <ToolTip
          placement="top"
          tooltip={
            <>
              Download in selected format
              <span className="tooltip-name">
                you select <span className="tooltip-shortcut">{type} </span>
                format
              </span>
            </>
          }
        >
          <CustomButton
            baseColor="#0f0f0f"
            width="160"
            onClick={() => saveFileHandler(type)}
          >
            Download
          </CustomButton>
        </ToolTip>
      )}
      {dialog === CssDialog && (
        <>
          <ToolTip placement="top" tooltip={<>Copy your Clipboard</>}>
            <CustomButton width="120" height="40" onClick={copyToClipboard}>
              Copy
            </CustomButton>
          </ToolTip>
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
        </>
      )}
    </Wrapper>
  );
};

export default DownLoadDialog;
