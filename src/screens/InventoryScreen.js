import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCampaign } from '../services/CampaignContext';
import {
  inventoryCapacity,
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
  equipped: false,
  description: '',
};

export default function InventoryScreen() {
  const { state, setState } = useCampaign();
  const [form, setForm] = useState(EMPTY_ITEM);
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

  function saveItem() {
    if (!form.characterId || !form.name.trim()) return;
    setState((old) => ({
      ...old,
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

      {characters.map((character) => {
        const inventory = character.inventory || [];
        const currentWeight = totalInventoryWeight(inventory);
        const capacity = inventoryCapacity(character);
        const overloaded = currentWeight > capacity;

        return (
          <View key={character.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.flex}>
                <Text style={styles.cardTitle}>{character.name}</Text>
                <Text style={[styles.weight, overloaded && styles.overloaded]}>
                  {currentWeight.toFixed(1)} / {capacity} kg
                </Text>
              </View>
              <TouchableOpacity
                style={styles.primary}
                onPress={() => setForm({ ...EMPTY_ITEM, characterId: character.id })}
              >
                <Text style={styles.primaryText}>Novo item</Text>
              </TouchableOpacity>
            </View>

            {inventory.length === 0 && <Text style={styles.muted}>Inventario vazio.</Text>}

            {inventory.map((item) => (
              <View key={item.id} style={styles.item}>
                <View style={styles.flex}>
                  <Text style={styles.itemName}>{item.equipped ? '[E] ' : ''}{item.name}</Text>
                  <Text style={styles.muted}>
                    {item.quantity} × {item.weight} kg = {(item.quantity * item.weight).toFixed(1)} kg
                  </Text>
                  {!!item.description && <Text style={styles.description}>{item.description}</Text>}
                </View>
                <TouchableOpacity style={styles.action} onPress={() => editItem(character.id, item)}>
                  <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.danger} onPress={() => removeItem(character.id, item.id)}>
                  <Text style={styles.dangerText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );
      })}

      {!!form.characterId && activeCharacterIds.has(form.characterId) && (
        <View style={styles.form}>
          <Text style={styles.cardTitle}>{form.id ? 'Editar item' : 'Adicionar item'}</Text>
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
            style={[styles.input, styles.multiline]}
            value={form.description}
            onChangeText={(description) => setForm((old) => ({ ...old, description }))}
            placeholder="Descricao"
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
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '900' },
  weight: { color: colors.success, fontWeight: '800', marginTop: 3 },
  overloaded: { color: colors.danger },
  muted: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  item: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, borderTopColor: colors.border, borderTopWidth: 1, paddingTop: spacing.md, marginTop: spacing.md },
  itemName: { color: colors.text, fontWeight: '800' },
  description: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  flex: { flex: 1 },
  primary: { backgroundColor: colors.primary, borderRadius: radii.md, padding: 10 },
  primaryWide: { flex: 1, backgroundColor: colors.primary, borderRadius: radii.md, alignItems: 'center', padding: 12 },
  primaryText: { color: colors.background, fontWeight: '900' },
  action: { borderColor: colors.border, borderWidth: 1, borderRadius: radii.sm, padding: 9 },
  actionText: { color: colors.text, fontWeight: '800' },
  danger: { borderColor: '#5B2B2B', borderWidth: 1, borderRadius: radii.sm, padding: 9 },
  dangerText: { color: '#FFB0B0', fontWeight: '900' },
  form: { backgroundColor: colors.surface, borderColor: colors.primaryDark, borderWidth: 1, borderRadius: radii.lg, padding: spacing.lg, marginTop: spacing.md },
  input: { backgroundColor: colors.surfaceMuted, borderRadius: radii.md, color: colors.text, padding: 12, marginTop: spacing.sm },
  multiline: { minHeight: 72, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  label: { color: colors.textMuted, fontSize: 11, marginTop: spacing.md },
  equippedRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: spacing.md },
  secondary: { flex: 1, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', padding: 12 },
});
