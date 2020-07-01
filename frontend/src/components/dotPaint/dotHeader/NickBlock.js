import React from 'react';
import styled from 'styled-components';

const NickBox = styled.div`
  display: flex;
  width: auto;
  height: auto;
`;
const NickInput = styled.input`
  width: 100px;
  height: 100%;
`;
const NickButton = styled.button`
  width: 15px;
  height: 15px;
`;

const NickBlock = ({ palette }) => {
  return (
    <>
      <NickBox>
        {/* Block 지우기 */}
        <NickButton />
        <NickInput value={palette.nick} />
        <div>
          {/* Block 닉네임 바꾸기 */}
          <NickButton />
          <NickButton />
        </div>
      </NickBox>
    </>
  );
};

export default NickBlock;
