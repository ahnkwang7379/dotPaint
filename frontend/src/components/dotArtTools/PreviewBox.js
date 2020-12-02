import React from 'react';
import { useSelector } from 'react-redux';
import Preview from '../common/Preview';
import styled from 'styled-components';

const PreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 2px solid #9e9e9e;
`;

const PreviewBlock = styled.div`
  width: ${(props) =>
    props.zoomIn ? `${props.columnCount * 6}px` : `${props.columnCount * 3}px`};
  height: ${(props) =>
    props.zoomIn ? `${props.rowCount * 6}px` : `${props.rowCount * 3}px`};
  max-width: 200px;
  max-height: 200px;
  overflow: hidden;
  border: 1px solid #e6e6e6;
`;

const PreviewBox = ({ zoomIn, animation, animationDuration }) => {
  const { dotSet, dotList, rowCount, columnCount } = useSelector(
    ({ dotArt }) => ({
      rowCount: dotArt.present.dot.rowCount,
      columnCount: dotArt.present.dot.columnCount,
      dotSet: dotArt.present.dot.dotList[dotArt.present.dot.activeIdx].dot,
      dotList: dotArt.present.dot.dotList,
    }),
  );
  return (
    <PreviewWrapper>
      <PreviewBlock
        zoomIn={zoomIn}
        columnCount={columnCount}
        rowCount={rowCount}
      >
        <Preview
          dotSet={dotSet}
          dotList={dotList}
          animation={animation}
          size={zoomIn ? 6 : 3}
          duration={animationDuration}
        />
      </PreviewBlock>
    </PreviewWrapper>
  );
};

export default PreviewBox;
