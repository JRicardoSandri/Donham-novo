import { resourcesForCharacter } from '../services/resourceService.js';

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

  const character = {
    id: input.id || `character-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: String(input.name || '').trim(),
    player: String(input.player || '').trim(),
    classKey: input.classKey || 'Guerreiro',
    race: String(input.race || '').trim(),
    xp,
    background: String(input.background || '').trim(),
    alignment: String(input.alignment || '').trim(),
    attributes: { ...DEFAULT_ATTRIBUTES, ...(input.attributes || {}) },
    hp: {
      current: Math.max(0, Number(input.hp?.current) || 1),
      max: Math.max(1, Number(input.hp?.max) || 1),
      temporary: Math.max(0, Number(input.hp?.temporary) || 0),
    },
    conditions: Array.isArray(input.conditions) ? input.conditions : [],
    resources: Array.isArray(input.resources) ? input.resources : [],
    inventory: Array.isArray(input.inventory) ? input.inventory : [],
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return { ...character, resources: resourcesForCharacter(character) };
}
