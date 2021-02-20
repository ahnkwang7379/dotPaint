import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import ToolTip from '../common/ToolTip';
import TextField from '@material-ui/core/TextField';

const DotAreaWrapper = styled.div`
  border: 2px solid #59564f;
  border-radius: 3px;
  padding: 4px 1px;
  background-color: #f2e8dc;
`;

const DotAreaBlock = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  line-height: 55px;
  align-items: center;
  & > div {
    width: 70px;
    margin: 8px;
  }
`;

const DotAreaControl = ({
  onChangeArea,
  rowCount,
  columnCount,
  changeTypingHandle,
}) => {
  const [width, setWidth] = useState(columnCount);
  const [height, setHeight] = useState(rowCount);

  useEffect(() => {
    setWidth(columnCount);
    setHeight(rowCount);
  }, [rowCount, columnCount]);

  const onChangeWidth = (e) => {
    setWidth(e.target.value);
  };

  const onChangeHeight = (e) => {
    setHeight(e.target.value);
  };

  return (
    <DotAreaWrapper>
      <DotAreaBlock>
        <TextField
          size="small"
          variant="outlined"
          type="number"
          label="Width"
          color="secondary"
          value={width}
          onChange={(e) => onChangeWidth(e)}
          onFocus={() => changeTypingHandle(true)}
          onBlur={() => changeTypingHandle(false)}
        />
        X
        <TextField
          size="small"
          variant="outlined"
          type="number"
          label="Height"
          color="secondary"
          value={height}
          onChange={(e) => onChangeHeight(e)}
          onFocus={() => changeTypingHandle(true)}
          onBlur={() => changeTypingHandle(false)}
        />
        <ToolTip placement="top" tooltip={<>Apply dot area size</>}>
          <Button onClick={() => onChangeArea(height, width)}>Apply</Button>
        </ToolTip>
      </DotAreaBlock>
    </DotAreaWrapper>
  );
};

export default React.memo(DotAreaControl);
