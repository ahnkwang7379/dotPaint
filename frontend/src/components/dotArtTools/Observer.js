import React, { useEffect } from 'react';
import styled from 'styled-components';

const ObserverWrapper = styled.div`
  position: absolute;
  bottom: 16px;
`;

const Observer = ({
  mousePosition,
  paintState,
  selectedPaintTool,
  rowCount,
  columnCount,
  onChangePaintStateHandle,
  onUpdateDotArtHandle,
  onAltDownHandle,
  onShiftDownHandle,
}) => {
  useEffect(() => {
    const mouseUpHandle = (e) => {
      onUpdateDotArtHandle(selectedPaintTool);
      onChangePaintStateHandle('IDLE');
    };

    if (paintState === 'DRAGGING')
      window.addEventListener('mouseup', mouseUpHandle, false);

    return () => {
      window.removeEventListener('mouseup', mouseUpHandle, false);
    };
  }, [
    paintState,
    selectedPaintTool,
    onChangePaintStateHandle,
    onUpdateDotArtHandle,
  ]);

  useEffect(() => {
    const keyUpHandle = (e) => {
      if (e.code === 'AltLeft') {
        onAltDownHandle(false);
      }
      if (e.code === 'ShiftLeft') {
        onShiftDownHandle(false);
      }
    };
    const keyDownHandle = (e) => {
      if (e.code === 'AltLeft') {
        onAltDownHandle(true);
      }
      if (e.code === 'ShiftLeft') {
        onShiftDownHandle(true);
      }
    };

    window.addEventListener('keyup', keyUpHandle, false);
    window.addEventListener('keydown', keyDownHandle, false);

    return () => {
      window.removeEventListener('keyup', keyUpHandle, false);
      window.removeEventListener('keydown', keyDownHandle, false);
    };
  }, [onAltDownHandle, onShiftDownHandle]);

  return (
    <ObserverWrapper>
      {`[${columnCount} x ${rowCount}]`}
      {mousePosition.x && `${mousePosition.x}, ${mousePosition.y}`}
    </ObserverWrapper>
  );
};

export default Observer;
