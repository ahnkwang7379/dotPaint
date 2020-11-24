import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ColorCell from '../common/ColorCell';

const PaletteCell = ({
  color,
  paletteId,
  cellIdx,
  selected,
  handleSelectColorCell,
  handleSelectLeftColor,
  handleSelectRightColor,
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
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // onClick={() => handleSelectColorCell(paletteId, cellIdx)}
          onClick={() => handleSelectLeftColor(paletteId, cellIdx, color)}
          onContextMenu={(e) =>
            handleSelectRightColor(e, paletteId, cellIdx, color)
          }
        />
      )}
    </Draggable>
  );
};

export default PaletteCell;
