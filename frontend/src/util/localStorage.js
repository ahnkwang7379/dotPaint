import shortid from 'shortid';
import { exampleCat, exampleJellyppi, examplePalette } from './json-example';

const STORAGE_DOTART_KEY = 'dotArt_storage_v1';
const STORAGE_PALETTES_KEY = 'dotArt_palettes_storage_v1';
const STORAGE_PRIVATE_SETTING = 'dotArt_private_setting_v1';

function saveDataToStorage(key, storage, data) {
  try {
    storage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
}

// dotArt

export function initialStorageDotArt(storage) {
  saveDataToStorage(STORAGE_DOTART_KEY, storage, {
    dotArt: [
      {
        dot: { ...exampleJellyppi },
      },
    ],
    current: 0,
  });
}

export function clearSavedDotArtFromStorage(storage) {
  storage.removeItem(STORAGE_DOTART_KEY);
}

export function getDotArtDataFromStorage(storage) {
  try {
    const data = storage.getItem(STORAGE_DOTART_KEY);
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

    return saveDataToStorage(STORAGE_DOTART_KEY, storage, storageData);
  } catch (e) {
    return false;
  }
}

export function removeDotArtFromStorage(storage, dotArtIdx) {
  let storageData = getDotArtDataFromStorage(storage);
  if (storageData) {
    let newCurrent = 0;
    storageData.dotArt.splice(dotArtIdx, 1);
    if (storageData.dotArt.length === 0) {
      newCurrent = -1;
    } else if (storageData.current > dotArtIdx) {
      newCurrent = storageData.current - 1;
    }
    storageData.current = newCurrent;
    return saveDataToStorage(STORAGE_DOTART_KEY, storage, storageData);
  }
  return false;
}

export function currentMoveDotArt(storage, dotArtIdx) {
  let storageData = getDotArtDataFromStorage(storage);
  if (storageData) {
    storageData.current = dotArtIdx;
    return saveDataToStorage(STORAGE_DOTART_KEY, storage, storageData);
  }
  return false;
}

/**
 * palette
 * [
 *  current: int,
 *  palettes: [
 *    { name: 'paletteName',
 *      id: 'shortid',
 *      palette: [ { id: 'shortid', colors: [...colors] } ],
 *    },
 *  ],
 * ]
 */

export function initialStoragePalette(storage) {
  saveDataToStorage(STORAGE_PALETTES_KEY, storage, {
    palettes: [
      {
        name: 'Palette',
        id: shortid.generate(),
        palette: [...examplePalette],
      },
    ],
    current: 0,
  });
}

export function getPalettesDataFromStorage(storage) {
  try {
    const data = storage.getItem(STORAGE_PALETTES_KEY);
    return data ? JSON.parse(data) : false;
  } catch (e) {
    return false;
  }
}

export function savePalettesToStorage(storage, palettesData) {
  try {
    let storageData = getPalettesDataFromStorage(storage);
    let { id, name, palette } = palettesData;

    if (storageData && storageData.palettes) {
      const idx = storageData.palettes.findIndex(
        (palette) => palette.id === id,
      );
      if (idx !== -1) {
        storageData = {
          ...storageData,
          current: idx,
          palettes: storageData.palettes.map((data, index) =>
            index !== idx ? data : { id: id, name: name, palette: palette },
          ),
        };
      } else {
        // id가 없다면
        storageData.palettes.push(palettesData);
        storageData.current = storageData.palettes.length - 1;
      }
    } else {
      storageData = {
        ...storageData,
        palettes: [palettesData],
        current: 0,
      };
    }

    return saveDataToStorage(STORAGE_PALETTES_KEY, storage, storageData);
  } catch (e) {
    return false;
  }
}

export function removePalettesFromStorage(storage, paletteIdx) {
  const storageData = getPalettesDataFromStorage(storage);
  if (storageData) {
    let newCurrent = 0;
    storageData.palettes.splice(paletteIdx, 1);
    if (storageData.palettes.length === 0) {
      newCurrent = -1;
    } else if (storageData.current > paletteIdx) {
      newCurrent = storageData.current - 1;
    }
    storageData.current = newCurrent;
    return saveDataToStorage(STORAGE_PALETTES_KEY, storage, storageData);
  }
  return false;
}

export function getPaletteNames(storage) {
  try {
    const storageData = getPalettesDataFromStorage(storage);
    if (storageData && storageData.palettes) {
      const resultData = storageData.palettes.reduce(
        (acc, cur) => acc.concat({ id: cur.id, name: cur.name }),
        [],
      );
      return resultData;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export function selectPalette(storage, paletteId) {
  try {
    let storageData = getPalettesDataFromStorage(storage);
    let paletteIdx = storageData.palettes.findIndex(
      (palette) => palette.id === paletteId,
    );
    if (paletteIdx !== -1) {
      storageData = { ...storageData, current: paletteIdx };
      return saveDataToStorage(STORAGE_PALETTES_KEY, storage, storageData);
    }
    return false;
  } catch (e) {
    return false;
  }
}

// PrivateSetting

export function getPrivateSettingFromStorage(storage) {
  try {
    const data = storage.getItem(STORAGE_PRIVATE_SETTING);
    return data ? JSON.parse(data) : false;
  } catch (e) {
    return false;
  }
}

export function savePrivateSettingToStorage(storage, data) {
  try {
    let storageData = {
      ...getPrivateSettingFromStorage(storage),
      ...data,
    };
    storage.setItem(STORAGE_PRIVATE_SETTING, JSON.stringify(storageData));
  } catch (e) {
    return false;
  }
}
