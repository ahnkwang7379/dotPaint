import React from 'react';
import styled from 'styled-components';

const DotSizeBlock = styled.div``;
const DotSizeRangeBar = styled.input``;

const DotSizeChanger = ({ dotSize, onChange }) => {
  return (
    <>
      <DotSizeBlock>
        <span>{dotSize}</span>
        <DotSizeRangeBar
          type="range"
          min="5"
          max="30"
          value={dotSize * 10}
          onChange={onChange}
          step="5"
        />
      </DotSizeBlock>
    </>
  );
};

export default DotSizeChanger;
