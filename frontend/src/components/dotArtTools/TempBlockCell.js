import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ColorCell from '../common/ColorCell';

const TempBlockCell = ({ color, cellIdx }) => {
  return (
    <Draggable key={cellIdx} draggableId={`temp-${cellIdx}`} index={cellIdx}>
      {(provided) => (
        <ColorCell
          color={color}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        />
      )}
    </Draggable>
  );
};

export default TempBlockCell;
