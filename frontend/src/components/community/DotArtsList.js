import React from 'react';
import styled from 'styled-components';
import Preview from '../common/Preview';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';
import SubInfo from '../common/SubInfo';
import Button from '../common/Button';
import { mergeLayersByDotFrameList } from '../../util/dotArrayUtil';

const DotArtsListBlock = styled.div`
  margin-top: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto; /* 중앙 정렬 */

  /* 브라우저 크기에 따라 가로 사이즈 변경 */
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const DotArtItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;

  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid #a69e94;
  }

  h2 {
    font-size: 1rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: #000000;
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const PreviewBlock = styled.div`
  margin-top: 1rem;
  width: 200px;
  height: 200px;
`;

const DotArtItem = ({ dotArtData }) => {
  const { title, dotArt, user, tags, _id, createdAt } = dotArtData;
  return (
    <DotArtItemBlock>
      <h1>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h1>
      <SubInfo
        username={user.username}
        publishedDate={createdAt}
        hasMarginTop
      />
      <PreviewBlock>
        <Preview
          dotList={mergeLayersByDotFrameList(
            dotArt.dotFrameList,
            dotArt.layerData,
          )}
          duration={dotArt.animationDuration}
          column={dotArt.columnCount}
          animation={true}
          size={
            200 /
            (dotArt.columnCount > dotArt.rowCount
              ? dotArt.columnCount
              : dotArt.rowCount)
          }
        />
      </PreviewBlock>
      <Tags tags={tags} />
    </DotArtItemBlock>
  );
};

const DotArtsList = ({ loading, dotArts, error, showWriteButton }) => {
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <DotArtsListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && <Button to="/write">새 글 작성하기</Button>}
      </WritePostButtonWrapper>
      {!loading && dotArts && (
        <div>
          {dotArts.map((dotArtData) => (
            <DotArtItem dotArtData={dotArtData} key={dotArtData._id} />
          ))}
        </div>
      )}
    </DotArtsListBlock>
  );
};

export default DotArtsList;
