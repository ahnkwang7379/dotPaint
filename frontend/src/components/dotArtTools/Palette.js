import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PaletteCell from './PaletteCell';
import styled from 'styled-components';
import { GrDrag } from 'react-icons/gr';

const PaletteBlock = styled.div`
  display: flex;
  margin-top: 8px;
  &:nth-child(odd) {
    margin-left: 16px;
  }
`;

const PaletteDragHandle = styled.div`
  width: 16px;
  height: 16px;
`;

const DraggBlock = styled.div`
  display: flex;
  width: 300px;
`;

function customStyle(style, snapshot, odd, smallThenDragIdx) {
  if (snapshot.isDragging) {
    return style;
  }

  const { transform } = style;
  if (transform === null) {
    return { ...style };
  }

  return {
    ...style,
    marginLeft: `0px`,
    transform: `${style.transform.slice(0, 9)}(${
      smallThenDragIdx ? (odd ? 16 : 0) : odd ? 0 : 16
    }${style.transform.slice(11)}`,
  };
}

const blockCustomStyle = (isDraggingOver) => ({
  background: isDraggingOver ? `black` : `green`,
});

const Palette = ({
  palette,
  idx,
  dragIdx,
  selectColorId,
  handleSelectColorCell,
}) => {
  return (
    <Draggable key={palette.id} draggableId={`pale-${palette.id}`} index={idx}>
      {(provided, snapshot) => (
        <PaletteBlock
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={customStyle(
            provided.draggableProps.style,
            snapshot,
            idx % 2 !== 0,
            dragIdx > idx,
          )}
        >
          <PaletteDragHandle {...provided.dragHandleProps}>
            <GrDrag />
          </PaletteDragHandle>
          <Droppable
            droppableId={`${palette.id}`}
            type="cell"
            direction="horizontal"
            isDropDisabled={!(palette.colors.length < 10)}
          >
            {(provided, snapshot) => (
              <DraggBlock
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={blockCustomStyle(snapshot.isDraggingOver)}
              >
                {palette.colors.map((color, cellIdx) => (
                  <PaletteCell
                    color={color}
                    paletteId={palette.id}
                    cellIdx={cellIdx}
                    key={`${palette.id}${cellIdx}`}
                    selected={
                      selectColorId.paletteId === palette.id &&
                      selectColorId.colorId === cellIdx
                    }
                    handleSelectColorCell={handleSelectColorCell}
                  />
                ))}
                {provided.placeholder}
              </DraggBlock>
            )}
          </Droppable>
        </PaletteBlock>
      )}
    </Draggable>
  );
};

export default Palette;
