import React from 'react';
import Preview from '../common/Preview';

const TestLayer = ({ dotFrameList, columnCount, dotSize, layerSelectIdx }) => {
  console.log(layerSelectIdx);
  return (
    <div>
      {dotFrameList[0].layerList.map((layer, idx) => {
        return (
          <Preview
            key={idx}
            dotSet={layer.dot}
            column={columnCount}
            size={dotSize}
            zIndex={layerSelectIdx === idx ? 2 : 1}
            opacity={layerSelectIdx === idx ? 1 : 0.5}
          />
        );
      })}
    </div>
  );
};

export default React.memo(TestLayer);
