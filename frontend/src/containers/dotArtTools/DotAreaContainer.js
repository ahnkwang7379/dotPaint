import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeDotArea } from '../../modules/dot';
import { changeTypingState } from '../../modules/observer';
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

  const changeTypingHandle = useCallback(
    (type) => {
      dispatch(changeTypingState(type));
    },
    [dispatch],
  );

  return (
    <>
      <DotAreaControl
        rowCount={rowCount}
        columnCount={columnCount}
        onChangeArea={onChangeArea}
        changeTypingHandle={changeTypingHandle}
      />
    </>
  );
};

export default DotAreaContainer;
