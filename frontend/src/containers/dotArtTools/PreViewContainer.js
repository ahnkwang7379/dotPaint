import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PreViewTools from '../../components/dotArtTools/PreViewTools';

const PreViewContainer = () => {
  const dispatch = useDispatch();
  const { dotSet, dotList, rowCount, columnCount } = useSelector(
    ({ dotArt }) => ({
      dotSet: dotArt.present.dot.dotList[dotArt.present.dot.activeIdx].dot,
      dotList: dotArt.present.dot.dotList,
      rowCount: dotArt.present.dot.rowCount,
      columnCount: dotArt.present.dot.columnCount,
    }),
  );

  return (
    <PreViewTools
      dotSet={dotSet}
      dotList={dotList}
      rowCount={rowCount}
      columnCount={columnCount}
      duration="2"
    />
  );
};

export default React.memo(PreViewContainer);
