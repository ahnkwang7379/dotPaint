import React from 'react';
import styled from 'styled-components';

const Cell = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 30px;
  height: 17.32px;
  margin-left: 0px;
  background-color: ${(props) => props.color || ''};
  outline: none;

  :before,
  :after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    width: 21.21px;
    height: 21.21px;
    -webkit-transform: scaleY(0.5774) rotate(-45deg);
    -ms-transform: scaleY(0.5774) rotate(-45deg);
    transform: scaleY(0.5774) rotate(-45deg);
    background-color: ${(props) => props.color || ''};
  }

  :before {
    top: -10.6066px;
  }

  :after {
    bottom: -10.6066px;
  }

  &:hover {
    color: white;
  }
`;

const IndexBox = styled.div`
  background-color: black;
  color: gold;
  font-size: 0.5em;
  font-weight: bold;
  text-align: center;
  line-height: 9px;
  z-index: 10;
  padding: 2px;
  border-radius: 3px;
`;

const ColorCell = ({ children, selectedPalette, cellIdx, ...rest }) => {
  return (
    <Cell {...rest}>
      {selectedPalette && <IndexBox>{cellIdx + 1}</IndexBox>}
      {children}
    </Cell>
  );
};

export default ColorCell;
