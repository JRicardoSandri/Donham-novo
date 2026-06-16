import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RECOVERY } from '../data/classProgression';
import { SPELL_CIRCLES, SPELL_SCHOOLS, SPELLS, spellById } from '../data/spells';
import { useCampaign } from '../services/CampaignContext';
import { normalizeRecovery, recoverResources, spendResource } from '../services/resourceService';
import { levelFromXp } from '../services/rulesService';
import { castSpell, maxAvailableSpellCircle, toggleKnownSpell, togglePreparedSpell } from '../services/spellService';
import { colors, radii, spacing } from '../theme';

export default function ResourcesScreen() {
  const { state, setState } = useCampaign();
  const [spellbookCharacterId, setSpellbookCharacterId] = useState(null);
  const [selectedResourceCharacterId, setSelectedResourceCharacterId] = useState(null);
  const [spellbookView, setSpellbookView] = useState('mine');
  const [spellQuery, setSpellQuery] = useState('');
  const [spellCircle, setSpellCircle] = useState('Todos');
  const [spellSchool, setSpellSchool] = useState('Todas');
  const [concentrationOnly, setConcentrationOnly] = useState(false);
  const [spellDetailId, setSpellDetailId] = useState(null);

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
  const spellbookCharacter = useMemo(
    () => (state?.characters || []).find((character) => character.id === spellbookCharacterId) || null,
    [state?.characters, spellbookCharacterId]
  );
  const selectedResourceCharacter = useMemo(
    () => characters.find((character) => character.id === selectedResourceCharacterId) || null,
    [characters, selectedResourceCharacterId]
  );
  const displayedCharacters = characters.length === 1
    ? characters
    : selectedResourceCharacter
      ? [selectedResourceCharacter]
      : [];
  const spellDetail = spellById(spellDetailId);
  const spellLimit = spellbookCharacter ? maxAvailableSpellCircle(spellbookCharacter) : 0;
  const availableSpellCircles = useMemo(
    () => SPELL_CIRCLES.filter((circle) => circle === 'Todos' || Number(circle) <= spellLimit),
    [spellLimit]
  );
  useEffect(() => {
    if (spellCircle !== 'Todos' && Number(spellCircle) > spellLimit) {
      setSpellCircle('Todos');
    }
  }, [spellCircle, spellLimit]);
  const visibleSpells = useMemo(() => {
    if (!spellbookCharacter) return [];
    const known = new Set(spellbookCharacter.spellcasting?.knownSpellIds || []);
    return SPELLS
      .filter((spell) => spell.classes.includes(spellbookCharacter.classKey))
      .filter((spell) => spell.circle <= spellLimit)
      .filter((spell) => spellbookView === 'catalog' || known.has(spell.id))
      .filter((spell) => spellCircle === 'Todos' || spell.circle === Number(spellCircle))
      .filter((spell) => spellSchool === 'Todas' || spell.school === spellSchool)
      .filter((spell) => !concentrationOnly || spell.concentration)
      .filter((spell) => `${spell.name} ${spell.summary}`.toLowerCase().includes(spellQuery.trim().toLowerCase()));
  }, [spellbookCharacter, spellLimit, spellbookView, spellQuery, spellCircle, spellSchool, concentrationOnly]);

  function updateResources(characterId, updater) {
    setState((old) => ({
      ...old,
      characters: old.characters.map((character) =>
        character.id === characterId
          ? { ...character, resources: updater(character.resources || []) }
          : character
      ),
    }));
  }

  function changeToken(characterId, key, delta) {
    setState((old) => ({
      ...old,
      characters: old.characters.map((character) =>
        character.id === characterId
          ? { ...character, [key]: Math.max(0, Math.min(10, (Number(character[key]) || 0) + delta)) }
          : character
      ),
    }));
  }

  function restCharacter(characterId, restType) {
    setState((old) => ({
      ...old,
      characters: old.characters.map((character) => {
        if (!activeCharacterIds.has(character.id)) return character;
        if (characterId && character.id !== characterId) return character;
        return {
          ...character,
          hp: restType === RECOVERY.LONG
            ? { ...character.hp, current: character.hp.max }
            : character.hp,
          resources: recoverResources(character.resources || [], restType),
        };
      }),
    }));
  }

  function updateSpellbook(characterId, updater) {
    setState((old) => ({
      ...old,
      characters: old.characters.map((character) =>
        character.id === characterId
          ? { ...character, spellcasting: updater(character.spellcasting) }
          : character
      ),
    }));
  }

  function conjure(characterId, spellId) {
    const character = state.characters.find((item) => item.id === characterId);
    if (!character) return;
    const result = castSpell(character, spellId);
    setState((old) => ({
      ...old,
      characters: old.characters.map((item) =>
        item.id === characterId ? result.character : item
      ),
    }));
    Alert.alert('Conjuração', result.reason);
  }

  function closeSpellbook() {
    setSpellbookCharacterId(null);
    setSpellDetailId(null);
    setSpellQuery('');
    setSpellCircle('Todos');
    setSpellSchool('Todas');
    setConcentrationOnly(false);
    setSpellbookView('mine');
  }

  if (!state) return <Text style={styles.loading}>Carregando recursos...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>PROGRESSÃO AUTOMÁTICA</Text>
      <Text style={styles.title}>Recursos e magias</Text>
      <Text style={styles.subtitle}>Classe e XP determinam automaticamente recursos e espaços de magia.</Text>
      <View style={styles.globalActions}>
        <TouchableOpacity style={styles.globalRest} onPress={() => restCharacter(null, RECOVERY.SHORT)}>
          <Text style={styles.restText}>Descanso curto para todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.globalRest} onPress={() => restCharacter(null, RECOVERY.LONG)}>
          <Text style={styles.restText}>Descanso longo para todos</Text>
        </TouchableOpacity>
      </View>

      {characters.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.cardTitle}>Nenhum personagem criado</Text>
          <Text style={styles.muted}>Crie personagens na aba Grupos para acompanhar seus recursos.</Text>
        </View>
      )}

      {characters.length > 1 && !selectedResourceCharacter && characters.map((character) => {
        const resources = character.resources || [];
        const available = resources.reduce((total, item) => total + (Number(item.current) || 0), 0);
        const maximum = resources.reduce((total, item) => total + (Number(item.max) || 0), 0);
        const depleted = resources.filter((item) => Number(item.current) === 0).length;
        return (
          <TouchableOpacity
            key={character.id}
            style={styles.characterSummary}
            onPress={() => setSelectedResourceCharacterId(character.id)}
          >
            <View style={[styles.avatar, depleted > 0 && styles.avatarWarning]}>
              <Text style={styles.avatarText}>{character.name.slice(0, 1).toUpperCase()}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>{character.name}</Text>
              <Text style={styles.muted}>{character.classKey} · nível {levelFromXp(character.xp)}</Text>
              <Text style={[styles.summaryValue, depleted > 0 && styles.summaryWarning]}>
                {available}/{maximum} usos disponíveis · {depleted} esgotados
              </Text>
            </View>
            <Text style={styles.spellbookArrow}>›</Text>
          </TouchableOpacity>
        );
      })}

      {displayedCharacters.map((character) => (
        <View key={character.id} style={styles.card}>
          {characters.length > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedResourceCharacterId(null)}>
              <Text style={styles.backText}>‹ Todos os personagens</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.cardTitle}>{character.name}</Text>
          <Text style={styles.muted}>{character.classKey} · nível {levelFromXp(character.xp)} · {character.xp} XP</Text>

          <View style={styles.tokenRow}>
            <Token label="Inspiração" value={character.inspiration || 0} onMinus={() => changeToken(character.id, 'inspiration', -1)} onPlus={() => changeToken(character.id, 'inspiration', 1)} />
            <Token label="Pontos de Enredo" value={character.plotPoints || 0} onMinus={() => changeToken(character.id, 'plotPoints', -1)} onPlus={() => changeToken(character.id, 'plotPoints', 1)} />
          </View>

          <TouchableOpacity
            style={styles.spellbookButton}
            onPress={() => {
              setSpellbookCharacterId(character.id);
              setSpellbookView('mine');
            }}
          >
            <View style={styles.flex}>
              <Text style={styles.spellbookTitle}>Grimório</Text>
              <Text style={styles.muted}>
                {character.spellcasting?.knownSpellIds?.length || 0} conhecidas · {character.spellcasting?.preparedSpellIds?.length || 0} preparadas
              </Text>
            </View>
            <Text style={styles.spellbookArrow}>›</Text>
          </TouchableOpacity>

          {(character.resources || []).length === 0 ? (
            <Text style={styles.noResources}>Esta classe não possui recursos automáticos neste nível.</Text>
          ) : character.resources.map((item) => (
            <View key={item.id} style={styles.resource}>
              <View style={styles.flex}>
                <Text style={styles.resourceName}>{item.name}</Text>
                <Text style={styles.muted}>Recupera em descanso {normalizeRecovery(item.recovery) === RECOVERY.SHORT ? 'curto' : 'longo'}</Text>
              </View>
              <View style={styles.resourceControls}>
                <TouchableOpacity style={styles.control} onPress={() => updateResources(character.id, (items) => spendResource(items, item.id, -1))}>
                  <Text style={styles.controlText}>−</Text>
                </TouchableOpacity>
                <Text style={[styles.count, item.current === 0 && styles.emptyCount]}>{item.current}/{item.max}</Text>
                <TouchableOpacity style={styles.control} onPress={() => updateResources(character.id, (items) => spendResource(items, item.id, 1))}>
                  <Text style={styles.controlText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textControl} onPress={() => updateResources(character.id, (items) => items.map((resource) => resource.id === item.id ? { ...resource, current: 0 } : resource))}>
                  <Text style={styles.textControlLabel}>Usou</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textControl} onPress={() => updateResources(character.id, (items) => items.map((resource) => resource.id === item.id ? { ...resource, current: resource.max } : resource))}>
                  <Text style={styles.textControlLabel}>Cheio</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.rest} onPress={() => restCharacter(character.id, RECOVERY.SHORT)}>
              <Text style={styles.restText}>Descanso curto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rest} onPress={() => restCharacter(character.id, RECOVERY.LONG)}>
              <Text style={styles.restText}>Descanso longo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal visible={Boolean(spellbookCharacter)} transparent animationType="slide" onRequestClose={closeSpellbook}>
        <View style={styles.modalBackground}>
          <View style={styles.spellbookSheet}>
            <View style={styles.sheetHeader}>
              <View style={styles.flex}>
                <Text style={styles.cardTitle}>Grimório de {spellbookCharacter?.name}</Text>
                <Text style={styles.muted}>
                  {spellbookCharacter?.classKey} · {spellLimit > 0 ? `liberado ate ${spellLimit}º circulo` : 'sem magias liberadas neste nivel'}
                </Text>
              </View>
              <TouchableOpacity style={styles.closeIcon} onPress={closeSpellbook}>
                <Text style={styles.closeIconText}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.segmented}>
              <TouchableOpacity style={[styles.segment, spellbookView === 'mine' && styles.segmentActive]} onPress={() => setSpellbookView('mine')}>
                <Text style={[styles.segmentText, spellbookView === 'mine' && styles.segmentTextActive]}>Minhas magias</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.segment, spellbookView === 'catalog' && styles.segmentActive]} onPress={() => setSpellbookView('catalog')}>
                <Text style={[styles.segmentText, spellbookView === 'catalog' && styles.segmentTextActive]}>Adicionar magia</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.search}
              value={spellQuery}
              onChangeText={setSpellQuery}
              placeholder="Buscar por nome ou efeito"
              placeholderTextColor={colors.textMuted}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterStrip}>
              {availableSpellCircles.map((circle) => (
                <TouchableOpacity key={circle} style={[styles.filterChip, spellCircle === circle && styles.filterChipActive]} onPress={() => setSpellCircle(circle)}>
                  <Text style={[styles.filterText, spellCircle === circle && styles.filterTextActive]}>{circle === 'Todos' ? 'Todos' : circle === 0 ? 'Truques' : `${circle}º`}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterStrip}>
              {SPELL_SCHOOLS.map((school) => (
                <TouchableOpacity key={school} style={[styles.filterChip, spellSchool === school && styles.filterChipActive]} onPress={() => setSpellSchool(school)}>
                  <Text style={[styles.filterText, spellSchool === school && styles.filterTextActive]}>{school}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={[styles.filterChip, concentrationOnly && styles.filterChipActive]} onPress={() => setConcentrationOnly((value) => !value)}>
                <Text style={[styles.filterText, concentrationOnly && styles.filterTextActive]}>Concentração</Text>
              </TouchableOpacity>
            </ScrollView>

            <ScrollView style={styles.spellList}>
              {visibleSpells.length === 0 && (
                <Text style={styles.noResources}>
                  {spellbookView === 'mine'
                    ? 'Nenhuma magia disponivel neste nivel. Abra Adicionar magia quando liberar novos circulos.'
                    : 'Nenhuma magia encontrada para os circulos liberados deste personagem.'}
                </Text>
              )}
              {visibleSpells.map((spell) => {
                const known = spellbookCharacter?.spellcasting?.knownSpellIds?.includes(spell.id);
                const prepared = spellbookCharacter?.spellcasting?.preparedSpellIds?.includes(spell.id);
                return (
                  <View key={spell.id} style={styles.spellCard}>
                    <TouchableOpacity style={styles.flex} onPress={() => setSpellDetailId(spell.id)}>
                      <View style={styles.spellTitleRow}>
                        <Text style={styles.resourceName}>{spell.name}</Text>
                        {spell.concentration && <Text style={styles.ruleBadge}>CONC.</Text>}
                        {spell.ritual && <Text style={styles.ruleBadge}>RITUAL</Text>}
                      </View>
                      <Text style={styles.muted}>
                        {spell.circle === 0 ? 'Truque' : `${spell.circle}º círculo`} · {spell.school} · {spell.castingTime}
                      </Text>
                      <Text style={styles.spellSummary}>{spell.summary}</Text>
                    </TouchableOpacity>
                    <View style={styles.spellActions}>
                      {spellbookView === 'catalog' ? (
                        <TouchableOpacity style={[styles.smallAction, known && styles.smallActionActive]} onPress={() => updateSpellbook(spellbookCharacter.id, (value) => toggleKnownSpell(value, spell.id))}>
                          <Text style={[styles.smallActionText, known && styles.smallActionTextActive]}>{known ? 'Remover' : 'Adicionar'}</Text>
                        </TouchableOpacity>
                      ) : (
                        <>
                          <TouchableOpacity style={[styles.smallAction, prepared && styles.smallActionActive]} onPress={() => updateSpellbook(spellbookCharacter.id, (value) => togglePreparedSpell(value, spell.id))}>
                            <Text style={[styles.smallActionText, prepared && styles.smallActionTextActive]}>{prepared ? 'Preparada' : 'Preparar'}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.castAction} onPress={() => conjure(spellbookCharacter.id, spell.id)}>
                            <Text style={styles.castText}>Conjurar</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={Boolean(spellDetail)} transparent animationType="fade" onRequestClose={() => setSpellDetailId(null)}>
        <View style={styles.detailBackground}>
          <View style={styles.detailCard}>
            <Text style={styles.eyebrow}>{spellDetail?.source}</Text>
            <Text style={styles.detailTitle}>{spellDetail?.name}</Text>
            <Text style={styles.muted}>{spellDetail?.circle === 0 ? 'Truque' : `${spellDetail?.circle}º círculo`} · {spellDetail?.school}</Text>
            <View style={styles.detailGrid}>
              <Detail label="Conjuração" value={spellDetail?.castingTime} />
              <Detail label="Alcance" value={spellDetail?.range} />
              <Detail label="Duração" value={spellDetail?.duration} />
              <Detail label="Concentração" value={spellDetail?.concentration ? 'Sim' : 'Não'} />
            </View>
            <Text style={styles.detailSummary}>{spellDetail?.summary}</Text>
            <TouchableOpacity style={styles.detailClose} onPress={() => setSpellDetailId(null)}>
              <Text style={styles.primaryText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function Detail({ label, value }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function Token({ label, value, onMinus, onPlus }) {
  return (
    <View style={styles.token}>
      <Text style={styles.tokenLabel}>{label}</Text>
      <View style={styles.tokenControls}>
        <TouchableOpacity style={styles.control} onPress={onMinus}><Text style={styles.controlText}>−</Text></TouchableOpacity>
        <Text style={styles.count}>{value}/10</Text>
        <TouchableOpacity style={styles.control} onPress={onPlus}><Text style={styles.controlText}>+</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: 48 },
  loading: { flex: 1, color: colors.text, backgroundColor: colors.background, padding: spacing.lg },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 30, fontWeight: '900', marginTop: 6 },
  subtitle: { color: colors.textMuted, lineHeight: 20, marginTop: 6, marginBottom: spacing.lg },
  empty: { backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.xl },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, marginBottom: spacing.md, padding: spacing.lg },
  characterSummary: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, marginBottom: spacing.md, padding: spacing.lg },
  avatar: { width: 46, height: 46, borderRadius: 15, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  avatarWarning: { backgroundColor: colors.dangerSoft },
  avatarText: { color: colors.text, fontSize: 19, fontWeight: '900' },
  summaryValue: { color: colors.success, fontSize: 11, fontWeight: '900', marginTop: 3 },
  summaryWarning: { color: colors.danger },
  backButton: { alignSelf: 'flex-start', marginBottom: spacing.md, paddingVertical: 4 },
  backText: { color: colors.primary, fontWeight: '900' },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '900' },
  muted: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  noResources: { color: colors.textMuted, marginTop: spacing.md },
  globalActions: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  globalRest: { flex: 1, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', padding: 12 },
  tokenRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  token: { flex: 1, backgroundColor: colors.primarySoft, borderRadius: radii.md, padding: spacing.sm },
  tokenLabel: { color: colors.primary, fontSize: 11, fontWeight: '900', textAlign: 'center' },
  tokenControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.sm },
  spellbookButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, marginTop: spacing.md, padding: spacing.md },
  spellbookTitle: { color: colors.text, fontWeight: '900' },
  spellbookArrow: { color: colors.primary, fontSize: 28, fontWeight: '900' },
  resource: { borderTopColor: colors.border, borderTopWidth: 1, marginTop: spacing.md, paddingTop: spacing.md },
  resourceControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.sm, marginTop: spacing.sm },
  flex: { flex: 1 },
  resourceName: { color: colors.text, fontSize: 13, fontWeight: '800' },
  control: { width: 36, height: 36, borderRadius: radii.sm, backgroundColor: colors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  controlText: { color: colors.text, fontSize: 22, fontWeight: '900' },
  textControl: { backgroundColor: colors.surfaceMuted, borderRadius: radii.sm, paddingHorizontal: 8, paddingVertical: 10 },
  textControlLabel: { color: colors.textMuted, fontSize: 9, fontWeight: '900' },
  count: { color: colors.primary, minWidth: 46, textAlign: 'center', fontWeight: '900' },
  emptyCount: { color: colors.danger },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  rest: { flex: 1, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', padding: 12 },
  restText: { color: colors.text, fontWeight: '800' },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.82)', justifyContent: 'flex-end' },
  spellbookSheet: { height: '92%', backgroundColor: colors.backgroundRaised, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, padding: spacing.lg },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  closeIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  closeIconText: { color: colors.text, fontSize: 24, lineHeight: 27 },
  segmented: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radii.md, marginTop: spacing.md, padding: 4 },
  segment: { flex: 1, alignItems: 'center', borderRadius: radii.sm, padding: 10 },
  segmentActive: { backgroundColor: colors.primary },
  segmentText: { color: colors.textMuted, fontWeight: '800' },
  segmentTextActive: { color: colors.background },
  search: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, color: colors.text, marginTop: spacing.md, padding: 12 },
  filterStrip: { gap: 6, paddingTop: spacing.sm },
  filterChip: { borderColor: colors.border, borderWidth: 1, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 7 },
  filterChipActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  filterText: { color: colors.textMuted, fontSize: 10, fontWeight: '800' },
  filterTextActive: { color: colors.primary },
  spellList: { marginTop: spacing.sm },
  spellCard: { flexDirection: 'row', gap: spacing.sm, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, marginBottom: spacing.sm, padding: spacing.md },
  spellTitleRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 5 },
  ruleBadge: { color: colors.primary, backgroundColor: colors.primarySoft, borderRadius: radii.pill, fontSize: 8, fontWeight: '900', paddingHorizontal: 6, paddingVertical: 3 },
  spellSummary: { color: colors.textMuted, fontSize: 11, lineHeight: 16, marginTop: 4 },
  spellActions: { justifyContent: 'center', gap: 6 },
  smallAction: { borderColor: colors.border, borderWidth: 1, borderRadius: radii.sm, alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8 },
  smallActionActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  smallActionText: { color: colors.textMuted, fontSize: 9, fontWeight: '900' },
  smallActionTextActive: { color: colors.primary },
  castAction: { backgroundColor: colors.primary, borderRadius: radii.sm, alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8 },
  castText: { color: colors.background, fontSize: 9, fontWeight: '900' },
  detailBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.86)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  detailCard: { width: '100%', backgroundColor: colors.surface, borderColor: colors.borderStrong, borderWidth: 1, borderRadius: radii.xl, padding: spacing.xl },
  detailTitle: { color: colors.text, fontSize: 24, fontWeight: '900', marginTop: 4 },
  detailGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  detailItem: { width: '47%', backgroundColor: colors.surfaceMuted, borderRadius: radii.md, padding: spacing.sm },
  detailLabel: { color: colors.textMuted, fontSize: 9, fontWeight: '900' },
  detailValue: { color: colors.text, fontSize: 12, fontWeight: '800', marginTop: 3 },
  detailSummary: { color: colors.text, lineHeight: 20, marginTop: spacing.lg },
  detailClose: { backgroundColor: colors.primary, borderRadius: radii.md, alignItems: 'center', marginTop: spacing.lg, padding: 13 },
  primaryText: { color: colors.background, fontWeight: '900' },
});
