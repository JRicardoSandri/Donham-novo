import React, { useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { FadeInView, PressableScale } from '../components/MicroInteractions';
import { EQUIPMENT_CATALOG, EQUIPMENT_CATEGORIES, catalogKeyForItem } from '../data/equipmentCatalog';
import { useCampaign } from '../services/CampaignContext';
import {
  displayWeight,
  gameTerm,
  itemDescription,
  itemName,
  itemRarity,
  itemValue,
  parseWeightInput,
  tr,
  weightUnitLabel,
} from '../services/i18nService';
import {
  inventoryCapacity,
  normalizeCoins,
  removeInventoryItem,
  totalInventoryWeight,
  upsertInventoryItem,
} from '../services/inventoryService';
import { colors, radii, spacing } from '../theme';

const EMPTY_ITEM = {
  id: null,
  characterId: null,
  catalogKey: '',
  name: '',
  quantity: '1',
  weight: '0',
  value: '',
  category: 'Personalizado',
  rarity: '',
  requiresAttunement: false,
  attuned: false,
  charges: { current: '0', max: '0' },
  equipped: false,
  description: '',
};

const COIN_FIELDS = [
  ['pl', 'Platina'],
  ['po', 'Ouro'],
  ['pe', 'Eletro'],
  ['pp', 'Prata'],
  ['pc', 'Cobre'],
];

export default function InventoryScreen({ language = 'pt-BR' }) {
  const { state, setState } = useCampaign();
  const tt = (text, values = {}) => tr(text, language, values);
  const term = (value) => gameTerm(value, language);
  const [form, setForm] = useState(EMPTY_ITEM);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [catalogQuery, setCatalogQuery] = useState('');
  const [catalogCategory, setCatalogCategory] = useState('Todos');
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const activeGroup = useMemo(
    () => state?.groups.find((group) => group.id === state.activeGroupId) || null,
    [state?.groups, state?.activeGroupId]
  );
  const activeCharacterIds = useMemo(
    () => new Set(activeGroup?.characterIds || []),
    [activeGroup]
  );
  const characters = useMemo(
    () => (state?.characters || []).filter((character) => activeCharacterIds.has(character.id)),
    [state?.characters, activeCharacterIds]
  );
  const selectedCharacter = useMemo(
    () => characters.find((character) => character.id === selectedCharacterId) || null,
    [characters, selectedCharacterId]
  );
  const catalogItems = useMemo(() => {
    const officialLabels = new Set();
    EQUIPMENT_CATALOG.forEach((item) => {
      [
        item.name,
        itemName(item.name, 'pt-BR'),
        itemName(item.name, 'en'),
        itemName(item.name, 'es'),
      ].forEach((label) => officialLabels.add(`${item.category}::${String(label || '').trim().toLowerCase()}`));
    });
    const customItems = (state?.customItems || []).filter((item) => (
      item.catalogKey
        || !officialLabels.has(`${item.category || 'Personalizado'}::${String(item.name || '').trim().toLowerCase()}`)
    ));
    return [...EQUIPMENT_CATALOG, ...customItems];
  }, [state?.customItems]);
  const catalogByKey = useMemo(
    () => new Map(catalogItems.map((item) => [item.catalogKey || catalogKeyForItem(item), item])),
    [catalogItems]
  );
  const catalogCategories = useMemo(
    () => EQUIPMENT_CATEGORIES.filter((category) =>
      category === 'Todos' || catalogItems.some((item) => (item.category || 'Personalizado') === category)
    ),
    [catalogItems]
  );
  const visibleCatalogItems = useMemo(
    () => catalogItems
      .filter((item) => catalogCategory === 'Todos' || item.category === catalogCategory)
      .filter((item) => `${item.name} ${itemName(item.name, language)} ${item.description} ${localizedItemDescription(item)} ${item.rarity || ''} ${itemRarity(item.rarity || '', language)}`.toLowerCase().includes(catalogQuery.trim().toLowerCase())),
    [catalogItems, catalogCategory, catalogQuery, language]
  );

  function sourceForItem(item) {
    const keyed = catalogByKey.get(item.catalogKey) || catalogByKey.get(catalogKeyForItem(item));
    if (keyed) return keyed;

    const itemCategory = item.category || 'Personalizado';
    const itemLabel = String(item.name || '').trim().toLowerCase();
    return catalogItems.find((candidate) => {
      if ((candidate.category || 'Personalizado') !== itemCategory) return false;
      return [
        candidate.name,
        itemName(candidate.name, 'pt-BR'),
        itemName(candidate.name, 'en'),
        itemName(candidate.name, 'es'),
      ].some((label) => String(label || '').trim().toLowerCase() === itemLabel);
    }) || item;
  }

  function localizedItemName(item) {
    return itemName(sourceForItem(item).name || item.name, language);
  }

  function localizedItemDescription(item) {
    return itemDescription(sourceForItem(item).description || item.description, language);
  }

  function localizedItemValue(item) {
    return itemValue(sourceForItem(item).value || item.value, language);
  }

  function localizedItemRarity(item) {
    return itemRarity(sourceForItem(item).rarity || item.rarity, language);
  }

  function applyCatalogItem(item) {
    setForm((old) => ({
      ...old,
      catalogKey: item.catalogKey || catalogKeyForItem(item),
      name: itemName(item.name, language),
      weight: String(displayWeight(item.weight, language)),
      value: localizedItemValue(item),
      category: item.category,
      rarity: item.rarity ? localizedItemRarity(item) : '',
      requiresAttunement: Boolean(item.requiresAttunement),
      attuned: Boolean(item.attuned),
      charges: {
        current: String(item.charges?.current ?? 0),
        max: String(item.charges?.max ?? 0),
      },
      description: localizedItemDescription(item),
    }));
    setCatalogOpen(false);
    setCatalogQuery('');
  }

  function saveItem() {
    if (!form.characterId || !form.name.trim()) return;
    const normalizedForm = { ...form, weight: String(parseWeightInput(form.weight, language)) };
    const libraryItem = normalizedForm.catalogKey
      ? null
      : {
          ...normalizedForm,
          source: 'custom',
          quantity: 1,
          equipped: false,
          attuned: false,
        };
    setState((old) => ({
      ...old,
      customItems: !libraryItem || catalogItems.some((item) => item.name.trim().toLowerCase() === normalizedForm.name.trim().toLowerCase())
        ? old.customItems || []
        : [...(old.customItems || []), libraryItem],
      characters: old.characters.map((character) =>
        character.id === normalizedForm.characterId
          ? { ...character, inventory: upsertInventoryItem(character.inventory, normalizedForm) }
          : character
      ),
    }));
    setForm(EMPTY_ITEM);
  }

  function editItem(characterId, item) {
    const source = sourceForItem(item);
    const isCatalogItem = Boolean(item.catalogKey || source.catalogKey);
    setForm({
      ...item,
      catalogKey: item.catalogKey || source.catalogKey || '',
      characterId,
      quantity: String(item.quantity),
      weight: String(displayWeight(item.weight, language)),
      value: isCatalogItem ? itemValue(source.value || item.value, language) : String(item.value || ''),
      category: item.category || 'Personalizado',
      rarity: isCatalogItem ? itemRarity(source.rarity || item.rarity, language) : String(item.rarity || ''),
      requiresAttunement: Boolean(item.requiresAttunement),
      attuned: Boolean(item.attuned),
      charges: {
        current: String(item.charges?.current ?? 0),
        max: String(item.charges?.max ?? 0),
      },
      name: isCatalogItem ? itemName(source.name || item.name, language) : String(item.name || ''),
      description: isCatalogItem ? itemDescription(source.description || item.description, language) : String(item.description || ''),
    });
  }

  function removeItem(characterId, itemId) {
    setState((old) => ({
      ...old,
      characters: old.characters.map((character) =>
        character.id === characterId
          ? { ...character, inventory: removeInventoryItem(character.inventory, itemId) }
          : character
      ),
    }));
    if (form.id === itemId) setForm(EMPTY_ITEM);
  }

  function updateCoins(characterId, coin, value) {
    setState((old) => ({
      ...old,
      characters: old.characters.map((character) =>
        character.id === characterId
          ? { ...character, coins: normalizeCoins({ ...character.coins, [coin]: value }) }
          : character
      ),
    }));
  }

  if (!state) return <Text style={styles.loading}>{tt('Carregando inventário...')}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>{tt('INVENTÁRIO')}</Text>
      <Text style={styles.title}>{tt('Equipamento e carga')}</Text>
      <Text style={styles.subtitle}>{tt('A capacidade usa Força × 7,5 kg para porte Médio e × 15 kg para porte Grande.')}</Text>

      {characters.length === 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{tt('Nenhum personagem criado')}</Text>
          <Text style={styles.muted}>{tt('Crie um personagem na aba Grupos para montar o inventário.')}</Text>
        </View>
      )}

      {!selectedCharacter && characters.map((character) => {
        const inventory = character.inventory || [];
        const currentWeight = totalInventoryWeight(inventory);
        const capacity = inventoryCapacity(character);
        const overloaded = currentWeight > capacity;

        return (
          <FadeInView key={character.id} animationKey={`inventory-summary-${character.id}`}>
          <PressableScale
            style={styles.characterSummary}
            onPress={() => {
              setSelectedCharacterId(character.id);
              setForm(EMPTY_ITEM);
            }}
          >
            <View style={[styles.avatar, overloaded && styles.avatarOverloaded]}>
              <Text style={styles.avatarText}>{character.name.slice(0, 1).toUpperCase()}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>{character.name}</Text>
              <Text style={[styles.weight, overloaded && styles.overloaded]}>
                {tt('{current} / {capacity} kg · {count} {items}', {
                  current: displayWeight(currentWeight, language).toFixed(1),
                  capacity: displayWeight(capacity, language),
                  count: inventory.length,
                  items: inventory.length === 1 ? tt('item') : tt('itens'),
                })}
              </Text>
              {overloaded && <Text style={styles.overloadLabel}>{tt('SOBRECARGA')}</Text>}
            </View>
            <Text style={styles.openArrow}>›</Text>
          </PressableScale>
          </FadeInView>
        );
      })}

      {selectedCharacter && (() => {
        const inventory = selectedCharacter.inventory || [];
        const currentWeight = totalInventoryWeight(inventory);
        const capacity = inventoryCapacity(selectedCharacter);
        const overloaded = currentWeight > capacity;

        return (
          <FadeInView animationKey={`inventory-card-${selectedCharacter.id}`} style={styles.card}>
            <PressableScale
              style={styles.backButton}
              onPress={() => {
                setSelectedCharacterId(null);
                setForm(EMPTY_ITEM);
              }}
            >
              <Text style={styles.backText}>‹ {tt('Todos os personagens')}</Text>
            </PressableScale>
            <View style={styles.cardHeader}>
              <View style={styles.flex}>
                <Text style={styles.cardTitle}>{selectedCharacter.name}</Text>
                <Text style={[styles.weight, overloaded && styles.overloaded]}>
                  {displayWeight(currentWeight, language).toFixed(1)} / {displayWeight(capacity, language)} {weightUnitLabel(language)}
                </Text>
                <Text style={styles.muted}>{inventory.length} {inventory.length === 1 ? tt('item') : tt('itens')} {tt('no inventário')}</Text>
              </View>
              <PressableScale
                style={styles.primary}
                onPress={() => setForm({ ...EMPTY_ITEM, characterId: selectedCharacter.id })}
              >
                <Text style={styles.primaryText}>{tt('Novo item')}</Text>
              </PressableScale>
            </View>

            <View style={styles.coinsPanel}>
              <Text style={styles.itemName}>{tt('Moedas')}</Text>
              <View style={styles.coinGrid}>
                {COIN_FIELDS.map(([coin, label]) => (
                  <View key={coin} style={styles.coinField}>
                    <Text style={styles.label}>{tt(label)}</Text>
                    <TextInput
                      style={styles.coinInput}
                      keyboardType="numeric"
                      value={String(selectedCharacter.coins?.[coin] ?? 0)}
                      onChangeText={(value) => updateCoins(selectedCharacter.id, coin, value)}
                      placeholder="0"
                      placeholderTextColor={colors.textMuted}
                    />
                  </View>
                ))}
              </View>
            </View>

            {!!form.characterId && form.characterId === selectedCharacter.id && (
              <View style={styles.form}>
                <Text style={styles.cardTitle}>{form.id ? tt('Editar item') : tt('Adicionar item')}</Text>
                <PressableScale style={styles.catalogButton} onPress={() => setCatalogOpen(true)}>
                  <Text style={styles.catalogButtonText}>{tt('Escolher no catálogo')}</Text>
                  <Text style={styles.catalogButtonText}>⌕</Text>
                </PressableScale>
                <TextInput
                  style={styles.input}
                  value={form.name}
                  onChangeText={(name) => setForm((old) => ({ ...old, name }))}
                  placeholder={tt('Nome')}
                  placeholderTextColor={colors.textMuted}
                />
                <View style={styles.row}>
                  <Field label={tt('Quantidade')} value={form.quantity} onChangeText={(quantity) => setForm((old) => ({ ...old, quantity }))} />
                  <Field label={tt('Peso (kg)')} value={form.weight} onChangeText={(weight) => setForm((old) => ({ ...old, weight }))} />
                </View>
                <TextInput
                  style={styles.input}
                  value={form.value}
                  onChangeText={(value) => setForm((old) => ({ ...old, value }))}
                  placeholder={tt('Valor (ex.: 10 po)')}
                  placeholderTextColor={colors.textMuted}
                />
                <View style={styles.filterHeader}>
                  <Text style={styles.label}>{tt('Tipo do item')}</Text>
                  <Text style={styles.filterStatus}>{tt('Selecionado: {type}', { type: term(form.category) })}</Text>
                </View>
                <View style={styles.categoryGrid}>
                  {EQUIPMENT_CATEGORIES.filter((category) => category !== 'Todos').map((category) => (
                    <PressableScale
                      key={category}
                      style={[styles.categoryChip, form.category === category && styles.categoryChipActive]}
                      onPress={() => setForm((old) => ({ ...old, category }))}
                    >
                      <Text style={[styles.categoryText, form.category === category && styles.categoryTextActive]}>{term(category)}</Text>
                    </PressableScale>
                  ))}
                </View>
                {form.category === 'Itens Magicos' && (
                  <View style={styles.magicPanel}>
                    <TextInput
                      style={styles.input}
                      value={form.rarity}
                      onChangeText={(rarity) => setForm((old) => ({ ...old, rarity }))}
                      placeholder={tt('Raridade')}
                      placeholderTextColor={colors.textMuted}
                    />
                    <View style={styles.equippedRow}>
                      <Text style={styles.itemName}>{tt('Requer sintonização')}</Text>
                      <Switch
                        value={form.requiresAttunement}
                        onValueChange={(requiresAttunement) => setForm((old) => ({ ...old, requiresAttunement }))}
                        trackColor={{ false: colors.border, true: colors.primaryDark }}
                        thumbColor={form.requiresAttunement ? colors.primary : colors.textMuted}
                      />
                    </View>
                    <View style={styles.equippedRow}>
                      <Text style={styles.itemName}>{tt('Sintonizado')}</Text>
                      <Switch
                        value={form.attuned}
                        onValueChange={(attuned) => setForm((old) => ({ ...old, attuned }))}
                        trackColor={{ false: colors.border, true: colors.primaryDark }}
                        thumbColor={form.attuned ? colors.primary : colors.textMuted}
                      />
                    </View>
                    <View style={styles.row}>
                      <Field label={tt('Cargas atuais')} value={form.charges?.current} onChangeText={(current) => setForm((old) => ({ ...old, charges: { ...old.charges, current } }))} />
                      <Field label={tt('Cargas max.')} value={form.charges?.max} onChangeText={(max) => setForm((old) => ({ ...old, charges: { ...old.charges, max } }))} />
                    </View>
                  </View>
                )}
                <TextInput
                  style={[styles.input, styles.multiline]}
                  value={form.description}
                  onChangeText={(description) => setForm((old) => ({ ...old, description }))}
                  placeholder={tt('Descrição')}
                  placeholderTextColor={colors.textMuted}
                  multiline
                />
                <View style={styles.equippedRow}>
                  <Text style={styles.itemName}>{tt('Equipado')}</Text>
                  <Switch
                    value={form.equipped}
                    onValueChange={(equipped) => setForm((old) => ({ ...old, equipped }))}
                    trackColor={{ false: colors.border, true: colors.primaryDark }}
                    thumbColor={form.equipped ? colors.primary : colors.textMuted}
                  />
                </View>
                <View style={styles.row}>
                  <PressableScale style={styles.secondary} onPress={() => setForm(EMPTY_ITEM)}>
                    <Text style={styles.actionText}>{tt('Cancelar')}</Text>
                  </PressableScale>
                  <PressableScale style={styles.primaryWide} onPress={saveItem}>
                    <Text style={styles.primaryText}>{tt('Salvar item')}</Text>
                  </PressableScale>
                </View>
              </View>
            )}

            {inventory.length === 0 && <Text style={styles.muted}>{tt('Inventário vazio.')}</Text>}

            {inventory.map((item) => (
              <FadeInView key={item.id} animationKey={`${selectedCharacter.id}-${item.id}`} style={styles.item}>
                <View style={styles.flex}>
                  <Text style={styles.itemName}>{item.equipped ? `[${tt('E')}] ` : ''}{localizedItemName(item)}</Text>
                  <Text style={styles.muted}>
                    {tt('{quantity} × {weight} kg = {total} kg', {
                      quantity: item.quantity,
                      weight: displayWeight(item.weight, language),
                      total: displayWeight(item.quantity * item.weight, language).toFixed(1),
                    })}
                  </Text>
                  {!!item.value && <Text style={styles.value}>{localizedItemValue(item)} · {term(item.category || 'Personalizado')}</Text>}
                  {item.category === 'Itens Magicos' && (
                    <Text style={styles.value}>
                      {item.rarity ? localizedItemRarity(item) : tt('Raridade não informada')}
                      {item.requiresAttunement ? ` - ${item.attuned ? tt('sintonizado') : tt('requer sintonização')}` : ''}
                      {item.charges?.max ? ` - ${tt('cargas')} ${item.charges.current}/${item.charges.max}` : ''}
                    </Text>
                  )}
                  {!!item.description && <Text style={styles.description}>{localizedItemDescription(item)}</Text>}
                </View>
                <PressableScale style={styles.action} onPress={() => editItem(selectedCharacter.id, item)}>
                  <Text style={styles.actionText}>{tt('Editar')}</Text>
                </PressableScale>
                <PressableScale style={styles.danger} onPress={() => removeItem(selectedCharacter.id, item.id)}>
                  <Text style={styles.dangerText}>X</Text>
                </PressableScale>
              </FadeInView>
            ))}
          </FadeInView>
        );
      })()}

      <Modal visible={catalogOpen} transparent animationType="slide" onRequestClose={() => setCatalogOpen(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.catalogSheet}>
            <Text style={styles.cardTitle}>{tt('Catálogo de equipamentos')}</Text>
            <TextInput
              style={styles.input}
              value={catalogQuery}
              onChangeText={setCatalogQuery}
              placeholder={tt('Digite para filtrar itens')}
              placeholderTextColor={colors.textMuted}
            />
            <View style={styles.filterHeader}>
              <Text style={styles.label}>{tt('Filtrar por tipo')}</Text>
              <Text style={styles.filterStatus}>{tt('Filtro ativo: {type}', { type: term(catalogCategory) })}</Text>
            </View>
            <View style={styles.categoryGrid}>
              {catalogCategories.map((category) => (
                <PressableScale key={category} style={[styles.categoryChip, catalogCategory === category && styles.categoryChipActive]} onPress={() => setCatalogCategory(category)}>
                  <Text style={[styles.categoryText, catalogCategory === category && styles.categoryTextActive]}>{term(category)}</Text>
                </PressableScale>
              ))}
            </View>
            <Text style={styles.resultHint}>
              {tt('{count} itens encontrados', { count: visibleCatalogItems.length })}
            </Text>
            <ScrollView style={styles.catalogList}>
              {visibleCatalogItems.map((item) => (
                  <PressableScale
                    key={`${item.category}-${item.name}`}
                    style={styles.catalogItem}
                    onPress={() => applyCatalogItem(item)}
                  >
                    <View style={styles.flex}>
                      <Text style={styles.itemName}>{localizedItemName(item)}</Text>
                      <Text style={styles.muted}>{term(item.category)} · {localizedItemValue(item)} · {displayWeight(item.weight, language)} {weightUnitLabel(language)}</Text>
                      <Text style={styles.description}>{localizedItemDescription(item)}</Text>
                    </View>
                  </PressableScale>
                ))}
              {visibleCatalogItems.length === 0 && (
                <PressableScale
                  style={styles.catalogItem}
                  onPress={() => {
                    setForm((old) => ({
                      ...old,
                      catalogKey: '',
                      name: catalogQuery.trim(),
                      category: catalogCategory === 'Todos' ? 'Personalizado' : catalogCategory,
                    }));
                    setCatalogOpen(false);
                  }}
                >
                  <Text style={styles.itemName}>{tt('Criar item personalizado')}</Text>
                  <Text style={styles.muted}>{tt('Usar "{name}" como base e salvar na biblioteca.', { name: catalogQuery.trim() || tt('Novo item') })}</Text>
                </PressableScale>
              )}
            </ScrollView>
            <PressableScale style={styles.secondary} onPress={() => setCatalogOpen(false)}>
              <Text style={styles.actionText}>{tt('Fechar')}</Text>
            </PressableScale>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function Field({ label, ...props }) {
  return (
    <View style={styles.flex}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} keyboardType="numeric" {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: 64 },
  loading: { flex: 1, color: colors.text, backgroundColor: colors.background, padding: spacing.lg },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 28, fontWeight: '900', marginTop: 6 },
  subtitle: { color: colors.textMuted, lineHeight: 20, marginTop: 6, marginBottom: spacing.lg },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.md },
  characterSummary: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.md },
  avatar: { width: 46, height: 46, borderRadius: 15, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  avatarOverloaded: { backgroundColor: colors.dangerSoft },
  avatarText: { color: colors.text, fontSize: 19, fontWeight: '900' },
  openArrow: { color: colors.primary, fontSize: 30, fontWeight: '900' },
  overloadLabel: { color: colors.danger, fontSize: 9, fontWeight: '900', letterSpacing: 1, marginTop: 3 },
  backButton: { alignSelf: 'flex-start', marginBottom: spacing.md, paddingVertical: 4 },
  backText: { color: colors.primary, fontWeight: '900' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '900' },
  weight: { color: colors.success, fontWeight: '800', marginTop: 3 },
  overloaded: { color: colors.danger },
  muted: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  item: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, borderTopColor: colors.border, borderTopWidth: 1, paddingTop: spacing.md, marginTop: spacing.md },
  itemName: { color: colors.text, fontWeight: '800' },
  description: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  value: { color: colors.primary, fontSize: 11, fontWeight: '800', marginTop: 3 },
  flex: { flex: 1 },
  primary: { backgroundColor: colors.primary, borderRadius: radii.md, padding: 10 },
  primaryWide: { flex: 1, backgroundColor: colors.primary, borderRadius: radii.md, alignItems: 'center', padding: 12 },
  primaryText: { color: colors.background, fontWeight: '900' },
  action: { borderColor: colors.border, borderWidth: 1, borderRadius: radii.sm, padding: 9 },
  actionText: { color: colors.text, fontWeight: '800' },
  danger: { borderColor: '#5B2B2B', borderWidth: 1, borderRadius: radii.sm, padding: 9 },
  dangerText: { color: '#FFB0B0', fontWeight: '900' },
  form: { backgroundColor: colors.surfaceMuted, borderColor: colors.primaryDark, borderWidth: 1, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.md },
  input: { backgroundColor: colors.surfaceMuted, borderRadius: radii.md, color: colors.text, padding: 12, marginTop: spacing.sm },
  multiline: { minHeight: 72, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  label: { color: colors.textMuted, fontSize: 11, marginTop: spacing.md },
  filterHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: spacing.sm, marginTop: spacing.sm },
  filterStatus: { color: colors.primary, fontSize: 11, fontWeight: '900', flexShrink: 1, textAlign: 'right' },
  resultHint: { color: colors.textMuted, fontSize: 11, fontWeight: '800', marginBottom: spacing.sm },
  equippedRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: spacing.md },
  secondary: { flex: 1, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', padding: 12 },
  coinsPanel: { backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, marginBottom: spacing.md, padding: spacing.md },
  coinGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  coinField: { width: '18%' },
  coinInput: { backgroundColor: colors.surface, borderRadius: radii.sm, color: colors.text, marginTop: 4, padding: 9, textAlign: 'center' },
  magicPanel: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, marginTop: spacing.sm, padding: spacing.md },
  catalogButton: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.primarySoft, borderColor: colors.primaryDark, borderWidth: 1, borderRadius: radii.md, marginTop: spacing.md, padding: 13 },
  catalogButtonText: { color: colors.primary, fontWeight: '900' },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.78)', justifyContent: 'flex-end' },
  catalogSheet: { flexShrink: 1, backgroundColor: colors.surface, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, padding: spacing.lg, overflow: 'hidden' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, paddingVertical: spacing.md },
  categoryChip: { backgroundColor: colors.surfaceHighlight, borderColor: colors.borderStrong, borderWidth: 1, borderRadius: radii.pill, minWidth: 118, alignItems: 'center', paddingHorizontal: 16, paddingVertical: 11 },
  categoryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryText: { color: colors.text, fontSize: 13, fontWeight: '900', textAlign: 'center' },
  categoryTextActive: { color: colors.background },
  catalogList: { marginBottom: spacing.md },
  catalogItem: { borderTopColor: colors.border, borderTopWidth: 1, paddingVertical: spacing.md },
});
