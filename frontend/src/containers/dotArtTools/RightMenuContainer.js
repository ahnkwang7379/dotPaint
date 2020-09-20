import React from 'react';
import RightMenu from '../../components/dotArtTools/RightMenu';
import DotBorderContainer from '../../containers/DotHeader/DotBorderContainer';
import DotSizeContainer from '../../containers/DotHeader/DotSizeContainer';
import DotAreaContainer from '../../containers/DotHeader/DotAreaContainer';

const RightMenuContainer = () => {
  return (
    <RightMenu>
      <DotBorderContainer />
      <DotSizeContainer />
      <DotAreaContainer />
    </RightMenu>
  );
};

export default RightMenuContainer;
