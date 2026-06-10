export function createGroup({ id, name, characterIds = [] }) {
  return {
    id: id || `group-${Date.now()}`,
    name: String(name || 'Novo grupo').trim(),
    characterIds: [...characterIds],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
