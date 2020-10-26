import { exampleCat, examplePalette } from './json-example';

const STORAGE_KEY = 'dotArt_storage';

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
      dotArt: [exampleCat],
      paletteSet: [examplePalette],
      current: 0,
    }),
  );
}

export function getDataFromStorage(storage) {
  try {
    const data = storage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : false;
  } catch (e) {
    return false;
  }
}

export function saveDotArtToStorage(storage, dotArtData) {
  try {
    let storageData = getDataFromStorage(storage);
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

export function removeDotArtFromStorage(storage, dotArtIdx) {
  const storageData = getDataFromStorage(storage);
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

export function savePaletteSetToStorage(storage, paletteSetData) {
  try {
    let storageData = getDataFromStorage(storage);
    if (storageData && storageData.paletteSet) {
      storageData.paletteSet.push(paletteSetData);
    } else {
      storageData = {
        ...storageData,
        paletteSet: [paletteSetData],
      };
    }
    storage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    return true;
  } catch (e) {
    return false;
  }
}

// export function removePaletteSetFromStorage(storage, paletteIdx) {
//   const storageData = getDataFromStorage(stroage);
//   if (storageData) {

//   }
// }
