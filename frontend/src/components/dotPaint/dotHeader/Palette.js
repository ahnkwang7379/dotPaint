import React from 'react';
import styled, { css } from 'styled-components';
import NickBlock from './NickBlock';
import PaletteCell from '../../common/PaletteCell';

const PaletteWrapper = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  background: rgba(10, 10, 10, 0.2);
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

const Palette = ({
  paletteSet,
  onSelectColor,
  onInsertColor,
  onChangeNick,
  onDeletePalette,
  selectColorId,
}) => {
  return (
    <PaletteWrapper>
      {paletteSet.map((palette) => (
        <PaletteSet key={palette.id} odd={palette.id % 2 === 0}>
          <NickBlock
            palette={palette}
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
            ) : (
              ''
            )}
          </PaletteBlock>
        </PaletteSet>
      ))}
    </PaletteWrapper>
  );
};

export default Palette;
