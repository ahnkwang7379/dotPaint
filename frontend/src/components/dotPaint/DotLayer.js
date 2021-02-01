import React from 'react';
import Preview from '../common/Preview';
import { DITHERING, DOT, RECTANGLE } from '../../modules/paintTool';

const DotLayer = ({
  layerList,
  fakeDotArt,
  columnCount,
  dotSize,
  layerIdx,
  selectedPaintTool,
  showLayers,
}) => {
  return (
    <div>
      {layerList.map((layer, idx) => {
        if (idx !== layerIdx) {
          // 선택된 레이어가 아니면
          if (showLayers)
            return (
              <Preview
                key={idx}
                dotSet={layer}
                column={columnCount}
                size={dotSize}
                zIndex={1}
                opacity={0.5}
              />
            );
        } else {
          // 선택된 레이어면
          return (
            <div key="selectLayer" id="selectLayer">
              {selectedPaintTool === DOT ||
              selectedPaintTool === RECTANGLE ||
              selectedPaintTool === DITHERING ? (
                <>
                  <Preview
                    key={idx}
                    dotSet={layer}
                    column={columnCount}
                    size={dotSize}
                    zIndex={2}
                  />
                  <Preview
                    dotSet={fakeDotArt}
                    column={columnCount}
                    size={dotSize}
                    zIndex={100}
                  />
                </>
              ) : (
                <>
                  <Preview
                    dotSet={fakeDotArt}
                    column={columnCount}
                    size={dotSize}
                    zIndex={2}
                  />
                </>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default React.memo(DotLayer);
