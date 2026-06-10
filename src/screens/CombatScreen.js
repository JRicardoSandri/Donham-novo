import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loadCampaignState, saveCampaignState } from '../services/campaignService';
import {
  advanceTurn,
  applyHpChange,
  createCombat,
  enemyParticipant,
  heroParticipant,
  sortedParticipants,
} from '../services/combatService';
import { colors, radii, spacing } from '../theme';

const EMPTY_ENEMY = { name: '', hpMax: '10', armorClass: '10', initiative: '0' };

export default function CombatScreen() {
  const [state, setState] = useState(null);
  const [enemy, setEnemy] = useState(EMPTY_ENEMY);

  useEffect(() => {
    loadCampaignState().then((saved) =>
      setState({ ...saved, combats: saved.combats?.length ? saved.combats : [createCombat()] })
    );
  }, []);

  useEffect(() => {
    if (state) saveCampaignState(state);
  }, [state]);

  const combat = state?.combats?.[0] || createCombat();

  function setCombat(updater) {
    setState((old) => ({ ...old, combats: [updater(old.combats?.[0] || createCombat())] }));
  }

  function addHeroes() {
    setCombat((old) => {
      const existing = new Set(old.participants.map((item) => item.sourceId));
      const heroes = state.characters.filter((character) => !existing.has(character.id)).map(heroParticipant);
      return { ...old, participants: sortedParticipants([...old.participants, ...heroes]), activeIndex: 0 };
    });
  }

  function addEnemy() {
    if (!enemy.name.trim()) return;
    setCombat((old) => ({
      ...old,
      participants: sortedParticipants([...old.participants, enemyParticipant(enemy)]),
      activeIndex: 0,
    }));
    setEnemy(EMPTY_ENEMY);
  }

  function patchParticipant(id, patch) {
    setCombat((old) => ({
      ...old,
      participants: sortedParticipants(old.participants.map((item) => item.id === id ? { ...item, ...patch } : item)),
      activeIndex: 0,
    }));
  }

  function changeHp(id, delta) {
    setCombat((old) => ({
      ...old,
      participants: old.participants.map((item) =>
        item.id === id ? { ...item, hp: applyHpChange(item.hp, delta) } : item
      ),
    }));
  }

  if (!state) return <Text style={styles.loading}>Carregando combate...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>COMBATE</Text>
          <Text style={styles.title}>Rodada {combat.round}</Text>
        </View>
        <TouchableOpacity style={styles.primary} onPress={() => setCombat(advanceTurn)}>
          <Text style={styles.primaryText}>Proximo turno</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.secondary} onPress={addHeroes}>
        <Text style={styles.secondaryText}>Adicionar personagens do grupo</Text>
      </TouchableOpacity>

      <View style={styles.enemyForm}>
        <Text style={styles.cardTitle}>Adicionar inimigo</Text>
        <TextInput style={styles.input} value={enemy.name} onChangeText={(name) => setEnemy((old) => ({ ...old, name }))} placeholder="Nome" placeholderTextColor={colors.textMuted} />
        <View style={styles.row}>
          <SmallField label="PV" value={enemy.hpMax} onChangeText={(hpMax) => setEnemy((old) => ({ ...old, hpMax }))} />
          <SmallField label="CA" value={enemy.armorClass} onChangeText={(armorClass) => setEnemy((old) => ({ ...old, armorClass }))} />
          <SmallField label="Iniciativa" value={enemy.initiative} onChangeText={(initiative) => setEnemy((old) => ({ ...old, initiative }))} />
        </View>
        <TouchableOpacity style={styles.primary} onPress={addEnemy}><Text style={styles.primaryText}>Adicionar</Text></TouchableOpacity>
      </View>

      {combat.participants.map((participant, index) => (
        <View key={participant.id} style={[styles.card, index === combat.activeIndex && styles.active]}>
          <Text style={styles.cardTitle}>{index === combat.activeIndex ? '> ' : ''}{participant.name}</Text>
          <Text style={styles.muted}>{participant.type === 'enemy' ? 'Inimigo' : 'Personagem'} | CA {participant.armorClass}</Text>
          <View style={styles.row}>
            <SmallField label="Iniciativa" value={String(participant.initiative)} onChangeText={(initiative) => patchParticipant(participant.id, { initiative: Number(initiative) || 0 })} />
            <View style={styles.hpSummary}>
              <Text style={styles.hp}>PV {participant.hp.current}/{participant.hp.max}</Text>
              <Text style={styles.muted}>Temporario {participant.hp.temporary || 0}</Text>
            </View>
          </View>
          <View style={styles.quickRow}>
            {[-10, -5, -1, 1, 5, 10].map((value) => (
              <TouchableOpacity key={value} style={styles.quick} onPress={() => changeHp(participant.id, value)}>
                <Text style={styles.quickText}>{value > 0 ? `+${value}` : value}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.quickRow}>
            {[1, 5, 10].map((value) => (
              <TouchableOpacity key={`temp-${value}`} style={styles.quick} onPress={() => patchParticipant(participant.id, { hp: { ...participant.hp, temporary: (participant.hp.temporary || 0) + value } })}>
                <Text style={styles.quickText}>+{value} Temp</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.danger} onPress={() => setCombat((old) => ({ ...old, participants: old.participants.filter((item) => item.id !== participant.id), activeIndex: 0 }))}>
              <Text style={styles.dangerText}>Remover</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function SmallField({ label, ...props }) {
  return (
    <View style={styles.smallField}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.smallInput} keyboardType="numeric" {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: 48 },
  loading: { flex: 1, color: colors.text, backgroundColor: colors.background, padding: spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 28, fontWeight: '900' },
  primary: { backgroundColor: colors.primary, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center', padding: 12 },
  primaryText: { color: colors.background, fontWeight: '900' },
  secondary: { borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', padding: 12, marginBottom: spacing.md },
  secondaryText: { color: colors.text, fontWeight: '800' },
  enemyForm: { backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.lg },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.md },
  active: { borderColor: colors.primary, borderWidth: 2 },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '900' },
  muted: { color: colors.textMuted, fontSize: 12 },
  input: { backgroundColor: colors.surfaceMuted, borderRadius: radii.md, color: colors.text, padding: 12, marginVertical: spacing.sm },
  row: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  smallField: { flex: 1 },
  label: { color: colors.textMuted, fontSize: 10, marginTop: spacing.sm },
  smallInput: { backgroundColor: colors.surfaceMuted, borderRadius: radii.sm, color: colors.text, textAlign: 'center', padding: 10 },
  hpSummary: { flex: 2, alignItems: 'center', marginTop: spacing.sm },
  hp: { color: colors.text, fontWeight: '900' },
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  quick: { backgroundColor: colors.surfaceMuted, borderRadius: radii.sm, paddingHorizontal: 11, paddingVertical: 9 },
  quickText: { color: colors.text, fontWeight: '800', fontSize: 11 },
  danger: { borderColor: '#5B2B2B', borderWidth: 1, borderRadius: radii.sm, paddingHorizontal: 11, paddingVertical: 9 },
  dangerText: { color: '#FFB0B0', fontWeight: '800', fontSize: 11 },
});
