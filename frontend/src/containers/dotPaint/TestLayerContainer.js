import React from 'react';
import TestLayer from '../../components/dotPaint/TestLayer';
import { useSelector } from 'react-redux';

const TestLayerContainer = () => {
  const { layerList, columnCount, layerSelectIdx, layerData } = useSelector(
    ({ dotArt }) => ({
      layerList:
        dotArt.present.dot.dotFrameList[dotArt.present.dot.activeIdx].layerList,
      columnCount: dotArt.present.dot.columnCount,
      layerSelectIdx: dotArt.present.dot.layerSelectIdx,
      layerData: dotArt.present.dot.layerData,
    }),
  );

  const { dotSize } = useSelector(({ observer }) => ({
    dotSize: observer.dotSize,
  }));

  return (
    <TestLayer
      layerList={layerList}
      columnCount={columnCount}
      dotSize={dotSize}
      layerIdx={layerData[layerSelectIdx].dotFrameIdx}
    />
  );
};

export default TestLayerContainer;
