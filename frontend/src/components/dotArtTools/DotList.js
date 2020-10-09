import React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Preview from '../../components/dotPaint/Preview';
import styled from 'styled-components';

const ScrollCustom = styled.div`
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  & > * {
    min-width: 64px;
    margin: 8px;
    height: 64px;
  }
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const DotList = ({ dotList, columnCount }) => {
  return (
    <ScrollCustom>
      {dotList.map((dot) => {
        return (
          <Card key={dot.id}>
            <Preview dotSet={dot.dot} column={columnCount} size={3} />
          </Card>
        );
      })}
    </ScrollCustom>
  );
};

export default DotList;
