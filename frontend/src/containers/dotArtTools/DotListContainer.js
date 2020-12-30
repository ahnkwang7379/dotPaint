import React, { useCallback } from 'react';
import DotList from '../../components/dotArtTools/DotList';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeActiveIdx,
  removeActiveDotArt,
  copyActiveDotArt,
  addNewDotArt,
  changeAnimationInterval,
  reorderDotList,
} from '../../modules/dot';

const DotListContainer = () => {
  const dispatch = useDispatch();
  const {
    dotFrameList,
    activeIdx,
    layerIdx,
    columnCount,
    rowCount,
  } = useSelector(({ dotArt: { present: { dot } } }) => ({
    dotList: dot.dotList,
    dotFrameList: dot.dotFrameList,
    activeIdx: dot.activeIdx,
    layerIdx: dot.layerData[dot.layerSelectIdx].dotFrameIdx,
    columnCount: dot.columnCount,
    rowCount: dot.rowCount,
  }));
  const { backgroundImg } = useSelector(({ observer }) => ({
    backgroundImg: observer.backgroundImg,
  }));
  const handleChangeIdx = useCallback(
    (idx) => {
      dispatch(changeActiveIdx(idx));
    },
    [dispatch],
  );
  const handleRemoveDotArt = useCallback(() => {
    dispatch(removeActiveDotArt());
  }, [dispatch]);
  const handleCopyDotArt = useCallback(() => {
    dispatch(copyActiveDotArt());
  }, [dispatch]);
  const handleAddDotArt = useCallback(() => {
    dispatch(addNewDotArt());
  }, [dispatch]);
  const handleChangeInterval = useCallback(
    (interval, activeIdx) => {
      dispatch(changeAnimationInterval(interval, activeIdx));
    },
    [dispatch],
  );
  const handleReorderDotList = useCallback(
    (startIdx, endIdx) => {
      dispatch(reorderDotList({ startIdx, endIdx }));
    },
    [dispatch],
  );

  return (
    <DotList
      dotFrameList={dotFrameList}
      activeIdx={activeIdx}
      layerIdx={layerIdx}
      columnCount={columnCount}
      rowCount={rowCount}
      backgroundImg={backgroundImg}
      handleChangeIdx={handleChangeIdx}
      handleRemoveDotArt={handleRemoveDotArt}
      handleCopyDotArt={handleCopyDotArt}
      handleAddDotArt={handleAddDotArt}
      handleChangeInterval={handleChangeInterval}
      handleReorderDotList={handleReorderDotList}
    />
  );
};

export default React.memo(DotListContainer);
