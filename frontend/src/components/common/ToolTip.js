import React from 'react';
import styled, { css } from 'styled-components';

const ToolTipBody = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  display: inline-block;
  &:hover > span {
    visibility: visible;
    &:hover {
      visibility: hidden;
    }
  }
`;

const ToolTipText = styled.span`
  font-size: 11px;
  visibility: hidden;
  width: ${(props) =>
    props.toolTipWidth ? `${props.toolTipWidth}px` : '120px'};
  background-color: #59564f;
  color: #f2f2f2;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 99;
  ${(props) => {
    if (!props.direction || props.direction === 'top')
      return css`
        bottom: 100%;
        left: 50%;
        margin-bottom: 5px;
        margin-left: ${(props) =>
          props.toolTipWidth ? `-${props.toolTipWidth / 2}px` : '-60px'};

        &:after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #59564f transparent transparent transparent;
        }
      `;
  }}
  ${(props) => {
    if (props.direction === 'bottom')
      return css`
        top: 100%;
        left: 50%;
        margin-top: 5px;
        margin-left: ${(props) =>
          props.toolTipWidth ? `-${props.toolTipWidth / 2}px` : '-60px'};

        &:after {
          content: '';
          position: absolute;
          bottom: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent #59564f transparent;
        }
      `;
  }}

  // left right 의 경우 height 계산이 가변이므로 계산된 후 조절하기 위해 DotArtPage.js에 함수를 넣어둠..
  ${(props) => {
    if (props.direction === 'left')
      return css`
        right: 100%;
        top: 50%;
        margin-right: 5px;
        &:after {
          content: '';
          position: absolute;
          left: 100%;
          top: 50%;
          margin-top: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent transparent #59564f;
        }
      `;
  }}
  ${(props) => {
    if (props.direction === 'right')
      return css`
        left: 100%;
        top: 50%;
        margin-left: 5px;
        &:after {
          content: '';
          position: absolute;
          right: 100%;
          top: 50%;
          margin-top: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent #59564f transparent transparent;
        }
      `;
  }}
`;

const ToolTip = ({
  children,
  toolTipText,
  direction,
  toolTipWidth,
  ...rest
}) => {
  return (
    <ToolTipBody {...rest}>
      <ToolTipText
        className={
          direction === 'left' || direction === 'right' ? 'toolTip' : ''
        }
        direction={direction}
        toolTipWidth={toolTipWidth}
      >
        {toolTipText}
      </ToolTipText>
      {children}
    </ToolTipBody>
  );
};

export default ToolTip;
