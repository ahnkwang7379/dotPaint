import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomButton from '../common/CustomButton';
import ToolTip from '../common/ToolTip';
import TextField from '@material-ui/core/TextField';

const DotAreaWrapper = styled.div`
  border: 2px solid #59564f;
  border-radius: 3px;
  padding: 4px 6px;
  background-color: #f2e8dc;
`;

const DotAreaBlock = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
`;

const DotAreaControl = ({ onChangeArea, rowCount, columnCount }) => {
  const [row, setRow] = useState(rowCount);
  const [column, setColumn] = useState(columnCount);

  useEffect(() => {
    setRow(rowCount);
    setColumn(columnCount);
  }, [rowCount, columnCount]);

  const onChangeRow = (e) => {
    setRow(e.target.value);
  };

  const onChangeColumn = (e) => {
    setColumn(e.target.value);
  };

  return (
    <DotAreaWrapper>
      <DotAreaBlock>
        <TextField
          size="small"
          variant="outlined"
          type="number"
          label="Row"
          color="secondary"
          value={row}
          onChange={(e) => onChangeRow(e)}
        />
        <TextField
          size="small"
          variant="outlined"
          type="number"
          label="Column"
          color="secondary"
          value={column}
          onChange={(e) => onChangeColumn(e)}
        />
      </DotAreaBlock>
      <DotAreaBlock>
        <ToolTip placement="top" tooltip={<>Apply dot area size</>}>
          <CustomButton onClick={() => onChangeArea(row, column)}>
            Apply
          </CustomButton>
        </ToolTip>
      </DotAreaBlock>
    </DotAreaWrapper>
  );
};

export default React.memo(DotAreaControl);
