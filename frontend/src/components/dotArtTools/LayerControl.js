import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  TiPlus,
  TiArrowUpThick,
  TiArrowDownThick,
  TiDelete,
  TiFlowMerge,
  TiPen,
  TiEye,
} from 'react-icons/ti';

const LayerWrapper = styled.div`
  border: 2px solid #888;
`;

const LayerHead = styled.div`
  position: relative;
  font-size: 20px;
  padding-left: 16px;
  font-weight: bold;
  color: white;
  background: #222222;
`;

const EyeButton = styled.div`
  position: absolute;
  top: 0;
  right: 0.5rem;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: 0.2s linear;
  ${(props) =>
    props.showLayers &&
    css`
      color: orange;
    `}
`;

const ButtonBox = styled.div`
  display: flex;
`;

const StyledButton = styled.button`
  outline: none;
  font-size: 16px;
  width: 100%;
  height: 24px;
  border: 1px solid #333333;
  transition: all 0.2s ease-in-out;
  color: #fff;
  background: #222222;
  ${(props) =>
    !props.disable &&
    css`
      &:hover {
        color: orange;
      }
    `}

  &:disabled {
    background: #afafaf;
    color: #777777;
  }
`;

const LayerBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  max-height: 30vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Layer = styled.div`
  width: 100%;
  height: 24px;
  cursor: pointer;
  display: flex;
  background: ${(props) => (props.selected ? 'skyblue' : 'white')};
`;

const LayerNameSpan = styled.span`
  overflow: hidden;
  white-space: nowrap;
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
  ${(props) =>
    props.selected &&
    css`
      color: orange;
      background: #333333;
    `}
  ${(props) => (props.active ? `display: none` : '')}
`;

const LayerNameInput = styled.input`
  border: 1px solid orange;
  width: 100%;
  padding-left: 8px;
  height: 24px;
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
  showLayers,
  addNewLayerHandle,
  removeLayerHandle,
  mergeLayerHandle,
  moveUpHandle,
  moveDownHandle,
  selectLayerIdxHandle,
  renameLayerHandle,
  handleChangeTyping,
  handleChangeShowLayers,
}) => {
  const [reName, setReName] = useState(false);
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
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
      <LayerHead>
        Layers
        <EyeButton showLayers={showLayers} onClick={handleChangeShowLayers}>
          <TiEye />
        </EyeButton>
      </LayerHead>

      <ButtonBox>
        <StyledButton
          onClick={onClickAddNewLayer}
          color={`#333333`}
          baseColor={`#222222`}
        >
          <TiPlus />
        </StyledButton>
        <StyledButton
          onClick={onClickMoveUp}
          color={`#333333`}
          baseColor={`#222222`}
          disable={layerSelectIdx === layerData.length - 1}
          disabled={layerSelectIdx === layerData.length - 1}
        >
          <TiArrowUpThick />
        </StyledButton>
        <StyledButton
          onClick={onClickMoveDown}
          color={`#333333`}
          baseColor={`#222222`}
          disable={layerSelectIdx === 0}
          disabled={layerSelectIdx === 0}
        >
          <TiArrowDownThick />
        </StyledButton>
        <StyledButton
          color={`#333333`}
          baseColor={`#222222`}
          onClick={onClickReName}
        >
          <TiPen />
        </StyledButton>
        <StyledButton
          onClick={mergeLayerHandle}
          color={`#333333`}
          baseColor={`#222222`}
          disable={layerSelectIdx === 0}
          disabled={layerSelectIdx === 0}
        >
          <TiFlowMerge />
        </StyledButton>
        <StyledButton
          onClick={removeLayerHandle}
          color={`#333333`}
          baseColor={`#222222`}
          disable={layerData.length === 1}
          disabled={layerData.length === 1}
        >
          <TiDelete />
        </StyledButton>
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
                <LayerNameSpan onClick={onClickHandle} active={reName} selected>
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
