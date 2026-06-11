import { resourcesForCharacter } from '../services/resourceService.js';
import {
  carryingCapacity,
  initiativeFromAttributes,
  levelFromXp,
  proficiencyBonus,
} from '../services/rulesService.js';

const DEFAULT_ATTRIBUTES = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};

export function createCharacter(input = {}) {
  const xp = Math.max(0, Number(input.xp) || 0);
  const hpMax = Math.max(1, Number(input.hp?.max ?? input.hpMax) || 1);
  const hpCurrentInput = Number(input.hp?.current ?? input.hpCurrent ?? hpMax);
  const hpTemporaryInput = Number(
    input.hp?.temporary ?? input.hp?.temp ?? input.tempHp ?? 0
  );
  const attributes = { ...DEFAULT_ATTRIBUTES, ...(input.attributes || {}) };
  const level = levelFromXp(xp);

  const character = {
    id: input.id || `character-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: String(input.name || '').trim(),
    player: String(input.player || '').trim(),
    classKey: input.classKey || 'Guerreiro',
    race: String(input.race || '').trim(),
    xp,
    background: String(input.background || '').trim(),
    alignment: String(input.alignment || '').trim(),
    attributes,
    level,
    proficiencyBonus: proficiencyBonus(level),
    initiative: initiativeFromAttributes(attributes),
    carryCapacity: carryingCapacity(attributes),
    armorClass: Math.max(0, Number(input.armorClass) || 10),
    speed: Math.max(0, Number(input.speed) || 30),
    hp: {
      current: Math.min(hpMax, Math.max(0, Number.isFinite(hpCurrentInput) ? hpCurrentInput : hpMax)),
      max: hpMax,
      temporary: Math.max(0, Number.isFinite(hpTemporaryInput) ? hpTemporaryInput : 0),
    },
    inspiration: Math.max(0, Math.min(10, Number(input.inspiration) || 0)),
    plotPoints: Math.max(0, Math.min(10, Number(input.plotPoints ?? input.plot) || 0)),
    coins: {
      pc: Math.max(0, Number(input.coins?.pc) || 0),
      pp: Math.max(0, Number(input.coins?.pp) || 0),
      pe: Math.max(0, Number(input.coins?.pe) || 0),
      po: Math.max(0, Number(input.coins?.po) || 0),
      pl: Math.max(0, Number(input.coins?.pl) || 0),
    },
    conditions: Array.isArray(input.conditions) ? input.conditions : [],
    resources: Array.isArray(input.resources) ? input.resources : [],
    inventory: Array.isArray(input.inventory) ? input.inventory : [],
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const automaticResources = resourcesForCharacter(character);
  const automaticIds = new Set(automaticResources.map((item) => item.id));
  const customResources = character.resources.filter((item) => !automaticIds.has(item.id));
  return { ...character, resources: [...customResources, ...automaticResources] };
}
