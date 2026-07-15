import { XP_TABLE } from '../data/dnd5e.js';

export function numberValue(value, fallback = 0) {
  const parsed = Number.parseInt(String(value).replace(/[^\d-]/g, ''), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export function levelFromXp(xp) {
  const value = Math.max(0, numberValue(xp));
  let level = 1;

  XP_TABLE.forEach((requiredXp, index) => {
    if (value >= requiredXp) level = index + 1;
  });

  return level;
}

export function xpProgress(xp) {
  const value = Math.max(0, numberValue(xp));
  const level = levelFromXp(value);
  const currentXp = XP_TABLE[level - 1];
  const nextXp = XP_TABLE[level] ?? null;

  if (nextXp === null) {
    return { level, currentXp, nextXp: null, missing: 0, percent: 100 };
  }

  return {
    level,
    currentXp,
    nextXp,
    missing: Math.max(0, nextXp - value),
    percent: Math.max(0, Math.min(100, Math.round(((value - currentXp) / (nextXp - currentXp)) * 100))),
  };
}

export function proficiencyBonus(level) {
  return 2 + Math.floor((Math.max(1, numberValue(level, 1)) - 1) / 4);
}

export function abilityModifier(score) {
  return Math.floor((numberValue(score, 10) - 10) / 2);
}

export function initiativeFromAttributes(attributes = {}) {
  return abilityModifier(attributes.dexterity);
}

export function carryingCapacity(attributes = {}, size = 'medium') {
  const multiplier = size === 'large' ? 15 : 7.5;
  return Math.max(0, numberValue(attributes.strength, 10)) * multiplier;
}

export function signedModifier(value) {
  const modifier = numberValue(value);
  return modifier >= 0 ? `+${modifier}` : String(modifier);
}
