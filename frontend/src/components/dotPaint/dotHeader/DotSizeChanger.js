import React, { useState } from 'react';
import styled from 'styled-components';

const DotSizeBlock = styled.div``;
const DotSizeRangeBar = styled.input``;

const DotSizeChanger = ({ dotSize, onChange }) => {
  return (
    <>
      <DotSizeBlock>
        <span>도트 크기{dotSize}</span>
        <DotSizeRangeBar
          type="range"
          min="4"
          max="20"
          value={dotSize * 10}
          onChange={onChange}
          step="2"
        />
      </DotSizeBlock>
    </>
  );
};

export default DotSizeChanger;
