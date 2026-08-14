import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CLASS_FEATURES, progressionFor } from '../src/data/classFeatures.js';
import { RECOVERY, mysticArcanumFor, spellSlotsFor, warlockPactFor } from '../src/data/classProgression.js';
import { CLASSES, XP_TABLE } from '../src/data/dnd5e.js';
import { RACE_OPTIONS, raceProgressionFor } from '../src/data/raceProgression.js';
import { SPELLS } from '../src/data/spells.js';
import { SUBCLASS_OPTIONS, subclassUnlockLevel, subclassesForClass } from '../src/data/subclassProgression.js';
import { createCharacter } from '../src/models/Character.js';
import { advanceTurn, applyHpChange, applyParticipantHp, createCombat, recordDeathSave } from '../src/services/combatService.js';
import { recoverResources, resourcesForCharacter, spendResource } from '../src/services/resourceService.js';
import { levelFromXp, proficiencyBonus } from '../src/services/rulesService.js';
import { canUseSpell, castSpell, maxAvailableSpellCircle } from '../src/services/spellService.js';

const report = { baseCharacters: 0, subclassCharacters: 0, raceCharacters: 0, spellChecks: 0, combatChecks: 0 };
const stats = { strength: 14, dexterity: 14, constitution: 14, intelligence: 16, wisdom: 16, charisma: 16 };
const at = (classKey, level, extra = {}) => createCharacter({
  name: classKey + ' ' + level, classKey, xp: XP_TABLE[level - 1],
  hpMax: 20, hpCurrent: 20, attributes: stats, ...extra,
});
function validResources(character, label) {
  const ids = new Set();
  for (const r of character.resources) {
    assert.ok(r.id && !ids.has(r.id), label + ': recurso sem id ou duplicado ' + r.id);
    ids.add(r.id);
    assert.ok(Number.isFinite(r.max) && r.max >= 0, label + ': max invalido em ' + r.id);
    assert.ok(Number.isFinite(r.current) && r.current >= 0 && r.current <= r.max, label + ': current invalido em ' + r.id);
  }
}

assert.equal(CLASSES.length, 12);
assert.equal(new Set(CLASSES).size, 12);
assert.equal(XP_TABLE.length, 20);
XP_TABLE.forEach((xp, i) => {
  const level = i + 1;
  assert.equal(levelFromXp(xp), level, 'XP inicial do nivel ' + level);
  if (i < 19) assert.equal(levelFromXp(XP_TABLE[i + 1] - 1), level, 'limite de XP do nivel ' + level);
  assert.equal(proficiencyBonus(level), 2 + Math.floor((level - 1) / 4), 'proficiencia do nivel ' + level);
});

for (const classKey of CLASSES) {
  assert.equal((CLASS_FEATURES[classKey] || []).length, 20, classKey + ': progressao visual incompleta');
  for (let level = 1; level <= 20; level += 1) {
    const c = at(classKey, level);
    report.baseCharacters += 1;
    assert.equal(c.level, level);
    assert.equal(c.proficiencyBonus, proficiencyBonus(level));
    validResources(c, classKey + ' ' + level);
    const p = progressionFor(classKey, level);
    assert.ok(p.unlocked.some(([n]) => n === level), classKey + ' ' + level + ': habilidade ausente');
    assert.ok(p.upcoming.every(([n]) => n > level), classKey + ' ' + level + ': proxima habilidade invalida');
    const regenerated = resourcesForCharacter({ ...c, resources: c.resources });
    assert.deepEqual(regenerated.map(({ id, max }) => [id, max]), c.resources.filter((r) => r.automatic).map(({ id, max }) => [id, max]));
  }
  const high = at(classKey, 20);
  const spent = high.resources.reduce((rs, r) => spendResource(rs, r.id, -1), high.resources);
  const short = recoverResources(spent, RECOVERY.SHORT);
  const long = recoverResources(spent, RECOVERY.LONG);
  spent.forEach((r, i) => {
    if (r.recovery === RECOVERY.SHORT) assert.equal(short[i].current, r.max, classKey + ': descanso curto ' + r.id);
    if (r.recovery === RECOVERY.LONG) assert.equal(short[i].current, r.current, classKey + ': recuperacao antecipada ' + r.id);
    assert.equal(long[i].current, r.max, classKey + ': descanso longo ' + r.id);
  });
  const low = createCharacter({ ...high, xp: 0, resources: high.resources });
  validResources(low, classKey + ' rebaixado');
  const expected = new Set(resourcesForCharacter(low).map((r) => r.id));
  assert.ok(low.resources.every((r) => !r.automatic || expected.has(r.id)), classKey + ': recurso de nivel alto persistiu');
}

for (const classKey of CLASSES) {
  for (const [subclassKey] of subclassesForClass(classKey)) {
    const unlock = subclassUnlockLevel(classKey);
    if (unlock > 1) assert.equal(at(classKey, unlock - 1, { subclassKey }).subclassKey, null, classKey + '/' + subclassKey + ': liberada cedo');
    for (let level = unlock; level <= 20; level += 1) {
      const c = at(classKey, level, { subclassKey });
      report.subclassCharacters += 1;
      assert.equal(c.subclassKey, subclassKey, classKey + '/' + subclassKey + ': nao liberada no nivel correto');
      validResources(c, classKey + '/' + subclassKey + ' ' + level);
    }
  }
}
const subclassIds = [...new Set(Object.values(SUBCLASS_OPTIONS).flat().map(([id]) => id))];
assert.ok(subclassIds.length >= 80, 'catalogo de subclasses pequeno');

