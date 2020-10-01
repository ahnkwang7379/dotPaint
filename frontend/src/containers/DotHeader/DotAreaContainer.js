import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeDotArea, clearDot } from '../../modules/dot';
import DotAreaControl from '../../components/dotPaint/dotHeader/DotAreaControl';

const DotAreaContainer = () => {
  const dispatch = useDispatch();
  const { row, column } = useSelector(({ present }) => ({
    row: present.dot.row,
    column: present.dot.column,
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
        row={row}
        column={column}
        dotClear={handleDotClear}
      />
    </>
  );
};

export default DotAreaContainer;
