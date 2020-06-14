import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeDotArea } from '../../modules/dot';
import DotAreaControl from '../../components/dotHeader/DotAreaControl';

const DotAreaContainer = () => {
  const dispatch = useDispatch();
  const { width, height } = useSelector(({ dot }) => ({
    width: dot.width,
    height: dot.height,
  }));
  const [areaWidth, setAreaWidth] = useState(width);
  const [areaHeight, setAreaHeight] = useState(height);

  const handleOnWidthChange = (e) => {
    setAreaWidth(Number(e.target.value));
  };
  const handleOnHeightChange = (e) => {
    setAreaHeight(Number(e.target.value));
  };

  const onChangeArea = () =>
    dispatch(changeDotArea({ width: areaWidth, height: areaHeight }));

  return (
    <>
      <DotAreaControl
        onChangeArea={onChangeArea}
        width={areaWidth}
        height={areaHeight}
        onChangeWidth={handleOnWidthChange}
        onChangeHeight={handleOnHeightChange}
      />
    </>
  );
};

export default DotAreaContainer;
