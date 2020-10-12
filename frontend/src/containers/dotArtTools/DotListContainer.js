import React from 'react';
import DotList from './DotList';
import { useSelector } from 'react-redux';

const DotListContainer = () => {
  const { dotList, activeIdx, columnCount,  } = useSelector(({ dotArt }) => ({
    dotList: dotArt.present.dot.dotList,
    activeIdx: dotArt.present.dot.activeIdx,
    columnCount: dotArt.present.dot.columnCount,
  }));

  return <DotList 
    dotList={dotList}
    activeIdx={activeIdx}
    columnCount={columnCount}
      />;
};

export default React.memo(DotListContainer);
