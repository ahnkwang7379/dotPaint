import React from 'react';
import PreViewContainer from '../dotArtTools/PreViewContainer';
import DotBorderContainer from '../dotArtTools/DotBorderContainer';
import LayerControlContainer from '../dotArtTools/LayerControlContainer';
import ObserberContainer from '../dotArtTools/ObserverContainer';
import styled from 'styled-components';

const RightToolBox = styled.div`
  position: sticky;
  max-height: 90vh;
  width: 204px;
  & > *:not(:first-child) {
    margin: 4px 0px;
  }
  margin-right: 4px;
`;

const RightToolContainer = () => {
  return (
    <RightToolBox>
      <PreViewContainer />
      <DotBorderContainer />
      <LayerControlContainer />
      <ObserberContainer />
    </RightToolBox>
  );
};

export default RightToolContainer;
