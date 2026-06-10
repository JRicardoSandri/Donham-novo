const DEFAULT_ATTRIBUTES = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};

export function createCharacter(input = {}) {
  return {
    id: input.id || `character-${Date.now()}`,
    name: input.name || '',
    player: input.player || '',
    classKey: input.classKey || '',
    race: input.race || '',
    level: input.level || 1,
    xp: input.xp || 0,
    background: input.background || '',
    alignment: input.alignment || '',
    attributes: { ...DEFAULT_ATTRIBUTES, ...(input.attributes || {}) },
    resources: input.resources || [],
    inventory: input.inventory || [],
  };
}
