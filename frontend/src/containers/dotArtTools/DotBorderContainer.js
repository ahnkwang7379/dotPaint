import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeDotBorderSize,
  changeDotBorderColor,
} from '../../modules/observer';
import BorderControl from '../../components/dotArtTools/BorderControl';

const DotBorderContainer = () => {
  const dispatch = useDispatch();
  const { borderSize, borderColor } = useSelector(({ observer }) => ({
    borderSize: observer.dotBorder.size,
    borderColor: observer.dotBorder.color,
  }));

  const onChangeDotBorderSize = useCallback(
    (e, newValue) => {
      dispatch(changeDotBorderSize(newValue));
    },
    [dispatch],
  );

  const onChangeDotBorderColor = useCallback(
    (pick) => {
      dispatch(changeDotBorderColor(pick));
    },
    [dispatch],
  );

  return (
    <React.Fragment>
      <BorderControl
        borderSize={borderSize}
        backgroundColor={borderColor}
        onChangeDotBorderSize={onChangeDotBorderSize}
        onChangeDotBorderColor={onChangeDotBorderColor}
      />
    </React.Fragment>
  );
};

export default DotBorderContainer;
