import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const CustomStyle = css`
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
  height: ${(props) => (props.height ? `${props.height}px` : `100%`)};
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
        background: ${(props) => (props.color ? `${props.color}` : `#a69e94`)};
      }
      &:active {
        color: #0d0d0d;
        background: ${(props) => (props.color ? `${props.color}` : `#a69e94`)};
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
        props.selectColor ? `${props.selectColor}` : `#a69e94`};
      box-shadow: 0 0.1rem #666;
      transform: translateY(4px);
    `}
`;

const CustomButtonStyled = styled.button`
  ${CustomStyle}
`;

const CustomLinkStyled = styled(Link)`
  ${CustomStyle}
`;

const CustomButton = ({ children, ...rest }) => {
  return rest.to ? (
    <CustomLinkStyled {...rest}>{children}</CustomLinkStyled>
  ) : (
    <CustomButtonStyled {...rest}>{children}</CustomButtonStyled>
  );
};

export default React.memo(CustomButton);
