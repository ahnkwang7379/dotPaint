import React from 'react';
import Preview from '../common/Preview';

const TestLayer = ({ layerList, columnCount, dotSize, layerIdx }) => {
  console.log(layerIdx);
  return (
    <div>
      {layerList.map((layer, idx) => {
        return (
          <Preview
            key={idx}
            dotSet={layer}
            column={columnCount}
            size={dotSize}
            zIndex={layerIdx === idx ? 2 : 1}
            opacity={layerIdx === idx ? 1 : 0.5}
          />
        );
      })}
    </div>
  );
};

export default React.memo(TestLayer);
