import React, { useEffect, useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CONDITIONS } from '../data/conditions';
import { loadCampaignState, saveCampaignState } from '../services/campaignService';
import {
  advanceTurn,
  applyParticipantHp,
  createCombat,
  enemyParticipant,
  heroParticipant,
  recordDeathSave,
  sortedParticipants,
  stabilizeParticipant,
  toggleCondition,
} from '../services/combatService';
import { colors, radii, shadows, spacing } from '../theme';

const EMPTY_ENEMY = { name: '', hpMax: '10', armorClass: '10', initiative: '0' };

export default function CombatScreen() {
  const [state, setState] = useState(null);
  const [enemy, setEnemy] = useState(EMPTY_ENEMY);
  const [conditionTarget, setConditionTarget] = useState(null);

  useEffect(() => {
    loadCampaignState().then((saved) =>
      setState({ ...saved, combats: saved.combats?.length ? saved.combats : [createCombat()] })
    );
  }, []);

  useEffect(() => {
    if (state) saveCampaignState(state);
  }, [state]);

  const combat = state?.combats?.[0] || createCombat();
  const activeParticipant = combat.participants[combat.activeIndex];
  const conditionParticipant = useMemo(
    () => combat.participants.find((item) => item.id === conditionTarget),
    [combat.participants, conditionTarget]
  );

  function setCombat(updater) {
    setState((old) => ({ ...old, combats: [updater(old.combats?.[0] || createCombat())] }));
  }

  function updateParticipant(id, updater) {
    setCombat((old) => ({
      ...old,
      participants: old.participants.map((item) => item.id === id ? updater(item) : item),
    }));
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

  function changeInitiative(id, initiative) {
    setCombat((old) => ({
      ...old,
      participants: sortedParticipants(old.participants.map((item) =>
        item.id === id ? { ...item, initiative: Number(initiative) || 0 } : item
      )),
      activeIndex: 0,
    }));
  }

  if (!state) return <Text style={styles.loading}>Carregando combate...</Text>;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>ENCONTRO ATIVO</Text>
          <View style={styles.heroRow}>
            <View style={styles.flex}>
              <Text style={styles.title}>Rodada {combat.round}</Text>
              <Text style={styles.subtitle}>
                {activeParticipant ? `Turno de ${activeParticipant.name}` : 'Adicione participantes para comecar'}
              </Text>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={() => setCombat(advanceTurn)}>
              <Text style={styles.nextLabel}>PROXIMO</Text>
              <Text style={styles.nextArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.secondary} onPress={addHeroes}>
            <Text style={styles.secondaryText}>+ Personagens</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondary} onPress={() => setCombat(() => createCombat())}>
            <Text style={styles.secondaryText}>Novo combate</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.enemyForm}>
          <Text style={styles.sectionTitle}>Adicionar inimigo</Text>
          <TextInput style={styles.input} value={enemy.name} onChangeText={(name) => setEnemy((old) => ({ ...old, name }))} placeholder="Nome do inimigo" placeholderTextColor={colors.textMuted} />
          <View style={styles.row}>
            <SmallField label="PV" value={enemy.hpMax} onChangeText={(hpMax) => setEnemy((old) => ({ ...old, hpMax }))} />
            <SmallField label="CA" value={enemy.armorClass} onChangeText={(armorClass) => setEnemy((old) => ({ ...old, armorClass }))} />
            <SmallField label="INICIATIVA" value={enemy.initiative} onChangeText={(initiative) => setEnemy((old) => ({ ...old, initiative }))} />
          </View>
          <TouchableOpacity style={styles.addEnemy} onPress={addEnemy}>
            <Text style={styles.primaryText}>Adicionar ao encontro</Text>
          </TouchableOpacity>
        </View>

        {combat.participants.map((participant, index) => {
          const active = index === combat.activeIndex;
          const atZero = participant.hp.current === 0 && participant.type === 'hero';
          return (
            <View key={participant.id} style={[styles.card, active && styles.activeCard]}>
              <View style={styles.cardHeader}>
                <View style={[styles.avatar, participant.type === 'enemy' && styles.enemyAvatar]}>
                  <Text style={styles.avatarText}>{participant.name.slice(0, 1).toUpperCase()}</Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>{participant.name}</Text>
                  <Text style={styles.muted}>
                    {participant.type === 'enemy' ? 'Inimigo' : 'Personagem'} · CA {participant.armorClass}
                  </Text>
                </View>
                <View style={styles.initiativeBox}>
                  <Text style={styles.miniLabel}>INIT</Text>
                  <TextInput style={styles.initiativeInput} keyboardType="numeric" value={String(participant.initiative)} onChangeText={(value) => changeInitiative(participant.id, value)} />
                </View>
              </View>

              <View style={styles.hpBlock}>
                <View style={styles.hpHeader}>
                  <Text style={styles.hpValue}>{participant.hp.current} / {participant.hp.max} PV</Text>
                  <Text style={styles.tempValue}>+{participant.hp.temporary || 0} temporarios</Text>
                </View>
                <View style={styles.hpTrack}>
                  <View style={[styles.hpFill, {
                    width: `${Math.max(0, Math.min(100, (participant.hp.current / participant.hp.max) * 100))}%`,
                    backgroundColor: participant.hp.current <= participant.hp.max / 4 ? colors.danger : colors.success,
                  }]} />
                </View>
              </View>

              {participant.concentrationDc && (
                <View style={styles.concentrationAlert}>
                  <Text style={styles.concentrationText}>Concentracao: teste de CON CD {participant.concentrationDc}</Text>
                  <TouchableOpacity onPress={() => updateParticipant(participant.id, (item) => ({ ...item, concentrationDc: null }))}>
                    <Text style={styles.resolveText}>Resolver</Text>
                  </TouchableOpacity>
                </View>
              )}

              {(participant.conditions || []).length > 0 && (
                <View style={styles.conditionList}>
                  {participant.conditions.map((id) => (
                    <View key={id} style={styles.conditionBadge}>
                      <Text style={styles.conditionBadgeText}>{CONDITIONS.find((condition) => condition.id === id)?.name || id}</Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.quickRow}>
                {[-10, -5, -1, 1, 5, 10].map((value) => (
                  <TouchableOpacity key={value} style={[styles.quick, value < 0 ? styles.damageQuick : styles.healQuick]} onPress={() => updateParticipant(participant.id, (item) => applyParticipantHp(item, value))}>
                    <Text style={styles.quickText}>{value > 0 ? `+${value}` : value}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {atZero && (
                <View style={styles.deathPanel}>
                  <Text style={styles.deathTitle}>
                    {participant.deathSaves?.dead ? 'Morto' : participant.deathSaves?.stable ? 'Estavel' : 'Testes contra a morte'}
                  </Text>
                  <Text style={styles.muted}>Sucessos {participant.deathSaves?.successes || 0}/3 · Falhas {participant.deathSaves?.failures || 0}/3</Text>
                  <View style={styles.quickRow}>
                    {[1, 5, 10, 20].map((roll) => (
                      <TouchableOpacity key={roll} style={styles.deathRoll} onPress={() => updateParticipant(participant.id, (item) => recordDeathSave(item, roll))}>
                        <Text style={styles.quickText}>d20: {roll}</Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.stabilize} onPress={() => updateParticipant(participant.id, stabilizeParticipant)}>
                      <Text style={styles.stabilizeText}>Estabilizar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => setConditionTarget(participant.id)}>
                  <Text style={styles.actionText}>Condicoes</Text>
                </TouchableOpacity>
                {[1, 5, 10].map((value) => (
                  <TouchableOpacity key={`temp-${value}`} style={styles.actionButton} onPress={() => updateParticipant(participant.id, (item) => ({ ...item, hp: { ...item.hp, temporary: Math.max(item.hp.temporary || 0, value) } }))}>
                    <Text style={styles.actionText}>Temp {value}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.removeButton} onPress={() => setCombat((old) => ({ ...old, participants: old.participants.filter((item) => item.id !== participant.id), activeIndex: 0 }))}>
                  <Text style={styles.removeText}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <ConditionModal participant={conditionParticipant} onToggle={(conditionId) => updateParticipant(conditionTarget, (item) => toggleCondition(item, conditionId))} onClose={() => setConditionTarget(null)} />
    </View>
  );
}

function ConditionModal({ participant, onToggle, onClose }) {
  return (
    <Modal visible={Boolean(participant)} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.conditionSheet}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sectionTitle}>Condicoes de {participant?.name}</Text>
          <Text style={styles.subtitle}>Toque para aplicar ou remover. Condicoes incapacitantes encerram concentracao.</Text>
          <ScrollView>
            {CONDITIONS.map((condition) => {
              const selected = participant?.conditions?.includes(condition.id);
              return (
                <TouchableOpacity key={condition.id} style={[styles.conditionOption, selected && styles.conditionOptionActive]} onPress={() => onToggle(condition.id)}>
                  <View style={styles.flex}>
                    <Text style={[styles.conditionName, selected && styles.conditionNameActive]}>{condition.name}</Text>
                    <Text style={styles.muted}>{condition.summary}</Text>
                  </View>
                  <Text style={[styles.check, selected && styles.checkActive]}>{selected ? '✓' : '+'}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.primaryText}>Concluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function SmallField({ label, ...props }) {
  return (
    <View style={styles.smallField}>
      <Text style={styles.miniLabel}>{label}</Text>
      <TextInput style={styles.smallInput} keyboardType="numeric" {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: 64 },
  loading: { flex: 1, color: colors.text, backgroundColor: colors.background, padding: spacing.lg },
  hero: { backgroundColor: colors.surfaceHighlight, borderColor: colors.borderStrong, borderWidth: 1, borderRadius: radii.xl, padding: spacing.xl, ...shadows.card },
  heroRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  eyebrow: { color: colors.primary, fontSize: 11, fontWeight: '900', letterSpacing: 2.2 },
  title: { color: colors.text, fontSize: 30, fontWeight: '900' },
  subtitle: { color: colors.textMuted, lineHeight: 19, marginTop: 4 },
  nextButton: { width: 76, height: 76, backgroundColor: colors.primary, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  nextLabel: { color: colors.background, fontSize: 9, fontWeight: '900' },
  nextArrow: { color: colors.background, fontSize: 32, lineHeight: 32 },
  flex: { flex: 1 },
  toolbar: { flexDirection: 'row', gap: spacing.sm, marginVertical: spacing.md },
  secondary: { flex: 1, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', padding: 12 },
  secondaryText: { color: colors.text, fontWeight: '800' },
  enemyForm: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.lg },
  sectionTitle: { color: colors.text, fontSize: 19, fontWeight: '900' },
  input: { backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, color: colors.text, padding: 12, marginVertical: spacing.sm },
  row: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  smallField: { flex: 1 },
  miniLabel: { color: colors.textMuted, fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
  smallInput: { backgroundColor: colors.surfaceMuted, borderRadius: radii.sm, color: colors.text, textAlign: 'center', padding: 10, marginTop: 4 },
  addEnemy: { backgroundColor: colors.primarySoft, borderColor: colors.primaryDark, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', marginTop: spacing.md, padding: 12 },
  primaryText: { color: colors.primary, fontWeight: '900' },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.md, ...shadows.card },
  activeCard: { borderColor: colors.primary, borderWidth: 2, backgroundColor: '#1B1D20' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 44, height: 44, borderRadius: 15, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  enemyAvatar: { backgroundColor: colors.dangerSoft },
  avatarText: { color: colors.text, fontSize: 19, fontWeight: '900' },
  cardTitle: { color: colors.text, fontSize: 18, fontWeight: '900' },
  muted: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  initiativeBox: { width: 54, backgroundColor: colors.surfaceMuted, borderRadius: radii.md, alignItems: 'center', padding: 6 },
  initiativeInput: { color: colors.primary, fontSize: 19, fontWeight: '900', textAlign: 'center', padding: 0, width: '100%' },
  hpBlock: { marginTop: spacing.md },
  hpHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hpValue: { color: colors.text, fontWeight: '900' },
  tempValue: { color: colors.info, fontSize: 11, fontWeight: '800' },
  hpTrack: { height: 7, backgroundColor: colors.surfaceMuted, borderRadius: radii.pill, overflow: 'hidden', marginTop: 7 },
  hpFill: { height: '100%', borderRadius: radii.pill },
  concentrationAlert: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radii.md, padding: 10, marginTop: spacing.md },
  concentrationText: { flex: 1, color: colors.primary, fontSize: 12, fontWeight: '800' },
  resolveText: { color: colors.text, fontSize: 11, fontWeight: '900' },
  conditionList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: spacing.md },
  conditionBadge: { backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 9, paddingVertical: 5 },
  conditionBadgeText: { color: colors.primary, fontSize: 10, fontWeight: '900' },
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  quick: { minWidth: 44, borderRadius: radii.sm, alignItems: 'center', paddingHorizontal: 11, paddingVertical: 9 },
  damageQuick: { backgroundColor: colors.dangerSoft },
  healQuick: { backgroundColor: colors.successSoft },
  quickText: { color: colors.text, fontWeight: '900', fontSize: 11 },
  cardActions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, borderTopColor: colors.border, borderTopWidth: 1, marginTop: spacing.md, paddingTop: spacing.md },
  actionButton: { backgroundColor: colors.surfaceMuted, borderRadius: radii.sm, paddingHorizontal: 10, paddingVertical: 9 },
  actionText: { color: colors.textMuted, fontWeight: '800', fontSize: 10 },
  removeButton: { borderColor: colors.dangerSoft, borderWidth: 1, borderRadius: radii.sm, paddingHorizontal: 10, paddingVertical: 9 },
  removeText: { color: colors.danger, fontWeight: '800', fontSize: 10 },
  deathPanel: { backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md, marginTop: spacing.md },
  deathTitle: { color: colors.danger, fontWeight: '900' },
  deathRoll: { backgroundColor: colors.surfaceMuted, borderRadius: radii.sm, padding: 9 },
  stabilize: { backgroundColor: colors.successSoft, borderRadius: radii.sm, padding: 9 },
  stabilizeText: { color: colors.success, fontWeight: '900', fontSize: 11 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.78)', justifyContent: 'flex-end' },
  conditionSheet: { maxHeight: '88%', backgroundColor: colors.backgroundRaised, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, padding: spacing.lg },
  sheetHandle: { width: 42, height: 4, backgroundColor: colors.borderStrong, borderRadius: 2, alignSelf: 'center', marginBottom: spacing.lg },
  conditionOption: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, padding: spacing.md, marginBottom: spacing.sm },
  conditionOptionActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  conditionName: { color: colors.text, fontWeight: '900' },
  conditionNameActive: { color: colors.primary },
  check: { color: colors.textMuted, fontSize: 20, fontWeight: '900' },
  checkActive: { color: colors.primary },
  closeButton: { backgroundColor: colors.primarySoft, borderColor: colors.primaryDark, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', marginTop: spacing.sm, padding: 14 },
});
