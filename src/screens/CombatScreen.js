import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CONDITIONS } from '../data/conditions';
import { CRITICAL_ERROR_TABLES, criticalErrorTableById, rollCriticalError as rollCriticalErrorFromTable } from '../data/criticalErrors';
import { useCampaign } from '../services/CampaignContext';
import { conditionName, conditionSummary, criticalErrorText, gameTerm, tr } from '../services/i18nService';
import {
  advanceTurn,
  applyParticipantHp,
  createCombat,
  enemyParticipant,
  heroParticipant,
  prioritizeTiedParticipant,
  recordDeathSave,
  sortedParticipants,
  stabilizeParticipant,
  toggleCondition,
} from '../services/combatService';
import { colors, radii, shadows, spacing } from '../theme';

const EMPTY_ENEMY = { name: '', hpMax: '10', armorClass: '10', initiative: '0' };

export default function CombatScreen({ language = 'pt-BR' }) {
  const { state, setState } = useCampaign();
  const tt = (text, values = {}) => tr(text, language, values);
  const [enemy, setEnemy] = useState(EMPTY_ENEMY);
  const [conditionTarget, setConditionTarget] = useState(null);
  const [damageDrafts, setDamageDrafts] = useState({});
  const [initiativeDrafts, setInitiativeDrafts] = useState({});
  const [criticalModalOpen, setCriticalModalOpen] = useState(false);
  const [criticalTableId, setCriticalTableId] = useState(CRITICAL_ERROR_TABLES[0].id);
  const [criticalResult, setCriticalResult] = useState(null);
  const alertedConcentration = useRef({});

  useEffect(() => {
    if (!state || state.combats?.length) return;
    setState((old) => ({ ...old, combats: [createCombat()] }));
  }, [state, setState]);

  const combat = state?.combats?.[0] || createCombat();
  const activeParticipant = combat.participants[combat.activeIndex];
  const conditionParticipant = useMemo(
    () => combat.participants.find((item) => item.id === conditionTarget),
    [combat.participants, conditionTarget]
  );

  useEffect(() => {
    const activeAlerts = {};
    combat.participants.forEach((participant) => {
      if (!participant.concentrationDc) return;
      const alertKey = `${participant.id}-${participant.concentrationDc}`;
      activeAlerts[participant.id] = alertKey;
      if (alertedConcentration.current[participant.id] === alertKey) return;
      alertedConcentration.current[participant.id] = alertKey;
      Alert.alert(
        tt('Teste de concentração'),
        tt('{name} sofreu dano enquanto concentrava. A CD já considera o dano total aplicado. Role CON CD {dc} para manter a magia.', {
          name: participant.name,
          dc: participant.concentrationDc,
        })
      );
    });
    Object.keys(alertedConcentration.current).forEach((participantId) => {
      if (!activeAlerts[participantId]) delete alertedConcentration.current[participantId];
    });
  }, [combat.participants]);

  function setCombat(updater) {
    setState((old) => ({ ...old, combats: [updater(old.combats?.[0] || createCombat())] }));
  }

  function updateParticipant(id, updater) {
    setState((old) => {
      const currentCombat = old.combats?.[0] || createCombat();
      let updatedParticipant = null;
      const participants = currentCombat.participants.map((item) => {
        if (item.id !== id) return item;
        updatedParticipant = updater(item);
        return updatedParticipant;
      });
      return {
        ...old,
        combats: [{ ...currentCombat, participants }],
        characters: updatedParticipant?.sourceId
          ? old.characters.map((character) =>
              character.id === updatedParticipant.sourceId
                ? {
                    ...character,
                    hp: { ...updatedParticipant.hp },
                    conditions: [...(updatedParticipant.conditions || [])],
                  }
                : character
            )
          : old.characters,
      };
    });
  }

  function addHeroes() {
    setCombat((old) => {
      const existing = new Set(old.participants.map((item) => item.sourceId));
      const activeGroup = state.groups.find((group) => group.id === state.activeGroupId);
      const groupIds = new Set(activeGroup?.characterIds || []);
      const heroes = state.characters
        .filter((character) => groupIds.has(character.id) && !existing.has(character.id))
        .map(heroParticipant);
      return { ...old, participants: sortedParticipants([...old.participants, ...heroes]), activeIndex: 0, turnsTaken: 0 };
    });
  }

  function addEnemy() {
    if (!enemy.name.trim()) return;
    setCombat((old) => ({
      ...old,
      participants: sortedParticipants([...old.participants, enemyParticipant(enemy)]),
      activeIndex: 0,
      turnsTaken: 0,
    }));
    setEnemy(EMPTY_ENEMY);
  }

  function changeInitiative(id, initiative) {
    const value = Number(initiative) || 0;
    setCombat((old) => ({
      ...old,
      participants: sortedParticipants(old.participants.map((item) =>
        item.id === id ? { ...item, initiative: value } : item
      )),
      activeIndex: 0,
      turnsTaken: 0,
    }));
    setInitiativeDrafts((old) => {
      const next = { ...old };
      delete next[id];
      return next;
    });
  }

  function changeInitiativeDraft(id, initiative) {
    const value = initiative.replace(/[^\d-]/g, '').replace(/(?!^)-/g, '');
    setInitiativeDrafts((old) => ({ ...old, [id]: value }));
  }

  function prioritizeParticipant(participantId) {
    setCombat((old) => ({
      ...old,
      participants: prioritizeTiedParticipant(old.participants, participantId),
      activeIndex: 0,
      turnsTaken: 0,
    }));
  }

  function changeDamageDraft(participantId, value) {
    setDamageDrafts((old) => ({ ...old, [participantId]: value.replace(/[^\d]/g, '') }));
  }

  function addDamageDraft(participantId, amount) {
    setDamageDrafts((old) => {
      const current = Number(old[participantId]) || 0;
      return { ...old, [participantId]: String(current + amount) };
    });
  }

  function clearDamageDraft(participantId) {
    setDamageDrafts((old) => {
      const next = { ...old };
      delete next[participantId];
      return next;
    });
  }

  function applyDamageDraft(participantId) {
    const damage = Number(damageDrafts[participantId]) || 0;
    if (damage <= 0) return;
    updateParticipant(participantId, (item) => applyParticipantHp(item, -damage));
    clearDamageDraft(participantId);
  }

  function rollCriticalError(tableId = criticalTableId) {
    setCriticalResult(rollCriticalErrorFromTable(tableId));
  }

  if (!state) return <Text style={styles.loading}>{tt('Carregando combate...')}</Text>;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{tt('ENCONTRO ATIVO')}</Text>
          <View style={styles.heroRow}>
            <View style={styles.flex}>
              <Text style={styles.title}>{tt('Rodada')} {combat.round}</Text>
              <Text style={styles.subtitle}>
                {activeParticipant ? `${tt('Turno de')} ${activeParticipant.name}` : tt('Adicione participantes para começar')}
              </Text>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={() => setCombat(advanceTurn)}>
              <Text style={styles.nextLabel}>{tt('PRÓXIMO')}</Text>
              <Text style={styles.nextArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.secondary} onPress={addHeroes}>
            <Text style={styles.secondaryText}>{tt('+ Personagens')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondary}
            onPress={() => {
              setInitiativeDrafts({});
              setDamageDrafts({});
              setCombat(() => createCombat());
            }}
          >
            <Text style={styles.secondaryText}>{tt('Novo combate')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondary} onPress={() => setCriticalModalOpen(true)}>
            <Text style={styles.secondaryText}>{tt('Erro crítico')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.enemyForm}>
          <Text style={styles.sectionTitle}>{tt('Adicionar inimigo')}</Text>
          <TextInput style={styles.input} value={enemy.name} onChangeText={(name) => setEnemy((old) => ({ ...old, name }))} placeholder={tt('Nome do inimigo')} placeholderTextColor={colors.textMuted} />
          <View style={styles.row}>
            <SmallField label={tt('PV')} value={enemy.hpMax} onChangeText={(hpMax) => setEnemy((old) => ({ ...old, hpMax }))} />
            <SmallField label="CA" value={enemy.armorClass} onChangeText={(armorClass) => setEnemy((old) => ({ ...old, armorClass }))} />
            <SmallField label={tt('INICIATIVA')} value={enemy.initiative} onChangeText={(initiative) => setEnemy((old) => ({ ...old, initiative }))} />
          </View>
          <TouchableOpacity style={styles.addEnemy} onPress={addEnemy}>
            <Text style={styles.primaryText}>{tt('Adicionar ao encontro')}</Text>
          </TouchableOpacity>
        </View>

        {combat.participants.map((participant, index) => {
          const active = index === combat.activeIndex;
          const atZero = participant.hp.current === 0 && participant.type === 'hero';
          const isConcentrating = (participant.conditions || []).includes('concentrating');
          const tied = combat.participants.some(
            (other) => other.id !== participant.id && other.initiative === participant.initiative
          );
          return (
            <View key={participant.id} style={[styles.card, active && styles.activeCard]}>
              <View style={styles.cardHeader}>
                <View style={[styles.avatar, participant.type === 'enemy' && styles.enemyAvatar]}>
                  <Text style={styles.avatarText}>{participant.name.slice(0, 1).toUpperCase()}</Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>{participant.name}</Text>
                  <Text style={styles.muted}>
                    {participant.type === 'enemy' ? tt('Inimigo') : tt('Personagem')} · CA {participant.armorClass}
                  </Text>
                </View>
                <View style={styles.initiativeBox}>
                  <Text style={styles.miniLabel}>{tt('INIT')}</Text>
                  <TextInput
                    style={styles.initiativeInput}
                    keyboardType="numeric"
                    value={initiativeDrafts[participant.id] ?? String(participant.initiative)}
                    onChangeText={(value) => changeInitiativeDraft(participant.id, value)}
                  />
                  <TouchableOpacity style={styles.initiativeApply} onPress={() => changeInitiative(participant.id, initiativeDrafts[participant.id] ?? participant.initiative)}>
                    <Text style={styles.initiativeApplyText}>OK</Text>
                  </TouchableOpacity>
                </View>
                {tied && (
                  <TouchableOpacity style={styles.priorityButton} onPress={() => prioritizeParticipant(participant.id)}>
                    <Text style={styles.priorityText}>{tt('Prioridade')}</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.hpBlock}>
                <View style={styles.hpHeader}>
                  <Text style={styles.hpValue}>{participant.hp.current} / {participant.hp.max} {tt('PV')}</Text>
                  <Text style={styles.tempValue}>+{participant.hp.temporary || 0} {tt('temporários')}</Text>
                </View>
                <View style={styles.hpEditor}>
                  <Text style={styles.miniLabel}>{tt('PV máximo')}</Text>
                  <TextInput
                    style={styles.hpMaxInput}
                    keyboardType="numeric"
                    value={String(participant.hp.max)}
                    onChangeText={(value) => updateParticipant(participant.id, (item) => {
                      const max = Math.max(1, Number(value) || 1);
                      return { ...item, hp: { ...item.hp, max, current: Math.min(item.hp.current, max) } };
                    })}
                  />
                  <TouchableOpacity style={styles.hpPreset} onPress={() => updateParticipant(participant.id, (item) => applyParticipantHp(item, -item.hp.current))}>
                    <Text style={styles.actionText}>{tt('Zerar PV')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.hpPreset} onPress={() => updateParticipant(participant.id, (item) => applyParticipantHp(item, item.hp.max - item.hp.current))}>
                    <Text style={styles.actionText}>{tt('PV cheio')}</Text>
                  </TouchableOpacity>
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
                  <Text style={styles.concentrationText}>{tt('Concentração: teste de CON CD {dc}', { dc: participant.concentrationDc })}</Text>
                  <TouchableOpacity onPress={() => updateParticipant(participant.id, (item) => ({ ...item, concentrationDc: null }))}>
                    <Text style={styles.resolveText}>{tt('Resolver')}</Text>
                  </TouchableOpacity>
                </View>
              )}

              {(participant.conditions || []).length > 0 && (
                <View style={styles.conditionList}>
                  {participant.conditions.map((id) => (
                    <View key={id} style={styles.conditionBadge}>
                      <Text style={styles.conditionBadgeText}>{conditionName(CONDITIONS.find((condition) => condition.id === id), language) || id}</Text>
                    </View>
                  ))}
                </View>
              )}

              {isConcentrating ? (
                <View style={styles.damagePanel}>
                  <Text style={styles.concentrationHint}>{tt('Concentrando: monte o dano total e depois aplique para calcular a CD correta.')}</Text>
                  <Text style={styles.miniLabel}>{tt('Dano total para concentração')}</Text>
                  <View style={styles.damageRow}>
                    <TextInput
                      style={styles.damageInput}
                      keyboardType="numeric"
                      value={damageDrafts[participant.id] || ''}
                      onChangeText={(value) => changeDamageDraft(participant.id, value)}
                      placeholder="0"
                      placeholderTextColor={colors.textMuted}
                    />
                    {[1, 5, 10, 25].map((value) => (
                      <TouchableOpacity key={value} style={[styles.quick, styles.damageQuick]} onPress={() => addDamageDraft(participant.id, value)}>
                        <Text style={styles.quickText}>+{value}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.damageRow}>
                    <TouchableOpacity style={styles.applyDamageButton} onPress={() => applyDamageDraft(participant.id)}>
                      <Text style={styles.applyDamageText}>{tt('Aplicar dano')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.hpPreset} onPress={() => clearDamageDraft(participant.id)}>
                      <Text style={styles.actionText}>{tt('Limpar')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.quickRow}>
                  {[-10, -5, -1].map((value) => (
                    <TouchableOpacity key={value} style={[styles.quick, styles.damageQuick]} onPress={() => updateParticipant(participant.id, (item) => applyParticipantHp(item, value))}>
                      <Text style={styles.quickText}>{value}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View style={styles.quickRow}>
                {[1, 5, 10].map((value) => (
                  <TouchableOpacity key={value} style={[styles.quick, styles.healQuick]} onPress={() => updateParticipant(participant.id, (item) => applyParticipantHp(item, value))}>
                    <Text style={styles.quickText}>{tt('Cura')} +{value}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {atZero && (
                <View style={styles.deathPanel}>
                  <Text style={styles.deathTitle}>
                    {participant.deathSaves?.dead ? tt('Morto') : participant.deathSaves?.stable ? tt('Estável') : tt('Testes contra a morte')}
                  </Text>
                  <Text style={styles.muted}>{tt('Sucessos')} {participant.deathSaves?.successes || 0}/3 · {tt('Falhas')} {participant.deathSaves?.failures || 0}/3</Text>
                  <View style={styles.quickRow}>
                    {[1, 5, 10, 20].map((roll) => (
                      <TouchableOpacity key={roll} style={styles.deathRoll} onPress={() => updateParticipant(participant.id, (item) => recordDeathSave(item, roll))}>
                        <Text style={styles.quickText}>d20: {roll}</Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.stabilize} onPress={() => updateParticipant(participant.id, stabilizeParticipant)}>
                      <Text style={styles.stabilizeText}>{tt('Estabilizar')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => setConditionTarget(participant.id)}>
                  <Text style={styles.actionText}>{tt('Condições')}</Text>
                </TouchableOpacity>
                {[1, 5, 10].map((value) => (
                  <TouchableOpacity key={`temp-${value}`} style={styles.actionButton} onPress={() => updateParticipant(participant.id, (item) => ({ ...item, hp: { ...item.hp, temporary: (item.hp.temporary || 0) + value } }))}>
                    <Text style={styles.actionText}>Temp +{value}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.actionButton} onPress={() => updateParticipant(participant.id, (item) => ({ ...item, hp: { ...item.hp, temporary: 0 } }))}>
                  <Text style={styles.actionText}>{tt('Limpar Temp')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.removeButton} onPress={() => setCombat((old) => ({ ...old, participants: old.participants.filter((item) => item.id !== participant.id), activeIndex: 0 }))}>
                  <Text style={styles.removeText}>{tt('Remover')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <ConditionModal language={language} participant={conditionParticipant} onToggle={(conditionId) => updateParticipant(conditionTarget, (item) => toggleCondition(item, conditionId))} onClose={() => setConditionTarget(null)} />
      <CriticalErrorModal
        language={language}
        visible={criticalModalOpen}
        selectedTableId={criticalTableId}
        result={criticalResult}
        onSelect={(tableId) => {
          setCriticalTableId(tableId);
          setCriticalResult(null);
        }}
        onRoll={rollCriticalError}
        onClose={() => setCriticalModalOpen(false)}
      />
    </View>
  );
}

function CriticalErrorModal({ language, visible, selectedTableId, result, onSelect, onRoll, onClose }) {
  const tt = (text, values = {}) => tr(text, language, values);
  const term = (value) => gameTerm(value, language);
  const selectedTable = criticalErrorTableById(selectedTableId);
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.conditionSheet}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sectionTitle}>{tt('Gerador de erro crítico')}</Text>
          <Text style={styles.subtitle}>{tt('Escolha o tipo do ataque que tirou 1 natural e sorteie o efeito.')}</Text>
          <View style={styles.criticalGrid}>
            {CRITICAL_ERROR_TABLES.map((table) => {
              const selected = table.id === selectedTableId;
              return (
                <TouchableOpacity
                  key={table.id}
                  style={[styles.criticalOption, selected && styles.criticalOptionActive]}
                  onPress={() => onSelect(table.id)}
                >
                  <Text style={[styles.criticalOptionText, selected && styles.criticalOptionTextActive]}>{term(table.name)}</Text>
                  <Text style={styles.muted}>{table.die}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity style={styles.rollButton} onPress={() => onRoll(selectedTable.id)}>
            <Text style={styles.rollButtonText}>{tt('Sortear efeito')} ({selectedTable.die})</Text>
          </TouchableOpacity>
          {result && (
            <View style={styles.criticalResult}>
              <Text style={styles.criticalRoll}>{term(result.tableName)} - {tt('resultado')} {result.roll}</Text>
              <Text style={styles.criticalMeta}>{tt('Faixa')} {result.range} - {term(result.severity)} ({result.chance})</Text>
              <Text style={styles.criticalEffect}>{criticalErrorText(result.effect, language)}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.primaryText}>{tt('Concluir')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function ConditionModal({ language, participant, onToggle, onClose }) {
  const tt = (text, values = {}) => tr(text, language, values);
  return (
    <Modal visible={Boolean(participant)} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.conditionSheet}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sectionTitle}>{tt('Condições de {name}', { name: participant?.name })}</Text>
          <Text style={styles.subtitle}>{tt('Toque para aplicar ou remover. Condições incapacitantes encerram concentração.')}</Text>
          <ScrollView>
            {CONDITIONS.map((condition) => {
              const selected = participant?.conditions?.includes(condition.id);
              return (
                <TouchableOpacity key={condition.id} style={[styles.conditionOption, selected && styles.conditionOptionActive]} onPress={() => onToggle(condition.id)}>
                  <View style={styles.flex}>
                    <Text style={[styles.conditionName, selected && styles.conditionNameActive]}>{conditionName(condition, language)}</Text>
                    <Text style={styles.muted}>{conditionSummary(condition, language)}</Text>
                  </View>
                  <Text style={[styles.check, selected && styles.checkActive]}>{selected ? '✓' : '+'}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.primaryText}>{tt('Concluir')}</Text>
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
  toolbar: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginVertical: spacing.md },
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
  initiativeBox: { width: 62, backgroundColor: colors.surfaceMuted, borderRadius: radii.md, alignItems: 'center', padding: 6 },
  initiativeInput: { color: colors.primary, fontSize: 19, fontWeight: '900', textAlign: 'center', padding: 0, width: '100%' },
  initiativeApply: { backgroundColor: colors.primarySoft, borderRadius: radii.sm, marginTop: 4, paddingHorizontal: 8, paddingVertical: 4 },
  initiativeApplyText: { color: colors.primary, fontSize: 9, fontWeight: '900' },
  priorityButton: { backgroundColor: colors.primarySoft, borderColor: colors.primaryDark, borderWidth: 1, borderRadius: radii.sm, paddingHorizontal: 8, paddingVertical: 10 },
  priorityText: { color: colors.primary, fontSize: 9, fontWeight: '900' },
  hpBlock: { marginTop: spacing.md },
  hpHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hpEditor: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  hpMaxInput: { width: 54, backgroundColor: colors.surfaceMuted, borderRadius: radii.sm, color: colors.text, textAlign: 'center', padding: 8 },
  hpPreset: { backgroundColor: colors.surfaceMuted, borderRadius: radii.sm, paddingHorizontal: 10, paddingVertical: 9 },
  hpValue: { color: colors.text, fontWeight: '900' },
  tempValue: { color: colors.info, fontSize: 11, fontWeight: '800' },
  hpTrack: { height: 7, backgroundColor: colors.surfaceMuted, borderRadius: radii.pill, overflow: 'hidden', marginTop: 7 },
  hpFill: { height: '100%', borderRadius: radii.pill },
  concentrationAlert: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radii.md, padding: 10, marginTop: spacing.md },
  concentrationText: { flex: 1, color: colors.primary, fontSize: 12, fontWeight: '800' },
  concentrationHint: { color: colors.primary, fontSize: 11, fontWeight: '800', lineHeight: 16, marginBottom: spacing.sm },
  resolveText: { color: colors.text, fontSize: 11, fontWeight: '900' },
  conditionList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: spacing.md },
  conditionBadge: { backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 9, paddingVertical: 5 },
  conditionBadgeText: { color: colors.primary, fontSize: 10, fontWeight: '900' },
  damagePanel: { backgroundColor: colors.surfaceMuted, borderRadius: radii.md, padding: spacing.sm, marginTop: spacing.md },
  damageRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  damageInput: { width: 78, backgroundColor: colors.backgroundRaised, borderColor: colors.border, borderWidth: 1, borderRadius: radii.sm, color: colors.text, fontSize: 18, fontWeight: '900', textAlign: 'center', padding: 9 },
  applyDamageButton: { flex: 1, minWidth: 132, backgroundColor: colors.dangerSoft, borderColor: colors.danger, borderWidth: 1, borderRadius: radii.sm, alignItems: 'center', padding: 10 },
  applyDamageText: { color: colors.danger, fontWeight: '900', fontSize: 11 },
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
  criticalGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginVertical: spacing.md },
  criticalOption: { width: '48%', backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, padding: spacing.md },
  criticalOptionActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  criticalOptionText: { color: colors.text, fontWeight: '900' },
  criticalOptionTextActive: { color: colors.primary },
  rollButton: { backgroundColor: colors.dangerSoft, borderColor: colors.danger, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', padding: 14 },
  rollButtonText: { color: colors.danger, fontWeight: '900' },
  criticalResult: { backgroundColor: colors.surface, borderColor: colors.borderStrong, borderWidth: 1, borderRadius: radii.md, marginTop: spacing.md, padding: spacing.md },
  criticalRoll: { color: colors.primary, fontSize: 12, fontWeight: '900', marginBottom: 6 },
  criticalMeta: { color: colors.textMuted, fontSize: 12, fontWeight: '800', marginBottom: 8 },
  criticalEffect: { color: colors.text, fontSize: 16, fontWeight: '800', lineHeight: 22 },
  closeButton: { backgroundColor: colors.primarySoft, borderColor: colors.primaryDark, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', marginTop: spacing.sm, padding: 14 },
});
