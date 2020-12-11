import React, { useEffect } from 'react';

const Observer = ({
  mousePosition,
  paintState,
  selectedPaintTool,
  onChangePaintStateHandle,
  onUpdateDotArtHandle,
  onAltDownHandle,
}) => {
  useEffect(() => {
    const mouseUpHandle = (e) => {
      console.log('mouse up!');
      onUpdateDotArtHandle(selectedPaintTool);
      onChangePaintStateHandle('IDLE');
    };

    if (paintState === 'DRAGGING')
      window.addEventListener('mouseup', mouseUpHandle, false);

    return () => {
      window.removeEventListener('mouseup', mouseUpHandle, false);
      console.log('remove event');
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
    };
    const keyDownHandle = (e) => {
      if (e.code === 'AltLeft') {
        onAltDownHandle(true);
      }
    };

    window.addEventListener('keyup', keyUpHandle, false);
    window.addEventListener('keydown', keyDownHandle, false);

    return () => {
      window.removeEventListener('keyup', keyUpHandle, false);
      window.removeEventListener('keydown', keyDownHandle, false);
    };
  }, [onAltDownHandle]);

  return (
    <div>{mousePosition && `[${mousePosition.x}, ${mousePosition.y}]`}</div>
  );
};

export default Observer;
