import React from 'react';
import styled from 'styled-components';
import DotListBlock from './DotListBlock';
import CustomButton from '../common/CustomButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

const DotListDiv = styled.div`
  display: flex;
`;

const ScrollCustom = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  width: calc(100% - 40px);
  margin: 0px 8px;
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  & > * {
    width: 72px;
    min-width: 72px;
    margin: 8px 0px 8px 8px;
    height: 88px;
  }
  & > :last-child {
    margin-right: 8px;
  }
  &::-webkit-scrollbar {
    width: 16px;
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
  rowCount,
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
      <CustomButton width="40" onClick={() => handleAddDotArt()}>
        <AddToPhotosIcon />
      </CustomButton>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dotList" type="dotList" direction="horizontal">
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
                      rowCount={rowCount}
                      handleCopyDotArt={handleCopyDotArt}
                      handleRemoveDotArt={handleRemoveDotArt}
                      handleChangeInterval={handleChangeInterval}
                      handleChangeIdx={handleChangeIdx}
                      lastIndex={dotList.length - 1 === idx}
                    />
                  );
                })}
              {provided.placeholder}
            </ScrollCustom>
          )}
        </Droppable>
      </DragDropContext>
    </DotListDiv>
  );
};

export default React.memo(DotList);
