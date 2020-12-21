import React, { useCallback } from 'react';
import LayerControl from '../../components/dotArtTools/LayerControl';
import { useDispatch, useSelector } from 'react-redux';
import { changeTypingState } from '../../modules/observer';
import {
  addNewLayer,
  removeLayer,
  margeLayer,
  moveUpLayer,
  moveDownLayer,
  selectLayerIdx,
  renameLayer,
} from '../../modules/dot';

const LayerControlContainer = () => {
  const dispatch = useDispatch();
  const { layerList, layerSelectIdx, layerData } = useSelector(
    ({ dotArt }) => ({
      layerList:
        dotArt.present.dot.dotFrameList[dotArt.present.dot.activeIdx].layerList,
      layerSelectIdx: dotArt.present.dot.layerSelectIdx,
      layerData: dotArt.present.dot.layerData,
    }),
  );
  const { shiftDown } = useSelector(({ observer }) => ({
    shiftDown: observer.shiftDown,
  }));

  const addNewLayerHandle = useCallback(
    (shiftDown) => {
      dispatch(addNewLayer(shiftDown));
    },
    [dispatch],
  );

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

  const renameLayerHandle = useCallback(
    (name) => {
      dispatch(renameLayer(name));
    },
    [dispatch],
  );

  const handleChangeTyping = useCallback(
    (typing) => {
      dispatch(changeTypingState(typing));
    },
    [dispatch],
  );

  return (
    <LayerControl
      layerList={layerList}
      layerSelectIdx={layerSelectIdx}
      layerData={layerData}
      shiftDown={shiftDown}
      addNewLayerHandle={addNewLayerHandle}
      removeLayerHandle={removeLayerHandle}
      mergeLayerHandle={mergeLayerHandle}
      moveUpHandle={moveUpHandle}
      moveDownHandle={moveDownHandle}
      selectLayerIdxHandle={selectLayerIdxHandle}
      renameLayerHandle={renameLayerHandle}
      handleChangeTyping={handleChangeTyping}
    />
  );
};

export default LayerControlContainer;
