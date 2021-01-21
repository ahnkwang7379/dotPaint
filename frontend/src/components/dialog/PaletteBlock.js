import React from 'react';
import styled from 'styled-components';
import PaletteCell from './PaletteCell';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import ToolTip from '../common/ToolTip';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const PaletteBlockDiv = styled.div`
  display: flex;
  padding: 4px;
  background-color: #f2e8dc;
  align-items: center;
  & > * {
    margin-right: 8px;
  }
`;

const DraggBlock = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-right: 8px;
  }
`;

const RemovePaletteButton = styled.button`
  width: 25px;
  height: 25px;
  padding: 0;
  outline: none;
  border: none;
  color: #0d0d0d;
  background-color: inherit;
  cursor: pointer;
  transition: all 0.1s ease-out;
  &:hover {
    color: orange;
  }
`;

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: 3px solid #59564f;
  color: #59564f;
  padding: 5px;
  transition: all 0.1s ease-out;
  &:hover {
    border: 3px solid #f2e8dc;
    color: #f2e8dc;
    background-color: #59564f;
  }
`;

const PaletteBlock = ({
  palette,
  paletteIdx,
  selectId,
  onClickSelectHandle,
  onClickAddCellHandle,
  onClickRemoveCellHandle,
  onClickRemovePaletteHandle,
}) => {
  return (
    <Draggable
      key={palette.id}
      draggableId={`palette-${palette.id}`}
      index={paletteIdx}
    >
      {(provided) => (
        <PaletteBlockDiv {...provided.draggableProps} ref={provided.innerRef}>
          <ToolTip tooltip="Drag handle">
            <IconBox {...provided.dragHandleProps}>
              <DragIndicatorIcon fontSize="large" />
            </IconBox>
          </ToolTip>
          <Droppable
            droppableId={palette.id}
            type="cell"
            direction="horizontal"
            isDropDisabled={!(palette.colors.length < 7)}
          >
            {(provided) => (
              <DraggBlock ref={provided.innerRef} {...provided.droppableProps}>
                {palette.colors.map((color, cellIdx) => (
                  <PaletteCell
                    color={color}
                    paletteId={palette.id}
                    cellIdx={cellIdx}
                    key={`${palette.id}${cellIdx}`}
                    selected={
                      selectId.palette === palette.id &&
                      selectId.color === cellIdx
                    }
                    onClickSelectHandle={onClickSelectHandle}
                    onClickRemoveCellHandle={onClickRemoveCellHandle}
                  />
                ))}
                {provided.placeholder}
                {palette.colors.length < 7 && (
                  <ToolTip tooltip={<>Add color cell</>}>
                    <IconBox onClick={() => onClickAddCellHandle(palette.id)}>
                      <AddIcon fontSize="large" />
                    </IconBox>
                  </ToolTip>
                )}
                <ToolTip tooltip="Remove palette">
                  <RemovePaletteButton
                    onClick={() => onClickRemovePaletteHandle(palette.id)}
                  >
                    <DeleteForeverIcon fontSize="small" />
                  </RemovePaletteButton>
                </ToolTip>
              </DraggBlock>
            )}
          </Droppable>
        </PaletteBlockDiv>
      )}
    </Draggable>
  );
};

export default PaletteBlock;
