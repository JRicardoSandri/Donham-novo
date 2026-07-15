import {
  CLASS_RESOURCES,
  RECOVERY,
  mysticArcanumFor,
  spellSlotsFor,
  warlockPactFor,
} from '../data/classProgression.js';
import { raceResourcesFor } from '../data/raceProgression.js';
import { subclassResourcesFor } from '../data/subclassProgression.js';
import { levelFromXp, proficiencyBonus } from './rulesService.js';

function normalizedName(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function resource(id, name, max, recovery, previous, matcher = null) {
  const normalized = normalizedName(name);
  const old = previous.find((item) =>
    item.id === id ||
    normalizedName(item.name) === normalized ||
    (matcher ? matcher(item) : false)
  );
  const spent = old ? Math.max(0, old.max - old.current) : 0;
  return { id, name, max, current: Math.max(0, max - spent), recovery, automatic: true };
}

export function resourcesForCharacter(character) {
  const level = levelFromXp(character.xp);
  const proficiency = proficiencyBonus(level);
  const previous = Array.isArray(character.resources) ? character.resources : [];
  const generated = (CLASS_RESOURCES[character.classKey] || [])
    .filter((definition) => level >= definition.unlock)
    .map((definition) =>
      resource(
        definition.id,
        definition.name,
        definition.max(level, character),
        typeof definition.recovery === 'function' ? definition.recovery(level, character) : definition.recovery,
        previous
      )
    );

  raceResourcesFor(character.race, level).forEach((definition) => {
    generated.push(
      resource(
        definition.id,
        definition.name,
        definition.max(level, proficiency, character),
        definition.recovery,
        previous
      )
    );
  });

  subclassResourcesFor(character, level, proficiency).forEach((definition) => {
    generated.push(
      resource(
        definition.id,
        definition.name,
        definition.max,
        definition.recovery,
        previous
      )
    );
  });

  if (character.classKey === 'Bruxo') {
    const pact = warlockPactFor(level);
    generated.push(
      resource(
        'pact-magic',
        `Magia de Pacto · ${pact.circle}º círculo`,
        pact.slots,
        RECOVERY.SHORT,
        previous,
        (item) => normalizedName(item.name).includes('magia de pacto')
      )
    );
    mysticArcanumFor(level).forEach(({ circle, slots }) => {
      generated.push(
        resource(`mystic-${circle}`, `Arcano Místico · ${circle}º círculo`, slots, RECOVERY.LONG, previous)
      );
    });
  } else {
    spellSlotsFor(character.classKey, level, character.subclassKey).forEach((max, index) => {
      const circle = index + 1;
      generated.push(resource(
        `spell-${circle}`,
        `Espaços de magia · ${circle}º círculo`,
        max,
        RECOVERY.LONG,
        previous,
        (item) => {
          const name = normalizedName(item.name);
          return (item.type === 'Magia' || name.includes('magia')) && name.includes(`${circle}º`);
        }
      ));
    });
  }

  return generated;
}

export function spendResource(resources, resourceId, delta) {
  return resources.map((item) =>
    item.id === resourceId
      ? { ...item, current: Math.max(0, Math.min(item.max, item.current + delta)) }
      : item
  );
}

export function recoverResources(resources, restType) {
  const normalizedRest = normalizeRecovery(restType);
  return resources.map((item) => {
    const recovery = normalizeRecovery(item.recovery);
    const recovers = normalizedRest === RECOVERY.SHORT
      ? recovery === RECOVERY.SHORT
      : recovery === RECOVERY.SHORT || recovery === RECOVERY.LONG;
    return recovers ? { ...item, current: item.max } : item;
  });
}

export function normalizeRecovery(value) {
  const recovery = normalizedName(value);
  if (recovery === RECOVERY.SHORT || recovery.includes('curto') || recovery.includes('short')) {
    return RECOVERY.SHORT;
  }
  if (recovery === RECOVERY.LONG || recovery.includes('longo') || recovery.includes('long')) {
    return RECOVERY.LONG;
  }
  return recovery;
}
