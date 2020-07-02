import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { TiPinOutline } from 'react-icons/ti';
import { RiDeleteBinLine } from 'react-icons/ri';

const NickBox = styled.div`
  display: flex;
  width: auto;
  height: auto;
`;
const NickInput = styled.input`
  width: 100px;
  height: 100%;
  border: none;
  background: inherit;
  font-size: 12px;
  font-weight: bold;
  text-align: right;
  margin-right: 5px;
  :focus {
    text-align: left;
    outline: none;
  }
`;
const NickButton = styled.button`
  cursor: pointer;
  width: 15px;
  height: 15px;
  margin: 0;
  padding: 0;
`;

const NickBlock = ({ palette, onChangeNick, onDeletePalette }) => {
  const [nick, setNick] = useState(palette.nick);
  const onChangeInput = (e) => {
    setNick(e.target.value);
  };
  const changeNick = () => {
    if (palette.nick !== nick) onChangeNick(palette.id, nick);
  };
  const deletePalette = () => {
    onDeletePalette(palette.id);
  };
  return (
    <>
      <NickBox>
        <NickButton />
        <NickButton onClick={deletePalette}>
          <RiDeleteBinLine />
        </NickButton>
        <NickButton onClick={changeNick}>
          <TiPinOutline />
        </NickButton>
        <NickInput onBlur={changeNick} onChange={onChangeInput} value={nick} />
      </NickBox>
    </>
  );
};

export default NickBlock;
