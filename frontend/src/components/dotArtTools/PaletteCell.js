import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ColorCell from '../common/ColorCell';

const PaletteCell = ({
  color,
  paletteId,
  cellIdx,
  selected,
  handleSelectColorCell,
}) => {
  return (
    <Draggable
      key={cellIdx}
      draggableId={`cell-${paletteId}-${cellIdx}`}
      index={cellIdx}
    >
      {(provided) => (
        <ColorCell
          color={color}
          selected={selected}
          // ref={provided.innerRef}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => handleSelectColorCell(paletteId, cellIdx)}
        />
      )}
    </Draggable>
  );
};

export default PaletteCell;
