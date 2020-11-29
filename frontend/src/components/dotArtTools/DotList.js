import React from 'react';
import styled from 'styled-components';
import DotListBlock from './DotListBlock';
import CustomButton from '../common/CustomButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

const DotListDiv = styled.div`
  max-height: 90vh;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollCustom = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  width: auto;
  height: 100%;
  margin: 0px 8px;
  flex-wrap: nowrap;
  overflow: auto;
  position: sticky;
  & > *:not(:last-child) {
    width: 80px;
    min-width: 80px;
    height: 96px;
  }
  & > * {
    margin: 8px;
  }
  &::-webkit-scrollbar {
    width: 8px;
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

const DotList = ({
  dotList,
  activeIdx,
  columnCount,
  handleChangeIdx,
  handleRemoveDotArt,
  handleCopyDotArt,
  handleAddDotArt,
  handleChangeInterval,
  handleReorderDotList,
}) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.type === 'dotList') {
      handleReorderDotList(result.source.index, result.destination.index);
    }
  };

  return (
    <DotListDiv>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dotList" type="dotList">
          {(provided) => (
            <ScrollCustom ref={provided.innerRef} {...provided.droppableProps}>
              {dotList &&
                dotList.map((dot, idx) => {
                  return (
                    <DotListBlock
                      active={activeIdx === idx}
                      idx={idx}
                      key={dot.id}
                      dot={dot.dot}
                      interval={dot.interval}
                      columnCount={columnCount}
                      handleCopyDotArt={handleCopyDotArt}
                      handleRemoveDotArt={handleRemoveDotArt}
                      handleChangeInterval={handleChangeInterval}
                      handleChangeIdx={handleChangeIdx}
                      lastIndex={dotList.length - 1 === idx}
                    />
                  );
                })}
              {provided.placeholder}
              <CustomButton width="80" onClick={() => handleAddDotArt()}>
                <AddBoxIcon />
              </CustomButton>
            </ScrollCustom>
          )}
        </Droppable>
      </DragDropContext>
    </DotListDiv>
  );
};

export default React.memo(DotList);
