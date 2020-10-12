import React, { useCallback } from 'react';
import styled from 'styled-components';
import PreViewBlock from '../../components/dotArtTools/PreViewBlock';
import CustomButton from '../../components/common/CustomButton';
import { useDispatch } from 'react-redux';
import { changeActiveIdx, removeActiveDotArt, copyActiveDotArt, addNewDotArt } from '../../modules/dot';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

const DotListBlock = styled.div`
  display: flex;
`;

const ScrollCustom = styled.div`
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  & > * {
    min-width: 64px;
    margin: 8px 0px 8px 8px;
    height: 64px;
  }
  &::-webkit-scrollbar {
    width: 20px;
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

const DotList = ({ dotList, activeIdx, columnCount }) => {
  const dispatch = useDispatch();
  const handleChangeIdx = useCallback(
    (idx) => {
      dispatch(
        changeActiveIdx(idx),
      );
    },
    [dispatch],
  );
  const handleRemoveDotArt = useCallback(
    (idx) => {
      dispatch(
        removeActiveDotArt(idx),
      );
    },
    [dispatch],
  );
  const handleCopyDotArt = useCallback(
    (idx) => {
      dispatch(
        copyActiveDotArt(idx),
      );
    },
    [dispatch],
  );
  const handleAddDotArt = useCallback(
    () => {
      dispatch(
        addNewDotArt(),
      );
    },
    [dispatch],
  )
  
  return (
    <DotListBlock>
      <CustomButton width="40px" onClick={() => handleAddDotArt()}>
        <AddToPhotosIcon />
      </CustomButton>
      <ScrollCustom>
        {dotList.map((dot, idx) => {
          return (
            activeIdx === idx ? (
              <PreViewBlock key={dot.id} active={true} idx={idx} dot={dot.dot} columnCount={columnCount} handleCopyDotArt={handleCopyDotArt} handleRemoveDotArt={handleRemoveDotArt} />
            ) : (
              <PreViewBlock key={dot.id} idx={idx} dot={dot.dot} columnCount={columnCount} handleChangeIdx={handleChangeIdx} />
            )
          )
        })}
      </ScrollCustom>
    </DotListBlock>
  );
};

export default React.memo(DotList);
