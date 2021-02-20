import React from 'react';
import Tags from '../common/Tags';
import styled from 'styled-components';
import Preview from '../common/Preview';
import { Helmet } from 'react-helmet-async';
import { mergeLayersByDotFrameList } from '../../util/dotArrayUtil';

const DotArtBlock = styled.div`
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

const PreviewBlock = styled.div`
  width: 400px;
  height: 400px;
`;

const DotArtView = ({ dotArt, error, loading }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <DotArtBlock>존재하지 않는 포스트입니다.</DotArtBlock>;
    }
    return <DotArtBlock>오류 발생!</DotArtBlock>;
  }

  if (loading || !dotArt) {
    return null;
  }

  const { title, tags } = dotArt;
  const dotArtData = dotArt.dotArt;

  return (
    <DotArtBlock>
      <Helmet>
        <title>{title} - DOTART</title>
      </Helmet>
      <h2>{title}</h2>
      <PreviewBlock>
        <Preview
          dotList={mergeLayersByDotFrameList(
            dotArtData.dotFrameList,
            dotArtData.layerData,
          )}
          duration={dotArtData.animationDuration}
          column={dotArtData.columnCount}
          animation={true}
          size={
            400 /
            (dotArtData.columnCount > dotArtData.rowCount
              ? dotArtData.columnCount
              : dotArtData.rowCount)
          }
        />
      </PreviewBlock>
      <Tags tags={tags} />
    </DotArtBlock>
  );
};

export default DotArtView;
