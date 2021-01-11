import React from 'react';
import styled, { css } from 'styled-components';

const CustomButtonStyled = styled.button`
  background-color: #f2f2f2;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #59564f;
  ${(props) =>
    props.baseColor &&
    css`
      background: ${props.baseColor};
      color: #fff;
    `}
  width: ${(props) => (props.width ? `${props.width}px` : `100%`)};
  height: ${(props) => (props.height ? `${props.height}px` : `auto`)};
  border: 2px solid #59564f;
  outline: none;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 0.3rem #999;
  transition: all 0.05s ease-in-out;
  ${(props) =>
    !props.disable &&
    css`
      &:hover {
        color: #0d0d0d;
        background: ${(props) => (props.color ? `${props.color}` : `#F2E8DC`)};
      }
      &:active {
        color: #0d0d0d;
        background: ${(props) => (props.color ? `${props.color}` : `#F2E8DC`)};
        box-shadow: 0 0.1rem #666;
        transform: translateY(4px);
      }
    `}

  &:disabled {
    background: #afafaf;
    color: #777777;
  }

  ${(props) =>
    props.selected === true &&
    css`
      color: #0d0d0d;
      background: ${(props) =>
        props.selectColor ? `${props.selectColor}` : `#F2E8DC`};
      box-shadow: 0 0.1rem #666;
      transform: translateY(4px);
    `}
`;

const CustomButton = ({ children, ...rest }) => {
  return <CustomButtonStyled {...rest}>{children}</CustomButtonStyled>;
};

export default React.memo(CustomButton);
