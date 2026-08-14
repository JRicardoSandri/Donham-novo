const fs = require('fs');
const parser = require('@babel/parser');

const html = fs.readFileSync('public/o-limiar-combate.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!script) throw new Error('Campaign script not found');
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
  if (node.type === 'VariableDeclarator' && node.id.type === 'Identifier') variables.set(node.id.name, node.init);
});

const campaigns = [
  ['LIMIAR_SCENES', 'entrada'],
  ['VHAROS_SCENES', 'vharos_chegada'],
  ['MASCARA_SCENES', 'mascara_gala'],
  ['BREJO_SCENES', 'brejo_chegada'],
  ['MURALHA_SCENES', 'muralha_conselho'],
];
let failures = 0;
for (const [variableName, start] of campaigns) {
  const root = variables.get(variableName);
  if (!root || root.type !== 'ObjectExpression') throw new Error(`${variableName} not found`);
  const scenes = new Map();
  for (const property of root.properties) {
    if (property.type !== 'ObjectProperty') continue;
    scenes.set(property.key.name ?? property.key.value, property.value);
  }
  const graph = new Map();
  for (const [sceneId, scene] of scenes) {
    const destinations = new Set();
    walk(scene, (node) => {
      if (node.type !== 'ObjectProperty') return;
      const key = node.key.name ?? node.key.value;
      if (key === 'vai' && node.value.type === 'StringLiteral') destinations.add(node.value.value);
    });
    graph.set(sceneId, destinations);
    for (const destination of destinations) {
      if (destination !== 'veredito' && !scenes.has(destination)) {
        console.error(`${variableName}.${sceneId} points to missing scene ${destination}`);
        failures += 1;
      }
    }
  }
  const visited = new Set();
  const stack = [start];
  while (stack.length) {
    const sceneId = stack.pop();
    if (visited.has(sceneId) || sceneId === 'veredito') continue;
    visited.add(sceneId);
    for (const destination of graph.get(sceneId) || []) stack.push(destination);
  }
  const unreachable = [...scenes.keys()].filter((sceneId) => !visited.has(sceneId));
  if (unreachable.length) {
    console.error(`${variableName} unreachable: ${unreachable.join(', ')}`);
    failures += unreachable.length;
  }
  console.log(`${variableName}: ${scenes.size} scenes, ${visited.size} reachable`);
}
process.exitCode = failures ? 1 : 0;