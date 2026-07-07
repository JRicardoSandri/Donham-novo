export function createInventoryItem(input = {}) {
  return {
    id: input.id || `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: String(input.name || '').trim(),
    quantity: Math.max(1, Number(input.quantity) || 1),
    weight: Math.max(0, Number(input.weight) || 0),
    value: String(input.value || '').trim(),
    category: String(input.category || 'Personalizado').trim(),
    rarity: String(input.rarity || '').trim(),
    requiresAttunement: Boolean(input.requiresAttunement),
    attuned: Boolean(input.attuned),
    charges: {
      current: Math.max(0, Number(input.charges?.current ?? input.chargesCurrent) || 0),
      max: Math.max(0, Number(input.charges?.max ?? input.chargesMax) || 0),
    },
    equipped: Boolean(input.equipped),
    description: String(input.description || '').trim(),
  };
}

export function normalizeCoins(input = {}) {
  return {
    pl: Math.max(0, Number(input.pl) || 0),
    po: Math.max(0, Number(input.po) || 0),
    pe: Math.max(0, Number(input.pe) || 0),
    pp: Math.max(0, Number(input.pp) || 0),
    pc: Math.max(0, Number(input.pc) || 0),
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
