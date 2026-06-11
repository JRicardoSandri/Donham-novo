import { STORAGE_KEYS, loadJson, saveJson } from './storageService';
import { createCharacter } from '../models/Character.js';

export const SCHEMA_VERSION = 3;

const EMPTY_STATE = {
  schemaVersion: SCHEMA_VERSION,
  groups: [],
  characters: [],
  combats: [],
  settings: {},
  activeGroupId: null,
};

function normalizeState(saved = {}) {
  return {
    schemaVersion: SCHEMA_VERSION,
    groups: Array.isArray(saved.groups) ? saved.groups : [],
    characters: Array.isArray(saved.characters) ? saved.characters.map(createCharacter) : [],
    combats: Array.isArray(saved.combats) ? saved.combats : [],
    settings: saved.settings && typeof saved.settings === 'object'
      ? { rulesEdition: '5e-2014', ...saved.settings }
      : { rulesEdition: '5e-2014' },
    activeGroupId: saved.activeGroupId || null,
  };
}

function legacyResource(resource, index, characterName) {
  if (!Array.isArray(resource)) return resource;
  const [name, type, recovery, max] = resource;
  return {
    id: `legacy-${characterName}-${index}`,
    name,
    type,
    recovery: recovery === 'Descanso Curto' ? 'short' : recovery === 'Descanso Longo' ? 'long' : 'manual',
    max: Number(max) || 0,
    current: Number(max) || 0,
    custom: true,
  };
}

function migrateLegacy(legacy) {
  if (!Array.isArray(legacy?.party) || legacy.party.length === 0) return null;
  const characters = legacy.party.map((item, index) =>
    createCharacter({
      id: `legacy-character-${index}`,
      name: item.character,
      player: item.player,
      classKey: item.classKey,
      race: String(item.build || '').split(' ')[0],
      xp: item.xp,
      hpCurrent: item.hpCurrent,
      hpMax: item.hpMax,
      tempHp: item.tempHp,
      inspiration: item.inspiration,
      plotPoints: item.plot,
      coins: item.coins,
      conditions: item.conditions,
      resources: (item.resources || []).map((resource, resourceIndex) =>
        legacyResource(resource, resourceIndex, item.character)
      ),
    })
  );
  const group = {
    id: 'legacy-group',
    name: 'Campanha legada',
    characterIds: characters.map((character) => character.id),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return normalizeState({ groups: [group], characters, activeGroupId: group.id });
}

export async function loadCampaignState() {
  const saved = await loadJson(STORAGE_KEYS.CAMPAIGNS, null);
  if (saved?.characters?.length || saved?.groups?.length) return normalizeState(saved);
  const legacy = await loadJson(STORAGE_KEYS.LEGACY_APP_STATE, null);
  return migrateLegacy(legacy) || normalizeState(EMPTY_STATE);
}

export function saveCampaignState(state) {
  return saveJson(STORAGE_KEYS.CAMPAIGNS, state);
}
