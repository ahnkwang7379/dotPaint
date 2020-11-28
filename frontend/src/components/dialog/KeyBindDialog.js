import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

const KeyBindLine = styled.div`
  width: 100%;
  margin: 4px 0px;
  display: flex;
`;

const KeyBindBlock = styled.div`
  width: fit-content;
  padding: 0px 8px;
  font-size: 1.5rem;
  color: #87ceeb;
  border: 3px solid #87ceeb;
  border-radius: 4px;
  font-weight: bold;
  font-family: monospace;
  text-align: center;
  line-height: 24px;
`;

const HelpText = styled.span`
  color: black;
  font-size: 16px;
  margin-left: 8px;
  line-height: 30px;
`;

const KeyBindDialog = ({ keySet }) => {
  return (
    <Wrapper>
      {keySet.map((keyData) => {
        return (
          <KeyBindLine key={keyData.action}>
            <KeyBindBlock key={keyData.action}>{keyData.key}</KeyBindBlock>
            <HelpText>{keyData.helpText}</HelpText>
          </KeyBindLine>
        );
      })}
    </Wrapper>
  );
};

export default KeyBindDialog;
