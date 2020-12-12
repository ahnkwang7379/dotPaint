import React from 'react';
import styled from 'styled-components';
import {
  TiPlus,
  TiArrowUpThick,
  TiArrowDownThick,
  TiDelete,
  TiFlowMerge,
} from 'react-icons/ti';

const LayerWrapper = styled.div``;

const LayerControlButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 24px;
`;

const LayerBox = styled.div``;
const Layer = styled.div``;

const LayerControl = ({
  dotFrameList,
  shiftDown,
  addNewLayerHandle,
  removeLayerHandle,
  mergeLayerHandle,
  moveUpHandle,
  moveDownHandle,
  selectLayerIdxHandle,
}) => {
  const onClickMoveUp = () => {
    moveUpHandle(shiftDown);
  };
  const onClickMoveDown = () => {
    moveDownHandle(shiftDown);
  };
  return (
    <LayerWrapper>
      <LayerControlButton onClick={addNewLayerHandle}>
        <TiPlus />
      </LayerControlButton>
      <LayerControlButton onClick={removeLayerHandle}>
        <TiDelete />
      </LayerControlButton>
      <LayerControlButton onClick={mergeLayerHandle}>
        <TiFlowMerge />
      </LayerControlButton>
      <LayerControlButton onClick={onClickMoveUp}>
        <TiArrowUpThick />
      </LayerControlButton>
      <LayerControlButton onClick={onClickMoveDown}>
        <TiArrowDownThick />
      </LayerControlButton>
      <LayerBox></LayerBox>
    </LayerWrapper>
  );
};

export default React.memo(LayerControl);
