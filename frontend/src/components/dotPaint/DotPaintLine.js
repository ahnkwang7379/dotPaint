import React from 'react';
import DivBlock from '../common/DivBlock';

const DotPaintLine = ({
  dotLine,
  dotLineIdx,
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
