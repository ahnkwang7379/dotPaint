import React from 'react';
import styled from 'styled-components';

const DotAreaBlock = styled.div``;
const AreaInput = styled.input``;

const DotAreaControl = ({
  onChangeArea,
  width,
  height,
  onChangeWidth,
  onChangeHeight,
}) => {
  return (
    <>
      <DotAreaBlock>
        <AreaInput value={width} onChange={onChangeWidth} />
        <AreaInput value={height} onChange={onChangeHeight} />
        <button onClick={onChangeArea}>커밋</button>
      </DotAreaBlock>
    </>
  );
};

export default DotAreaControl;