for (const { group, name: race } of RACE_OPTIONS) {
  for (let level = 1; level <= 20; level += 1) {
    const c = at('Guerreiro', level, { race });
    report.raceCharacters += 1;
    validResources(c, race + ' ' + level);
    const p = raceProgressionFor(race, level);
    assert.ok(p.unlocked.length + p.upcoming.length, race + ' (' + group + '): progressao racial ausente');
  }
}

for (const classKey of CLASSES) {
  for (const { name: race } of RACE_OPTIONS) {
    for (const level of [1, 20]) {
      const c = at(classKey, level, { race });
      report.raceCharacters += 1;
      validResources(c, classKey + '/' + race + ' ' + level);
    }
  }
}
const full20 = [4, 3, 3, 3, 3, 2, 2, 1, 1];
for (const cls of ['Bardo', 'Clerigo', 'Clérigo', 'Druida', 'Feiticeiro', 'Mago']) assert.deepEqual(spellSlotsFor(cls, 20), full20, cls + ': slots 20');
assert.deepEqual(spellSlotsFor('Paladino', 20), [4, 3, 3, 3, 2]);
assert.deepEqual(spellSlotsFor('Patrulheiro', 20), [4, 3, 3, 3, 2]);
assert.deepEqual(spellSlotsFor('Guerreiro', 20, 'eldritch-knight'), [4, 3, 3, 1]);
assert.deepEqual(spellSlotsFor('Ladino', 20, 'arcane-trickster'), [4, 3, 3, 1]);
assert.deepEqual(warlockPactFor(1), { slots: 1, circle: 1 });
assert.deepEqual(warlockPactFor(11), { slots: 3, circle: 5 });
assert.deepEqual(warlockPactFor(17), { slots: 4, circle: 5 });
assert.deepEqual(mysticArcanumFor(17).map((x) => x.circle), [6, 7, 8, 9]);

for (const cls of ['Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Mago', 'Paladino', 'Patrulheiro']) {
  const c = at(cls, 20);
  const spells = SPELLS.filter((s) => s.classes.includes(cls) && s.circle <= maxAvailableSpellCircle(c));
  assert.ok(spells.length, cls + ': nenhuma magia disponivel');
  spells.slice(0, 25).forEach((s) => { report.spellChecks += 1; assert.equal(canUseSpell(c, s), true, cls + ': ' + s.name + ' bloqueada'); });
  const spell = spells.find((s) => s.circle > 0);
  if (spell) assert.equal(castSpell(c, spell.id).success, true, cls + ': falha ao conjurar ' + spell.name);
}

const rage19 = at('Bárbaro', 19).resources.find((r) => r.id === 'rage');
const rage20Character = at('Bárbaro', 20);
const rage20 = rage20Character.resources.find((r) => r.id === 'rage');
assert.equal(Boolean(rage19.unlimited), false, 'Fúria ficou ilimitada antes do nível 20');
assert.equal(rage20.unlimited, true, 'Fúria do nível 20 deve ser ilimitada');
assert.equal(spendResource(rage20Character.resources, 'rage', -1).find((r) => r.id === 'rage').current, rage20.current, 'Fúria ilimitada foi consumida');
assert.deepEqual(applyHpChange({ current: 20, max: 20, temporary: 7 }, -10), { current: 17, max: 20, temporary: 0 });
const concentrating = { id: 'hero', type: 'hero', hp: { current: 20, max: 20, temporary: 0 }, conditions: ['concentrating'], deathSaves: { successes: 0, failures: 0, stable: false, dead: false } };
assert.equal(applyParticipantHp(concentrating, -19).concentrationDc, 10);
assert.equal(applyParticipantHp(concentrating, -22).concentrationDc, 11);
const down = applyParticipantHp(concentrating, -20);
assert.ok(down.conditions.includes('unconscious') && !down.conditions.includes('concentrating'));
assert.equal(recordDeathSave(down, 1).deathSaves.failures, 2);
assert.equal(recordDeathSave(down, 20).hp.current, 1);
const combat = { ...createCombat(), participants: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] };
const t2 = advanceTurn(combat), t3 = advanceTurn(t2), t4 = advanceTurn(t3);
assert.deepEqual(t2.participants.map((x) => x.id), ['b', 'c', 'a']);
assert.deepEqual(t3.participants.map((x) => x.id), ['c', 'a', 'b']);
assert.equal(t4.round, 2);
assert.deepEqual(t4.participants.map((x) => x.id), ['a', 'b', 'c']);
report.combatChecks = 9;

const campaignHtml = fs.readFileSync(new URL('../assets/o-limiar-combate.html', import.meta.url), 'utf8');
for (const guard of [
  /Math\.min\(5, Math\.ceil\(level \/ 2\)\)/,
  /\(\?:spell\|mystic\)-\\d\+/,
  /swords\|espadas/,
  /bladesinging\|lamina cantante/,
  /turn\.actionSurged/,
  /var pactState = S\.slotByCircle\[CHAR\.pact\.circulo\]/,
]) assert.match(campaignHtml, guard, 'regra ausente no motor da campanha: ' + guard);
console.log(JSON.stringify({ ok: true, classes: CLASSES.length, subclasses: subclassIds.length, races: RACE_OPTIONS.length, ...report }, null, 2));

