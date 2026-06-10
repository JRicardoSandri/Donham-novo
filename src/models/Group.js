export function createGroup(input = {}) {
  return {
    id: input.id || `group-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: String(input.name || 'Novo grupo').trim(),
    characterIds: Array.isArray(input.characterIds) ? [...input.characterIds] : [],
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
