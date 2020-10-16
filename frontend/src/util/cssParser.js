import { getImageData, getAnimationKeyframes } from 'box-shadow-pixels';

export const generatePixelDrawCss = (grid, columns, cellSize, type) => {
  return getImageData(grid, {
    format: type,
    pSize: cellSize,
    c: columns,
  });
};

export function generateAnimationCSSData(frames, columns, cellSize) {
  return getAnimationKeyframes(frames, {
    pSize: cellSize,
    c: columns,
  });
}
