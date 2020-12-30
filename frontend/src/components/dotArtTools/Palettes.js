import React, { useState } from 'react';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import Palette from './Palette';
import TrashCan from './TrashCan';
import TempBlock from './TempBlock';
import styled from 'styled-components';
import ColorCell from '../common/ColorCell';

const PalettesWrapper = styled.div`
  border: 2px solid #9e9e9e;
`;

const DraggablePaletteBlock = styled.div`
  padding: 8px 0px;
  background: gray;
`;

const CloneBlock = styled.div`
  display: flex;
  margin-left: 32px;
`;

const TrashBlock = styled.div`
  display: flex;
`;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

const Palettes = ({
  palettes,
  trashCan,
  selectColorId,
  handleSelectLeftColor,
  handleSelectRightColor,
  handleReorderPalettes,
  handleReorderCell,
  handleMovePaletteToTrashCan,
  handleMoveCellToTrashCan,
  handleMoveCellFromTrashCan,
  handleSelectColorCell,
  handleSavePalettes,
}) => {
  const [dragIdx, setDragIdx] = useState(0);
  const [dragType, setDragType] = useState('pale');
  const onDragEnd = (result) => {
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
      } else if (result.source.droppableId === 'temp') {
        handleMoveCellFromTrashCan(
          result.destination.droppableId,
          result.source.index,
          result.destination.index,
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
    setDragIdx(result.source.index);
  };

  const onBeforeCapture = (result) => {
    setDragType(result.draggableId.substring(0, 4));
  };

  return (
    <PalettesWrapper>
      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeDragStart={onBeforeDragStart}
        onBeforeCapture={onBeforeCapture}
      >
        <TrashBlock>
          <TrashCan dragType={dragType} />
          <TempBlock trashCan={trashCan} />
        </TrashBlock>
        <Droppable
          droppableId="palettes"
          type="palettes"
          renderClone={(provided) => (
            <CloneBlock
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <ColorCell />
              <ColorCell />
              <ColorCell />
              <ColorCell />
              <ColorCell />
            </CloneBlock>
          )}
        >
          {(provided, snapshot) => (
            <DraggablePaletteBlock
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {palettes.map((palette, idx) => (
                <Palette
                  palette={palette}
                  key={palette.id}
                  idx={idx}
                  dragIdx={dragIdx}
                  selectColorId={selectColorId}
                  handleSelectColorCell={handleSelectColorCell}
                  handleSelectLeftColor={handleSelectLeftColor}
                  handleSelectRightColor={handleSelectRightColor}
                />
              ))}
              {provided.placeholder}
            </DraggablePaletteBlock>
          )}
        </Droppable>
        <button onClick={() => handleSavePalettes('test')}>save</button>
      </DragDropContext>
    </PalettesWrapper>
  );
};

export default React.memo(Palettes);
