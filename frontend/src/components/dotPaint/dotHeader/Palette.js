import React from 'react';
import styled from 'styled-components';
import PaletteCell from '../../common/PaletteCell';
import NickBlock from './NickBlock';

const PaletteWrapper = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  background: rgba(10, 10, 10, 0.2);
`;
const PaletteBlock = styled.div`
  display: flex;
  & + & {
    margin-top: 3px;
  }
`;

const Palette = ({ paletteSet }) => {
  return (
    <PaletteWrapper>
      {paletteSet.map((palette) => (
        <PaletteBlock key={palette.id}>
          <NickBlock palette={palette} />
          {palette.colors.map((color, idx) =>
            idx % 2 === 0 ? (
              <PaletteCell key={idx} color={color} />
            ) : (
              <PaletteCell key={idx} color={color} odd />
            ),
          )}
        </PaletteBlock>
      ))}
    </PaletteWrapper>
  );
};

export default Palette;
