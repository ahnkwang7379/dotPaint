import React, { useState } from 'react';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import Palette from './Palette';
import TrashCan from './TrashCan';
import PaletteCell from './PaletteCell';
import styled from 'styled-components';

const DraggablePaletteBlock = styled.div`
  padding: grid;
  margin: 16px;
  background: gray;
`;

const TempBlock = styled.div`
  width: 200px;
  height: 200px;
  background: skyblue;
`;

const CloneBlock = styled.div`
  display: flex;
  margin-left: 32px;
`;

const Palettes = ({
  palettes,
  trashCan,
  handleReorderPalettes,
  handleReorderCell,
  handleMovePaletteToTrashCan,
  handleMoveCellToTrashCan,
}) => {
  const [selectIdx, setSeletIdx] = useState(0);
  const [dragType, setDragType] = useState('pale');
  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }

    if (result.type === 'palettes') {
      if (result.destination.droppableId === 'PaletteTrashCan') {
        handleMovePaletteToTrashCan(result.source.index);
      } else {
        handleReorderPalettes(result.source.index, result.destination.index);
      }
    } else if (result.type === 'cell') {
      if (result.destination.droppableId === 'CellTrashCan') {
        handleMoveCellToTrashCan(
          result.source.droppableId,
          result.source.index,
        );
      } else {
        handleReorderCell(
          result.source.droppableId,
          result.destination.droppableId,
          result.source.index,
          result.destination.index,
        );
      }
    } else {
      console.log(result);
    }
  };

  const onBeforeDragStart = (result) => {
    setSeletIdx(result.source.index);
  };

  const onBeforeCapture = (result) => {
    setDragType(result.draggableId.substring(0, 4));
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onBeforeDragStart={onBeforeDragStart}
      onBeforeCapture={onBeforeCapture}
    >
      <TrashCan dragType={dragType} />
      <Droppable
        droppableId="palettes"
        type="palettes"
        renderClone={(provided) => (
          <CloneBlock
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <PaletteCell clone={true} />
            <PaletteCell clone={true} />
            <PaletteCell clone={true} />
            <PaletteCell clone={true} />
            <PaletteCell clone={true} />
            <PaletteCell clone={true} />
            <PaletteCell clone={true} />
            <PaletteCell clone={true} />
            <PaletteCell clone={true} />
            <PaletteCell clone={true} />
            <PaletteCell clone={true} />
          </CloneBlock>
        )}
      >
        {(provided) => (
          <DraggablePaletteBlock
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {palettes.map((palette, idx) => (
              <Palette
                palette={palette}
                key={palette.id}
                idx={idx}
                selectIdx={selectIdx}
              />
            ))}
            {provided.placeholder}
          </DraggablePaletteBlock>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default React.memo(Palettes);
