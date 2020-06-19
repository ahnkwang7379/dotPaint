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

const DotPaintLineBlock = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0;
`;

const DotPaint = ({
  dotSet,
  border,
  dotSize,
  colorLeft,
  colorRight,
  fillDotLeftColor,
  fillDotRightColor,
}) => {
  const DotLines = (
    <DotPaintBlock>
      {dotSet.map((dotLine, idx) => {
        return (
          <DotPaintLine
            key={idx}
            dotLine={dotLine}
            dotLineIdx={idx}
            dotSize={dotSize}
            border={border}
            fillDotLeftColor={fillDotLeftColor}
            fillDotRightColor={fillDotRightColor}
          />
        );
      })}
    </DotPaintBlock>
  );
  return <>{DotLines}</>;
};

export default DotPaint;
