import React from 'react';
import Preview from '../common/Preview';
import { BUCKET, DOT, ERASER, MOVE, PICKER } from '../../modules/paintTool';

const DotLayout = ({
  dot,
  fakeDotArt,
  columnCount,
  dotSize,
  selectedPaintTool,
}) => {
  return (
    <React.Fragment>
      {selectedPaintTool === DOT && (
        <React.Fragment>
          <Preview dotSet={dot} column={columnCount} size={dotSize} />
          <Preview
            dotSet={fakeDotArt}
            column={columnCount}
            size={dotSize}
            zIndex={100}
          />
        </React.Fragment>
      )}
      {selectedPaintTool === ERASER && (
        <React.Fragment>
          <Preview
            dotSet={fakeDotArt}
            column={columnCount}
            size={dotSize}
            zIndex={1}
          />
        </React.Fragment>
      )}
      {selectedPaintTool === BUCKET && (
        <React.Fragment>
          <Preview
            dotSet={fakeDotArt}
            column={columnCount}
            size={dotSize}
            zIndex={1}
          />
        </React.Fragment>
      )}
      {selectedPaintTool === PICKER && (
        <React.Fragment>
          <Preview
            dotSet={fakeDotArt}
            column={columnCount}
            size={dotSize}
            zIndex={100}
          />
        </React.Fragment>
      )}
      {selectedPaintTool === MOVE && (
        <React.Fragment>
          <Preview
            dotSet={fakeDotArt}
            column={columnCount}
            size={dotSize}
            zIndex={1}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default React.memo(DotLayout);
