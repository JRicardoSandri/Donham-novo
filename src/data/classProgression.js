export const RECOVERY = {
  SHORT: 'short',
  LONG: 'long',
};

const charismaModifier = (character) =>
  Math.floor(((Number(character.attributes?.charisma) || 10) - 10) / 2);

export const CLASS_RESOURCES = {
  Barbaro: [{ id: 'rage', name: 'Furia', unlock: 1, recovery: RECOVERY.LONG, max: (level) => (level < 3 ? 2 : level < 6 ? 3 : level < 12 ? 4 : level < 17 ? 5 : 6), unlimited: (level) => level >= 20 }],
  Bardo: [{
    id: 'bardic-inspiration',
    name: 'Inspiracao de Bardo',
    unlock: 1,
    recovery: (level) => level >= 5 ? RECOVERY.SHORT : RECOVERY.LONG,
    max: (_level, character) => Math.max(1, charismaModifier(character)),
  }],
  Clerigo: [{ id: 'channel-divinity', name: 'Canalizar Divindade', unlock: 2, recovery: RECOVERY.SHORT, max: (level) => (level < 6 ? 1 : level < 18 ? 2 : 3) }],
  Druida: [{ id: 'wild-shape', name: 'Forma Selvagem', unlock: 2, recovery: RECOVERY.SHORT, max: () => 2, unlimited: (level) => level >= 20 }],
  Feiticeiro: [
    { id: 'sorcery-points', name: 'Pontos de Feiticaria', unlock: 2, recovery: RECOVERY.LONG, max: (level) => level },
  ],
  Guerreiro: [
    { id: 'second-wind', name: 'Retomar Folego', unlock: 1, recovery: RECOVERY.SHORT, max: () => 1 },
    { id: 'action-surge', name: 'Surto de Acao', unlock: 2, recovery: RECOVERY.SHORT, max: (level) => (level >= 17 ? 2 : 1) },
    { id: 'indomitable', name: 'Indomavel', unlock: 9, recovery: RECOVERY.LONG, max: (level) => (level < 13 ? 1 : level < 17 ? 2 : 3) },
  ],
  Ladino: [
    { id: 'stroke-of-luck', name: 'Golpe de Sorte', unlock: 20, recovery: RECOVERY.SHORT, max: () => 1 },
  ],
  Mago: [
    { id: 'arcane-recovery', name: 'Recuperacao Arcana', unlock: 1, recovery: RECOVERY.LONG, max: () => 1 },
  ],
  Monge: [{ id: 'ki', name: 'Pontos de Ki', unlock: 2, recovery: RECOVERY.SHORT, max: (level) => level }],
  Paladino: [
    { id: 'divine-sense', name: 'Sentido Divino', unlock: 1, recovery: RECOVERY.LONG, max: (_level, character) => Math.max(1, 1 + charismaModifier(character)) },
    { id: 'lay-on-hands', name: 'Cura pelas Maos', unlock: 1, recovery: RECOVERY.LONG, max: (level) => level * 5 },
    { id: 'channel-divinity', name: 'Canalizar Divindade', unlock: 3, recovery: RECOVERY.SHORT, max: () => 1 },
    { id: 'cleansing-touch', name: 'Toque Purificador', unlock: 14, recovery: RECOVERY.LONG, max: (_level, character) => Math.max(1, charismaModifier(character)) },
  ],
};

CLASS_RESOURCES['BÃ¡rbaro'] = CLASS_RESOURCES.Barbaro;
CLASS_RESOURCES['Bárbaro'] = CLASS_RESOURCES.Barbaro;
CLASS_RESOURCES['ClÃ©rigo'] = CLASS_RESOURCES.Clerigo;
CLASS_RESOURCES['Clérigo'] = CLASS_RESOURCES.Clerigo;

const FULL_CASTER_SLOTS = {
  1: [2], 2: [3], 3: [4, 2], 4: [4, 3], 5: [4, 3, 2], 6: [4, 3, 3],
  7: [4, 3, 3, 1], 8: [4, 3, 3, 2], 9: [4, 3, 3, 3, 1],
  10: [4, 3, 3, 3, 2], 11: [4, 3, 3, 3, 2, 1], 12: [4, 3, 3, 3, 2, 1],
  13: [4, 3, 3, 3, 2, 1, 1], 14: [4, 3, 3, 3, 2, 1, 1],
  15: [4, 3, 3, 3, 2, 1, 1, 1], 16: [4, 3, 3, 3, 2, 1, 1, 1],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1], 18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1], 20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
};

const HALF_CASTER_SLOTS = {
  2: [2], 3: [3], 4: [3], 5: [4, 2], 6: [4, 2], 7: [4, 3],
  8: [4, 3], 9: [4, 3, 2], 10: [4, 3, 2], 11: [4, 3, 3],
  12: [4, 3, 3], 13: [4, 3, 3, 1], 14: [4, 3, 3, 1],
  15: [4, 3, 3, 2], 16: [4, 3, 3, 2], 17: [4, 3, 3, 3, 1],
  18: [4, 3, 3, 3, 1], 19: [4, 3, 3, 3, 2], 20: [4, 3, 3, 3, 2],
};

const THIRD_CASTER_SLOTS = {
  3: [2], 4: [3], 5: [3], 6: [3], 7: [4, 2], 8: [4, 2], 9: [4, 2],
  10: [4, 3], 11: [4, 3], 12: [4, 3], 13: [4, 3, 2], 14: [4, 3, 2],
  15: [4, 3, 2], 16: [4, 3, 3], 17: [4, 3, 3], 18: [4, 3, 3],
  19: [4, 3, 3, 1], 20: [4, 3, 3, 1],
};

export const FULL_CASTERS = ['Bardo', 'Clerigo', 'ClÃ©rigo', 'Clérigo', 'Druida', 'Feiticeiro', 'Mago'];
export const HALF_CASTERS = ['Paladino', 'Patrulheiro'];

export function spellSlotsFor(classKey, level, subclassKey = null) {
  if (subclassKey === 'eldritch-knight' || subclassKey === 'arcane-trickster') return THIRD_CASTER_SLOTS[level] || [];
  if (FULL_CASTERS.includes(classKey)) return FULL_CASTER_SLOTS[level] || [];
  if (HALF_CASTERS.includes(classKey)) return HALF_CASTER_SLOTS[level] || [];
  return [];
}

export function warlockPactFor(level) {
  const slots = level === 1 ? 1 : level < 11 ? 2 : level < 17 ? 3 : 4;
  const circle = level < 3 ? 1 : level < 5 ? 2 : level < 7 ? 3 : level < 9 ? 4 : 5;
  return { slots, circle };
}

export function mysticArcanumFor(level) {
  const unlocks = { 6: 11, 7: 13, 8: 15, 9: 17 };
  return [6, 7, 8, 9]
    .filter((circle) => level >= unlocks[circle])
    .map((circle) => ({ circle, slots: 1 }));
}
