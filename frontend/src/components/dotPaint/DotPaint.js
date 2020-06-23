import React from 'react';
import styled from 'styled-components';
import DotPaintLine from './DotPaintLine';

const DotPaintBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: auto;
  height: auto;
  margin: 0 auto;
  padding: 0;
  border: 1px solid black;
  box-sizing: border-box;
  overflow: hidden;
`;

const DotPaint = ({
  dotSet,
  border,
  dotSize,
  onDotSelect,
  onChangePaintState,
  onChangeDot,
}) => {
  return (
    <DotPaintBlock>
      {dotSet.map((dotLine, idx) => {
        return (
          <DotPaintLine
            dotLine={dotLine}
            key={idx}
            dotLineIdx={idx}
            dotSize={dotSize}
            border={border}
            onChangePaintState={onChangePaintState}
            onChangeDot={onChangeDot}
          />
        );
      })}
    </DotPaintBlock>
  );
};

export default DotPaint;
