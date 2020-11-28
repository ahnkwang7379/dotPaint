import React from 'react';
import styled from 'styled-components';

const selectBorder = '#000000';
const defaultBorder = '#ffffff';

const Cell = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  width: 30px;
  height: 17.32px;
  margin-left: 0px;
  background-color: ${(props) => props.color || ''};
  border-left: solid 3px
    ${(props) => (props.selected ? selectBorder : defaultBorder)};
  border-right: solid 3px
    ${(props) => (props.selected ? selectBorder : defaultBorder)};
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
    left: 1.3934px;
  }

  :before {
    top: -10.6066px;
    border-top: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
    border-right: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
  }

  :after {
    bottom: -10.6066px;
    border-bottom: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
    border-left: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
  }

  &:hover {
    color: white;
  }
`;

const ColorCell = ({ children, innerRef, ...rest }) => {
  return (
    <Cell ref={innerRef} {...rest}>
      {children}
    </Cell>
  );
};

export default ColorCell;
