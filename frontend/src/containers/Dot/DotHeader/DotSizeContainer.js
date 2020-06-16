import React, { useState, useCallback } from 'react';
import DotSizeChanger from '../../../components/dotPaint/dotHeader/DotSizeChanger';
import { changeDotSize } from '../../../modules/dot';
import { useDispatch, useSelector } from 'react-redux';

const DotSizeContainer = () => {
  const dispatch = useDispatch();
  const { dotSize } = useSelector(({ dot }) => ({ dotSize: dot.dotSize }));

  const handleOnChange = useCallback(
    (e) => {
      dispatch(changeDotSize(e.target.value / 10));
    },
    [dispatch],
  );

  return (
    <>
      <DotSizeChanger dotSize={dotSize} onChange={handleOnChange} />
    </>
  );
};

export default DotSizeContainer;
