import React from 'react';
import DotLayer from '../../components/dotPaint/DotLayer';
import { useSelector } from 'react-redux';

const DotLayerContainer = () => {
  const { dot, fakeDotArt, columnCount, rowCount } = useSelector(
    ({ dotArt }) => ({
      dot: dotArt.present.dot.dotList[dotArt.present.dot.activeIdx].dot,
      fakeDotArt: dotArt.present.dot.fakeDotArt,
      columnCount: dotArt.present.dot.columnCount,
      rowCount: dotArt.present.dot.rowCount,
    }),
  );
  const { dotSize, mousePosition, startPosition } = useSelector(
    ({ observer }) => ({
      dotSize: observer.dotSize,
      mousePosition: observer.mousePosition,
      startPosition: observer.startPosition,
    }),
  );
  const { selectedPaintTool, paintState } = useSelector(({ paintTool }) => ({
    selectedPaintTool: paintTool.selectedPaintTool,
    paintState: paintTool.paintState,
  }));
  return (
    <DotLayer
      dot={dot}
      fakeDotArt={fakeDotArt}
      columnCount={columnCount}
      rowCount={rowCount}
      dotSize={dotSize}
      mousePosition={mousePosition}
      startPosition={startPosition}
      selectedPaintTool={selectedPaintTool}
      paintState={paintState}
    />
  );
};

export default DotLayerContainer;
