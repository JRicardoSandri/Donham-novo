import { EQUIPMENT_CATALOG } from '../data/equipmentCatalog.js';
import { RECOVERY } from '../data/classProgression.js';
import { SOLO_ADVENTURE, SOLO_ADVENTURE_ID } from '../data/soloAdventure.js';
import { spellById } from '../data/spells.js';
import { applyHpChange } from './combatService.js';
import { recoverResources } from './resourceService.js';
import { abilityModifier, proficiencyBonus } from './rulesService.js';

const RANGED_WEAPON_WORDS = ['arco', 'besta', 'funda', 'zarabatana'];
const RULE_ALIASES = {
  strength: ['strength', 'forca', 'for'],
  dexterity: ['dexterity', 'destreza', 'des'],
  constitution: ['constitution', 'constituicao', 'con'],
  intelligence: ['intelligence', 'inteligencia', 'int'],
  wisdom: ['wisdom', 'sabedoria', 'sab'],
  charisma: ['charisma', 'carisma', 'car'],
  perception: ['perception', 'percepcao'],
  investigation: ['investigation', 'investigacao'],
  athletics: ['athletics', 'atletismo'],
};
const CLASS_HIT_DICE = {
  Bárbaro: 12,
  Guerreiro: 10,
  Paladino: 10,
  Patrulheiro: 10,
  Bardo: 8,
  Bruxo: 8,
  Clérigo: 8,
  Druida: 8,
  Monge: 8,
  Ladino: 8,
  Feiticeiro: 6,
  Mago: 6,
};

function now() {
  return new Date().toISOString();
}

function randomId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function rollDie(sides, random = Math.random) {
  return Math.floor(random() * sides) + 1;
}

