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
    let mouseX, mouseY;

    const mouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const paintBox = document.getElementById('paintBox');
    const parentNode = paintBox.parentNode;
    const childNode = paintBox.childNodes[0];
    const wheelEvent = (e) => {
      e.preventDefault();

      const pixelSize = parseInt(paintBox.scrollHeight / rowCount);

      // 더 작아지거나 더 커지지 못한다
      if (pixelSize > 99 || pixelSize < 5) return;

      let moveVerticalScroll = paintBox.scrollTop;
      let moveHorizontalScroll = paintBox.scrollLeft;

      const parent = parentNode.getBoundingClientRect();

      const overTop = paintBox.offsetTop === parentNode.offsetTop;
      const overLeft = paintBox.offsetLeft === childNode.offsetLeft;

      const addPixel = e.deltaY > 0 ? -2 : 2;

      if (overTop) {
        const y = 100 / (parent.height / (mouseY - parent.y));
        const scrollY = (paintBox.scrollTop / paintBox.scrollHeight) * 100;

        moveVerticalScroll =
          (((pixelSize + addPixel) * rowCount) / 100) *
          (scrollY + (y - scrollY) / 10);
      }

      if (overLeft) {
        const x = 100 / (parent.width / (mouseX - parent.x));
        const scrollX = (paintBox.scrollLeft / paintBox.scrollWidth) * 100;

        moveHorizontalScroll =
          (((pixelSize + addPixel) * columnCount) / 100) *
          (scrollX + (x - scrollX) / 10);
      }

      paintBox.scrollTo(moveHorizontalScroll, moveVerticalScroll);
    };

    parentNode.addEventListener('wheel', wheelEvent);
    parentNode.addEventListener('mousemove', mouseMove);

    return () => {
      parentNode.removeEventListener('wheel', wheelEvent);
      parentNode.removeEventListener('mousemove', mouseMove);
    };
  }, [rowCount, columnCount]);

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
      {mousePosition.x !== '' && `${mousePosition.x}, ${mousePosition.y}`}
    </ObserverWrapper>
  );
};

export default Observer;
