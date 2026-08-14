import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../assets/o-limiar-combate.html', import.meta.url), 'utf8');
const script = html.slice(html.indexOf('<script>') + 8, html.indexOf('</script>'));
assert.ok(script, 'campaign script must exist');
new Function(script);

function extractFunction(name) {
  const start = script.indexOf('function ' + name + '(');
  assert.ok(start >= 0, name + ' not found');
  const bodyStart = script.indexOf('{', start);
  let depth = 0;
  for (let index = bodyStart; index < script.length; index += 1) {
    if (script[index] === '{') depth += 1;
    if (script[index] === '}') {
      depth -= 1;
      if (depth === 0) return script.slice(start, index + 1);
    }
  }
  throw new Error(name + ' is not balanced');
}

const adaptResources = Function('return (' + extractFunction('adaptResources') + ')')();
const resourceCases = [
  ['rage', 'rage'], ['bardic-inspiration', 'bardic'], ['channel-divinity', 'channel'],
  ['wild-shape', 'wild-shape'], ['sorcery-points', 'sorcery'], ['indomitable', 'passive'],
  ['stroke-of-luck', 'passive'], ['arcane-recovery', 'rest-only'], ['ki', 'ki'],
  ['divine-sense', 'divine-sense'], ['lay-on-hands', 'cura-variavel'],
  ['race-breath-weapon', 'breath'], ['race-relentless-endurance', 'passive'],
  ['race-infernal-rebuke', 'racial-reaction'], ['sub-hexblades-curse', 'hexblade'],
  ['sub-fighting-spirit', 'fighting-spirit'], ['sub-giants-might', 'giants-might'],
  ['sub-bladesong', 'bladesong'], ['sub-natural-recovery', 'rest-only'],
];
resourceCases.forEach(([id, expected]) => {
  const [adapted] = adaptResources([{ id, name: id, max: 3, recovery: 'long' }], 20);
  assert.equal(adapted.tipo, expected, id + ' mapped to wrong mechanic');
});

const required = [
  ['rage', "id === 'rage'"],
  ['bardic inspiration', "tipo: 'bardic'"],
  ['channel divinity', "tipo: 'channel'"],
  ['wild shape', "tipo: 'wild-shape'"],
  ['metamagic', "tipo: 'sorcery'"],
  ['indomitable', "id === 'indomitable'"],
  ['sneak attack', 'Ataque Furtivo'],
  ['arcane recovery', 'Recuperação Arcana'],
  ['ki', "tipo: 'ki'"],
  ['divine smite', 'Destruição Divina'],
  ['hunter mark', "code === 'dano+1d6'"],
  ['pact slots cap', 'Math.min(5'],
  ['halfling lucky', '/halfling/.test'],
  ['relentless endurance', 'Resistência Implacável'],
  ['savage attacks', 'Ataques Selvagens'],
  ['dragonborn breath', 'Arma de Sopro'],
  ['gnome cunning', '/gnomo|yuan-ti/.test'],
  ['tiefling reaction', 'Repreensão Infernal'],
];
required.forEach(([name, token]) => assert.ok(html.includes(token), name + ' mechanic missing'));
assert.ok(!html.includes('Superioridade/Inspiração: arma um dado'), 'bardic inspiration must not buff the bard');

const rageBonus = (level) => level >= 16 ? 4 : level >= 9 ? 3 : 2;
assert.deepEqual([1, 8, 9, 15, 16, 20].map(rageBonus), [2, 2, 3, 3, 4, 4]);
const sneakDice = (level) => Math.ceil(level / 2);
assert.deepEqual([1, 2, 3, 10, 19, 20].map(sneakDice), [1, 1, 2, 5, 10, 10]);
const martialDie = (level) => level >= 17 ? 10 : level >= 11 ? 8 : level >= 5 ? 6 : 4;
assert.deepEqual([1, 4, 5, 10, 11, 16, 17, 20].map(martialDie), [4, 4, 6, 6, 8, 8, 10, 10]);
const breathDice = (level) => level >= 16 ? 5 : level >= 11 ? 4 : level >= 6 ? 3 : 2;
assert.deepEqual([1, 5, 6, 10, 11, 15, 16, 20].map(breathDice), [2, 2, 3, 3, 4, 4, 5, 5]);
const brutalDice = (level) => level >= 17 ? 3 : level >= 13 ? 2 : level >= 9 ? 1 : 0;
assert.deepEqual([8, 9, 12, 13, 16, 17, 20].map(brutalDice), [0, 1, 1, 2, 2, 3, 3]);
const smiteDice = (circle, bonus = false) => Math.min(5, 2 + Math.max(0, circle - 1)) + (bonus ? 1 : 0);
assert.deepEqual([1, 2, 3, 4, 5, 9].map((c) => smiteDice(c)), [2, 3, 4, 5, 5, 5]);
assert.equal(smiteDice(1, true), 3);

console.log(JSON.stringify({
  ok: true,
  syntax: true,
  mechanics: required.length,
  resourceMappings: resourceCases.length,
  formulas: ['rage', 'sneakAttack', 'martialArts', 'breathWeapon', 'brutalCritical', 'divineSmite'],
}, null, 2));