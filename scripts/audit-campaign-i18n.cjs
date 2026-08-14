const fs = require('fs');
const parser = require('@babel/parser');

const html = fs.readFileSync('public/o-limiar-combate.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];

if (!script) {
  throw new Error('Campaign script not found');
}

const ast = parser.parse(script, { sourceType: 'script' });
const variables = new Map();

function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  visit(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach((item) => walk(item, visit));
    else if (value && typeof value === 'object' && value.type) walk(value, visit);
  }
}

walk(ast, (node) => {
  if (node.type !== 'VariableDeclarator' || node.id.type !== 'Identifier') return;
  variables.set(node.id.name, node.init);
});

function objectToValue(node) {
  if (!node) return undefined;
  if (node.type === 'StringLiteral' || node.type === 'NumericLiteral' || node.type === 'BooleanLiteral') {
    return node.value;
  }
  if (node.type === 'ObjectExpression') {
    return Object.fromEntries(node.properties
      .filter((property) => property.type === 'ObjectProperty')
      .map((property) => [
        property.key.name ?? property.key.value,
        objectToValue(property.value),
      ]));
  }
  return undefined;
}

const translations = objectToValue(variables.get('TR')) || {};
const translatableKeys = new Set([
  'eyebrow',
  'titulo',
  'texto',
  'trail',
  'vitoria',
  'txt',
  'sub',
  'prompt',
  'label',
  'title',
  'description',
  'length',
  'acts',
  'kicker',
]);
const campaignVariables = ['LIMIAR_SCENES', 'VHAROS_SCENES', 'MASCARA_SCENES', 'BREJO_SCENES', 'MURALHA_SCENES'];
const strings = new Set();

for (const variableName of campaignVariables) {
  walk(variables.get(variableName), (node) => {
    if (node.type !== 'ObjectProperty') return;
    const key = node.key.name ?? node.key.value;
    if (!translatableKeys.has(key)) return;
    if (node.value.type === 'StringLiteral' && node.value.value.trim()) strings.add(node.value.value);
    if (node.value.type === 'CallExpression' && node.value.callee.name === 'campaignText') {
      const args = node.value.arguments;
      if (args.length !== 3 || args.some((argument) => argument.type !== 'StringLiteral' || !argument.value.trim())) {
        throw new Error(`Malformed inline translation in ${variableName}.${key}`);
      }
    }
  });
}

const missing = [...strings]
  .filter((value) => !translations[value]?.en || !translations[value]?.es)
  .sort((a, b) => a.localeCompare(b, 'pt-BR'));

console.log(`Campaign strings checked: ${strings.size}`);
console.log(`Missing EN/ES entries: ${missing.length}`);
missing.forEach((value) => console.log(`- ${value}`));

process.exitCode = missing.length ? 1 : 0;
