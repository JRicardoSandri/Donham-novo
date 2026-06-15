import { createCharacter } from '../models/Character.js';
import { createCombat, heroParticipant, sortedParticipants } from './combatService.js';
import { STORAGE_KEYS, loadJson, saveJson } from './storageService';

export const SCHEMA_VERSION = 6;

const EMPTY_STATE = {
  schemaVersion: SCHEMA_VERSION,
  groups: [],
  characters: [],
  combats: [],
  settings: {},
  activeGroupId: null,
};

const CONDITION_IDS = {
  cego: 'blinded',
  surdo: 'deafened',
  envenenado: 'poisoned',
  amedrontado: 'frightened',
  agarrado: 'grappled',
  restrito: 'restrained',
  incapacitado: 'incapacitated',
  paralisado: 'paralyzed',
  atordoado: 'stunned',
  inconsciente: 'unconscious',
  enfeiticado: 'charmed',
  invisivel: 'invisible',
  petrificado: 'petrified',
  concentrando: 'concentrating',
};

function normalizeClassKey(classKey) {
  if (classKey === 'Ranger') return 'Patrulheiro';
  return classKey || 'Guerreiro';
}

function normalizeConditions(conditions) {
  if (!Array.isArray(conditions)) return [];
  return conditions.map((id) => CONDITION_IDS[id] || id);
}

function normalizeState(saved = {}) {
  const convertSpeedToMeters = Number(saved.schemaVersion) < 5;
  return {
    schemaVersion: SCHEMA_VERSION,
    groups: Array.isArray(saved.groups) ? saved.groups : [],
    characters: Array.isArray(saved.characters)
      ? saved.characters.map((character) =>
          createCharacter({
            ...character,
            classKey: normalizeClassKey(character.classKey),
            conditions: normalizeConditions(character.conditions),
            speed: convertSpeedToMeters && Number(character.speed) > 0
              ? Math.round(Number(character.speed) * 0.3048 * 2) / 2
              : character.speed,
            inventory: convertSpeedToMeters && Array.isArray(character.inventory)
              ? character.inventory.map((item) => ({
                  ...item,
                  weight: Math.round((Number(item.weight) || 0) * 0.453592 * 100) / 100,
                }))
              : character.inventory,
          })
        )
      : [],
    combats: Array.isArray(saved.combats)
      ? saved.combats.map((combat) => ({
          ...createCombat(),
          ...combat,
          turnsTaken: Math.max(0, Number(combat.turnsTaken) || 0),
          participants: Array.isArray(combat.participants) ? combat.participants : [],
        }))
      : [],
    settings: saved.settings && typeof saved.settings === 'object'
      ? { rulesEdition: '5e-2014', ...saved.settings }
      : { rulesEdition: '5e-2014' },
    activeGroupId: saved.activeGroupId || null,
  };
}

function legacyResource(resource, index, characterName) {
  if (!Array.isArray(resource)) {
    return {
      ...resource,
      id: resource.id || `legacy-${characterName}-${index}`,
      custom: !String(resource.id || '').startsWith('spell-'),
    };
  }

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

function characterFromLegacy(item, index) {
  return createCharacter({
    id: `legacy-character-${index}`,
    name: item.character,
    player: item.player,
    classKey: normalizeClassKey(item.classKey),
    race: String(item.build || '').split(' ')[0],
    background: item.build || '',
    size: item.size,
    xp: item.xp,
    initiative: item.initiative,
    hpCurrent: item.hpCurrent,
    hpMax: item.hpMax,
    tempHp: item.tempHp,
    inspiration: item.inspiration,
    plotPoints: item.plot,
    coins: item.coins,
    conditions: normalizeConditions(item.conditions),
    resources: (item.resources || []).map((resource, resourceIndex) =>
      legacyResource(resource, resourceIndex, item.character)
    ),
  });
}

function combatFromLegacy(legacy, characters) {
  const ordered = sortedParticipants(
    characters.map((character, index) =>
      heroParticipant({
        ...character,
        initiative: Number(legacy.party?.[index]?.initiative) || character.initiative,
      })
    )
  );
  const activeIndex = Math.min(
    Math.max(0, Number(legacy.activeTurn) || 0),
    Math.max(0, ordered.length - 1)
  );
  const participants = ordered.length
    ? [...ordered.slice(activeIndex), ...ordered.slice(0, activeIndex)]
    : [];
  return {
    ...createCombat(),
    round: Math.max(1, Number(legacy.round) || 1),
    activeIndex: 0,
    turnsTaken: activeIndex,
    participants,
  };
}

function integrateLegacy(saved, legacy) {
  if (!Array.isArray(legacy?.party) || legacy.party.length === 0) {
    return normalizeState(saved);
  }

  const normalized = normalizeState(saved);
  const legacyCharacters = legacy.party.map(characterFromLegacy);
  const existingByName = new Map(
    normalized.characters.map((character) => [character.name.trim().toLowerCase(), character])
  );
  const characters = legacyCharacters.map((legacyCharacter) => {
    const existing = existingByName.get(legacyCharacter.name.trim().toLowerCase());
    if (!existing) return legacyCharacter;
    existingByName.delete(legacyCharacter.name.trim().toLowerCase());
    return createCharacter({
      ...legacyCharacter,
      ...existing,
      id: existing.id,
      classKey: normalizeClassKey(existing.classKey || legacyCharacter.classKey),
      initiative: existing.initiative ?? legacyCharacter.initiative,
      coins: { ...legacyCharacter.coins, ...existing.coins },
      resources: existing.resources?.length ? existing.resources : legacyCharacter.resources,
    });
  });
  characters.push(...existingByName.values());

  const legacyIds = legacyCharacters.map((legacyCharacter) => {
    const match = characters.find(
      (character) => character.name.trim().toLowerCase() === legacyCharacter.name.trim().toLowerCase()
    );
    return match?.id;
  }).filter(Boolean);
  const legacyGroupIndex = normalized.groups.findIndex((group) => group.id === 'legacy-group');
  const legacyGroup = {
    id: 'legacy-group',
    name: 'Campanha legada',
    characterIds: legacyIds,
    createdAt: normalized.groups[legacyGroupIndex]?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const groups = legacyGroupIndex >= 0
    ? normalized.groups.map((group, index) => index === legacyGroupIndex ? legacyGroup : group)
    : [legacyGroup, ...normalized.groups];
  const combats = normalized.combats.length
    ? normalized.combats
    : [combatFromLegacy(legacy, characters.filter((character) => legacyIds.includes(character.id)))];

  return normalizeState({
    ...normalized,
    groups,
    characters,
    combats,
    activeGroupId: normalized.activeGroupId || legacyGroup.id,
    settings: { ...normalized.settings, legacyIntegrated: true },
  });
}

export async function loadCampaignState() {
  const saved = await loadJson(STORAGE_KEYS.CAMPAIGNS, EMPTY_STATE);
  const legacy = await loadJson(STORAGE_KEYS.LEGACY_APP_STATE, null);
  const needsLegacyIntegration = legacy && (!saved?.settings?.legacyIntegrated || saved.schemaVersion < SCHEMA_VERSION);
  return needsLegacyIntegration ? integrateLegacy(saved, legacy) : normalizeState(saved);
}

export function saveCampaignState(state) {
  return saveJson(STORAGE_KEYS.CAMPAIGNS, state);
}
