import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  generateAnimationCSSData,
  generatePixelDrawCss,
} from '../../util/cssParser';

const PreViewWrapper = styled.div.attrs(({ cellSize, cssString }) => ({
  style: {
    height: cellSize + 'px',
    width: cellSize + 'px',
    boxShadow: cssString,
    MozBoxShadow: cssString,
    WebkitBoxShadow: cssString,
  },
}))`
  position: absolute;
`;

const AnimationKeyFrames = (animationData) =>
  keyframes`
    ${animationData}
  `;

const AnimationPreViewWrapper = styled.div`
  position: absolute;
  animation: ${(props) => css`
    ${AnimationKeyFrames(props.animationData)} ${props.duration}s infinite
  `};
`;

const Preview = ({ dotSet, dotList, column, size, animation, duration }) => {
  const generatePreview = () => {
    const columns = column;
    const cellSize = size;
    let cssString;
    let animationData;

    const styles = {
      previewWrapper: {
        height: cellSize,
        width: cellSize,
        position: 'absolute',
        // top: '-5px',
        // left: '-5px',
      },
    };

    if (animation) {
      animationData = generateAnimationCSSData(dotList, columns, cellSize);
      return (
        <AnimationPreViewWrapper
          duration={duration}
          animationData={animationData}
        />
      );
    } else {
      cssString = generatePixelDrawCss(dotSet, columns, cellSize, 'string');

      styles.previewWrapper.boxShadow = cssString;
      styles.previewWrapper.MozBoxShadow = cssString;
      styles.previewWrapper.WebkitBoxShadow = cssString;

      return <PreViewWrapper cssString={cssString} cellSize={cellSize} />;
    }
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
