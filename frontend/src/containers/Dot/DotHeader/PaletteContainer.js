import React, { useCallback } from 'react';
import Palette from '../../../components/dotPaint/dotHeader/Palette';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectColor,
  insertColor,
  changeNick,
  deletePalette,
} from '../../../modules/palette';

const PaletteContainer = () => {
  const dispatch = useDispatch();
  const { paletteSet, selectColorId } = useSelector(({ palette }) => ({
    paletteSet: palette.paletteSet,
    selectColorId: palette.selectColorId,
  }));
  const onSelectColor = useCallback(
    (selectData) => {
      dispatch(selectColor(selectData));
    },
    [dispatch],
  );
  const onInsertColor = useCallback(
    (paletteId) => {
      dispatch(insertColor(paletteId));
    },
    [dispatch],
  );
  const onChangeNick = useCallback(
    (paletteId, newNick) => {
      dispatch(changeNick({ paletteId: paletteId, newNick: newNick }));
    },
    [dispatch],
  );
  const onDeletePalette = useCallback(
    (paletteId) => {
      dispatch(deletePalette(paletteId));
    },
    [dispatch],
  );
  return (
    <>
      <Palette
        paletteSet={paletteSet}
        onSelectColor={onSelectColor}
        onInsertColor={onInsertColor}
        onChangeNick={onChangeNick}
        onDeletePalette={onDeletePalette}
        selectColorId={selectColorId}
      />
    </>
  );
};

export default PaletteContainer;
