import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';

const TrashCanWrapper = styled.div`
  ${(props) => (props.displayBool ? `` : `display: none`)}
`;

const TrashCanBlock = styled.div`
  width: 35px;
  height: 35px;
  background: skyblue;
`;

const TrashCan = ({ dragType }) => {
  return (
    <React.Fragment>
      <TrashCanWrapper displayBool={dragType === 'pale'}>
        <Droppable type="palettes" droppableId="PaletteTrashCan">
          {(provided) => (
            <TrashCanBlock ref={provided.innerRef} {...provided.droppableProps}>
              <DeleteIcon fontSize="large" />
              {provided.placeholder}
            </TrashCanBlock>
          )}
        </Droppable>
      </TrashCanWrapper>
      <TrashCanWrapper displayBool={dragType === 'cell'}>
        <Droppable type="cell" droppableId="CellTrashCan">
          {(provided) => (
            <TrashCanBlock ref={provided.innerRef} {...provided.droppableProps}>
              <DeleteIcon fontSize="large" />
              {provided.placeholder}
            </TrashCanBlock>
          )}
        </Droppable>
      </TrashCanWrapper>
      <TrashCanWrapper displayBool={dragType === 'temp'}>
        <TrashCanBlock>
          <DeleteIcon fontSize="large" />
        </TrashCanBlock>
      </TrashCanWrapper>
    </React.Fragment>
  );
};

export default TrashCan;
