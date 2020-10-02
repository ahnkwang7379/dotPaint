import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeDotArea, clearDot } from '../../modules/dot';
import DotAreaControl from '../../components/dotPaint/dotHeader/DotAreaControl';

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

  const handleDotClear = useCallback(() => {
    dispatch(clearDot());
  }, [dispatch]);

  return (
    <>
      <DotAreaControl
        onChangeArea={onChangeArea}
        row={rowCount}
        column={columnCount}
        dotClear={handleDotClear}
      />
    </>
  );
};

export default DotAreaContainer;
