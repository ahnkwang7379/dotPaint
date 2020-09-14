import React, { useState, useEffect } from 'react';
import { generatePixelDrawCss } from '../../util/cssParser';

const Preview = ({ dotSet, column }) => {
  const [dotArr, setDotArr] = useState([]);
  useEffect(() => {
    const newArr = dotSet.reduce((acc, cur) => acc.concat(cur));
    setDotArr(newArr);
  }, [dotSet]);

  const generatePreview = () => {
    const columns = column;
    const cellSize = 10;

    const styles = {
      previewWrapper: {
        height: cellSize,
        width: cellSize,
        position: 'absolute',
        top: '-5px',
        left: '-5px',
      },
    };

    let cssString = generatePixelDrawCss(dotArr, columns, cellSize, 'string');

    styles.previewWrapper.boxShadow = cssString;
    styles.previewWrapper.MozBoxShadow = cssString;
    styles.previewWrapper.WebkitBoxShadow = cssString;

    return <div style={styles.previewWrapper}></div>;
  };

  const style = {
    position: 'relative',
  };

  return (
    <div className="preview" style={style}>
      {generatePreview()}
    </div>
  );
};

export default React.memo(Preview);
