import React from 'react';
import DivBlock from '../common/DivBlock';
import { shallowEqual, useSelector } from 'react-redux';

const Dot = React.memo(({ columnCount, dotLineIdx, onMouseOverHandler }) => {
  let dotArr = [];
  for (let i = 0; i < columnCount; i++) {
    dotArr.push(
      <DivBlock
        key={i}
        rowIdx={dotLineIdx}
        columnIdx={i}
        onMouseOverHandler={onMouseOverHandler}
      />,
    );
  }
  return dotArr;
});

const DotPaintLine = ({ dotLineIdx, onMouseOverHandler }) => {
  const { columnCount } = useSelector(
    ({ dotArt }) => ({
      columnCount: dotArt.present.dot.columnCount,
    }),
    shallowEqual, // columnCount 값을 계속 다르게 인식해서 적어둠
  );

  return (
    <div>
      <Dot
        columnCount={columnCount}
        dotLineIdx={dotLineIdx}
        onMouseOverHandler={onMouseOverHandler}
      />
    </div>
  );
};

export default React.memo(DotPaintLine);
