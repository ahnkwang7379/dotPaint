import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDotBorderSize, changeDotBorderColor } from '../../modules/dot';
import BorderControl from '../../components/dotArtTools/BorderControl';

const DotBorderContainer = () => {
  const dispatch = useDispatch();
  const { borderSize, borderColor } = useSelector(({ dotArt }) => ({
    borderSize: dotArt.present.dot.border.size,
    borderColor: dotArt.present.dot.border.color,
  }));

  const onChangeDotBorderSize = useCallback(
    (e, newValue) => {
      dispatch(changeDotBorderSize(newValue));
    },
    [dispatch],
  );

  const onChangeBorderColor = useCallback(
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
        onChangeBorderColor={onChangeBorderColor}
      />
    </React.Fragment>
  );
};

export default DotBorderContainer;
