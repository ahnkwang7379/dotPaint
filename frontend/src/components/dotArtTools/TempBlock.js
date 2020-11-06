import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import TempBlockCell from './TempBlockCell';

const TempBlockDiv = styled.div`
  display: flex;
`;
const TempBlock = ({ trashCan }) => {
  return (
    <Droppable
      droppableId="temp"
      type="cell"
      direction="horizontal"
      isDropDisabled={true}
    >
      {(provided) => (
        <TempBlockDiv ref={provided.innerRef} {...provided.droppableProps}>
          {trashCan.map((color, cellIdx) => (
            <TempBlockCell
              color={color}
              cellIdx={cellIdx}
              key={`temp-${cellIdx}`}
            />
          ))}
          {provided.placeholder}
        </TempBlockDiv>
      )}
    </Droppable>
  );
};

export default TempBlock;
