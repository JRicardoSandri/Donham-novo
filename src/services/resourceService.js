import { CLASS_RESOURCES, RECOVERY, spellSlotsFor, warlockPactFor } from '../data/classProgression.js';
import { levelFromXp } from './rulesService.js';

function resource(id, name, max, recovery, previous) {
  const old = previous.find((item) => item.id === id);
  const spent = old ? Math.max(0, old.max - old.current) : 0;
  return { id, name, max, current: Math.max(0, max - spent), recovery };
}

export function resourcesForCharacter(character) {
  const level = levelFromXp(character.xp);
  const previous = Array.isArray(character.resources) ? character.resources : [];
  const generated = (CLASS_RESOURCES[character.classKey] || [])
    .filter((definition) => level >= definition.unlock)
    .map((definition) =>
      resource(definition.id, definition.name, definition.max(level), definition.recovery, previous)
    );

  if (character.classKey === 'Bruxo') {
    const pact = warlockPactFor(level);
    generated.push(
      resource(`pact-${pact.circle}`, `Magia de Pacto · ${pact.circle}º círculo`, pact.slots, RECOVERY.SHORT, previous)
    );
  } else {
    spellSlotsFor(character.classKey, level).forEach((max, index) => {
      generated.push(resource(`spell-${index + 1}`, `Espaços de magia · ${index + 1}º círculo`, max, RECOVERY.LONG, previous));
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
  return resources.map((item) =>
    restType === RECOVERY.LONG || item.recovery === RECOVERY.SHORT
      ? { ...item, current: item.max }
      : item
  );
}
