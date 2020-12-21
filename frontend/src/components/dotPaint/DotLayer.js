import React from 'react';
import styled from 'styled-components';
import Preview from '../common/Preview';
import { DOT } from '../../modules/paintTool';

const LayerWrapper = styled.div``;
const Layer = styled.div``;

const DotLayer = ({
  layerList,
  fakeDotArt,
  columnCount,
  dotSize,
  layerIdx,
  selectedPaintTool,
}) => {
  return (
    <LayerWrapper>
      {layerList.map((layer, idx) => {
        if (idx !== layerIdx) {
          // 선택된 레이어가 아니면
          return (
            <Preview
              key={idx}
              dotSet={layer}
              column={columnCount}
              size={dotSize}
              zIndex={1}
              opacity={0.8}
            />
          );
        } else {
          // 선택된 레이어면
          return (
            <Layer key="selectLayer" id="selectLayer">
              {selectedPaintTool === DOT && (
                <>
                  <Preview
                    key={idx}
                    dotSet={layer}
                    column={columnCount}
                    size={dotSize}
                    zIndex={2}
                    opacity={1}
                  />
                  <Preview
                    dotSet={fakeDotArt}
                    column={columnCount}
                    size={dotSize}
                    zIndex={100}
                  />
                </>
              )}
              {selectedPaintTool !== DOT && (
                <>
                  <Preview
                    dotSet={fakeDotArt}
                    column={columnCount}
                    size={dotSize}
                    zIndex={2}
                  />
                </>
              )}
            </Layer>
          );
        }
      })}
    </LayerWrapper>
  );
};

export default React.memo(DotLayer);
