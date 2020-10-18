import React from 'react';
import styled from 'styled-components';
import DivBlock from '../common/DivBlock';

const DotLine = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0;
`;

const DotPaintLine = ({
  dotLine,
  dotLineIdx,
  border,
  dotSize,
  columnCount,
  onMouseDownHandler,
  onMouseUpHandler,
  onMouseOverHandler,
}) => {
  return (
    <DotLine>
      {dotLine.map((color, columnIdx) => {
        return (
          <DivBlock
            key={columnIdx}
            // rowIdx={dotLineIdx}
            // columnIdx={columnIdx}
            dotIdx={columnCount * dotLineIdx + columnIdx}
            dotColor={color}
            dotSize={dotSize}
            border={border}
            onMouseDownHandler={onMouseDownHandler}
            onMouseUpHandler={onMouseUpHandler}
            onMouseOverHandler={onMouseOverHandler}
          />
        );
      })}
    </DotLine>
  );
};

export default React.memo(DotPaintLine);
