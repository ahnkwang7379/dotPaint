import React, { useCallback } from 'react';
import { changePaintTool, togglePaintTool } from '../../../modules/paintTool';
import PaintTool from '../../../components/dotPaint/dotHeader/PaintTool';
import { useSelector, useDispatch } from 'react-redux';

const PaintToolContainer = () => {
  const dispatch = useDispatch();
  const { paintToolSet, selectedPaintTool } = useSelector(({ paintTool }) => ({
    paintToolSet: paintTool.paintToolSet,
    selectedPaintTool: paintTool.selectedPaintTool,
  }));
  const onChangePaintTool = useCallback(
    (paintTool) => dispatch(changePaintTool(paintTool)),
    [dispatch],
  );
  const onTogglePaintTool = useCallback(
    (paintTool) => dispatch(togglePaintTool(paintTool)),
    [dispatch],
  );
  return (
    <>
      <PaintTool
        onChangePaintTool={onChangePaintTool}
        paintToolSet={paintToolSet}
        selectedPaintTool={selectedPaintTool}
        onTogglePaintTool={onTogglePaintTool}
      />
    </>
  );
};

export default PaintToolContainer;
