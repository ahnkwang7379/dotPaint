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
  cursor: pointer;
`;

const LayerBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
const Layer = styled.div`
  width: 100%;
  height: 24px;
  cursor: pointer;
  background: ${(props) => (props.selected ? 'skyblue' : 'white')};
  border: 1px solid ${(props) => (props.selected ? 'red' : 'black')};
`;

const LayerControl = ({
  layerSelectIdx,
  layerData,
  shiftDown,
  addNewLayerHandle,
  removeLayerHandle,
  mergeLayerHandle,
  moveUpHandle,
  moveDownHandle,
  selectLayerIdxHandle,
  renameLayerHandle,
}) => {
  const onClickAddNewLayer = () => {
    addNewLayerHandle(shiftDown);
  };
  const onClickMoveUp = () => {
    moveUpHandle(shiftDown);
  };
  const onClickMoveDown = () => {
    moveDownHandle(shiftDown);
  };
  return (
    <LayerWrapper>
      <LayerControlButton onClick={onClickAddNewLayer}>
        <TiPlus />
      </LayerControlButton>
      <LayerControlButton
        onClick={removeLayerHandle}
        disabled={layerData.length === 1}
      >
        <TiDelete />
      </LayerControlButton>
      <LayerControlButton
        onClick={mergeLayerHandle}
        disabled={layerSelectIdx === 0}
      >
        <TiFlowMerge />
      </LayerControlButton>
      <LayerControlButton
        onClick={onClickMoveUp}
        disabled={layerSelectIdx === layerData.length - 1}
      >
        <TiArrowUpThick />
      </LayerControlButton>
      <LayerControlButton
        onClick={onClickMoveDown}
        disabled={layerSelectIdx === 0}
      >
        <TiArrowDownThick />
      </LayerControlButton>
      <LayerBox>
        {layerData.map((layer, idx) => {
          return (
            <Layer
              onClick={() => selectLayerIdxHandle(idx)}
              key={layer.dotFrameIdx}
              selected={idx === layerSelectIdx}
            >
              <input value={layer.layerName} onChange={renameLayerHandle} />
              {layer.dotFrameIdx}
            </Layer>
          );
        })}
      </LayerBox>
    </LayerWrapper>
  );
};

export default React.memo(LayerControl);
