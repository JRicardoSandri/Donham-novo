export const RECOVERY = {
  SHORT: 'short',
  LONG: 'long',
};

export const CLASS_RESOURCES = {
  Bárbaro: [{ id: 'rage', name: 'Fúria', unlock: 1, recovery: RECOVERY.LONG, max: (level) => (level < 3 ? 2 : level < 6 ? 3 : level < 12 ? 4 : level < 17 ? 5 : 6) }],
  Bardo: [{
    id: 'bardic-inspiration',
    name: 'Inspiração de Bardo',
    unlock: 1,
    recovery: (level) => level >= 5 ? RECOVERY.SHORT : RECOVERY.LONG,
    max: (_level, character) => Math.max(1, Math.floor(((Number(character.attributes?.charisma) || 10) - 10) / 2)),
  }],
  Clérigo: [{ id: 'channel-divinity', name: 'Canalizar Divindade', unlock: 2, recovery: RECOVERY.SHORT, max: (level) => (level < 6 ? 1 : level < 18 ? 2 : 3) }],
  Druida: [{ id: 'wild-shape', name: 'Forma Selvagem', unlock: 2, recovery: RECOVERY.SHORT, max: () => 2 }],
  Guerreiro: [
    { id: 'second-wind', name: 'Retomar Fôlego', unlock: 1, recovery: RECOVERY.SHORT, max: () => 1 },
    { id: 'action-surge', name: 'Surto de Ação', unlock: 2, recovery: RECOVERY.SHORT, max: (level) => (level >= 17 ? 2 : 1) },
    { id: 'indomitable', name: 'Indomável', unlock: 9, recovery: RECOVERY.LONG, max: (level) => (level < 13 ? 1 : level < 17 ? 2 : 3) },
  ],
  Monge: [{ id: 'ki', name: 'Pontos de Ki', unlock: 2, recovery: RECOVERY.SHORT, max: (level) => level }],
  Paladino: [
    { id: 'lay-on-hands', name: 'Cura pelas Mãos', unlock: 1, recovery: RECOVERY.LONG, max: (level) => level * 5 },
    { id: 'channel-divinity', name: 'Canalizar Divindade', unlock: 3, recovery: RECOVERY.SHORT, max: () => 1 },
  ],
};

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

export const FULL_CASTERS = ['Bardo', 'Clérigo', 'Druida', 'Feiticeiro', 'Mago'];
export const HALF_CASTERS = ['Paladino', 'Patrulheiro'];

export function spellSlotsFor(classKey, level) {
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
