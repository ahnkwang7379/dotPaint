import React, { useMemo } from 'react';
import DivBlock from '../common/DivBlock';
import styled from 'styled-components';

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
  const Dots = useMemo(
    () => (
      <DotPaintBlock>
        {dotSet.map((dot, idx) => {
          return (
            <DotPaintLineBlock key={idx}>
              {dot.map((color, colorIdx) => {
                return (
                  <DivBlock
                    key={[idx, colorIdx]}
                    number={[idx, colorIdx]}
                    dotColor={color}
                    dotSize={dotSize}
                    border={border}
                    colorLeft={colorLeft}
                    colorRight={colorRight}
                    fillDotLeftColor={fillDotLeftColor}
                    fillDotRightColor={fillDotRightColor}
                  />
                );
              })}
            </DotPaintLineBlock>
          );
        })}
      </DotPaintBlock>
    ),
    [
      dotSet,
      border,
      dotSize,
      colorLeft,
      colorRight,
      fillDotLeftColor,
      fillDotRightColor,
    ],
  );
  return <>{Dots}</>;
};

export default DotPaint;
