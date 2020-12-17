import React from 'react';
import styled, { css } from 'styled-components';

const CustomButtonStyled = styled.button`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6e6e6e;
  ${(props) =>
    props.baseColor &&
    css`
      background: ${props.baseColor};
      color: #fff;
    `}
  width: ${(props) => (props.width ? `${props.width}px` : `100%`)};
  height: ${(props) => (props.height ? `${props.height}px` : `auto`)};
  border: 1px solid #225ea7;
  outline: none;
  // border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 0.3rem #999;
  transition: all 0.05s ease-in-out;
  &:hover {
    color: #fff;
    background: ${(props) => (props.color ? `${props.color}` : `skyblue`)};
  }
  &:active {
    color: #fff;
    background: ${(props) => (props.color ? `${props.color}` : `skyblue`)};
    box-shadow: 0 0.1rem #666;
    transform: translateY(4px);
  }

  ${(props) =>
    props.selected === true &&
    css`
      color: #fff;
      background: ${(props) =>
        props.selectColor ? `${props.selectColor}` : `skyblue`};
      box-shadow: 0 0.1rem #666;
      transform: translateY(4px);
    `}
`;

const CustomButton = ({ children, ...rest }) => {
  return <CustomButtonStyled {...rest}>{children}</CustomButtonStyled>;
};

export default React.memo(CustomButton);
