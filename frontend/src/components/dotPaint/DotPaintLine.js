import React, { useCallback } from 'react';
import DivBlock from '../common/DivBlock';
import { shallowEqual, useSelector } from 'react-redux';

const DotPaintLine = ({
  dotLineIdx,
  onMouseDownHandler,
  onMouseUpHandler,
  onMouseOverHandler,
}) => {
  const { columnCount } = useSelector(
    ({ dotArt }) => ({
      columnCount: dotArt.present.dot.columnCount,
    }),
    shallowEqual, // columnCount 값을 계속 다르게 인식해서 적어둠
  );
  const dotMaker = useCallback(() => {
    let dotArr = [];
    for (let i = 0; i < columnCount; i++) {
      dotArr.push(
        <DivBlock
          key={i}
          rowIdx={dotLineIdx}
          columnIdx={i}
          onMouseDownHandler={onMouseDownHandler}
          onMouseUpHandler={onMouseUpHandler}
          onMouseOverHandler={onMouseOverHandler}
        />,
      );
    }
    return dotArr;
  }, [columnCount]);
  return <div>{dotMaker()}</div>;
};

export default React.memo(DotPaintLine);
