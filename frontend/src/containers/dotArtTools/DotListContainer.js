import React, { useCallback } from 'react';
import DotList from './DotList';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeActiveIdx,
  removeActiveDotArt,
  copyActiveDotArt,
  addNewDotArt,
  changeAnimationInterval,
} from '../../modules/dot';

const DotListContainer = () => {
  const dispatch = useDispatch();
  const { dotList, activeIdx, columnCount } = useSelector(({ dotArt }) => ({
    dotList: dotArt.present.dot.dotList,
    activeIdx: dotArt.present.dot.activeIdx,
    columnCount: dotArt.present.dot.columnCount,
  }));
  const handleChangeIdx = useCallback(
    (idx) => {
      dispatch(changeActiveIdx(idx));
    },
    [dispatch],
  );
  const handleRemoveDotArt = useCallback(
    (idx) => {
      dispatch(removeActiveDotArt(idx));
    },
    [dispatch],
  );
  const handleCopyDotArt = useCallback(
    (idx) => {
      dispatch(copyActiveDotArt(idx));
    },
    [dispatch],
  );
  const handleAddDotArt = useCallback(() => {
    dispatch(addNewDotArt());
  }, [dispatch]);
  const handleChangeInterval = useCallback(
    (interval, activeIdx) => {
      dispatch(changeAnimationInterval(interval, activeIdx));
    },
    [dispatch],
  );

  return (
    <DotList
      dotList={dotList}
      activeIdx={activeIdx}
      columnCount={columnCount}
      handleChangeIdx={handleChangeIdx}
      handleRemoveDotArt={handleRemoveDotArt}
      handleCopyDotArt={handleCopyDotArt}
      handleAddDotArt={handleAddDotArt}
      handleChangeInterval={handleChangeInterval}
    />
  );
};

export default React.memo(DotListContainer);
