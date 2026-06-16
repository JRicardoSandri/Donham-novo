import { mysticArcanumFor, spellSlotsFor, warlockPactFor } from '../data/classProgression.js';
import { spellById } from '../data/spells.js';
import { levelFromXp } from './rulesService.js';

export function toggleKnownSpell(spellcasting, spellId) {
  const current = normalizeSpellcasting(spellcasting);
  const known = new Set(current.knownSpellIds);
  if (known.has(spellId)) {
    known.delete(spellId);
    return {
      ...current,
      knownSpellIds: [...known],
      preparedSpellIds: current.preparedSpellIds.filter((id) => id !== spellId),
    };
  }
  known.add(spellId);
  return { ...current, knownSpellIds: [...known] };
}

export function togglePreparedSpell(spellcasting, spellId) {
  const current = normalizeSpellcasting(spellcasting);
  if (!current.knownSpellIds.includes(spellId)) return current;
  const prepared = new Set(current.preparedSpellIds);
  if (prepared.has(spellId)) prepared.delete(spellId);
  else prepared.add(spellId);
  return { ...current, preparedSpellIds: [...prepared] };
}

export function normalizeSpellcasting(value = {}) {
  return {
    ability: value.ability || null,
    knownSpellIds: Array.isArray(value.knownSpellIds) ? value.knownSpellIds : [],
    preparedSpellIds: Array.isArray(value.preparedSpellIds) ? value.preparedSpellIds : [],
    alwaysPreparedSpellIds: Array.isArray(value.alwaysPreparedSpellIds) ? value.alwaysPreparedSpellIds : [],
    customSpells: Array.isArray(value.customSpells) ? value.customSpells : [],
    concentrationSpellId: value.concentrationSpellId || null,
  };
}

function spellCircleFromResource(resource) {
  const idMatch = String(resource.id || '').match(/^spell-(\d+)$/);
  if (idMatch) return Number(idMatch[1]);

  const mysticMatch = String(resource.id || '').match(/^mystic-(\d+)$/);
  if (mysticMatch) return Number(mysticMatch[1]);

  const nameMatch = String(resource.name || '').match(/(\d+)[º°]/);
  return nameMatch ? Number(nameMatch[1]) : null;
}

export function maxAvailableSpellCircle(character) {
  const resources = Array.isArray(character?.resources) ? character.resources : [];
  const resourceCircle = resources.reduce((max, resource) => {
    const circle = spellCircleFromResource(resource);
    return Number.isFinite(circle) && Number(resource.max) > 0 ? Math.max(max, circle) : max;
  }, 0);
  if (resourceCircle > 0) return resourceCircle;

  const level = levelFromXp(character?.xp);
  if (character?.classKey === 'Bruxo') {
    return Math.max(warlockPactFor(level).circle, ...mysticArcanumFor(level).map((item) => item.circle));
  }
  return spellSlotsFor(character?.classKey, level).length;
}

export function canUseSpell(character, spell) {
  if (!spell) return false;
  if (!spell.classes.includes(character?.classKey)) return false;
  return spell.circle <= maxAvailableSpellCircle(character);
}

export function castSpell(character, spellId) {
  const selectedSpell = spellById(spellId);
  if (!selectedSpell) return { character, success: false, reason: 'Magia nao encontrada.' };
  if (!canUseSpell(character, selectedSpell)) {
    const maxCircle = maxAvailableSpellCircle(character);
    return {
      character,
      success: false,
      reason: maxCircle > 0
        ? `Esta magia ainda nao foi desbloqueada. Limite atual: ${maxCircle}º circulo.`
        : 'Este personagem ainda nao possui circulos de magia desbloqueados.',
    };
  }

  const spellcasting = normalizeSpellcasting(character.spellcasting);
  if (selectedSpell.circle === 0) {
    return {
      character: {
        ...character,
        spellcasting: {
          ...spellcasting,
          concentrationSpellId: selectedSpell.concentration ? selectedSpell.id : spellcasting.concentrationSpellId,
        },
      },
      success: true,
      reason: 'Truque conjurado sem gastar espaco.',
    };
  }

  const resources = Array.isArray(character.resources) ? character.resources : [];
  const pactIndex = resources.findIndex((resource) =>
    resource.id === 'pact-magic' && Number(resource.current) > 0
  );
  if (pactIndex >= 0) {
    const pactCircle = spellCircleFromResource(resources[pactIndex]) || 1;
    if (selectedSpell.circle <= pactCircle) {
      return spendAt(character, spellcasting, selectedSpell, pactIndex, pactCircle);
    }
  }

  const candidates = resources
    .map((resource, index) => ({ resource, index, circle: spellCircleFromResource(resource) }))
    .filter(({ resource, circle }) => circle >= selectedSpell.circle && Number(resource.current) > 0)
    .sort((a, b) => a.circle - b.circle);
  if (!candidates.length) {
    return { character, success: false, reason: 'Nenhum espaco compativel disponivel.' };
  }
  return spendAt(character, spellcasting, selectedSpell, candidates[0].index, candidates[0].circle);
}

function spendAt(character, spellcasting, selectedSpell, resourceIndex, slotCircle) {
  return {
    character: {
      ...character,
      resources: character.resources.map((resource, index) =>
        index === resourceIndex ? { ...resource, current: Math.max(0, Number(resource.current) - 1) } : resource
      ),
      spellcasting: {
        ...spellcasting,
        concentrationSpellId: selectedSpell.concentration ? selectedSpell.id : spellcasting.concentrationSpellId,
      },
    },
    success: true,
    reason: `${selectedSpell.name} conjurada usando espaco de ${slotCircle}º circulo.`,
  };
}
