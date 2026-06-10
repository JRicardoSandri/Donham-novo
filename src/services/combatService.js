export function createCombat() {
  return { id: 'active-combat', round: 1, activeIndex: 0, participants: [] };
}

export function heroParticipant(character) {
  const hpMax = Math.max(1, Number(character.hp?.max) || 1);
  return {
    id: `hero-${character.id}`,
    sourceId: character.id,
    type: 'hero',
    name: character.name,
    armorClass: Number(character.armorClass) || 10,
    initiative: 0,
    hp: { current: Math.min(Number(character.hp?.current) || hpMax, hpMax), max: hpMax, temporary: Number(character.hp?.temporary) || 0 },
  };
}

export function enemyParticipant(input = {}) {
  const hpMax = Math.max(1, Number(input.hpMax) || 1);
  return {
    id: `enemy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type: 'enemy',
    name: String(input.name || 'Inimigo').trim(),
    armorClass: Math.max(0, Number(input.armorClass) || 10),
    initiative: Number(input.initiative) || 0,
    hp: { current: hpMax, max: hpMax, temporary: 0 },
  };
}

export function applyHpChange(hp, delta) {
  if (delta >= 0) return { ...hp, current: Math.min(hp.max, hp.current + delta) };

  let damage = Math.abs(delta);
  const absorbed = Math.min(hp.temporary || 0, damage);
  damage -= absorbed;
  return {
    ...hp,
    temporary: Math.max(0, (hp.temporary || 0) - absorbed),
    current: Math.max(0, hp.current - damage),
  };
}

export function sortedParticipants(participants) {
  return [...participants].sort((a, b) => b.initiative - a.initiative);
}

export function advanceTurn(combat) {
  if (!combat.participants.length) return combat;
  const next = combat.activeIndex + 1;
  return next >= combat.participants.length
    ? { ...combat, activeIndex: 0, round: combat.round + 1 }
    : { ...combat, activeIndex: next };
}
