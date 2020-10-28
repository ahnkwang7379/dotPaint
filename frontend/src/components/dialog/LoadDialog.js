import React from 'react';
import CustomButton from '../common/CustomButton';
import Preview from '../common/Preview';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';

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
`;

const PreviewBlock = styled.div.attrs(({ size, columnCount, rowCount }) => ({
  style: {
    width: `${columnCount * size}px`,
    height: `${rowCount * size}px`,
  },
}))``;

const CardDiv = styled.div`
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
        <CustomButton onClick={clearStorageHandler}>Clear!</CustomButton>
      </ButtonWrapper>
      <PreviewWrapper>
        {loadedData && loadedData.dotArt.length !== 0 ? (
          loadedData.dotArt.map((dotArt, dotArtIdx) => {
            return (
              <CardDiv key={dotArt.id} onClick={() => loadDotArtHandle(dotArt)}>
                <PreviewBlock
                  size="4"
                  columnCount={dotArt.columnCount}
                  rowCount={dotArt.rowCount}
                  key={dotArt.id}
                >
                  <Preview
                    dotList={dotArt.dotList}
                    column={dotArt.columnCount}
                    size="4"
                    duration={dotArt.animationDuration}
                    key={dotArt.id}
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
