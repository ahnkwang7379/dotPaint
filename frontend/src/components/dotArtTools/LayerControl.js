import React, { useState, useRef, useEffect } from 'react';
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

const LayerBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const Layer = styled.div`
  width: 100%;
  height: 24px;
  cursor: pointer;
  display: flex;
  background: ${(props) => (props.selected ? 'skyblue' : 'white')};
  border: 1px solid ${(props) => (props.selected ? 'red' : 'black')};
`;

const LayerNameSpan = styled.span`
  width: 100%;
  line-height: 24px;
  color: white;
  padding-left: 8px;
  height: 24px;
  background: #222222;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 12px;
  ${(props) => (props.active ? `display: none` : '')}
`;

const LayerNameInput = styled.input`
  width: 100%;
  padding-left: 8px;
  height: 24px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 12px;
  color: white;
  background: rgba(50, 50, 50, 1);
  ${(props) => (props.active ? `display: none` : '')}
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
  handleChangeTyping,
}) => {
  const [reName, setReName] = useState(false);
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(layerSelectIdx);
    setName(layerData[layerSelectIdx].layerName);
  }, [layerSelectIdx]);

  const onClickAddNewLayer = () => {
    addNewLayerHandle(shiftDown);
  };

  const onClickMoveUp = () => {
    moveUpHandle(shiftDown);
  };

  const onClickMoveDown = () => {
    moveDownHandle(shiftDown);
  };

  const onClickReName = () => {
    setReName(true);
  };

  const onClickHandle = () => {
    setReName(true);
  };

  useEffect(() => {
    if (reName) {
      inputRef.current.focus();
      handleChangeTyping(true);
    } else {
      handleChangeTyping(false);
    }
  }, [reName]);

  const onBlurHandle = () => {
    setReName(false);
    handleChangeTyping(false);
    renameLayerHandle(name);
  };

  const onkeyPressHandle = (e) => {
    if (e.kayCode === 13 || e.key === 'Enter') {
      setReName(false);
      handleChangeTyping(false);
      renameLayerHandle(name);
    }
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
        <CustomButton onClick={onClickReName}>
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
          if (idx === layerSelectIdx) {
            return (
              <Layer key={idx} selected={true}>
                <LayerNameInput
                  value={name}
                  ref={inputRef}
                  active={!reName}
                  onBlur={() => onBlurHandle()}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => onkeyPressHandle(e)}
                />
                <LayerNameSpan onClick={onClickHandle} active={reName}>
                  {layer.layerName}
                </LayerNameSpan>
              </Layer>
            );
          } else {
            return (
              <Layer onClick={() => selectLayerIdxHandle(idx)} key={idx}>
                <LayerNameSpan>{layer.layerName}</LayerNameSpan>
              </Layer>
            );
          }
        })}
      </LayerBox>
    </LayerWrapper>
  );
};

export default React.memo(LayerControl);
