import React from 'react';
import { useSelector } from 'react-redux';
import Preview from '../common/Preview';

const DotPaintBackground = () => {
  const { dot, columnCount, dotSize } = useSelector(({ dotArt }) => ({
    dot: dotArt.present.dot.dotList[dotArt.present.dot.activeIdx].dot,
    columnCount: dotArt.present.dot.columnCount,
    dotSize: dotArt.present.dot.dotSize,
  }));
  return <Preview dotSet={dot} column={columnCount} size={dotSize * 8} />;
};

export default React.memo(DotPaintBackground);
