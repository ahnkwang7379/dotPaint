import React, { useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../common/CustomButton';
import { TiPlusOutline, TiMinusOutline } from 'react-icons/ti';

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
        <CustomButton
          onClick={() => {
            setRowCount(rowCount + 1);
            onChangeArea(rowCount + 1, columnCount);
          }}
        >
          <TiPlusOutline />
        </CustomButton>
        <AreaInput value={rowCount} onChange={onChangeRow} />
        <CustomButton
          onClick={() => {
            setRowCount(rowCount - 1);
            onChangeArea(rowCount - 1, columnCount);
          }}
        >
          <TiMinusOutline />
        </CustomButton>
      </DotAreaBlock>
      <DotAreaBlock>
        <CustomButton
          onClick={() => {
            setColumnCount(columnCount + 1);
            onChangeArea(rowCount, columnCount + 1);
          }}
        >
          <TiPlusOutline />
        </CustomButton>
        <AreaInput value={columnCount} onChange={onChangeColumn} />
        <CustomButton
          onClick={() => {
            setColumnCount(columnCount - 1);
            onChangeArea(rowCount, columnCount - 1);
          }}
        >
          <TiMinusOutline />
        </CustomButton>
      </DotAreaBlock>
      <DotAreaBlock>
        <button onClick={() => onChangeArea(rowCount, columnCount)}>
          커밋
        </button>
        <button onClick={dotClear}>초기화버튼임</button>
      </DotAreaBlock>
    </>
  );
};

export default React.memo(DotAreaControl);
