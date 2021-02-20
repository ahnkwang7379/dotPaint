import React from 'react';
import styled, { css } from 'styled-components';
import Preview from '../common/Preview';
import Black from '../../img/black.png';
import White from '../../img/white.png';
import { mergeLayersByDotFrameList } from '../../util/dotArrayUtil';
import Responsive from '../common/Responsive';
import Button from '../common/Button';

const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid #fdfdfd;
  margin-bottom: 2rem;
  width: 100%;
  ${(props) =>
    props.titleVaildCheckFail &&
    css`
      border: 3px solid #ffc5c5;
    `}
`;

const ErrorBlock = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffc5c5;
`;

const PreviewWrapper = styled.div`
  border: 2px solid #59564f;
  border-radius: 3px;
  place-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  max-height: 50vh;
  & > * {
    margin: 2px;
  }
  margin-bottom: 8px;
  overflow-y: auto;
  ${(props) =>
    props.postVaildCheckFail &&
    css`
      border: 3px solid #ffc5c5;
    `}
`;

const PreviewScrollWrapper = styled.div`
  overflow: auto;
  max-width: 70vh;
  max-height: 70vh;
  border: 1px solid #9e9e9e;
  width: fit-content;
  height: fit-content;
  margin-bottom: 8px;
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

const PreviewBlock = styled.div`
  overflow: hidden;
  /* max-width: 300px;
  max-height: 300px; */
  background-image: ${(props) =>
    props.backgroundImg === 1 ? `url(${White})` : `url(${Black})`};
  width: ${(props) => props.columnCount * props.size}px;
  height: ${(props) => props.rowCount * props.size}px;
  margin: 2px;
`;

const DotArtList = React.memo(
  ({ loadedData, loadDotArtHandle, backgroundImg }) =>
    loadedData && loadedData.dotArt.length !== 0 ? (
      loadedData.dotArt.map((dotArt, dotArtIdx) => {
        return (
          <CardDiv
            key={dotArtIdx}
            onClick={() => loadDotArtHandle(dotArt, dotArtIdx)}
          >
            <DotArtItem dotArt={dotArt} backgroundImg={backgroundImg} />
          </CardDiv>
        );
      })
    ) : (
      <h1>No Save Data</h1>
    ),
);

const DotArtItem = ({ dotArt, backgroundImg, size }) => (
  <PreviewBlock
    size={size ? size : 4}
    backgroundImg={backgroundImg}
    columnCount={dotArt.columnCount}
    rowCount={dotArt.rowCount}
  >
    <Preview
      dotList={mergeLayersByDotFrameList(dotArt.dotFrameList, dotArt.layerData)}
      column={dotArt.columnCount}
      size={size ? size : 4}
      duration={dotArt.animationDuration}
      animation={true}
    />
  </PreviewBlock>
);

const Editor = ({
  title,
  dotArt,
  loadedData,
  titleError,
  dotArtError,
  backgroundImg,
  onChangeField,
  loadDotArtHandle,
  unloadDotArtHandle,
}) => {
  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
        titleVaildCheckFail={titleError}
      />

      {dotArt ? (
        <PreviewScrollWrapper>
          <DotArtItem dotArt={dotArt} backgroundImg={backgroundImg} size="20" />
        </PreviewScrollWrapper>
      ) : (
        <>
          {dotArtError && <ErrorBlock>{dotArtError}</ErrorBlock>}
          <PreviewWrapper postVaildCheckFail={dotArtError}>
            <DotArtList
              loadedData={loadedData}
              loadDotArtHandle={loadDotArtHandle}
              backgroundImg={backgroundImg}
            />
          </PreviewWrapper>
        </>
      )}
      {dotArt && <Button onClick={unloadDotArtHandle}>다시 선택하기</Button>}
    </EditorBlock>
  );
};

export default Editor;
