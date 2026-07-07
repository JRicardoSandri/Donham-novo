import React, { useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { EQUIPMENT_CATALOG, EQUIPMENT_CATEGORIES } from '../data/equipmentCatalog';
import { useCampaign } from '../services/CampaignContext';
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

export default function InventoryScreen() {
  const { state, setState } = useCampaign();
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
  const catalogItems = useMemo(
    () => [...EQUIPMENT_CATALOG, ...(state?.customItems || [])],
    [state?.customItems]
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
      .filter((item) => `${item.name} ${item.description} ${item.rarity || ''}`.toLowerCase().includes(catalogQuery.trim().toLowerCase())),
    [catalogItems, catalogCategory, catalogQuery]
  );

  function saveItem() {
    if (!form.characterId || !form.name.trim()) return;
    const libraryItem = {
      ...form,
      source: 'custom',
      quantity: 1,
      equipped: false,
      attuned: false,
    };
    setState((old) => ({
      ...old,
      customItems: catalogItems.some((item) => item.name.trim().toLowerCase() === form.name.trim().toLowerCase())
        ? old.customItems || []
        : [...(old.customItems || []), libraryItem],
      characters: old.characters.map((character) =>
        character.id === form.characterId
          ? { ...character, inventory: upsertInventoryItem(character.inventory, form) }
          : character
      ),
    }));
    setForm(EMPTY_ITEM);
  }

  function editItem(characterId, item) {
    setForm({
      ...item,
      characterId,
      quantity: String(item.quantity),
      weight: String(item.weight),
      value: String(item.value || ''),
      category: item.category || 'Personalizado',
      rarity: String(item.rarity || ''),
      requiresAttunement: Boolean(item.requiresAttunement),
      attuned: Boolean(item.attuned),
      charges: {
        current: String(item.charges?.current ?? 0),
        max: String(item.charges?.max ?? 0),
      },
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

  if (!state) return <Text style={styles.loading}>Carregando inventario...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>INVENTARIO</Text>
      <Text style={styles.title}>Equipamento e carga</Text>
      <Text style={styles.subtitle}>A capacidade usa Força × 7,5 kg para porte Médio e × 15 kg para porte Grande.</Text>

      {characters.length === 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nenhum personagem criado</Text>
          <Text style={styles.muted}>Crie um personagem na aba Grupos para montar o inventario.</Text>
        </View>
      )}

      {!selectedCharacter && characters.map((character) => {
        const inventory = character.inventory || [];
        const currentWeight = totalInventoryWeight(inventory);
        const capacity = inventoryCapacity(character);
        const overloaded = currentWeight > capacity;

        return (
          <TouchableOpacity
            key={character.id}
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
                {currentWeight.toFixed(1)} / {capacity} kg · {inventory.length} {inventory.length === 1 ? 'item' : 'itens'}
              </Text>
              {overloaded && <Text style={styles.overloadLabel}>SOBRECARGA</Text>}
            </View>
            <Text style={styles.openArrow}>›</Text>
          </TouchableOpacity>
        );
      })}

      {selectedCharacter && (() => {
        const inventory = selectedCharacter.inventory || [];
        const currentWeight = totalInventoryWeight(inventory);
        const capacity = inventoryCapacity(selectedCharacter);
        const overloaded = currentWeight > capacity;

        return (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setSelectedCharacterId(null);
                setForm(EMPTY_ITEM);
              }}
            >
              <Text style={styles.backText}>‹ Todos os personagens</Text>
            </TouchableOpacity>
            <View style={styles.cardHeader}>
              <View style={styles.flex}>
                <Text style={styles.cardTitle}>{selectedCharacter.name}</Text>
                <Text style={[styles.weight, overloaded && styles.overloaded]}>
                  {currentWeight.toFixed(1)} / {capacity} kg
                </Text>
                <Text style={styles.muted}>{inventory.length} {inventory.length === 1 ? 'item' : 'itens'} no inventário</Text>
              </View>
              <TouchableOpacity
                style={styles.primary}
                onPress={() => setForm({ ...EMPTY_ITEM, characterId: selectedCharacter.id })}
              >
                <Text style={styles.primaryText}>Novo item</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.coinsPanel}>
              <Text style={styles.itemName}>Moedas</Text>
              <View style={styles.coinGrid}>
                {COIN_FIELDS.map(([coin, label]) => (
                  <View key={coin} style={styles.coinField}>
                    <Text style={styles.label}>{label}</Text>
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
                <Text style={styles.cardTitle}>{form.id ? 'Editar item' : 'Adicionar item'}</Text>
                <TouchableOpacity style={styles.catalogButton} onPress={() => setCatalogOpen(true)}>
                  <Text style={styles.catalogButtonText}>Escolher no catálogo</Text>
                  <Text style={styles.catalogButtonText}>⌕</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  value={form.name}
                  onChangeText={(name) => setForm((old) => ({ ...old, name }))}
                  placeholder="Nome"
                  placeholderTextColor={colors.textMuted}
                />
                <View style={styles.row}>
                  <Field label="Quantidade" value={form.quantity} onChangeText={(quantity) => setForm((old) => ({ ...old, quantity }))} />
                  <Field label="Peso (kg)" value={form.weight} onChangeText={(weight) => setForm((old) => ({ ...old, weight }))} />
                </View>
                <TextInput
                  style={styles.input}
                  value={form.value}
                  onChangeText={(value) => setForm((old) => ({ ...old, value }))}
                  placeholder="Valor (ex.: 10 po)"
                  placeholderTextColor={colors.textMuted}
                />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryStrip}>
                  {EQUIPMENT_CATEGORIES.filter((category) => category !== 'Todos').map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[styles.categoryChip, form.category === category && styles.categoryChipActive]}
                      onPress={() => setForm((old) => ({ ...old, category }))}
                    >
                      <Text style={[styles.categoryText, form.category === category && styles.categoryTextActive]}>{category}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {form.category === 'Itens Magicos' && (
                  <View style={styles.magicPanel}>
                    <TextInput
                      style={styles.input}
                      value={form.rarity}
                      onChangeText={(rarity) => setForm((old) => ({ ...old, rarity }))}
                      placeholder="Raridade"
                      placeholderTextColor={colors.textMuted}
                    />
                    <View style={styles.equippedRow}>
                      <Text style={styles.itemName}>Requer sintonizacao</Text>
                      <Switch
                        value={form.requiresAttunement}
                        onValueChange={(requiresAttunement) => setForm((old) => ({ ...old, requiresAttunement }))}
                        trackColor={{ false: colors.border, true: colors.primaryDark }}
                        thumbColor={form.requiresAttunement ? colors.primary : colors.textMuted}
                      />
                    </View>
                    <View style={styles.equippedRow}>
                      <Text style={styles.itemName}>Sintonizado</Text>
                      <Switch
                        value={form.attuned}
                        onValueChange={(attuned) => setForm((old) => ({ ...old, attuned }))}
                        trackColor={{ false: colors.border, true: colors.primaryDark }}
                        thumbColor={form.attuned ? colors.primary : colors.textMuted}
                      />
                    </View>
                    <View style={styles.row}>
                      <Field label="Cargas atuais" value={form.charges?.current} onChangeText={(current) => setForm((old) => ({ ...old, charges: { ...old.charges, current } }))} />
                      <Field label="Cargas max." value={form.charges?.max} onChangeText={(max) => setForm((old) => ({ ...old, charges: { ...old.charges, max } }))} />
                    </View>
                  </View>
                )}
                <TextInput
                  style={[styles.input, styles.multiline]}
                  value={form.description}
                  onChangeText={(description) => setForm((old) => ({ ...old, description }))}
                  placeholder="Descrição"
                  placeholderTextColor={colors.textMuted}
                  multiline
                />
                <View style={styles.equippedRow}>
                  <Text style={styles.itemName}>Equipado</Text>
                  <Switch
                    value={form.equipped}
                    onValueChange={(equipped) => setForm((old) => ({ ...old, equipped }))}
                    trackColor={{ false: colors.border, true: colors.primaryDark }}
                    thumbColor={form.equipped ? colors.primary : colors.textMuted}
                  />
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.secondary} onPress={() => setForm(EMPTY_ITEM)}>
                    <Text style={styles.actionText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryWide} onPress={saveItem}>
                    <Text style={styles.primaryText}>Salvar item</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {inventory.length === 0 && <Text style={styles.muted}>Inventario vazio.</Text>}

            {inventory.map((item) => (
              <View key={item.id} style={styles.item}>
                <View style={styles.flex}>
                  <Text style={styles.itemName}>{item.equipped ? '[E] ' : ''}{item.name}</Text>
                  <Text style={styles.muted}>
                    {item.quantity} × {item.weight} kg = {(item.quantity * item.weight).toFixed(1)} kg
                  </Text>
                  {!!item.value && <Text style={styles.value}>{item.value} · {item.category || 'Personalizado'}</Text>}
                  {item.category === 'Itens Magicos' && (
                    <Text style={styles.value}>
                      {item.rarity || 'Raridade nao informada'}
                      {item.requiresAttunement ? ` - ${item.attuned ? 'sintonizado' : 'requer sintonizacao'}` : ''}
                      {item.charges?.max ? ` - cargas ${item.charges.current}/${item.charges.max}` : ''}
                    </Text>
                  )}
                  {!!item.description && <Text style={styles.description}>{item.description}</Text>}
                </View>
                <TouchableOpacity style={styles.action} onPress={() => editItem(selectedCharacter.id, item)}>
                  <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.danger} onPress={() => removeItem(selectedCharacter.id, item.id)}>
                  <Text style={styles.dangerText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );
      })()}

      <Modal visible={catalogOpen} transparent animationType="slide" onRequestClose={() => setCatalogOpen(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.catalogSheet}>
            <Text style={styles.cardTitle}>Catálogo de equipamentos</Text>
            <TextInput
              style={styles.input}
              value={catalogQuery}
              onChangeText={setCatalogQuery}
              placeholder="Digite para filtrar itens"
              placeholderTextColor={colors.textMuted}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryStrip}>
              {catalogCategories.map((category) => (
                <TouchableOpacity key={category} style={[styles.categoryChip, catalogCategory === category && styles.categoryChipActive]} onPress={() => setCatalogCategory(category)}>
                  <Text style={[styles.categoryText, catalogCategory === category && styles.categoryTextActive]}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <ScrollView style={styles.catalogList}>
              {visibleCatalogItems.map((item) => (
                  <TouchableOpacity
                    key={`${item.category}-${item.name}`}
                    style={styles.catalogItem}
                    onPress={() => {
                      setForm((old) => ({
                        ...old,
                        name: item.name,
                        weight: String(item.weight),
                        value: item.value,
                        category: item.category,
                        rarity: item.rarity || '',
                        requiresAttunement: Boolean(item.requiresAttunement),
                        attuned: Boolean(item.attuned),
                        charges: {
                          current: String(item.charges?.current ?? 0),
                          max: String(item.charges?.max ?? 0),
                        },
                        description: item.description,
                      }));
                      setCatalogOpen(false);
                      setCatalogQuery('');
                    }}
                  >
                    <View style={styles.flex}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.muted}>{item.category} · {item.value} · {item.weight} kg</Text>
                      <Text style={styles.description}>{item.description}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              {visibleCatalogItems.length === 0 && (
                <TouchableOpacity
                  style={styles.catalogItem}
                  onPress={() => {
                    setForm((old) => ({
                      ...old,
                      name: catalogQuery.trim(),
                      category: catalogCategory === 'Todos' ? 'Personalizado' : catalogCategory,
                    }));
                    setCatalogOpen(false);
                  }}
                >
                  <Text style={styles.itemName}>Criar item personalizado</Text>
                  <Text style={styles.muted}>Usar "{catalogQuery.trim() || 'Novo item'}" como base e salvar na biblioteca.</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
            <TouchableOpacity style={styles.secondary} onPress={() => setCatalogOpen(false)}>
              <Text style={styles.actionText}>Fechar</Text>
            </TouchableOpacity>
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
  catalogSheet: { maxHeight: '90%', backgroundColor: colors.surface, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, padding: spacing.lg },
  categoryStrip: { gap: spacing.sm, paddingVertical: spacing.md },
  categoryChip: { borderColor: colors.border, borderWidth: 1, borderRadius: radii.pill, paddingHorizontal: 13, paddingVertical: 8 },
  categoryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryText: { color: colors.textMuted, fontWeight: '800' },
  categoryTextActive: { color: colors.background },
  catalogList: { marginBottom: spacing.md },
  catalogItem: { borderTopColor: colors.border, borderTopWidth: 1, paddingVertical: spacing.md },
});
