// import { getImageData, getAnimationKeyframes } from 'box-shadow-pixels';

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

export var getImageData = function getImageData(grid, opt) {
  // grid = grid.flat();
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
      return grid
        .reduce(
          (acc, cur, rowIdx) =>
            acc.concat(
              cur.reduce(
                (bsString, color, columnIdx) =>
                  color !== ''
                    ? ''
                        .concat(bsString, ' ')
                        .concat(opt.pSize * columnIdx + opt.pSize, 'px ')
                        .concat(opt.pSize * rowIdx + opt.pSize, 'px ')
                        .concat(color, ',')
                    : bsString,
                '',
              ),
            ),
          '',
        )
        .slice(1, -1);
      // return grid
      //   .reduce(function (bsString, color, i) {
      //     if (color !== '') {
      //       return ''
      //         .concat(bsString, ' ')
      //         .concat(xCoord(i), 'px ')
      //         .concat(yCoord(i), 'px ')
      //         .concat(color, ',');
      //     }
      //     return bsString;
      //   }, '')
      //   .slice(1, -1);
    }
  }
};
export var getAnimationKeyframes = function getAnimationKeyframes(frames, opt) {
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
export var generateAnimationIntervals = function generateAnimationIntervals(
  frames,
) {
  return frames.reduce(
    function (acc, frame) {
      try {
        var interval = frame.interval || frame.get('interval') || 0;
        acc.push(parseFloat(interval));
      } catch (e) {
        console.error(
          'Input data error: Each frame object must contain an interval value',
        );
      }
      return acc;
    },
    [0],
  );
};
