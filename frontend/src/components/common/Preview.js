import React from 'react';
import styled from 'styled-components';
import {
  generateAnimationCSSData,
  generatePixelDrawCss,
} from '../../util/cssParser';
import Animation from './Animation';

const PreViewWrapper = styled.div.attrs(({ cellSize, cssString }) => ({
  style: {
    height: cellSize + 'px',
    width: cellSize + 'px',
    boxShadow: cssString,
    MozBoxShadow: cssString,
    WebkitBoxShadow: cssString,
    // top: `-${cellSize}px`,
    // left: `-${cellSize}px`,
  },
}))`
  position: absolute;
`;

const Preview = ({ dotSet, dotList, column, size, animation, duration }) => {
  const cellSize = typeof size === 'string' ? parseFloat(size) : size;

  const generatePreview = () => {
    const columns = column;
    // const cellSize = typeof size === 'string' ? parseFloat(size) : size;
    let cssString;
    let animationData;

    if (animation) {
      animationData = generateAnimationCSSData(dotList, columns, cellSize);
      return (
        <React.Fragment>
          <Animation boxShadow={animationData} duration={duration} />
        </React.Fragment>
      );
    } else {
      cssString = generatePixelDrawCss(dotSet, columns, cellSize, 'string');

      return <PreViewWrapper cssString={cssString} cellSize={cellSize} />;
    }
  };

  const style = {
    position: 'relative',
    top: `-${cellSize}px`,
    left: `-${cellSize}px`,
  };

  return (
    <div className="preview" style={style}>
      {generatePreview()}
    </div>
  );
};

export default React.memo(Preview);
