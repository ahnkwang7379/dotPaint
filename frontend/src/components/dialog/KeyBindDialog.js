import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  height: 100%;
  overflow: auto;
  & > * {
    margin: 8px;
  }
`;

const KeyBindCategory = styled.div`
  float: left;
  border: 4px solid #59564f;
  border-radius: 5px;
  box-sizing: border-box;
  float: left;
  vertical-align: top;
  padding: 0 20px 20px 20px;
  min-width: 300px;
`;

const KeyBindHeader = styled.span`
  font-size: 24px;
  font-weight: bold;
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
  color: #59564f;
  border: 3px solid #59564f;
  border-radius: 4px;
  font-weight: bold;
  font-family: monospace;
  text-align: center;
  line-height: 24px;
`;

const HelpText = styled.span`
  color: black;
  font-size: 13px;
  margin-left: 8px;
  line-height: 30px;
`;

const KeyBindDialog = ({ paintTools, color, storage, misc }) => {
  return (
    <Wrapper>
      <KeyBindCategory>
        <KeyBindHeader>Paint Tools Key</KeyBindHeader>
        {paintTools.category.map((name) => {
          return (
            <KeyBindLine key={name}>
              <KeyBindBlock key={name}>{paintTools[name].key}</KeyBindBlock>
              <HelpText>{paintTools[name].helpText}</HelpText>
            </KeyBindLine>
          );
        })}
      </KeyBindCategory>
      <KeyBindCategory>
        <KeyBindHeader>Color Tools Key</KeyBindHeader>
        {color.category.map((name) => {
          return (
            <KeyBindLine key={name}>
              <KeyBindBlock key={name}>{color[name].key}</KeyBindBlock>
              <HelpText>{color[name].helpText}</HelpText>
            </KeyBindLine>
          );
        })}
      </KeyBindCategory>
      <KeyBindCategory>
        <KeyBindHeader>Storage Key</KeyBindHeader>
        {storage.category.map((name) => {
          return (
            <KeyBindLine key={name}>
              <KeyBindBlock key={name}>{storage[name].key}</KeyBindBlock>
              <HelpText>{storage[name].helpText}</HelpText>
            </KeyBindLine>
          );
        })}
      </KeyBindCategory>
      <KeyBindCategory>
        <KeyBindHeader>Misc Key</KeyBindHeader>
        {misc.category.map((name) => {
          return (
            <KeyBindLine key={name}>
              <KeyBindBlock key={name}>{misc[name].key}</KeyBindBlock>
              <HelpText>{misc[name].helpText}</HelpText>
            </KeyBindLine>
          );
        })}
      </KeyBindCategory>
    </Wrapper>
  );
};

export default KeyBindDialog;
