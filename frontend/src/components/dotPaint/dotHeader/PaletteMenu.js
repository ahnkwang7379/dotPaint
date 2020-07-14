import React from 'react';
import styled from 'styled-components';

const PaletteMenuButtons = styled.button`
  width: 50px;
  height: 50px;
`;

const PaletteMenu = () => {
  return (
    <>
      <PaletteMenuButtons>컬러변경</PaletteMenuButtons>
    </>
  );
};

export default React.memo(PaletteMenu);
