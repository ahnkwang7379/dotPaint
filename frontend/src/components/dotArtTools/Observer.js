import React, { useEffect } from 'react';

const Observer = ({
  mousePosition,
  paintState,
  selectedPaintTool,
  onChangePaintStateHandle,
  onUpdateDotArtHandle,
}) => {
  useEffect(() => {
    const mouseUpHandler = (e) => {
      console.log('mouse up!');
      onUpdateDotArtHandle(selectedPaintTool);
      onChangePaintStateHandle('IDLE');
    };

    if (paintState === 'DRAGGING')
      window.addEventListener('mouseup', mouseUpHandler, false);

    return () => {
      window.removeEventListener('mouseup', mouseUpHandler, false);
      // onUpdateDotArtHandle(); // selectedPaintTool이 바뀌면 강제업뎃시키기
      console.log('remove event');
    };
  }, [
    paintState,
    selectedPaintTool,
    onChangePaintStateHandle,
    onUpdateDotArtHandle,
  ]);

  return (
    <div>{mousePosition && `[${mousePosition.x}, ${mousePosition.y}]`}</div>
  );
};

export default Observer;
