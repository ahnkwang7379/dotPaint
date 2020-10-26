import React, { useEffect } from 'react';
import DialogContainer from '../containers/dialog/DialogContainer';
import DotListContainer from '../containers/dotArtTools/DotListContainer';
import PreViewContainer from '../containers/dotArtTools/PreViewContainer';
import DotPaintContainer from '../containers/DotPaintContainer';
import PaintToolContainer from '../containers/DotHeader/PaintToolContainer';
import BottomToolsContainer from '../containers/dotArtTools/BottomToolsContainer';
import UndoRedoContainer from '../containers/dotArtTools/UndoRedoContainer';
import SaveLoadContainer from '../containers/dotArtTools/SaveLoadContainer';
// import { useDispatch } from 'react-redux';
// import { changePaintState } from '../modules/paintTool';
import styled from 'styled-components';

const ToolBox = styled.div`
  display: flex;
`;

const DotArtPage = () => {
  // const dispatch = useDispatch();
  // const onTouchEnd = () => {
  //   dispatch(changePaintState('IDLE'));
  // };
  // const onTouchCancel = () => {
  //   dispatch(changePaintState('IDLE'));
  // };
  return (
    // <div onTouchEnd={onTouchEnd} onTouchCancel={onTouchCancel}>
    <div>
      <DialogContainer />
      <DotListContainer />
      <DotPaintContainer />
      <ToolBox>
        <div>
          <SaveLoadContainer />
          <PaintToolContainer />
          <UndoRedoContainer />
        </div>
        <PreViewContainer />
      </ToolBox>
      <BottomToolsContainer />
    </div>
  );
};

export default DotArtPage;
