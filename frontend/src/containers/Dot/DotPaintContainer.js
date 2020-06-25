import React, { useCallback } from 'react';
import DotPaint from '../../components/dotPaint/DotPaint';
import { useSelector, useDispatch } from 'react-redux';
import { changePaintState } from '../../modules/paintTool';
import { dotActions } from '../../modules/index';

const DotpaintContainer = () => {
  const dispatch = useDispatch();
  const { dotSet, border, dotSize } = useSelector(({ dot }) => ({
    dotSet: dot.dotSet,
    border: dot.border,
    dotSize: dot.dotSize,
  }));

  const onChangePaintState = useCallback(
    (paintState) => dispatch(changePaintState(paintState)),
    [dispatch],
  );
  const onDotActionHandle = useCallback(
    (rowIdx, columnIdx) =>
      dispatch(
        dotActions({
          rowIdx: rowIdx,
          columnIdx: columnIdx,
        }),
      ),
    [dispatch],
  );
  return (
    <div>
      <DotPaint
        dotSet={dotSet}
        border={border}
        dotSize={dotSize}
        onChangePaintState={onChangePaintState}
        onDotActionHandle={onDotActionHandle}
      />
    </div>
  );
};

export default DotpaintContainer;
