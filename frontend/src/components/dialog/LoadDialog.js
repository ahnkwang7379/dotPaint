import React from 'react';
import CustomButton from '../common/CustomButton';
import Preview from '../common/Preview';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import { mergeLayersByDotFrameList } from '../../util/dotArrayUtil';

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
    max-width: 160px;
  }
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 8px;
  }
  overflow: auto;
`;

const PreviewBlock = styled.div`
  width: ${(props) => props.columnCount * props.size}px;
  height: ${(props) => props.rowCount * props.size}px;
`;

const CardDiv = styled.div`
  height: fit-content;
  background: rgb(255, 255, 255);
  opacity: 1;
  border: solid 1px black;
  box-sizing: border-box;
  display: flex;
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

const LoadDialog = ({
  loadedData,
  removeDotArtHandle,
  loadDotArtHandle,
  clearStorageHandler,
}) => {
  const onClickRemove = (dotArtIdx, e) => {
    e.stopPropagation();
    removeDotArtHandle(dotArtIdx);
  };
  return (
    <Wrapper>
      <ButtonWrapper>
        <CustomButton width="100" height="50" onClick={clearStorageHandler}>
          Clear storage!
        </CustomButton>
      </ButtonWrapper>
      <PreviewWrapper>
        {loadedData && loadedData.dotArt.length !== 0 ? (
          loadedData.dotArt.map((dotArt, dotArtIdx) => {
            return (
              <CardDiv
                key={dotArt.dot.id}
                onClick={() => loadDotArtHandle(dotArt)}
              >
                <PreviewBlock
                  size="4"
                  columnCount={dotArt.dot.columnCount}
                  rowCount={dotArt.dot.rowCount}
                  key={dotArt.dot.id}
                >
                  <Preview
                    dotList={mergeLayersByDotFrameList(
                      dotArt.dot.dotFrameList,
                      dotArt.dot.layerData,
                    )}
                    column={dotArt.dot.columnCount}
                    size="4"
                    duration={dotArt.dot.animationDuration}
                    key={dotArt.dot.id}
                    animation={true}
                  />
                </PreviewBlock>
                <StyleButton onClick={(e) => onClickRemove(dotArtIdx, e)}>
                  <DeleteIcon />
                </StyleButton>
              </CardDiv>
            );
          })
        ) : (
          <h1>No Save Data</h1>
        )}
      </PreviewWrapper>
    </Wrapper>
  );
};

export default LoadDialog;
