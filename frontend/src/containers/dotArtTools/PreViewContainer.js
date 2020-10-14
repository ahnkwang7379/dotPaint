import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PreViewTools from '../../components/dotArtTools/PreViewTools';

const PreViewContainer = () => {
  const dispatch = useDispatch();
  const { dotSet, rowCount, columnCount } = useSelector(({ dotArt }) => ({
    dotSet: dotArt.present.dot.dotList[dotArt.present.dot.activeIdx].dot,
    rowCount: dotArt.present.dot.rowCount,
    columnCount: dotArt.present.dot.columnCount,
  }));

  return (
    <PreViewTools
      dotSet={dotSet}
      rowCount={rowCount}
      columnCount={columnCount}
    />
  );
};

export default React.memo(PreViewContainer);
