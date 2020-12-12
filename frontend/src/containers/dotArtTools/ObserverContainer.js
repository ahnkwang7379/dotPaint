import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Observer from '../../components/dotArtTools/Observer';
import { updateDotArt } from '../../modules/dot';
import { changePaintState } from '../../modules/paintTool';
import { altDown, shiftDown } from '../../modules/observer';

const ObserverContainer = () => {
  const dispatch = useDispatch();
  const { mousePosition } = useSelector(({ observer }) => ({
    mousePosition: observer.mousePosition,
  }));
  const { paintState, selectedPaintTool } = useSelector(({ paintTool }) => ({
    paintState: paintTool.paintState,
    selectedPaintTool: paintTool.selectedPaintTool,
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

  const onAltDownHandle = useCallback(
    (bool) => {
      dispatch(altDown(bool));
    },
    [dispatch],
  );

  const onShiftDownHandle = useCallback(
    (bool) => {
      dispatch(shiftDown(bool));
    },
    [dispatch],
  );

  return (
    <Observer
      mousePosition={mousePosition}
      paintState={paintState}
      selectedPaintTool={selectedPaintTool}
      onChangePaintStateHandle={onChangePaintStateHandle}
      onUpdateDotArtHandle={onUpdateDotArtHandle}
      onAltDownHandle={onAltDownHandle}
      onShiftDownHandle={onShiftDownHandle}
    />
  );
};

export default ObserverContainer;
