import React from 'react';
import styled, { css } from 'styled-components';

const CustomButtonStyled = styled.button`
  font-size: 20px;
  color: #6e6e6e;
  width: ${(props) => (props.width ? `${props.width}` : `100%`)};
  height: ${(props) => (props.height ? `${props.height}` : `auto`)};
  border: 1px solid #225ea7;
  outline: none;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 0.3rem #999;
  transition: all 0.1s ease-in-out;
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

const CustomButton = ({ children, ...rest }) => {
  return <CustomButtonStyled {...rest}>{children}</CustomButtonStyled>;
};

export default CustomButton;
