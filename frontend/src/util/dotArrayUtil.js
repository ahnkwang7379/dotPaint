export function defaultDotMaker(row, column) {
  return new Array(row).fill().map(() => new Array(column).fill(''));
}

// 두 개의 dotArray 합치기
export function dotArrayMerge(topDotArr, bottomDotArr, row, column) {
  row = row ? row : topDotArr.length;
  column = column ? column : topDotArr[0].length;
  let mergedDotArray = defaultDotMaker(row, column);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      topDotArr[i][j] !== ''
        ? (mergedDotArray[i][j] = topDotArr[i][j])
        : (mergedDotArray[i][j] = bottomDotArr[i][j]);
    }
  }
  return mergedDotArray;
}

// layerList를 하나의 dotArray로 합치는 함수
export function layerListMerge(layerList, layerData, row, column) {
  row = row ? row : layerList[0].length;
  column = column ? column : layerList[0][0].length;

  const dotFrameIdx = layerData.map((layer) => layer.dotFrameIdx);

  let mergedLayerList = defaultDotMaker(row, column);

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      for (let k = dotFrameIdx.length - 1; k >= 0; k--) {
        // 역순
        let color = layerList[dotFrameIdx[k]][i][j];
        if (color !== '') {
          mergedLayerList[i][j] = color;
          break;
        }
      }
    }
  }

  return mergedLayerList;
}

export function mergeLayersByDotFrameList(dotFrameList, layerData) {
  const returnDotFrameList = dotFrameList.map((dotFrame) => {
    return {
      ...dotFrame,
      layer: layerListMerge(dotFrame.layerList, layerData),
    };
  });

  return returnDotFrameList;
}

// dotart 복사 함수
export function cloneDotSet(dotArt) {
  let clone = [];
  for (let i in dotArt) {
    clone.push(dotArt[i]);
  }
  return clone;
}
