import React from 'react';

const DotSizeChanger = ({ dotSize, onChange }) => {
  return (
    <React.Fragment>
      <span>도트 크기{dotSize}</span>
      <input
        type="range"
        min="4"
        max="20"
        value={dotSize * 10}
        onChange={onChange}
        step="2"
      />
    </React.Fragment>
  );
};

export default DotSizeChanger;
