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
  dotClear,
}) => {
  return (
    <>
      <DotAreaBlock>
        <AreaInput value={width} onChange={onChangeWidth} />
        <AreaInput value={height} onChange={onChangeHeight} />
        <button onClick={onChangeArea}>커밋</button>
        <button onClick={dotClear}>초기화버튼임</button>
      </DotAreaBlock>
    </>
  );
};

export default DotAreaControl;
