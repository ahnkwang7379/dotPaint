import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import TempBlockCell from './TempBlockCell';

const TempBlockDiv = styled.div`
  background: rgba(0, 0, 0, 0.3);
  /* width: calc(100% - 40px); */
  width: 100%;
  padding: 8px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  & > * {
    min-width: 30px;
    /* margin-top: 8px; */
  }
  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
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
