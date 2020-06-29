import React from 'react';
import styled, { css } from 'styled-components';

const ToggleButtonStyled = styled.button`
  font-size: 20px;
  width: 40px;
  height: 40px;
  border: 1px solid #225ea7;
  outline: none;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 0.3rem #999;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #fff;
    background: skyblue;
  }
  &:active {
    color: #fff;
    background: skyblue;
    box-shadow: 0 0.1rem #666;
    transform: translateY(4px);
  }

  ${(props) =>
    props.selected === true &&
    css`
      color: #fff;
      background: skyblue;
      box-shadow: 0 0.1rem #666;
      transform: translateY(4px);
    `}
  & + & {
    margin-left: 5px;
  }
`;

const ToggleButton = ({ children, ...rest }) => {
  return <ToggleButtonStyled {...rest}>{children}</ToggleButtonStyled>;
};

export default ToggleButton;
