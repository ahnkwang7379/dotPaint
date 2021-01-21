import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { MdClose } from 'react-icons/md';

const ColorBox = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.color,
    border: `3px solid ${props.selected ? 'black' : '#ffffff00'}`,
  },
}))`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  font-size: 16px;
  border-radius: 16px;
  width: 16px;
  height: 16px;
  background-color: orange;
  color: gray;
  &:hover {
    background-color: gray;
    color: orange;
  }
`;

const PaletteCell = ({
  color,
  paletteId,
  cellIdx,
  selected,
  onClickSelectHandle,
  onClickRemoveCellHandle,
}) => {
  return (
    <Draggable
      key={cellIdx}
      draggableId={`cell-${paletteId}-${cellIdx}`}
      index={cellIdx}
    >
      {(provided) => (
        <ColorBox
          color={color}
          selected={selected}
          ref={provided.innerRef}
          id={selected ? `select-color-cell` : ''}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClickSelectHandle(paletteId, cellIdx)}
        >
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation(); // 주의할 것
              onClickRemoveCellHandle(paletteId, cellIdx);
            }}
          >
            <MdClose />
          </DeleteButton>
        </ColorBox>
      )}
    </Draggable>
  );
};

export default PaletteCell;
