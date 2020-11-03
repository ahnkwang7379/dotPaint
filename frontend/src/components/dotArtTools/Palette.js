import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PaletteCell from './PaletteCell';
import styled from 'styled-components';

const PaletteBlock = styled.div`
  display: flex;
  margin-top: 8px;
  &:nth-child(odd) {
    /* transform 잘 못 건들면 하위 Draggable이 망가져버림... */
    /* transform: translate(16px, 0px); */
    margin-left: 16px;
  }
`;

const PaletteDragHandle = styled.div`
  width: 16px;
  height: 16px;
  background: black;
`;

const DraggBlock = styled.div`
  display: flex;
`;

function customStyle(style, snapshot, odd, selectIdx) {
  if (snapshot.isDragging) {
    return style;
  }

  const { transform } = style;
  if (transform === null) {
    return { ...style };
  }

  // 너무 엉망이긴 하지만...
  return {
    ...style,
    marginLeft: `0px`,
    transform: `${style.transform.slice(0, 9)}(${
      selectIdx ? (odd ? 16 : 0) : odd ? 0 : 16
    }${style.transform.slice(11)}`,
  };
}

const Palette = ({ palette, idx, selectIdx }) => {
  return (
    <Draggable key={palette.id} draggableId={palette.id} index={idx}>
      {(provided, snapshot) => (
        <PaletteBlock
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={customStyle(
            provided.draggableProps.style,
            snapshot,
            idx % 2 !== 0,
            selectIdx > idx,
          )}
        >
          <PaletteDragHandle {...provided.dragHandleProps} />
          <Droppable
            droppableId={`${palette.id}`}
            type="cell"
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <DraggBlock ref={provided.innerRef} {...provided.droppableProps}>
                {palette.colors.map((color, cellIdx) => (
                  <PaletteCell
                    color={color}
                    // paletteIdx={idx}
                    paletteId={palette.id}
                    cellIdx={cellIdx}
                    key={`${palette.id}${cellIdx}`}
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
