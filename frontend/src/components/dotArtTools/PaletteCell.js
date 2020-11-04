import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';

const selectBorder = '#000000';
const defaultBorder = '#ffffff';

const Cell = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  width: 30px;
  height: 17.32px;
  margin-left: 0px;
  background-color: ${(props) => props.color || ''};
  border-left: solid 3px
    ${(props) => (props.selected ? selectBorder : defaultBorder)};
  border-right: solid 3px
    ${(props) => (props.selected ? selectBorder : defaultBorder)};
  /* transition: all 0.5s linear; */

  :before,
  :after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    width: 21.21px;
    height: 21.21px;
    -webkit-transform: scaleY(0.5774) rotate(-45deg);
    -ms-transform: scaleY(0.5774) rotate(-45deg);
    transform: scaleY(0.5774) rotate(-45deg);
    background-color: ${(props) => props.color || ''};
    left: 1.3934px;
    /* transition: all 0.5s linear; */
  }

  :before {
    top: -10.6066px;
    border-top: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
    border-right: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
  }

  :after {
    bottom: -10.6066px;
    border-bottom: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
    border-left: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
  }

  &:hover {
    color: white;
  }
`;

const PaletteCell = ({ color, paletteId, cellIdx, selected, clone }) => {
  return clone ? (
    <Cell />
  ) : (
    <Draggable
      key={cellIdx}
      draggableId={`cell-${paletteId}-${cellIdx}`}
      index={cellIdx}
    >
      {(provided, snapshot) => (
        <Cell
          color={color}
          selected={selected}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        />
      )}
    </Draggable>
  );
};

export default PaletteCell;
