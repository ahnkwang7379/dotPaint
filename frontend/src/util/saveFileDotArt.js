import GIFEncoder from 'gif-encoder';
import blobStream from 'blob-stream';
import { saveAs } from 'file-saver';
import { mergeLayersByDotFrameList } from './dotArrayUtil';

function randomName() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 8);
}

function fillCanvasWithDotArt(canvas, dotArtInfo) {
  const { dotArt, cols, pixelSize, dotArtWidth, dotArtIdx } = dotArtInfo;
  const ctx = canvas;
  dotArt.layer.flat().forEach((fillStyle, pixelIdx) => {
    if (!fillStyle) {
      return;
    }
    ctx.fillStyle = fillStyle;

    const col = pixelIdx % cols;
    const row = Math.floor(pixelIdx / cols);
    ctx.fillRect(
      col * pixelSize + dotArtWidth * dotArtIdx,
      row * pixelSize,
      pixelSize,
      pixelSize,
    );
  });
  return ctx;
}

function renderImageToCanvas(type, canvasInfo, currentDotArtInfo, dotList) {
  const { canvas, canvasHeight, canvasWidth } = canvasInfo;
  const { dotArt, dotArtHeight, dotArtWidth, pixelSize } = currentDotArtInfo;
  const cols = Math.floor(dotArtWidth / pixelSize);
  let ctx = canvas.getContext('2d');
  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;
  switch (type) {
    case 'spritesheet':
      dotList.forEach((currentDotArt, dotArtIdx) => {
        ctx = fillCanvasWithDotArt(ctx, {
          dotArt: currentDotArt,
          cols,
          pixelSize,
          dotArtWidth,
          dotArtIdx,
        });
      });
      break;
    default:
      ctx = fillCanvasWithDotArt(ctx, {
        dotArt,
        cols,
        pixelSize,
        dotArtWidth,
        dotArtIdx: 0,
      });
      break;
  }
  return ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
}

const saveToDisk = (blob, fileExtension) => {
  saveAs(blob, `${randomName()}.${fileExtension}`);
};

const saveFileDotArt = (type, dotArtData) => {
  const {
    id,
    dotFrameList,
    layerData,
    columnCount,
    rowCount,
    animationDuration,
    activeIdx,
    pixelSize,
  } = dotArtData;

  if (type === 'dotart') {
    let jsonTypeDotArt = {
      dot: {
        dotFrameList: dotFrameList,
        animationDuration: animationDuration,
        columnCount: columnCount,
        rowCount: rowCount,
        layerData: layerData,
        id: id,
      },
    };
    const blob = new Blob([JSON.stringify(jsonTypeDotArt)], {
      type: 'application/json',
    });
    return saveToDisk(blob, 'dotart');
  }

  const dotList = mergeLayersByDotFrameList(dotFrameList, layerData);

  const durationInMillisecond = animationDuration * 1000;
  const dotArtWidth = columnCount * pixelSize;
  const dotArtHeight = rowCount * pixelSize;
  const canvasWidth =
    type === 'spritesheet' ? dotArtWidth * dotList.length : dotArtWidth;
  const canvasHeight = dotArtHeight;

  const canvas = document.createElement('canvas');
  const gif = new GIFEncoder(canvasWidth, canvasHeight);
  gif.pipe(blobStream()).on('finish', function () {
    saveToDisk(this.toBlob(), 'gif');
  });

  gif.setRepeat(0); // loop indefinitely
  gif.setDispose(3); // restore to previous
  gif.writeHeader();

  switch (type) {
    case 'single':
    case 'spritesheet':
      renderImageToCanvas(
        type,
        {
          canvas,
          canvasHeight,
          canvasWidth,
        },
        {
          dotArt: dotList[activeIdx],
          dotArtHeight,
          dotArtWidth,
          pixelSize,
        },
        dotList,
      );
      canvas.toBlob(function (blob) {
        saveToDisk(blob, 'png');
      });
      break;
    default: {
      let previousInterval = 0;
      dotList.forEach((dotArt, idx, dotAryArray) => {
        const isLastDotArt = idx === dotAryArray.length - 1;
        const currentInterval = isLastDotArt ? 100 : dotList[idx]['interval'];
        const diff = currentInterval - previousInterval;
        const delay = diff * 0.01 * durationInMillisecond;

        gif.setDelay(delay);
        previousInterval = currentInterval;

        gif.addFrame(
          renderImageToCanvas(
            type,
            {
              canvas,
              canvasHeight,
              canvasWidth,
            },
            {
              dotArt,
              dotArtHeight,
              dotArtWidth,
              pixelSize,
            },
          ),
        );
      });
      gif.finish();
    }
  }
};

export default saveFileDotArt;
