import React, { useEffect, useState } from 'react';
import CustomButton from '../common/CustomButton';
import Preview from '../common/Preview';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import { mergeLayersByDotFrameList } from '../../util/dotArrayUtil';
import ToolTip from '../common/ToolTip';
import Black from '../../img/black.png';
import White from '../../img/white.png';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PreviewWrapper = styled.div`
  place-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 2px;
  }
  overflow-y: auto;
`;

const PreviewBlock = styled.div`
  overflow: hidden;
  max-width: 300px;
  max-height: 300px;
  background-image: ${(props) =>
    props.backgroundImg === 1 ? `url(${White})` : `url(${Black})`};
  width: ${(props) => props.columnCount * props.size}px;
  height: ${(props) => props.rowCount * props.size}px;
  margin: 2px;
`;

const CardDiv = styled.div`
  height: fit-content;
  background: rgb(255, 255, 255);
  opacity: 1;
  border: solid 1px black;
  box-sizing: border-box;
  display: flex;
  align-items: end;
  cursor: pointer;
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
  &:hover {
    background: #6e6e6e;
    color: #fff;
  }
`;

const FileLoadWrapper = styled.div`
  border: 2px solid #59564f;
  border-radius: 3px;
  padding: 16px;
  max-width: 400px;
  max-height: 500px;
`;

const InputLabel = styled.label`
  background-color: #7f9ccb;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px ridge black;
  font-size: 0.8rem;
  height: auto;

  &:hover {
    background-color: #2d5ba3;
    color: white;
  }
`;

const InputFile = styled.input`
  opacity: 0;
`;

const LoadDialog = ({
  backgroundImg,
  loadedData,
  removeDotArtHandle,
  loadDotArtHandle,
  clearStorageHandler,
  ImportDotArtFileHandle,
}) => {
  const [dotFile, setDotFile] = useState('');
  const onClickRemove = (dotArtIdx, e) => {
    e.stopPropagation();
    removeDotArtHandle(dotArtIdx);
  };
  const handleFile = (e) => {
    if (e.target.files.length !== 0) {
      let reader = new FileReader();
      reader.readAsText(e.target.files[0], 'EUC-KR');

      reader.onload = () => {
        let text = reader.result;
        setDotFile(JSON.parse(text));
      };
    }
  };

  return (
    <Wrapper>
      <PreviewWrapper>
        <ButtonWrapper>
          <ToolTip
            placement="top"
            tooltip="Clear all dotArt data from localStorage"
          >
            <CustomButton width="100" height="30" onClick={clearStorageHandler}>
              Clear
            </CustomButton>
          </ToolTip>
        </ButtonWrapper>
        {loadedData && loadedData.dotArt.length !== 0 ? (
          loadedData.dotArt.map((dotArt, dotArtIdx) => {
            return (
              <CardDiv
                key={dotArtIdx}
                onClick={() => loadDotArtHandle(dotArt, dotArtIdx)}
              >
                <ToolTip placement="top" tooltip={<>Load this save data</>}>
                  <PreviewBlock
                    size="4"
                    backgroundImg={backgroundImg}
                    columnCount={dotArt.dot.columnCount}
                    rowCount={dotArt.dot.rowCount}
                    key={dotArtIdx}
                  >
                    <Preview
                      dotList={mergeLayersByDotFrameList(
                        dotArt.dot.dotFrameList,
                        dotArt.dot.layerData,
                      )}
                      column={dotArt.dot.columnCount}
                      size="4"
                      duration={dotArt.dot.animationDuration}
                      key={dotArtIdx}
                      animation={true}
                    />
                  </PreviewBlock>
                </ToolTip>
                <ToolTip placement="top" tooltip={<>Remove data</>}>
                  <StyleButton onClick={(e) => onClickRemove(dotArtIdx, e)}>
                    <DeleteIcon />
                  </StyleButton>
                </ToolTip>
              </CardDiv>
            );
          })
        ) : (
          <h1>No Save Data</h1>
        )}
      </PreviewWrapper>
      <FileLoadWrapper>
        <div>
          <InputLabel htmlFor="dotart_uploads">Import .dotart file</InputLabel>
          <InputFile
            accept=".dotart"
            id="dotart_uploads"
            type="file"
            onChange={handleFile}
          />
          {dotFile && (
            <>
              <PreviewBlock
                size="2"
                backgroundImg={backgroundImg}
                columnCount={dotFile.dot.columnCount}
                rowCount={dotFile.dot.rowCount}
              >
                <Preview
                  dotList={mergeLayersByDotFrameList(
                    dotFile.dot.dotFrameList,
                    dotFile.dot.layerData,
                  )}
                  column={dotFile.dot.columnCount}
                  size="2"
                  duration={dotFile.dot.animationDuration}
                  key={dotFile.dot.id}
                  animation={true}
                />
              </PreviewBlock>
              <CustomButton
                width="100"
                height="30"
                onClick={() => ImportDotArtFileHandle(dotFile)}
              >
                Load
              </CustomButton>
            </>
          )}
        </div>
      </FileLoadWrapper>
    </Wrapper>
  );
};

export default LoadDialog;
