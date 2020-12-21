import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Preview from '../common/Preview';
import styled from 'styled-components';
import {
  layerListMerge,
  mergeLayersByDotFrameList,
} from '../../util/dotArrayUtil';
import White from '../../img/white.png';

const PreviewWrapper = styled.div`
  background-image: url(${White});
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 2px solid #9e9e9e;
`;

const PreviewBlock = styled.div`
  width: ${(props) =>
    props.zoomIn
      ? `${props.columnCount * props.pixelSize * 2}px`
      : `${props.columnCount * props.pixelSize}px`};
  height: ${(props) =>
    props.zoomIn
      ? `${props.rowCount * props.pixelSize * 2}px`
      : `${props.rowCount * props.pixelSize}px`};
  max-width: 200px;
  max-height: 200px;
  overflow: hidden;
  border: 3px solid yellow;
`;

const PreviewBox = ({ zoomIn, animation, animationDuration }) => {
  const {
    dotFrameList,
    layerList,
    rowCount,
    columnCount,
    layerData,
  } = useSelector(({ dotArt: { present: { dot } } }) => ({
    dotFrameList: dot.dotFrameList,
    layerList: dot.dotFrameList[dot.activeIdx].layerList,
    rowCount: dot.rowCount,
    columnCount: dot.columnCount,
    layerData: dot.layerData,
  }));
  // dotList는 애니메이션때문에 넣어둠
  const [dotList, setDotList] = useState();
  const [pixelSize, setPixelSize] = useState();

  useEffect(() => {
    setDotList(mergeLayersByDotFrameList(dotFrameList, layerData));
  }, [animation, dotFrameList]);

  useEffect(() => {
    const newPixelSize = Math.floor(
      columnCount > rowCount ? 100 / columnCount : 100 / rowCount,
    );
    if (newPixelSize !== pixelSize) {
      setPixelSize(newPixelSize);
      if (newPixelSize === 0) {
        setPixelSize(1);
      }
    }
  }, [rowCount, columnCount]);

  return (
    <PreviewWrapper>
      <PreviewBlock
        zoomIn={zoomIn}
        pixelSize={pixelSize}
        columnCount={columnCount}
        rowCount={rowCount}
      >
        {!animation && (
          <Preview
            dotSet={layerListMerge(layerList, layerData)}
            column={columnCount}
            size={zoomIn ? pixelSize * 2 : pixelSize}
          />
        )}
        {animation && (
          <Preview
            dotList={dotList}
            column={columnCount}
            size={zoomIn ? pixelSize * 2 : pixelSize}
            animation={animation}
            duration={animationDuration}
          />
        )}
      </PreviewBlock>
    </PreviewWrapper>
  );
};

export default React.memo(PreviewBox);
