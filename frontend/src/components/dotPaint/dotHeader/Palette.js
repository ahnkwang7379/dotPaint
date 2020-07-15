import React from 'react';
import styled, { css } from 'styled-components';
import NickBlock from './NickBlock';
import PaletteCell from '../../common/PaletteCell';
import { RiHeartAddLine } from 'react-icons/ri';

const PaletteWrapper = styled.div`
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  background: rgba(10, 10, 10, 0.2);
`;
const PaletteBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const PaletteNav = styled.div`
  width: 200px;
  height: 200px;
  background: black;
`;
const PaletteBlock = styled.div`
  display: inherit;
`;
const PaletteSet = styled.div`
  display: inherit;
  & + & {
    margin-top: 10px;
  }
  ${(props) =>
    props.odd &&
    css`
      margin-left: 17px;
    `}
`;

const AddPaletteButton = styled.button`
  box-sizing: border-box;
  outline: none;
  padding: 0;
  margin: 0;
  border-radius: 1rem;
  border: 2px solid black;
  color: black;
  width: 100px;
  height: 30px;
  background: white;
  cursor: pointer;

  /* &:hover {
    color: black;
    border: 2px solid black;
  } */
`;

const Palette = ({
  paletteSet,
  onSelectColor,
  onInsertColor,
  onDeleteColor,
  onChangeNick,
  onInsertPalette,
  onDeletePalette,
  selectColorId,
}) => {
  let count = 0;
  const Palettes = paletteSet.map((palette) => (
    <PaletteSet key={palette.id} odd={++count % 2 === 0}>
      <NickBlock
        paletteId={palette.id}
        paletteNick={palette.nick}
        onChangeNick={onChangeNick}
        onDeletePalette={onDeletePalette}
      />
      <PaletteBlock>
        {palette.colors.map((color, idx) => (
          <PaletteCell
            key={idx}
            color={color}
            selectData={{ palette: palette.id, color: idx }}
            onSelectColor={onSelectColor}
            onDeleteColor={onDeleteColor}
            selected={
              palette.id === selectColorId.paletteId &&
              idx === selectColorId.colorId
            }
          />
        ))}
        {/* palette 색은 최대 10개까지 */}
        {palette.colors.length <= 10 ? (
          <PaletteCell
            selectData={{ palette: palette.id }}
            onInsertColor={onInsertColor}
          />
        ) : null}
      </PaletteBlock>
    </PaletteSet>
  ));

  return (
    <PaletteWrapper>
      <PaletteBody>
        {Palettes}
        {count < 10 ? (
          <PaletteSet odd={++count % 2 === 0}>
            <AddPaletteButton onClick={onInsertPalette}>
              <RiHeartAddLine />
            </AddPaletteButton>
          </PaletteSet>
        ) : null}
      </PaletteBody>
      <PaletteNav></PaletteNav>
    </PaletteWrapper>
  );
};

export default React.memo(Palette);
