import React from 'react';
import styled from 'styled-components';
import DivBlock from '../common/DivBlock';

const DotLine = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0;
`;

const DotPaintLine = ({
  dotLine,
  dotLineIdx,
  border,
  dotSize,
  onDotSelect,
}) => {
  const Dots = (
    <DotLine>
      {dotLine.map((color, columnIdx) => {
        return (
          <DivBlock
            key={[dotLineIdx, columnIdx]}
            rowIdx={dotLineIdx}
            columnIdx={columnIdx}
            dotColor={color}
            dotSize={dotSize}
            border={border}
            onDotSelect={onDotSelect}
          />
        );
      })}
    </DotLine>
  );
  return <>{Dots}</>;
};

export default React.memo(DotPaintLine);
