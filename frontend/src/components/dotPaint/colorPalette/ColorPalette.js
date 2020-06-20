import React from 'react';
import styled, { css } from 'styled-components';

const PaletteWrapper = styled.div`
  /* background: rgba(10, 10, 10, 0.7); */
  display: flex;
`;

const ColorBlock = styled.div`
  margin-left: 11px;
  ${(props) =>
    props.odd &&
    css`
      margin-top: 17px;
    `}
`;

const ColorCell = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  width: 17.32px;
  height: 30px;
  background-color: ${(props) => props.color || '#f2c9d2'};
  margin: 3px 0;
  border-top: solid 3px ${(props) => props.selected || 'transparent'};
  border-bottom: solid 3px ${(props) => props.selected || 'transparent'};

  :before,
  :after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    width: 21.21px;
    height: 21.21px;
    -webkit-transform: scaleX(0.5774) rotate(45deg);
    -ms-transform: scaleX(0.5774) rotate(45deg);
    transform: scaleX(0.5774) rotate(45deg);
    background-color: inherit;
    top: 1.3934px;
  }

  :before {
    right: -10.6066px;
    border-top: solid 4.2426px ${(props) => props.selected || 'transparent'};
    border-right: solid 4.2426px ${(props) => props.selected || 'transparent'};
  }

  :after {
    left: -10.6066px;
    border-bottom: solid 4.2426px ${(props) => props.selected || 'transparent'};
    border-left: solid 4.2426px ${(props) => props.selected || 'transparent'};
  }
`;

// 팔레트 배치를 어떤 방식으로 할 지 고민해야함
function paletteMaker(paletteSet) {
  const paletteLength = paletteSet.length;

  return '';
}

const ColorPalette = ({ paletteSet, selectedId }) => {
  return (
    <PaletteWrapper>
      <ColorBlock odd>
        <ColorCell />
        <ColorCell />
        <ColorCell selected="black" />
        <ColorCell />
      </ColorBlock>
      <ColorBlock>
        <ColorCell />
        <ColorCell />
        <ColorCell />
        <ColorCell />
        <ColorCell />
      </ColorBlock>
      <ColorBlock odd>
        <ColorCell />
        <ColorCell />
        <ColorCell />
        <ColorCell />
      </ColorBlock>
      <ColorBlock>
        <ColorCell />
        <ColorCell />
        <ColorCell />
        <ColorCell />
        <ColorCell />
      </ColorBlock>
      <ColorBlock>
        {paletteSet.map((color, idx) => {
          return <ColorCell color={color} key={idx} id={idx} />;
        })}
      </ColorBlock>
    </PaletteWrapper>
  );
};

export default ColorPalette;
