import React from 'react';
import Preview from '../common/Preview';
import { BUCKET, DOT, ERASER, MOVE, PICKER } from '../../modules/paintTool';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  display: contents;
  overflow: hidden;
  width: ${(props) => props.dotSize * props.rowCount}px;
  height: ${(props) => props.dotSize * props.columnCount}px;
`;

const DotLayer = ({
  dot,
  fakeDotArt,
  columnCount,
  rowCount,
  dotSize,
  mousePosition,
  startPosition,
  selectedPaintTool,
  paintState,
}) => {
  return (
    <div>
      {selectedPaintTool === DOT && (
        <div>
          <Preview dotSet={dot} column={columnCount} size={dotSize} />
          <Preview
            dotSet={fakeDotArt}
            column={columnCount}
            size={dotSize}
            zIndex={100}
          />
        </div>
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
        // <Wrapper
        //   rowCount={rowCount}
        //   columnCount={columnCount}
        //   dotSize={dotSize}
        // >
        <Preview
          dotSet={fakeDotArt}
          column={columnCount}
          size={dotSize}
          zIndex={1}
          // top={
          //   paintState === 'DRAGGING' &&
          //   (mousePosition.y - startPosition.y) * dotSize
          // }
          // left={
          //   paintState === 'DRAGGING' &&
          //   (mousePosition.x - startPosition.x) * dotSize
          // }
        />
        // </Wrapper>
      )}
    </div>
  );
};

export default React.memo(DotLayer);
