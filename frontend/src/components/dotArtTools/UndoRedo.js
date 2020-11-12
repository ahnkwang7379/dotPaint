import React from 'react';
import { FaUndo, FaRedo } from 'react-icons/fa';
import CustomButton from '../common/CustomButton';
import styled from 'styled-components';

const RedoUndoBlock = styled.div`
  display: flex;
  height: 40px;
`;

const UndoRedo = ({ undoHandle, redoHandle }) => {
  return (
    <RedoUndoBlock>
      <CustomButton onClick={() => undoHandle()}>
        <FaUndo />
      </CustomButton>
      <CustomButton onClick={() => redoHandle()}>
        <FaRedo />
      </CustomButton>
    </RedoUndoBlock>
  );
};

export default UndoRedo;
