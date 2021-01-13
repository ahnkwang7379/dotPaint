import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeDotArea } from '../../modules/dot';
import DotAreaControl from '../../components/dotArtTools/DotAreaControl';

const DotAreaContainer = () => {
  const dispatch = useDispatch();
  const { rowCount, columnCount } = useSelector(({ dotArt }) => ({
    rowCount: dotArt.present.dot.rowCount,
    columnCount: dotArt.present.dot.columnCount,
  }));

  const onChangeArea = useCallback(
    (row, column) => {
      dispatch(
        changeDotArea({ newRow: parseInt(row), newColumn: parseInt(column) }),
      );
    },
    [dispatch],
  );

  return (
    <>
      <DotAreaControl
        rowCount={rowCount}
        columnCount={columnCount}
        onChangeArea={onChangeArea}
      />
    </>
  );
};

export default DotAreaContainer;
