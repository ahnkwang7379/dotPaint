import React from 'react';

const DotSizeChanger = ({ dotSize, onChange }) => {
  return (
    <React.Fragment>
      <span>도트 크기{dotSize}</span>
      <input
        type="range"
        min="2"
        max="60"
        value={dotSize}
        onChange={onChange}
        step="2"
      />
    </React.Fragment>
  );
};

export default DotSizeChanger;
