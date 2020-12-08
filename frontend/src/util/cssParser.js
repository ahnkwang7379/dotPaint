import { generateAnimationIntervals } from 'box-shadow-pixels';

const DOTART_CSS = 'dotArt-to-css';

export function generatePixelDrawCss(dotArt, columns, cellSize, type) {
  return getImageData(dotArt, {
    format: type,
    pSize: cellSize,
    c: columns,
  });
}

export function getCssImageClassOutput(dotArt, columns, cellSize) {
  return getImageCssClassOutput(dotArt, {
    format: 'string',
    pSize: cellSize,
    c: columns,
    cssClassName: DOTART_CSS,
  });
}

export function generateAnimationCSSData(frames, columns, cellSize) {
  return getAnimationKeyframes(frames, {
    pSize: cellSize,
    c: columns,
  });
}

export function exportAnimationData(frames, columns, cellSize, duration) {
  return getAnimationCssClassOutput(frames, {
    pSize: cellSize,
    c: columns,
    duration,
    cssClassName: DOTART_CSS,
  });
}

const getImageData = function getImageData(grid, opt) {
  grid = grid.flat();
  var xCoord = function xCoord(i) {
    return (i % opt.c) * opt.pSize + opt.pSize;
  };
  var yCoord = function yCoord(i) {
    return parseInt(i / opt.c, 10) * opt.pSize + opt.pSize;
  };
  switch (opt.format) {
    case 'array': {
      return grid.reduce(function (bsArray, color, i) {
        if (color !== '') {
          bsArray.push({
            x: xCoord(i),
            y: yCoord(i),
            color: color,
          });
        }
        return bsArray;
      }, []);
    }
    default: {
      // return grid
      //   .reduce(
      //     (acc, cur, rowIdx) =>
      //       acc.concat(
      //         cur.reduce(
      //           (bsString, color, columnIdx) =>
      //             color !== ''
      //               ? ''
      //                   .concat(bsString, ' ')
      //                   .concat(opt.pSize * columnIdx + opt.pSize, 'px ')
      //                   .concat(opt.pSize * rowIdx + opt.pSize, 'px ')
      //                   .concat(color, ',')
      //               : bsString,
      //           '',
      //         ),
      //       ),
      //     '',
      //   )
      //   .slice(1, -1);
      return grid
        .reduce(function (bsString, color, i) {
          if (color !== '') {
            return ''
              .concat(bsString, ' ')
              .concat(xCoord(i), 'px ')
              .concat(yCoord(i), 'px ')
              .concat(color, ',');
          }
          return bsString;
        }, '')
        .slice(1, -1);
    }
  }
};
const getAnimationKeyframes = function getAnimationKeyframes(frames, opt) {
  var intervalData = generateAnimationIntervals(frames);
  var result = frames.reduce(function (acc, frame, index) {
    var intervalAcc = acc;
    try {
      var grid = frame.dot || frame.get('dot') || 0;
      if (grid) {
        var currentBoxShadow = getImageData(grid, {
          pSize: opt.pSize,
          c: opt.c,
        });
        var minValue = index === 0 ? 0 : intervalData[index] + 0.01;
        var maxValue = intervalData[index + 1];
        intervalAcc[''.concat(minValue, '%, ').concat(maxValue, '%')] = {
          boxShadow: ''
            .concat(currentBoxShadow, ';height: ')
            .concat(opt.pSize, 'px; width: ')
            .concat(opt.pSize, 'px;'),
        };
      }
    } catch (error) {
      console.error(
        'Input data error: Each frame object must contain a grid value',
      );
    }
    return intervalAcc;
  }, {});
  return result;
};

const getImageCssClassOutput = function getImageCssClassOutput(grid, opt) {
  var boxShadowData = getImageData(grid, opt);
  return '.'
    .concat(opt.cssClassName, ' {\n  box-shadow: ')
    .concat(boxShadowData, ';\n  height: ')
    .concat(opt.pSize, 'px;\n  width: ')
    .concat(opt.pSize, 'px;\n}');
};

const getAnimationCssClassOutput = function getAnimationCssClassOutput(
  frames,
  opt,
) {
  var keyframes = getAnimationKeyframes(frames, opt);
  var result = '';
  result += '.'.concat(opt.cssClassName, ' {\n  position: absolute;\n  ');
  result += 'animation: x '.concat(opt.duration, 's infinite;\n  ');
  result += '-webkit-animation: x '.concat(opt.duration, 's infinite;\n  ');
  result += '-moz-animation: x '.concat(opt.duration, 's infinite;\n  ');
  result += '-o-animation: x '.concat(opt.duration, 's infinite;\n}\n\n');
  result += '@keyframes x {\n';
  for (var key in keyframes) {
    if (Object.prototype.hasOwnProperty.call(keyframes, key)) {
      var boxShadow = keyframes[key].boxShadow;
      result += ''
        .concat(key, '{\n  box-shadow: ')
        .concat(boxShadow, '\n  }\n');
    }
  }
  result += '}';
  return result;
};
