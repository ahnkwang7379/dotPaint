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
  onChangePaintState,
  onChangeDot,
}) => {
  return (
    <DotLine>
      {dotLine.map((color, columnIdx) => {
        return (
          <DivBlock
            key={columnIdx}
            rowIdx={dotLineIdx}
            columnIdx={columnIdx}
            dotColor={color}
            dotSize={dotSize}
            border={border}
            onChangePaintState={onChangePaintState}
            onChangeDot={onChangeDot}
          />
        );
      })}
    </DotLine>
  );
};

export default React.memo(DotPaintLine);
