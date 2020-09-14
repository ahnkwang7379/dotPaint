import { getImageData } from 'box-shadow-pixels';

export const generatePixelDrawCss = (grid, columns, cellSize, type) => {
  return getImageData(grid, {
    format: type,
    pSize: cellSize,
    c: columns,
  });
};
