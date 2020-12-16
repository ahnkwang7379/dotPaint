import { example, exampleCat, examplePalette } from './json-example';

const STORAGE_KEY = 'dotArt_storage';
const STORAGE_PALETTES_KEY = 'dotArt_palettes_storage';

function saveDataToStorage(storage, data) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
}

export function initialStorage(storage) {
  storage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      dotArt: [
        {
          dot: { ...example },
          palettes: examplePalette,
        },
      ],
      current: 0,
    }),
  );
}

export function clearSavedDotArtFromStorage(storage) {
  storage.removeItem(STORAGE_KEY);
}

export function getDotArtDataFromStorage(storage) {
  try {
    const data = storage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : false;
  } catch (e) {
    return false;
  }
}

export function getPalettesDataFromStroage(storage) {
  try {
    const data = storage.getItem(STORAGE_PALETTES_KEY);
    return data ? JSON.parse(data) : false;
  } catch (e) {
    return false;
  }
}

export function saveDotArtToStorage(storage, dotArtData) {
  try {
    let storageData = getDotArtDataFromStorage(storage);
    if (storageData && storageData.dotArt) {
      storageData.dotArt.push(dotArtData);
      storageData.current = storageData.dotArt.length - 1;
    } else {
      storageData = {
        ...storageData,
        dotArt: [dotArtData],
        current: 0,
      };
    }
    storage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    return true;
  } catch (e) {
    return false;
  }
}

export function savePalettesToStorage(storage, palettesData) {
  try {
    let storageData = getPalettesDataFromStroage(storage);
    if (storageData) {
      storageData.push(palettesData);
    } else {
      storageData = [palettesData];
    }
    storage.setItem(STORAGE_PALETTES_KEY, JSON.stringify(storageData));
    return true;
  } catch (e) {
    return false;
  }
}

export function removeDotArtFromStorage(storage, dotArtIdx) {
  const storageData = getDotArtDataFromStorage(storage);
  if (storageData) {
    let newCurrent = 0;
    storageData.dotArt.splice(dotArtIdx, 1);
    if (storageData.dotArt.length === 0) {
      newCurrent = -1;
    } else if (storageData.current > dotArtIdx) {
      newCurrent = storageData.current - 1;
    }
    storageData.current = newCurrent;
    return saveDataToStorage(storage, storageData);
  }
  return false;
}
