import { STORAGE_KEYS, loadJson, saveJson } from './storageService';

export const SCHEMA_VERSION = 2;

const EMPTY_STATE = {
  schemaVersion: SCHEMA_VERSION,
  groups: [],
  characters: [],
  combats: [],
  settings: {},
  activeGroupId: null,
};

export async function loadCampaignState() {
  const saved = await loadJson(STORAGE_KEYS.CAMPAIGNS, EMPTY_STATE);

  return {
    schemaVersion: SCHEMA_VERSION,
    groups: Array.isArray(saved?.groups) ? saved.groups : [],
    characters: Array.isArray(saved?.characters) ? saved.characters : [],
    combats: Array.isArray(saved?.combats) ? saved.combats : [],
    settings: saved?.settings && typeof saved.settings === 'object' ? saved.settings : {},
    activeGroupId: saved?.activeGroupId || null,
  };
}

export function saveCampaignState(state) {
  return saveJson(STORAGE_KEYS.CAMPAIGNS, state);
}
