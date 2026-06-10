import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  LEGACY_APP_STATE: 'domhan_rpg_companion_supremo_v1',
  CAMPAIGNS: 'rpg_companion_campaigns_v1',
};

export async function loadJson(key, fallback = null) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Falha ao carregar ${key}:`, error);
    return fallback;
  }
}

export async function saveJson(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Falha ao salvar ${key}:`, error);
    return false;
  }
}
