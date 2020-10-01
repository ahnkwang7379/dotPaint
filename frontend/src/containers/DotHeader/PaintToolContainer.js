import React, { useCallback } from 'react';
import { changePaintTool } from '../../modules/paintTool';
import PaintTool from '../../components/dotPaint/dotHeader/PaintTool';
import { useSelector, useDispatch } from 'react-redux';

const PaintToolContainer = () => {
  const dispatch = useDispatch();
  const { selectedPaintTool } = useSelector(({ present }) => ({
    selectedPaintTool: present.paintTool.selectedPaintTool,
  }));
  const onChangePaintTool = useCallback(
    (paintTool) => dispatch(changePaintTool(paintTool)),
    [dispatch],
  );
  return (
    <>
      <PaintTool
        onChangePaintTool={onChangePaintTool}
        selectedPaintTool={selectedPaintTool}
      />
    </>
  );
};

export default PaintToolContainer;
