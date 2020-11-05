import React from 'react';
import styled from 'styled-components';

const TempBlockDiv = styled.div`
  display: flex;
`;

const Trash = styled.div`
  background: ${(props) => props.color};
  width: 32px;
  height: 32px;
`;

const TempBlock = ({ trashCan }) => {
  return (
    <TempBlockDiv>
      {trashCan.map((trash) => (
        <Trash color={trash} />
      ))}
    </TempBlockDiv>
  );
};

export default TempBlock;
