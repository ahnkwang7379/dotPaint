import React from 'react';
import styled from 'styled-components';

const selectBorder = '#000000';
const defaultBorder = '#ffffff';

const Cell = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  width: 17.32px;
  height: 30px;
  background-color: ${(props) => props.color || '#f2c9d2'};
  margin: 3px 0;
  border-top: solid 3px
    ${(props) => (props.selected ? selectBorder : defaultBorder)};
  border-bottom: solid 3px
    ${(props) => (props.selected ? selectBorder : defaultBorder)};
  transition: all 0.5s linear;

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
    background-color: ${(props) => props.color || '#f2c9d2'};
    top: 1.3934px;
    transition: all 0.5s linear;
  }

  :before {
    right: -10.6066px;
    border-top: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
    border-right: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
  }

  :after {
    left: -10.6066px;
    border-bottom: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
    border-left: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
  }
`;

const ColorCell = ({ color, id, onSelectedColor, selected }) => {
  const onSelectClick = () => {
    onSelectedColor(id);
  };
  return <Cell color={color} selected={selected} onClick={onSelectClick} />;
};

export default React.memo(ColorCell);
