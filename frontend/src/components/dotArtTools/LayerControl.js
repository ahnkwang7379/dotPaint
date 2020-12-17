import React from 'react';
import styled from 'styled-components';
import {
  TiPlus,
  TiArrowUpThick,
  TiArrowDownThick,
  TiDelete,
  TiFlowMerge,
  TiPen,
} from 'react-icons/ti';
import CustomButton from '../common/CustomButton';

const LayerWrapper = styled.div`
  border: 2px solid #888;
`;

const LayerHead = styled.div`
  font-size: 24px;
  padding-left: 16px;
  font-weight: bold;
  color: white;
  background: #222222;
`;

const ButtonBox = styled.div`
  display: flex;
`;

const LayerButton = styled.button`
  width: 100%;
  height: 32px;
  font-size: 16px;
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
      <LayerHead>Layers</LayerHead>
      <ButtonBox>
        <CustomButton onClick={onClickAddNewLayer}>
          <TiPlus />
        </CustomButton>
        <CustomButton
          onClick={onClickMoveUp}
          disabled={layerSelectIdx === layerData.length - 1}
        >
          <TiArrowUpThick />
        </CustomButton>
        <CustomButton onClick={onClickMoveDown} disabled={layerSelectIdx === 0}>
          <TiArrowDownThick />
        </CustomButton>
        <CustomButton>
          <TiPen />
        </CustomButton>
        <CustomButton
          onClick={mergeLayerHandle}
          disabled={layerSelectIdx === 0}
        >
          <TiFlowMerge />
        </CustomButton>
        <CustomButton
          onClick={removeLayerHandle}
          disabled={layerData.length === 1}
        >
          <TiDelete />
        </CustomButton>
      </ButtonBox>
      <LayerBox>
        {layerData.map((layer, idx) => {
          return (
            <Layer
              onClick={() => selectLayerIdxHandle(idx)}
              key={idx}
              selected={idx === layerSelectIdx}
            >
              <input value={layer.layerName} onChange={renameLayerHandle} />
            </Layer>
          );
        })}
      </LayerBox>
    </LayerWrapper>
  );
};

export default React.memo(LayerControl);
