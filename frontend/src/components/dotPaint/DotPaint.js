import React from 'react';
import DivBlock from '../common/DivBlock';
import styled, { css } from 'styled-components';

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
`;

const DotPaintLineBlock = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0;
`;

const DotPaint = ({
  dotSet,
  border,
  size,
  fillDotLeftColor,
  fillDotRightColor,
}) => {
  return (
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
                  size={size}
                  border={border}
                  fillDotLeftColor={fillDotLeftColor}
                  fillDotRightColor={fillDotRightColor}
                />
              );
            })}
          </DotPaintLineBlock>
        );
      })}
    </DotPaintBlock>
  );
};

export default DotPaint;
