import React from 'react';
import Preview from '../common/Preview';
import { BUCKET, DOT, ERASER, MOVE, PICKER } from '../../modules/paintTool';

const DotLayer = ({
  dot,
  fakeDotArt,
  columnCount,
  dotSize,
  selectedPaintTool,
}) => {
  return (
    <>
      {selectedPaintTool === DOT && (
        <>
          <Preview dotSet={dot} column={columnCount} size={dotSize} />
          <Preview
            dotSet={fakeDotArt}
            column={columnCount}
            size={dotSize}
            zIndex={100}
          />
        </>
      )}
      {selectedPaintTool === ERASER && (
        <Preview
          dotSet={fakeDotArt}
          column={columnCount}
          size={dotSize}
          zIndex={1}
        />
      )}
      {selectedPaintTool === BUCKET && (
        <Preview
          dotSet={fakeDotArt}
          column={columnCount}
          size={dotSize}
          zIndex={1}
        />
      )}
      {selectedPaintTool === PICKER && (
        <Preview
          dotSet={fakeDotArt}
          column={columnCount}
          size={dotSize}
          zIndex={100}
        />
      )}
      {selectedPaintTool === MOVE && (
        <Preview
          dotSet={fakeDotArt}
          column={columnCount}
          size={dotSize}
          zIndex={1}
        />
      )}
    </>
  );
};

export default React.memo(DotLayer);
