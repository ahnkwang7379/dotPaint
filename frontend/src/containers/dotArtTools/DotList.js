import React from 'react';
import styled from 'styled-components';
import DotListBlock from '../../components/dotArtTools/DotListBlock';
import CustomButton from '../../components/common/CustomButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

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
  handleChangeIdx,
  handleRemoveDotArt,
  handleCopyDotArt,
  handleAddDotArt,
  handleChangeInterval,
}) => {
  return (
    <DotListDiv>
      <CustomButton width="40px" onClick={() => handleAddDotArt()}>
        <AddToPhotosIcon />
      </CustomButton>
      <ScrollCustom>
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
      </ScrollCustom>
    </DotListDiv>
  );
};

export default React.memo(DotList);
