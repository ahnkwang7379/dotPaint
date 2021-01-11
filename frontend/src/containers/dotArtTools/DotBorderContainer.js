import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeDotBorderSize,
  changeDotBorderColor,
  changeBackgroundImg,
} from '../../modules/observer';
import BorderControl from '../../components/dotArtTools/BorderControl';

const DotBorderContainer = () => {
  const dispatch = useDispatch();
  const { borderSize, borderColor, backgroundImg } = useSelector(
    ({ observer }) => ({
      borderSize: observer.dotBorder.size,
      borderColor: observer.dotBorder.color,
      backgroundImg: observer.backgroundImg,
    }),
  );

  const onChangeDotBorderSize = useCallback(
    (dotSize) => {
      dispatch(changeDotBorderSize(dotSize));
    },
    [dispatch],
  );

  const onChangeDotBorderColor = useCallback(
    (pick) => {
      dispatch(changeDotBorderColor(pick.hex));
    },
    [dispatch],
  );

  const onChangeBackgroundImg = useCallback(
    (type) => {
      dispatch(changeBackgroundImg(type));
    },
    [dispatch],
  );

  return (
    <BorderControl
      borderSize={borderSize}
      borderColor={borderColor}
      backgroundImg={backgroundImg}
      onChangeDotBorderSize={onChangeDotBorderSize}
      onChangeDotBorderColor={onChangeDotBorderColor}
      onChangeBackgroundImg={onChangeBackgroundImg}
    />
  );
};

export default DotBorderContainer;
