import React, { useCallback } from 'react';
import LayerControl from '../../components/dotArtTools/LayerControl';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewLayer,
  removeLayer,
  margeLayer,
  moveUpLayer,
  moveDownLayer,
  selectLayerIdx,
} from '../../modules/dot';

const LayerControlContainer = () => {
  const dispatch = useDispatch();
  const { dotFrameList } = useSelector(({ dotArt }) => ({
    dotFrameList: dotArt.present.dot.dotFrameList,
  }));
  const { shiftDown } = useSelector(({ observer }) => ({
    shiftDown: observer.shiftDown,
  }));

  const addNewLayerHandle = useCallback(() => {
    dispatch(addNewLayer());
  }, [dispatch]);

  const removeLayerHandle = useCallback(() => {
    dispatch(removeLayer());
  }, [dispatch]);

  const mergeLayerHandle = useCallback(() => {
    dispatch(margeLayer());
  }, [dispatch]);

  const moveUpHandle = useCallback(
    (shiftDown) => {
      dispatch(moveUpLayer(shiftDown));
    },
    [dispatch],
  );

  const moveDownHandle = useCallback(
    (shiftDown) => {
      dispatch(moveDownLayer(shiftDown));
    },
    [dispatch],
  );

  const selectLayerIdxHandle = useCallback(
    (idx) => {
      dispatch(selectLayerIdx(idx));
    },
    [dispatch],
  );

  return (
    <LayerControl
      dotFrameList={dotFrameList}
      shiftDown={shiftDown}
      addNewLayerHandle={addNewLayerHandle}
      removeLayerHandle={removeLayerHandle}
      mergeLayerHandle={mergeLayerHandle}
      moveUpHandle={moveUpHandle}
      moveDownHandle={moveDownHandle}
      selectLayerIdxHandle={selectLayerIdxHandle}
    />
  );
};

export default LayerControlContainer;
