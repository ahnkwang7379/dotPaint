import React from 'react';
import DotLayout from '../../components/dotPaint/DotLayout';
import { useSelector } from 'react-redux';

const DotLayoutContainer = () => {
  const { dot, fakeDotArt, columnCount } = useSelector(({ dotArt }) => ({
    dot: dotArt.present.dot.dotList[dotArt.present.dot.activeIdx].dot,
    fakeDotArt: dotArt.present.dot.fakeDotArt,
    columnCount: dotArt.present.dot.columnCount,
  }));
  const { dotSize } = useSelector(({ observer }) => ({
    dotSize: observer.dotSize,
  }));
  const { selectedPaintTool } = useSelector(({ paintTool }) => ({
    selectedPaintTool: paintTool.selectedPaintTool,
  }));
  return (
    <DotLayout
      dot={dot}
      fakeDotArt={fakeDotArt}
      columnCount={columnCount}
      dotSize={dotSize}
      selectedPaintTool={selectedPaintTool}
    />
  );
};

export default DotLayoutContainer;
