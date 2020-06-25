import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DotSizeBlock = styled.div``;
const DotSizeRangeBar = styled.input``;

const DotSizeChanger = ({ dotSize, onChange }) => {
  const [data, setData] = useState(null);
  const onClick = () => {
    axios.get('http://www.colr.org/json/color/random').then((response) => {
      setData(response.data);
    });
  };
  return (
    <>
      <DotSizeBlock>
        <span>도트 크기{dotSize}</span>
        <DotSizeRangeBar
          type="range"
          min="4"
          max="20"
          value={dotSize * 10}
          onChange={onChange}
          step="2"
        />
        <button onClick={onClick}>불러오기</button>
        {data && (
          <textarea
            rows={7}
            value={JSON.stringify(data, null, 2)}
            readOnly={true}
          />
        )}
      </DotSizeBlock>
    </>
  );
};

export default DotSizeChanger;
