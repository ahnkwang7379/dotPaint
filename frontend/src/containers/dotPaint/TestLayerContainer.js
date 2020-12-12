import React from 'react';
import TestLayer from '../../components/dotPaint/TestLayer';
import { useSelector } from 'react-redux';

const TestLayerContainer = () => {
  const { dotFrameList, columnCount, layerSelectIdx } = useSelector(
    ({ dotArt }) => ({
      dotFrameList: dotArt.present.dot.dotFrameList,
      columnCount: dotArt.present.dot.columnCount,
      layerSelectIdx: dotArt.present.dot.layerSelectIdx,
    }),
  );

  const { dotSize } = useSelector(({ observer }) => ({
    dotSize: observer.dotSize,
  }));

  return (
    <TestLayer
      dotFrameList={dotFrameList}
      columnCount={columnCount}
      dotSize={dotSize}
      layerSelectIdx={layerSelectIdx}
    />
  );
};

export default TestLayerContainer;
