import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBorder } from '../../modules/dot';
import BorderControl from '../../components/dotHeader/BorderControl';

const DotBorderContainer = () => {
  const dispatch = useDispatch();
  const { dotBorder } = useSelector(({ dot }) => ({ dotBorder: dot.border }));

  const onToggleBorder = () => dispatch(toggleBorder());

  return (
    <>
      <BorderControl toggleBorder={onToggleBorder} />
    </>
  );
};

export default DotBorderContainer;
