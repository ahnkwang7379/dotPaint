import React, { useCallback } from 'react';
import { changePaintTool } from '../../modules/paintTool';
import PaintTool from '../../components/dotArtTools/PaintTool';
import { useSelector, useDispatch } from 'react-redux';

const PaintToolContainer = () => {
  const dispatch = useDispatch();
  const { selectedPaintTool } = useSelector(({ paintTool }) => ({
    selectedPaintTool: paintTool.selectedPaintTool,
  }));
  const { paintToolsShortcuts } = useSelector(({ keybind }) => ({
    paintToolsShortcuts: keybind.paintTools,
  }));
  const onChangePaintTool = useCallback(
    (paintTool) => dispatch(changePaintTool(paintTool)),
    [dispatch],
  );
  return (
    <PaintTool
      paintToolsShortcuts={paintToolsShortcuts}
      onChangePaintTool={onChangePaintTool}
      selectedPaintTool={selectedPaintTool}
    />
  );
};

export default PaintToolContainer;
