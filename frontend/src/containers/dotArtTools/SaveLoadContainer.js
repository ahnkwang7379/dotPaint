import React, { useCallback } from 'react';
import SaveLoad from '../../components/dotArtTools/SaveLoad';
import { saveDotArtToStorage } from '../../util/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { changeTypeAndOpen } from '../../modules/dialog';
import shortid from 'shortid';

const SaveLoadContainer = () => {
  const dispatch = useDispatch();
  const {
    dotList,
    border,
    dotSize,
    columnCount,
    rowCount,
    animationDuration,
  } = useSelector(({ dotArt: { present: { dot } } }) => ({
    dotList: dot.dotList,
    border: dot.border,
    dotSize: dot.dotSize,
    columnCount: dot.columnCount,
    rowCount: dot.rowCount,
    animationDuration: dot.animationDuration,
  }));
  const { palettes, selectColorId } = useSelector(
    ({
      dotArt: {
        present: { palettes },
      },
    }) => ({
      palettes: palettes.palettes,
      selectColorId: palettes.selectColorId,
    }),
  );

  const loadHandler = useCallback(
    (type) => {
      dispatch(changeTypeAndOpen(type));
    },
    [dispatch],
  );

  const saveHandler = () => {
    const saveDotArtData = {
      dot: {
        id: shortid.generate(),
        dotList: dotList,
        border: border,
        dotSize: dotSize,
        columnCount: columnCount,
        rowCount: rowCount,
        animationDuration: animationDuration,
      },
      palettes: { palettes: palettes, selectColorId: selectColorId },
    };

    return saveDotArtToStorage(localStorage, saveDotArtData);
  };

  return <SaveLoad saveHandler={saveHandler} loadHandler={loadHandler} />;
};

export default React.memo(SaveLoadContainer);
