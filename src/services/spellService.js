import { mysticArcanumFor, spellSlotsFor, warlockPactFor } from '../data/classProgression.js';
import { spellSupportsHigherSlot } from '../data/spellScaling.js';
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

export function spellCircleFromResource(resource) {
  const idMatch = String(resource.id || '').match(/^spell-(\d+)$/);
  if (idMatch) return Number(idMatch[1]);

  const mysticMatch = String(resource.id || '').match(/^mystic-(\d+)$/);
  if (mysticMatch) return Number(mysticMatch[1]);

  const nameMatch = String(resource.name || '').match(/(\d+)[º°]/);
  return nameMatch ? Number(nameMatch[1]) : null;
}

function canSpendAsSpellSlot(resource, selectedSpell) {
  const id = String(resource.id || '');
  if (id === 'pact-magic' || id.startsWith('spell-')) return true;
  const mysticMatch = id.match(/^mystic-(\d+)$/);
  return Boolean(mysticMatch && Number(mysticMatch[1]) === selectedSpell.circle);
}

function spellSlotCandidates(character, selectedSpell) {
  const resources = Array.isArray(character.resources) ? character.resources : [];
  return resources
    .map((resource, index) => ({ resource, index, circle: spellCircleFromResource(resource) }))
    .filter(({ resource, circle }) =>
      canSpendAsSpellSlot(resource, selectedSpell) &&
      Number.isFinite(circle) &&
      circle >= selectedSpell.circle &&
      Number(resource.current) > 0
    )
    .sort((a, b) => a.circle - b.circle);
}

export function availableCastOptions(character, spellId) {
  const selectedSpell = spellById(spellId);
  if (!selectedSpell || selectedSpell.circle === 0 || !canUseSpell(character, selectedSpell)) return [];

  const byCircle = new Map();
  spellSlotCandidates(character, selectedSpell).forEach(({ resource, circle }) => {
    const previous = byCircle.get(circle) || { circle, current: 0, resourceName: resource.name };
    byCircle.set(circle, {
      ...previous,
      current: previous.current + Number(resource.current || 0),
    });
  });

  return [...byCircle.values()].sort((a, b) => a.circle - b.circle);
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
  return spellSlotsFor(character?.classKey, level, character?.subclassKey).length;
}

export function spellClassesForCharacter(character) {
  const classes = new Set([character?.classKey]);
  if (character?.subclassKey === 'eldritch-knight' || character?.subclassKey === 'arcane-trickster') {
    classes.add('Mago');
  }
  if (character?.subclassKey === 'divine-soul') {
    classes.add('ClÃ©rigo');
    classes.add('Clérigo');
  }
  return classes;
}

export function canUseSpell(character, spell) {
  if (!spell) return false;
  const allowedClasses = spellClassesForCharacter(character);
  if (!spell.classes.some((classKey) => allowedClasses.has(classKey))) return false;
  return spell.circle <= maxAvailableSpellCircle(character);
}

export function castSpell(character, spellId, preferredCircle = null) {
  const selectedSpell = spellById(spellId);
  if (!selectedSpell) return { character, success: false, code: 'spell-not-found', reason: 'Magia nao encontrada.' };
  if (!canUseSpell(character, selectedSpell)) {
    const maxCircle = maxAvailableSpellCircle(character);
    return {
      character,
      success: false,
      code: maxCircle > 0 ? 'spell-locked' : 'no-unlocked-spell-circles',
      maxCircle,
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
      code: 'cantrip-cast',
      spellId: selectedSpell.id,
      cantrip: true,
      reason: 'Truque conjurado sem gastar espaco.',
    };
  }

  const candidates = spellSlotCandidates(character, selectedSpell);
  if (preferredCircle !== null && preferredCircle !== undefined) {
    const requestedCircle = Number(preferredCircle);
    const candidate = candidates.find((item) => item.circle === requestedCircle);
    if (!candidate) {
      return {
        character,
        success: false,
        code: 'no-slot-for-circle',
        slotCircle: requestedCircle,
        reason: `Nenhum espaco de ${requestedCircle}º circulo disponivel.`,
      };
    }
    return spendAt(character, spellcasting, selectedSpell, candidate.index, candidate.circle);
  }

  if (!candidates.length) {
    return { character, success: false, code: 'no-compatible-slot', reason: 'Nenhum espaco compativel disponivel.' };
  }
  return spendAt(character, spellcasting, selectedSpell, candidates[0].index, candidates[0].circle);
}

export function shouldAskForCastCircle(character, spellId) {
  const selectedSpell = spellById(spellId);
  return spellSupportsHigherSlot(selectedSpell) &&
    availableCastOptions(character, spellId).some((option) => option.circle > selectedSpell.circle);
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
    code: 'spell-cast',
    spellId: selectedSpell.id,
    slotCircle,
    reason: `${selectedSpell.name} conjurada usando espaco de ${slotCircle}º circulo.`,
  };
}
