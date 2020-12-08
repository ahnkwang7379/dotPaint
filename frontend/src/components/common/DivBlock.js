import React from 'react';

const DivBlock = ({ rowIdx, columnIdx, onMouseOverHandler }) => {
  return (
    <div
      onMouseOver={(e) => onMouseOverHandler(e, rowIdx, columnIdx)}
      onMouseDown={(e) => onMouseOverHandler(e, rowIdx, columnIdx)}
    />
  );
};

export default DivBlock;
