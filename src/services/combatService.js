import { INCAPACITATING_CONDITIONS } from '../data/conditions.js';

export function createCombat() {
  return { id: 'active-combat', round: 1, activeIndex: 0, turnsTaken: 0, participants: [], log: [] };
}

export function heroParticipant(character) {
  const hpMax = Math.max(1, Number(character.hp?.max) || 1);
  const hpCurrent = Number(character.hp?.current ?? hpMax);
  return {
    id: `hero-${character.id}`,
    sourceId: character.id,
    type: 'hero',
    name: character.name,
    armorClass: Number(character.armorClass) || 10,
    initiative: Number(character.initiative) || 0,
    hp: {
      current: Math.min(Number.isFinite(hpCurrent) ? Math.max(0, hpCurrent) : hpMax, hpMax),
      max: hpMax,
      temporary: Math.max(0, Number(character.hp?.temporary) || 0),
    },
    conditions: Array.isArray(character.conditions) ? character.conditions : [],
    deathSaves: { successes: 0, failures: 0, stable: false, dead: false },
    concentrationDc: null,
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
    conditions: [],
    deathSaves: { successes: 0, failures: 0, stable: false, dead: false },
    concentrationDc: null,
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

export function applyParticipantHp(participant, delta) {
  const wasConcentrating = participant.conditions?.includes('concentrating');
  const hp = applyHpChange(participant.hp, delta);
  const damage = delta < 0 ? Math.abs(delta) : 0;
  const dropped = hp.current === 0 && participant.hp.current > 0;
  const healedFromZero = delta > 0 && participant.hp.current === 0 && hp.current > 0;
  const damagedAtZero = damage > 0 && participant.type === 'hero' && participant.hp.current === 0;
  const temporaryAbsorbed = Math.min(participant.hp.temporary || 0, damage);
  const overflow = Math.max(0, damage - temporaryAbsorbed - participant.hp.current);
  const instantDeath = dropped && overflow >= participant.hp.max;
  const previousSaves = participant.deathSaves || { successes: 0, failures: 0, stable: false, dead: false };
  const zeroDamageSaves = damagedAtZero
    ? { ...previousSaves, failures: Math.min(3, previousSaves.failures + 1), stable: false }
    : previousSaves;

  return {
    ...participant,
    hp,
    concentrationDc: wasConcentrating && damage > 0 ? Math.max(10, Math.floor(damage / 2)) : null,
    conditions: (dropped && participant.type === 'hero') || healedFromZero
      ? healedFromZero
        ? (participant.conditions || []).filter((id) => id !== 'unconscious')
        : [...new Set([...(participant.conditions || []).filter((id) => id !== 'concentrating'), 'unconscious'])]
      : participant.conditions || [],
    deathSaves: healedFromZero
      ? { successes: 0, failures: 0, stable: false, dead: false }
      : instantDeath
        ? { successes: 0, failures: 3, stable: false, dead: true }
        : dropped && participant.type === 'hero'
          ? { successes: 0, failures: 0, stable: false, dead: false }
          : { ...zeroDamageSaves, dead: zeroDamageSaves.failures >= 3 },
  };
}

export function toggleCondition(participant, conditionId) {
  const conditions = new Set(participant.conditions || []);
  if (conditions.has(conditionId)) conditions.delete(conditionId);
  else conditions.add(conditionId);
  if (INCAPACITATING_CONDITIONS.has(conditionId) && conditions.has(conditionId)) {
    conditions.delete('concentrating');
  }
  return {
    ...participant,
    conditions: [...conditions],
    concentrationDc: conditionId === 'concentrating' ? null : participant.concentrationDc,
  };
}

export function recordDeathSave(participant, roll) {
  if (participant.type !== 'hero' || participant.hp.current > 0) return participant;
  if (participant.deathSaves?.dead || participant.deathSaves?.stable) return participant;
  if (roll === 20) {
    return {
      ...participant,
      hp: { ...participant.hp, current: 1 },
      conditions: (participant.conditions || []).filter((id) => id !== 'unconscious'),
      deathSaves: { successes: 0, failures: 0, stable: false, dead: false },
    };
  }

  const saves = { ...(participant.deathSaves || { successes: 0, failures: 0, stable: false, dead: false }) };
  if (roll === 1) saves.failures = Math.min(3, saves.failures + 2);
  else if (roll >= 10) saves.successes = Math.min(3, saves.successes + 1);
  else saves.failures = Math.min(3, saves.failures + 1);
  saves.stable = saves.successes >= 3;
  saves.dead = saves.failures >= 3;
  return { ...participant, deathSaves: saves };
}

export function stabilizeParticipant(participant) {
  return {
    ...participant,
    deathSaves: { successes: 3, failures: participant.deathSaves?.failures || 0, stable: true, dead: false },
  };
}

export function sortedParticipants(participants) {
  return [...participants].sort((a, b) => b.initiative - a.initiative);
}

export function prioritizeTiedParticipant(participants, participantId) {
  const selectedIndex = participants.findIndex((participant) => participant.id === participantId);
  if (selectedIndex < 0) return participants;

  const selected = participants[selectedIndex];
  const tiedIndexes = participants
    .map((participant, index) => participant.initiative === selected.initiative ? index : -1)
    .filter((index) => index >= 0);
  if (tiedIndexes.length < 2) return participants;

  const firstTiedIndex = Math.min(...tiedIndexes);
  const reordered = participants.filter((participant) => participant.id !== participantId);
  reordered.splice(firstTiedIndex, 0, selected);
  return reordered;
}

export function advanceTurn(combat) {
  if (!combat.participants.length) return combat;
  const [current, ...waiting] = combat.participants;
  const nextTurnsTaken = (combat.turnsTaken || 0) + 1;
  const roundComplete = nextTurnsTaken >= combat.participants.length;
  return {
    ...combat,
    participants: [...waiting, current],
    activeIndex: 0,
    turnsTaken: roundComplete ? 0 : nextTurnsTaken,
    round: roundComplete ? combat.round + 1 : combat.round,
  };
}
