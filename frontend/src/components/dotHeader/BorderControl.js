import React from 'react';
import styled from 'styled-components';

const BorderBox = styled.button``;

const BorderControl = ({ toggleBorder }) => {
  return (
    <>
      <BorderBox onClick={toggleBorder}>요기임</BorderBox>
    </>
  );
};

export default BorderControl;
