import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDotBorderSize, changeDotBorderColor } from '../../modules/dot';
import BorderControl from '../../components/dotPaint/dotHeader/BorderControl';

const DotBorderContainer = () => {
  const dispatch = useDispatch();
  const { borderSize, borderColor } = useSelector(({ present }) => ({
    borderSize: present.dot.border.size,
    borderColor: present.dot.border.color,
  }));

  const onSizeChange = useCallback(
    (e) => {
      dispatch(changeDotBorderSize(e.target.value / 10));
    },
    [dispatch],
  );

  const onChangeColor = useCallback(
    (pick) => {
      dispatch(changeDotBorderColor(pick));
    },
    [dispatch],
  );

  return (
    <>
      <BorderControl
        borderSize={borderSize}
        onSizeChange={onSizeChange}
        backgroundColor={borderColor}
        onChangeColor={onChangeColor}
      />
    </>
  );
};

export default DotBorderContainer;
