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
import ToolTip from '../common/ToolTip';

const LayerWrapper = styled.div`
  border: 2px solid #59564f;
  border-radius: 3px;
`;

const LayerHead = styled.div`
  display: flex;
  font-size: 20px;
  padding-left: 16px;
  color: black;
  background: #f2e8dc;
  line-height: 24px;
  border-bottom: 1px solid #0d0d0d;
`;

const EyeButton = styled.div`
  position: absolute;
  cursor: pointer;
  right: 0.5rem;
  color: #0d0d0d;
  font-size: 24px;
  cursor: pointer;
  transition: 0.2s linear;
  ${(props) =>
    props.showLayers &&
    css`
      color: #e83838;
    `}
`;

const ButtonBox = styled.div`
  display: flex;
`;

const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  font-size: 16px;
  width: 33.3px;
  height: 24px;
  border: 1px solid #333333;
  transition: all 0.2s ease-in-out;
  color: #0d0d0d;
  background: #f2e8dc;
  ${(props) =>
    !props.disable &&
    css`
      &:hover {
        color: #1261a6;
      }
    `}

  &:disabled {
    cursor: no-drop;
    background: #a69e94;
    color: #59564f;
  }
`;

const LayerBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  max-height: 30vh;
  overflow: auto;
`;

const Layer = styled.div`
  width: 100%;
  height: 24px;
  cursor: pointer;
  display: flex;
`;

const LayerNameSpan = styled.span`
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  line-height: 24px;
  color: #0d0d0d;
  padding-left: 8px;
  height: 24px;
  background: #f2e8dc;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 12px;
  border-top: 2px solid #0d0d0d;
  &:hover {
    ${(props) =>
      !props.selected &&
      css`
        background-color: #d2c9be;
      `}
  }
  ${(props) =>
    props.selected &&
    css`
      color: orange;
      background: #59564f;
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
  }, [layerSelectIdx, layerData]);

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
  }, [reName, handleChangeTyping]);

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
          <ToolTip placement="left" tooltip={<>Show all layers</>}>
            <TiEye />
          </ToolTip>
        </EyeButton>
      </LayerHead>
      <ButtonBox>
        <ToolTip
          placement="top"
          tooltip={
            <>
              Add new layer
              <span className="tooltip-name">
                <span className="tooltip-key">SHIFT</span>Copy select layer
              </span>
            </>
          }
        >
          <StyledButton onClick={onClickAddNewLayer}>
            <TiPlus />
          </StyledButton>
        </ToolTip>
        <ToolTip
          placement="top"
          tooltip={
            <>
              Move up selected layer
              <span className="tooltip-name">
                <span className="tooltip-key">SHIFT</span>Move to Top
              </span>
            </>
          }
          disable={layerSelectIdx === layerData.length - 1}
        >
          <StyledButton
            onClick={onClickMoveUp}
            disable={layerSelectIdx === layerData.length - 1}
            disabled={layerSelectIdx === layerData.length - 1}
          >
            <TiArrowUpThick />
          </StyledButton>
        </ToolTip>
        <ToolTip
          placement="top"
          tooltip={
            <>
              Move down selected layer
              <span className="tooltip-name">
                <span className="tooltip-key">SHIFT</span>Move to down
              </span>
            </>
          }
          disable={layerSelectIdx === 0}
        >
          <StyledButton
            onClick={onClickMoveDown}
            disable={layerSelectIdx === 0}
            disabled={layerSelectIdx === 0}
          >
            <TiArrowDownThick />
          </StyledButton>
        </ToolTip>
        <ToolTip placement="top" tooltip={<>Edit layer name</>}>
          <StyledButton onClick={onClickReName}>
            <TiPen />
          </StyledButton>
        </ToolTip>
        <ToolTip
          placement="top"
          tooltip={<>Merge with below layer</>}
          disable={layerSelectIdx === 0}
        >
          <StyledButton
            onClick={mergeLayerHandle}
            disable={layerSelectIdx === 0}
            disabled={layerSelectIdx === 0}
          >
            <TiFlowMerge />
          </StyledButton>
        </ToolTip>
        <ToolTip
          placement="top"
          tooltip={<>Delete selected layer</>}
          disable={layerData.length === 1}
        >
          <StyledButton
            onClick={removeLayerHandle}
            disable={layerData.length === 1}
            disabled={layerData.length === 1}
          >
            <TiDelete />
          </StyledButton>
        </ToolTip>
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
