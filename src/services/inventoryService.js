export function createInventoryItem(input = {}) {
  return {
    id: input.id || `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: String(input.name || '').trim(),
    quantity: Math.max(1, Number(input.quantity) || 1),
    weight: Math.max(0, Number(input.weight) || 0),
    value: String(input.value || '').trim(),
    category: String(input.category || 'Personalizado').trim(),
    equipped: Boolean(input.equipped),
    description: String(input.description || '').trim(),
  };
}

export function totalInventoryWeight(items = []) {
  return items.reduce(
    (total, item) => total + Math.max(0, Number(item.weight) || 0) * Math.max(0, Number(item.quantity) || 0),
    0
  );
}

export function inventoryCapacity(character) {
  const multiplier = character?.size === 'large' ? 15 : 7.5;
  return Math.max(0, Number(character?.attributes?.strength) || 0) * multiplier;
}

export function upsertInventoryItem(items = [], input) {
  const item = createInventoryItem(input);
  const exists = items.some((current) => current.id === item.id);
  return exists
    ? items.map((current) => current.id === item.id ? item : current)
    : [...items, item];
}

export function removeInventoryItem(items = [], itemId) {
  return items.filter((item) => item.id !== itemId);
}
