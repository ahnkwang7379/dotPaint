import React from 'react';
import { useSelector } from 'react-redux';
import Preview from '../common/Preview';
import styled from 'styled-components';

const PreviewBlock = styled.div`
  margin-top: 5px;
  width: ${(props) =>
    props.zoomIn ? `${props.columnCount * 6}px` : `${props.columnCount * 3}px`};
  height: ${(props) =>
    props.zoomIn ? `${props.rowCount * 6}px` : `${props.rowCount * 3}px`};
  /* overflow: auto; */
  max-width: 300px;
  max-height: 300px;
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
    <PreviewBlock zoomIn={zoomIn} columnCount={columnCount} rowCount={rowCount}>
      <Preview
        dotSet={dotSet}
        dotList={dotList}
        animation={animation}
        size={zoomIn ? 6 : 3}
        duration={animationDuration}
      />
    </PreviewBlock>
  );
};

export default PreviewBox;
