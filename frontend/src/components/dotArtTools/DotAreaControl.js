import React, { useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../common/CustomButton';
import { FaArrowsAltH, FaArrowsAltV } from 'react-icons/fa';

const DotAreaBlock = styled.div`
  display: flex;
  width: 120px;
  height: 40px;
`;

const AreaInput = styled.input`
  font-size: 20px;
  width: 40px;
  height: 40px;
  border: 1px solid #225ea7;
  outline: none;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 0.3rem #999;
  transition: all 0.3s ease-in-out;
`;

const DotAreaControl = ({ onChangeArea, row, column, dotClear }) => {
  const [rowCount, setRowCount] = useState(row);
  const [columnCount, setColumnCount] = useState(column);

  const onChangeRow = (e) => {
    setRowCount(e.target.value.replace(/[^0-9]/g, ''));
  };

  const onChangeColumn = (e) => {
    setColumnCount(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <>
      <DotAreaBlock>
        <FaArrowsAltV />
        <AreaInput value={rowCount} onChange={onChangeRow} />
      </DotAreaBlock>
      <DotAreaBlock>
        <FaArrowsAltH />
        <AreaInput value={columnCount} onChange={onChangeColumn} />
      </DotAreaBlock>
      <DotAreaBlock>
        <CustomButton onClick={() => onChangeArea(rowCount, columnCount)}>
          Change
        </CustomButton>
        <CustomButton onClick={dotClear}>Clear</CustomButton>
      </DotAreaBlock>
    </>
  );
};

export default React.memo(DotAreaControl);