export function rollDice(count, sides, random = Math.random) {
  return Array.from({ length: Math.max(0, count) }, () => rollDie(sides, random));
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function normalizedRuleId(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function includesRuleId(values, expected) {
  const targets = RULE_ALIASES[expected] || [expected];
  return (values || []).some((value) => {
    const normalized = normalizedRuleId(value);
    return targets.some((target) => {
      const normalizedTarget = normalizedRuleId(target);
      return normalized === normalizedTarget || normalized.includes(normalizedTarget);
    });
  });
}

export function characterCheckModifier(character, ability, skill = null, savingThrow = false) {
  const base = abilityModifier(character.attributes?.[ability]);
  const proficiency = proficiencyBonus(character.level);
  if (savingThrow) {
    return base + (includesRuleId(character.proficiencies?.savingThrows, ability) ? proficiency : 0);
  }
  if (!skill) return base;
  if (includesRuleId(character.proficiencies?.expertise, skill)) return base + proficiency * 2;
  if (includesRuleId(character.proficiencies?.skills, skill)) return base + proficiency;
  return base;
}

function cloneResources(resources = []) {
  return resources.map((resource) => ({ ...resource }));
}

function cloneInventory(inventory = []) {
  return inventory.map((item) => ({
    ...item,
    charges: item.charges ? { ...item.charges } : undefined,
  }));
}

export function createSoloSession(character) {
  return {
    id: randomId('solo-session'),
    adventureId: SOLO_ADVENTURE_ID,
    characterId: character.id,
    characterSnapshot: {
      name: character.name,
      classKey: character.classKey,
      subclassKey: character.subclassKey,
      race: character.race,
      level: character.level,
      armorClass: character.armorClass,
      initiative: character.initiative,
      attributes: { ...character.attributes },
    },
    sceneId: SOLO_ADVENTURE.startSceneId,
    status: 'active',
    hp: { ...character.hp },
    resources: cloneResources(character.resources),
    inventory: cloneInventory(character.inventory),
    hitDice: Math.max(1, Number(character.level) || 1),
    encounter: null,
    lastRoll: null,
    trail: [],
    createdAt: now(),
    updatedAt: now(),
  };
}

export function normalizeSoloSession(session, characters = []) {
  if (!session || typeof session !== 'object') return null;
  const character = characters.find((item) => item.id === session.characterId);
  if (!character) return null;
  return {
    ...createSoloSession(character),
    ...session,
    hp: { ...character.hp, ...(session.hp || {}) },
    resources: cloneResources(session.resources || character.resources),
    inventory: cloneInventory(session.inventory || character.inventory),
    trail: Array.isArray(session.trail) ? session.trail : [],
    encounter: session.encounter ? {
      ...session.encounter,
      enemy: { ...session.encounter.enemy },
    } : null,
  };
}

export function soloSessionForCharacter(sessions = [], characterId) {
  return sessions.find((session) =>
    session.characterId === characterId &&
    session.adventureId === SOLO_ADVENTURE_ID
  ) || null;
}

export function upsertSoloSession(sessions = [], session) {
  const exists = sessions.some((item) => item.id === session.id);
  return exists
    ? sessions.map((item) => item.id === session.id ? session : item)
    : [...sessions, session];
}

export function removeSoloSession(sessions = [], sessionId) {
  return sessions.filter((session) => session.id !== sessionId);
}

/* Checkpoint bruto do motor de combate em HTML — salva/retoma a posição exata do jogador na aventura. */
export function htmlCheckpointForCharacter(sessions = [], characterId) {
  const session = sessions.find((item) =>
    item.characterId === characterId && item.adventureId === SOLO_ADVENTURE_ID
  );
  return session?.htmlCheckpoint || null;
}

export function htmlCheckpointsForCharacter(sessions = [], characterId) {
  return sessions.reduce((checkpoints, session) => {
    if (session.characterId !== characterId || !session.htmlCheckpoint) return checkpoints;
    checkpoints[session.adventureId || SOLO_ADVENTURE_ID] = session.htmlCheckpoint;
    return checkpoints;
  }, {});
}

export function upsertHtmlCheckpoint(
  sessions = [],
  characterId,
  checkpoint,
  adventureId = SOLO_ADVENTURE_ID
) {
  const existing = sessions.find((item) =>
    item.characterId === characterId &&
    (item.adventureId || SOLO_ADVENTURE_ID) === adventureId
  );
  if (existing) {
    return sessions.map((item) => (item === existing
      ? { ...item, htmlCheckpoint: checkpoint, updatedAt: now() }
      : item));
  }
  return [...sessions, {
    id: randomId('solo-session'),
    adventureId,
    characterId,
    htmlCheckpoint: checkpoint,
    createdAt: now(),
    updatedAt: now(),
  }];
}

export function clearHtmlCheckpoint(
  sessions = [],
  characterId,
  adventureId = SOLO_ADVENTURE_ID
) {
  return sessions.filter((item) =>
    !(item.characterId === characterId &&
      (item.adventureId || SOLO_ADVENTURE_ID) === adventureId)
  );
}

function appendTrail(session, event) {
  return {
    ...session,
    trail: [...session.trail, { id: randomId('event'), at: now(), ...event }],
    updatedAt: now(),
  };
}

export function resolveAbilityCheck(session, character, choice, random = Math.random) {
  const natural = rollDie(20, random);
  const modifier = characterCheckModifier(character, choice.ability, choice.skill);
  const total = natural + modifier;
  const success = total >= choice.dc;
  const nextSceneId = success ? choice.nextOnSuccess : choice.nextOnFailure;
  return appendTrail({
    ...session,
    sceneId: nextSceneId,
    lastRoll: {
      type: 'ability-check',
      ability: choice.ability,
      natural,
      modifier,
      total,
      dc: choice.dc,
      success,
    },
  }, {
    type: 'ability-check',
    ability: choice.ability,
    total,
    dc: choice.dc,
    success,
  });
}

export function resolveHazard(session, character, scene, random = Math.random) {
  const natural = rollDie(20, random);
  const modifier = characterCheckModifier(character, scene.ability, null, scene.savingThrow);
  const total = natural + modifier;
  const success = total >= scene.dc;
  const rolledDamage = sum(rollDice(scene.damage.count, scene.damage.sides, random));
  const damage = success && scene.halfOnSuccess ? Math.floor(rolledDamage / 2) : rolledDamage;
  return appendTrail({
    ...session,
    sceneId: scene.next,
    hp: applyHpChange(session.hp, -damage),
    lastRoll: {
      type: 'hazard',
      ability: scene.ability,
      natural,
      modifier,
      total,
      dc: scene.dc,
      success,
      damage,
    },
  }, {
    type: 'hazard',
    total,
    dc: scene.dc,
    success,
    damage,
  });
}

export function applySoloChoice(session, character, choice, random = Math.random) {
  let next = { ...session, sceneId: choice.next, lastRoll: null, updatedAt: now() };
  if (choice.action === 'short-rest') {
    const canSpendHitDie = next.hitDice > 0 && next.hp.current < next.hp.max;
    const hitDie = CLASS_HIT_DICE[character.classKey] || 8;
    const healing = canSpendHitDie
      ? Math.max(0, rollDie(hitDie, random) + abilityModifier(character.attributes?.constitution))
      : 0;
    next = {
      ...next,
      resources: recoverResources(next.resources, RECOVERY.SHORT),
      hp: healing > 0 ? applyHpChange(next.hp, healing) : next.hp,
      hitDice: canSpendHitDie ? next.hitDice - 1 : next.hitDice,
    };
    return appendTrail(next, { type: 'short-rest', healing });
  }
  return appendTrail(next, { type: 'choice', choiceId: choice.id });
}

function catalogItemFor(inventoryItem) {
  return EQUIPMENT_CATALOG.find((item) =>
    (inventoryItem.catalogKey && item.catalogKey === inventoryItem.catalogKey) ||
    item.name === inventoryItem.name
  ) || inventoryItem;
}

function parseWeaponDamage(item) {
  const source = catalogItemFor(item);
  const match = String(source.description || item.description || '').match(/(\d+)?d(\d+)\s+([^;]+)/i);
  if (!match) return null;
  return {
    count: Number(match[1]) || 1,
    sides: Number(match[2]),
    type: match[3].trim(),
    finesse: /acuidade/i.test(source.description || ''),
    ranged: RANGED_WEAPON_WORDS.some((word) =>
      String(source.name || item.name || '').toLowerCase().includes(word)
    ),
  };
}

export function characterAttackOptions(character, session) {
  const strength = abilityModifier(character.attributes?.strength);
  const dexterity = abilityModifier(character.attributes?.dexterity);
  const weapons = (session.inventory || [])
    .filter((item) => item.quantity > 0 && (item.category === 'Armas' || catalogItemFor(item).category === 'Armas'))
    .map((item) => {
      const damage = parseWeaponDamage(item);
      if (!damage) return null;
      const modifier = damage.ranged ? dexterity : damage.finesse ? Math.max(strength, dexterity) : strength;
      return {
        id: item.id,
        name: item.name,
        attackBonus: modifier + proficiencyBonus(character.level),
        damage: { count: damage.count, sides: damage.sides, bonus: modifier, type: damage.type },
        damageType: damage.type,
        finesse: damage.finesse,
        ranged: damage.ranged,
      };
    })
    .filter(Boolean);

  if (weapons.length) return weapons;
  return [{
    id: 'unarmed-strike',
    name: 'Ataque desarmado',
    attackBonus: strength + proficiencyBonus(character.level),
    damage: { count: 0, sides: 0, bonus: Math.max(1, strength + 1) },
    damageType: 'concussão',
  }];
}

export function characterSpellOptions(character) {
  const ids = new Set([
    ...(character.spellcasting?.knownSpellIds || []),
    ...(character.spellcasting?.preparedSpellIds || []),
    ...(character.spellcasting?.alwaysPreparedSpellIds || []),
  ]);
  return [...ids].map(spellById).filter(Boolean);
}

function attackRoll(attackBonus, armorClass, random) {
  const natural = rollDie(20, random);
  return {
    natural,
    total: natural + attackBonus,
    critical: natural === 20,
    hit: natural === 20 || (natural !== 1 && natural + attackBonus >= armorClass),
  };
}

function damageRoll(damage, critical, random) {
  const count = Math.max(0, Number(damage.count) || 0) * (critical ? 2 : 1);
  return Math.max(0, sum(rollDice(count, damage.sides, random)) + (Number(damage.bonus) || 0));
}

export function startSoloEncounter(session, character, scene, random = Math.random) {
  const heroNatural = rollDie(20, random);
  const enemyNatural = rollDie(20, random);
  const heroTotal = heroNatural + Number(character.initiative || 0);
  const enemyTotal = enemyNatural + Number(scene.enemy.initiativeModifier || 0);
  let next = {
    ...session,
    encounter: {
      sceneId: session.sceneId,
      round: 1,
      heroActsNext: heroTotal >= enemyTotal,
      heroInitiative: { natural: heroNatural, total: heroTotal },
      enemyInitiative: { natural: enemyNatural, total: enemyTotal },
      enemy: {
        ...scene.enemy,
        hpCurrent: scene.enemy.hp,
        hpMax: scene.enemy.hp,
      },
      log: [],
    },
    updatedAt: now(),
  };

  if (!next.encounter.heroActsNext) {
    next = resolveEnemyTurn(next, character, random);
  }
  return next;
}

function resolveEnemyTurn(session, character, random = Math.random) {
  const encounter = session.encounter;
  if (!encounter || encounter.enemy.hpCurrent <= 0) return session;
  const roll = attackRoll(encounter.enemy.attackBonus, character.armorClass, random);
  const damage = roll.hit ? damageRoll(encounter.enemy.damage, roll.critical, random) : 0;
  const hp = damage > 0 ? applyHpChange(session.hp, -damage) : session.hp;
  return {
    ...session,
    hp,
    encounter: {
      ...encounter,
      heroActsNext: true,
      log: [...encounter.log, {
        id: randomId('combat'),
        actor: 'enemy',
        natural: roll.natural,
        total: roll.total,
        hit: roll.hit,
        critical: roll.critical,
        damage,
      }],
    },
    status: damage > 0 && hp.current <= 0 ? 'defeated' : session.status,
    updatedAt: now(),
  };
}

export function resolveHeroAttack(session, character, attack, scene, random = Math.random) {
  if (!session.encounter?.heroActsNext || session.status !== 'active') return session;
  const roll = attackRoll(attack.attackBonus, session.encounter.enemy.armorClass, random);
  const damage = roll.hit ? damageRoll(attack.damage, roll.critical, random) : 0;
  const enemyHp = Math.max(0, session.encounter.enemy.hpCurrent - damage);
  let next = {
    ...session,
    encounter: {
      ...session.encounter,
      heroActsNext: false,
      enemy: { ...session.encounter.enemy, hpCurrent: enemyHp },
      log: [...session.encounter.log, {
        id: randomId('combat'),
        actor: 'hero',
        actionName: attack.name,
        natural: roll.natural,
        total: roll.total,
        hit: roll.hit,
        critical: roll.critical,
        damage,
      }],
    },
    updatedAt: now(),
  };

  if (enemyHp <= 0) {
    return appendTrail({
      ...next,
      sceneId: scene.nextOnVictory,
      encounter: null,
    }, { type: 'combat-victory', enemyId: scene.enemy.id });
  }

  next = resolveEnemyTurn(next, character, random);
  if (next.encounter && next.status === 'active') {
    next = {
      ...next,
      encounter: {
        ...next.encounter,
        round: next.encounter.round + 1,
      },
    };
  }
  return next;
}

export function useHealingPotion(session, random = Math.random) {
  const potionIndex = session.inventory.findIndex((item) =>
    item.quantity > 0 &&
    (item.catalogKey === 'pocao-de-cura' || /poção de cura|pocao de cura/i.test(item.name))
  );
  if (potionIndex < 0 || session.hp.current >= session.hp.max) return session;
  const healing = sum(rollDice(2, 4, random)) + 2;
  const inventory = session.inventory.map((item, index) =>
    index === potionIndex ? { ...item, quantity: item.quantity - 1 } : item
  );
  return appendTrail({
    ...session,
    hp: applyHpChange(session.hp, healing),
    inventory,
  }, { type: 'healing-potion', healing });
}

export function completeSoloSession(session) {
  return { ...session, status: 'completed', updatedAt: now() };
}
