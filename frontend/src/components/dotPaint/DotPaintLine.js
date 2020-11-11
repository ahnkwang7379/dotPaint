import React from 'react';
import DivBlock from '../common/DivBlock';

const DotPaintLine = ({
  dotLine,
  dotLineIdx,
  border,
  dotSize,
  onMouseDownHandler,
  onMouseUpHandler,
  onMouseOverHandler,
  // onTouchMoveHandler,
}) => {
  return (
    <div>
      {dotLine.map((color, columnIdx) => {
        return (
          <DivBlock
            key={columnIdx}
            rowIdx={dotLineIdx}
            columnIdx={columnIdx}
            dotColor={color}
            dotSize={dotSize}
            border={border}
            onMouseDownHandler={onMouseDownHandler}
            onMouseUpHandler={onMouseUpHandler}
            onMouseOverHandler={onMouseOverHandler}
            // onTouchMoveHandler={onTouchMoveHandler}
          />
        );
      })}
    </div>
  );
};

export default React.memo(DotPaintLine);
