import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Observer from '../../components/dotArtTools/Observer';
import { updateDotArt } from '../../modules/dot';
import { changePaintState } from '../../modules/paintTool';

const ObserverContainer = () => {
  const dispatch = useDispatch();
  const { mousePosition, dotSize } = useSelector(({ observer }) => ({
    mousePosition: observer.mousePosition,
    dotSize: observer.dotSize,
  }));
  const { paintState, selectedPaintTool } = useSelector(({ paintTool }) => ({
    paintState: paintTool.paintState,
    selectedPaintTool: paintTool.selectedPaintTool,
  }));
  const { rowCount, columnCount } = useSelector(({ dotArt }) => ({
    rowCount: dotArt.present.dot.rowCount,
    columnCount: dotArt.present.dot.columnCount,
  }));

  const onChangePaintStateHandle = useCallback(
    (paintState) => {
      dispatch(changePaintState(paintState));
    },
    [dispatch],
  );

  const onUpdateDotArtHandle = useCallback(
    (selectedPaintTool) => {
      dispatch(updateDotArt(selectedPaintTool));
    },
    [dispatch],
  );

  return (
    <Observer
      mousePosition={mousePosition}
      dotSize={dotSize}
      paintState={paintState}
      selectedPaintTool={selectedPaintTool}
      rowCount={rowCount}
      columnCount={columnCount}
      onChangePaintStateHandle={onChangePaintStateHandle}
      onUpdateDotArtHandle={onUpdateDotArtHandle}
    />
  );
};

export default ObserverContainer;
