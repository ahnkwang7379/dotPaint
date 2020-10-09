import React from 'react';
import DotList from '../../components/dotArtTools/DotList';
import { useDispatch, useSelector } from 'react-redux';

const DotListContainer = () => {
  const dispatch = useDispatch();
  const { dotList, columnCount } = useSelector(({ dotArt }) => ({
    dotList: dotArt.present.dot.dotList,
    columnCount: dotArt.present.dot.columnCount,
  }));

  return <DotList dotList={dotList} columnCount={columnCount} />;
};

export default React.memo(DotListContainer);
