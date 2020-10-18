import React, { useCallback, useEffect, useState } from 'react';
import DotPaint from '../components/dotPaint/DotPaint';
import { useSelector, useDispatch } from 'react-redux';
import { changePaintState } from '../modules/paintTool';
import { dotActions } from '../modules/index';

const DotpaintContainer = () => {
  const [dotSet, setDotSet] = useState('');
  const dispatch = useDispatch();
  const { dot, border, dotSize, columnCount } = useSelector(({ dotArt: { present: { dot }}}) => 
    ({
      // dotSet: dot.dotSet,
      dot: dot.dotList[dot.activeIdx].dot,
      border: dot.border,
      dotSize: dot.dotSize,
      columnCount: dot.columnCount,
    }),
  ); // prettier-ignore

  useEffect(() => {
    let returnDotArt = [];
    let idx = 0;
    for (let i = 0; i < dot.length / columnCount; i++) {
      let row = [];
      for (let j = 0; j < columnCount; j++) {
        row.push(dot[idx]);
        idx++;
      }
      returnDotArt.push(row);
      row = [];
    }
    setDotSet(returnDotArt);
  }, [dot]);

  const onChangePaintState = useCallback(
    (paintState) => dispatch(changePaintState(paintState)),
    [dispatch],
  );

  const onDotActionHandle = useCallback(
    // (rowIdx, columnIdx) =>
    //   dispatch(
    //     dotActions({
    //       rowIdx: rowIdx,
    //       columnIdx: columnIdx,
    //     }),
    //   ),
    (dotIdx) => dispatch(dotActions({ dotIdx: dotIdx })),
    [dispatch],
  );
  return (
    dotSet && (
      <div>
        <DotPaint
          dotSet={dotSet}
          border={border}
          dotSize={dotSize}
          columnCount={columnCount}
          onChangePaintState={onChangePaintState}
          onDotActionHandle={onDotActionHandle}
        />
      </div>
    )
  );
};

export default DotpaintContainer;
