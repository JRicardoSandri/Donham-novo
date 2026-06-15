import { resourcesForCharacter } from '../services/resourceService.js';
import { CLASS_RESOURCES } from '../data/classProgression.js';
import { ALL_RACE_RESOURCE_IDS, ALL_RACE_RESOURCE_NAMES } from '../data/raceProgression.js';
import { normalizeSpellcasting } from '../services/spellService.js';
import {
  carryingCapacity,
  initiativeFromAttributes,
  levelFromXp,
  proficiencyBonus,
} from '../services/rulesService.js';

const DEFAULT_ATTRIBUTES = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};

export function createCharacter(input = {}) {
  const xp = Math.max(0, Number(input.xp) || 0);
  const hpMax = Math.max(1, Number(input.hp?.max ?? input.hpMax) || 1);
  const hpCurrentInput = Number(input.hp?.current ?? input.hpCurrent ?? hpMax);
  const hpTemporaryInput = Number(
    input.hp?.temporary ?? input.hp?.temp ?? input.tempHp ?? 0
  );
  const attributes = { ...DEFAULT_ATTRIBUTES, ...(input.attributes || {}) };
  const level = levelFromXp(xp);
  const calculatedInitiative = initiativeFromAttributes(attributes);

  const character = {
    id: input.id || `character-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: String(input.name || '').trim(),
    player: String(input.player || '').trim(),
    classKey: input.classKey || 'Guerreiro',
    subclassKey: input.subclassKey || null,
    race: String(input.race || '').trim(),
    xp,
    background: String(input.background || '').trim(),
    alignment: String(input.alignment || '').trim(),
    attributes,
    level,
    proficiencyBonus: proficiencyBonus(level),
    initiative: input.initiative !== '' && input.initiative !== null && input.initiative !== undefined
      && Number.isFinite(Number(input.initiative))
      ? Number(input.initiative)
      : calculatedInitiative,
    size: input.size === 'large' ? 'large' : 'medium',
    carryCapacity: carryingCapacity(attributes, input.size),
    armorClass: Math.max(0, Number(input.armorClass) || 10),
    speed: Math.max(0, Number(input.speed) || 9),
    hp: {
      current: Math.min(hpMax, Math.max(0, Number.isFinite(hpCurrentInput) ? hpCurrentInput : hpMax)),
      max: hpMax,
      temporary: Math.max(0, Number.isFinite(hpTemporaryInput) ? hpTemporaryInput : 0),
    },
    inspiration: Math.max(0, Math.min(10, Number(input.inspiration) || 0)),
    plotPoints: Math.max(0, Math.min(10, Number(input.plotPoints ?? input.plot) || 0)),
    coins: {
      pc: Math.max(0, Number(input.coins?.pc) || 0),
      pp: Math.max(0, Number(input.coins?.pp) || 0),
      pe: Math.max(0, Number(input.coins?.pe) || 0),
      po: Math.max(0, Number(input.coins?.po) || 0),
      pl: Math.max(0, Number(input.coins?.pl) || 0),
    },
    conditions: Array.isArray(input.conditions) ? input.conditions : [],
    resources: Array.isArray(input.resources) ? input.resources : [],
    inventory: Array.isArray(input.inventory) ? input.inventory : [],
    proficiencies: {
      savingThrows: Array.isArray(input.proficiencies?.savingThrows) ? input.proficiencies.savingThrows : [],
      skills: Array.isArray(input.proficiencies?.skills) ? input.proficiencies.skills : [],
      expertise: Array.isArray(input.proficiencies?.expertise) ? input.proficiencies.expertise : [],
      armor: Array.isArray(input.proficiencies?.armor) ? input.proficiencies.armor : [],
      weapons: Array.isArray(input.proficiencies?.weapons) ? input.proficiencies.weapons : [],
      tools: Array.isArray(input.proficiencies?.tools) ? input.proficiencies.tools : [],
      languages: Array.isArray(input.proficiencies?.languages) ? input.proficiencies.languages : [],
    },
    spellcasting: normalizeSpellcasting(input.spellcasting),
    featureChoices: input.featureChoices && typeof input.featureChoices === 'object'
      ? input.featureChoices
      : {},
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const automaticResources = resourcesForCharacter(character);
  const automaticIds = new Set(automaticResources.map((item) => item.id));
  const automaticNames = new Set(automaticResources.map((item) =>
    String(item.name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  ));
  const classResourceIds = new Set((CLASS_RESOURCES[character.classKey] || []).map((item) => item.id));
  const classResourceNames = new Set((CLASS_RESOURCES[character.classKey] || []).map((item) =>
    String(item.name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  ));
  const customResources = character.resources.filter((item) => {
    const name = String(item.name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const automaticId = classResourceIds.has(item.id)
      || ALL_RACE_RESOURCE_IDS.has(item.id)
      || String(item.id || '').startsWith('spell-')
      || String(item.id || '').startsWith('mystic-')
      || String(item.id || '').startsWith('pact-');
    const automaticName = classResourceNames.has(name)
      || ALL_RACE_RESOURCE_NAMES.has(name)
      || name.includes('espacos de magia')
      || name.includes('magia de pacto')
      || name.includes('arcano mistico');
    if (item.automatic || automaticId || automaticName) return false;
    if (automaticIds.has(item.id) || automaticNames.has(name)) return false;
    if (item.type === 'Magia' && automaticResources.some((resource) => resource.name.includes('magia'))) return false;
    return true;
  });
  return { ...character, resources: [...customResources, ...automaticResources] };
}
