import React from 'react';
import DotLayer from '../../components/dotPaint/DotLayer';
import { useSelector } from 'react-redux';

const DotLayerContainer = () => {
  const { layerList, layerIdx, fakeDotArt, columnCount } = useSelector(
    ({
      dotArt: {
        present: { dot },
      },
    }) => ({
      layerList: dot.dotFrameList[dot.activeIdx].layerList,
      layerIdx: dot.layerData[dot.layerSelectIdx].dotFrameIdx,
      fakeDotArt: dot.fakeDotArt,
      columnCount: dot.columnCount,
    }),
  );
  const { dotSize, showLayers } = useSelector(({ observer }) => ({
    dotSize: observer.dotSize,
    showLayers: observer.showLayers,
  }));
  const { selectedPaintTool } = useSelector(({ paintTool }) => ({
    selectedPaintTool: paintTool.selectedPaintTool,
  }));

  return (
    <DotLayer
      layerList={layerList}
      fakeDotArt={fakeDotArt}
      columnCount={columnCount}
      dotSize={dotSize}
      layerIdx={layerIdx}
      selectedPaintTool={selectedPaintTool}
      showLayers={showLayers}
    />
  );
};

export default DotLayerContainer;
