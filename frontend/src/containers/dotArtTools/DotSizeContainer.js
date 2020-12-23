import React, { useCallback } from 'react';
import DotSizeChanger from '../../components/dotArtTools/DotSizeChanger';
import { changeDotSize } from '../../modules/observer';
import { useDispatch, useSelector } from 'react-redux';

const DotSizeContainer = () => {
  const dispatch = useDispatch();
  const { dotSize } = useSelector(({ observer }) => ({
    dotSize: observer.dotSize,
  }));

  const onChangeDotSize = useCallback(
    (e, newValue) => {
      dispatch(changeDotSize(newValue));
    },
    [dispatch],
  );

  return (
    <React.Fragment>
      <DotSizeChanger dotSize={dotSize} onChangeDotSize={onChangeDotSize} />
    </React.Fragment>
  );
};

export default DotSizeContainer;
