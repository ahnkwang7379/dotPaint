import React, { useState } from 'react';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import Palette from './Palette';
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

const Palettes = ({ palettes, handleReorderPalettes, handleReorderCell }) => {
  const [selectIdx, setSeletIdx] = useState(0);
  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }

    if (result.type === 'palettes') {
      handleReorderPalettes(result.source.index, result.destination.index);
    } else if (result.type === 'cell') {
      console.log(result);
      console.log(result.source.index);
      console.log(result.destination.index);
      console.log(result.destination.droppableId);
      handleReorderCell(
        result.destination.droppableId,
        result.source.index,
        result.destination.index,
      );
    } else if (result.type === 'temp') {
      console.log(result);
      console.log(result.source.index);
      console.log(result.destination.index);
      console.log(result.destination.droppableId);
    } else {
      console.log(result);
    }
  };

  const onDragBefore = (result) => {
    setSeletIdx(result.source.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onBeforeDragStart={onDragBefore}>
      <Droppable
        droppableId="palettes"
        type="palettes"
        renderClone={(provided, snapshot, rubric) => (
          <CloneBlock
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            // onClick={console.log({ rubric })}
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
        {(provided, snapshot) => (
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
      {/* <Droppable droppableId="temp" type="temp">
        {(provided, snapshot) => (
          <TempBlock ref={provided.innerRef} {...provided.droppableProps}>
            <div>test</div>
            {provided.placeholder}
          </TempBlock>
        )}
      </Droppable> */}
    </DragDropContext>
  );
};

export default React.memo(Palettes);
