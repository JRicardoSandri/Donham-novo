import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RECOVERY } from '../data/classProgression';
import { SPELL_CIRCLES, SPELL_SCHOOLS, SPELLS, spellById } from '../data/spells';
import { useCampaign } from '../services/CampaignContext';
import { gameTerm, resourceName, spellCircleLabel, spellMetaText, spellName, spellSummary, tr } from '../services/i18nService';
import { normalizeRecovery, recoverResources, spendResource } from '../services/resourceService';
import { levelFromXp } from '../services/rulesService';
import { availableCastOptions, castSpell, maxAvailableSpellCircle, shouldAskForCastCircle, spellClassesForCharacter, toggleKnownSpell, togglePreparedSpell } from '../services/spellService';
import { colors, radii, spacing } from '../theme';

export default function ResourcesScreen({ language = 'pt-BR' }) {
  const { state, setState } = useCampaign();
  const tt = (text, values = {}) => tr(text, language, values);
  const term = (value) => gameTerm(value, language);
  const [spellbookCharacterId, setSpellbookCharacterId] = useState(null);
  const [selectedResourceCharacterId, setSelectedResourceCharacterId] = useState(null);
  const [spellbookView, setSpellbookView] = useState('mine');
  const [spellQuery, setSpellQuery] = useState('');
  const [spellCircle, setSpellCircle] = useState('Todos');
  const [spellSchool, setSpellSchool] = useState('Todas');
  const [concentrationOnly, setConcentrationOnly] = useState(false);
  const [spellDetailId, setSpellDetailId] = useState(null);
  const [castingSpellId, setCastingSpellId] = useState(null);

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
  const castingSpell = spellById(castingSpellId);
  const castingOptions = useMemo(
    () => spellbookCharacter && castingSpell ? availableCastOptions(spellbookCharacter, castingSpell.id) : [],
    [spellbookCharacter, castingSpell]
  );
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
    const allowedClasses = spellClassesForCharacter(spellbookCharacter);
    return SPELLS
      .filter((spell) => spell.classes.some((classKey) => allowedClasses.has(classKey)))
      .filter((spell) => spell.circle <= spellLimit)
      .filter((spell) => spellbookView === 'catalog' || known.has(spell.id))
      .filter((spell) => spellCircle === 'Todos' || spell.circle === Number(spellCircle))
      .filter((spell) => spellSchool === 'Todas' || spell.school === spellSchool)
      .filter((spell) => !concentrationOnly || spell.concentration)
      .filter((spell) => `${spell.name} ${spellName(spell, language)} ${spell.summary}`.toLowerCase().includes(spellQuery.trim().toLowerCase()));
  }, [spellbookCharacter, spellLimit, spellbookView, spellQuery, spellCircle, spellSchool, concentrationOnly, language]);

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

  function conjure(characterId, spellId, slotCircle = null) {
    const character = state.characters.find((item) => item.id === characterId);
    if (!character) return;
    const result = castSpell(character, spellId, slotCircle);
    const selectedSpell = spellById(spellId);
    setState((old) => ({
      ...old,
      characters: old.characters.map((item) =>
        item.id === characterId ? result.character : item
      ),
    }));
    setCastingSpellId(null);
    Alert.alert(tt('Conjuração'), spellCastMessage(result, selectedSpell, slotCircle));
  }

  function spellCastMessage(result, selectedSpell, slotCircle = null) {
    switch (result.code) {
      case 'cantrip-cast':
        return tt('Truque conjurado sem gastar espaço.');
      case 'spell-cast':
        return tt('{spell} conjurada usando espaço de {circle}º círculo.', {
          spell: spellName(selectedSpell, language),
          circle: result.slotCircle || slotCircle || selectedSpell?.circle,
        });
      case 'spell-not-found':
        return tt('Magia não encontrada.');
      case 'spell-locked':
        return tt('Esta magia ainda não foi desbloqueada. Limite atual: {circle}º círculo.', { circle: result.maxCircle });
      case 'no-unlocked-spell-circles':
        return tt('Este personagem ainda não possui círculos de magia desbloqueados.');
      case 'no-slot-for-circle':
        return tt('Nenhum espaço de {circle}º círculo disponível.', { circle: result.slotCircle });
      case 'no-compatible-slot':
        return tt('Nenhum espaço compatível disponível.');
      default:
        return result.reason;
    }
  }

  function requestConjure(characterId, spell) {
    const character = state.characters.find((item) => item.id === characterId);
    if (!character) return;
    if (shouldAskForCastCircle(character, spell.id)) {
      setCastingSpellId(spell.id);
      return;
    }
    conjure(characterId, spell.id);
  }

  function closeSpellbook() {
    setSpellbookCharacterId(null);
    setSpellDetailId(null);
    setSpellQuery('');
    setSpellCircle('Todos');
    setSpellSchool('Todas');
    setConcentrationOnly(false);
    setCastingSpellId(null);
    setSpellbookView('mine');
  }

  if (!state) return <Text style={styles.loading}>{tt('Carregando recursos...')}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>{tt('PROGRESSÃO AUTOMÁTICA')}</Text>
      <Text style={styles.title}>{tt('Recursos e magias')}</Text>
      <Text style={styles.subtitle}>{tt('Classe e XP determinam automaticamente recursos e espaços de magia.')}</Text>
      <View style={styles.globalActions}>
        <TouchableOpacity style={styles.globalRest} onPress={() => restCharacter(null, RECOVERY.SHORT)}>
          <Text style={styles.restText}>{tt('Descanso curto para todos')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.globalRest} onPress={() => restCharacter(null, RECOVERY.LONG)}>
          <Text style={styles.restText}>{tt('Descanso longo para todos')}</Text>
        </TouchableOpacity>
      </View>

      {characters.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.cardTitle}>{tt('Nenhum personagem criado')}</Text>
          <Text style={styles.muted}>{tt('Crie personagens na aba Grupos para acompanhar seus recursos.')}</Text>
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
              <Text style={styles.muted}>{term(character.classKey)} {'\u00b7'} {tt('N\u00edvel')} {levelFromXp(character.xp)}</Text>
              <Text style={[styles.summaryValue, depleted > 0 && styles.summaryWarning]}>
                {available}/{maximum} {tt('usos dispon\u00edveis')} {'\u00b7'} {depleted} {tt('esgotados')}
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
              <Text style={styles.backText}>‹ {tt('Todos os personagens')}</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.cardTitle}>{character.name}</Text>
          <Text style={styles.muted}>{term(character.classKey)} {'\u00b7'} {tt('N\u00edvel')} {levelFromXp(character.xp)} {'\u00b7'} {character.xp} XP</Text>

          <View style={styles.tokenRow}>
            <Token label={tt('Inspira\u00e7\u00e3o')} value={character.inspiration || 0} onMinus={() => changeToken(character.id, 'inspiration', -1)} onPlus={() => changeToken(character.id, 'inspiration', 1)} />
            <Token label={tt('Pontos de Enredo')} value={character.plotPoints || 0} onMinus={() => changeToken(character.id, 'plotPoints', -1)} onPlus={() => changeToken(character.id, 'plotPoints', 1)} />
          </View>

          <TouchableOpacity
            style={styles.spellbookButton}
            onPress={() => {
              setSpellbookCharacterId(character.id);
              setSpellbookView('mine');
            }}
          >
            <View style={styles.flex}>
              <Text style={styles.spellbookTitle}>{tt('Grim\u00f3rio')}</Text>
              <Text style={styles.muted}>
                {character.spellcasting?.knownSpellIds?.length || 0} {tt('conhecidas')} {'\u00b7'} {character.spellcasting?.preparedSpellIds?.length || 0} {tt('preparadas')}
              </Text>
            </View>
            <Text style={styles.spellbookArrow}>›</Text>
          </TouchableOpacity>

          {(character.resources || []).length === 0 ? (
            <Text style={styles.noResources}>{tt('Esta classe n\u00e3o possui recursos autom\u00e1ticos neste n\u00edvel.')}</Text>
          ) : character.resources.map((item) => (
            <View key={item.id} style={styles.resource}>
              <View style={styles.flex}>
                <Text style={styles.resourceName}>{resourceName(item.name, language)}</Text>
                <Text style={styles.muted}>{tt('Recupera em descanso')} {normalizeRecovery(item.recovery) === RECOVERY.SHORT ? tt('curto') : tt('longo')}</Text>
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
                  <Text style={styles.textControlLabel}>{tt('Usou')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textControl} onPress={() => updateResources(character.id, (items) => items.map((resource) => resource.id === item.id ? { ...resource, current: resource.max } : resource))}>
                  <Text style={styles.textControlLabel}>{tt('Cheio')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.rest} onPress={() => restCharacter(character.id, RECOVERY.SHORT)}>
              <Text style={styles.restText}>{tt('Descanso curto')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rest} onPress={() => restCharacter(character.id, RECOVERY.LONG)}>
              <Text style={styles.restText}>{tt('Descanso longo')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal visible={Boolean(spellbookCharacter)} transparent animationType="slide" onRequestClose={closeSpellbook}>
        <View style={styles.modalBackground}>
          <View style={styles.spellbookSheet}>
            <View style={styles.sheetHeader}>
              <View style={styles.flex}>
                <Text style={styles.cardTitle}>{tt('Grim\u00f3rio de {name}', { name: spellbookCharacter?.name })}</Text>
                <Text style={styles.muted}>
                  {term(spellbookCharacter?.classKey)} {'\u00b7'} {spellLimit > 0 ? tt('liberado até {circle}º círculo', { circle: spellLimit }) : tt('sem magias liberadas neste nível')}
                </Text>
              </View>
              <TouchableOpacity style={styles.closeIcon} onPress={closeSpellbook}>
                <Text style={styles.closeIconText}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.segmented}>
              <TouchableOpacity style={[styles.segment, spellbookView === 'mine' && styles.segmentActive]} onPress={() => setSpellbookView('mine')}>
                <Text style={[styles.segmentText, spellbookView === 'mine' && styles.segmentTextActive]}>{tt('Minhas magias')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.segment, spellbookView === 'catalog' && styles.segmentActive]} onPress={() => setSpellbookView('catalog')}>
                <Text style={[styles.segmentText, spellbookView === 'catalog' && styles.segmentTextActive]}>{tt('Adicionar magia')}</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.search}
              value={spellQuery}
              onChangeText={setSpellQuery}
              placeholder={tt('Buscar por nome ou efeito')}
              placeholderTextColor={colors.textMuted}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterStrip}>
              {availableSpellCircles.map((circle) => (
                <TouchableOpacity key={circle} style={[styles.filterChip, spellCircle === circle && styles.filterChipActive]} onPress={() => setSpellCircle(circle)}>
                  <Text style={[styles.filterText, spellCircle === circle && styles.filterTextActive]}>{spellCircleLabel(circle, language)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterStrip}>
              {SPELL_SCHOOLS.map((school) => (
                <TouchableOpacity key={school} style={[styles.filterChip, spellSchool === school && styles.filterChipActive]} onPress={() => setSpellSchool(school)}>
                  <Text style={[styles.filterText, spellSchool === school && styles.filterTextActive]}>{term(school)}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={[styles.filterChip, concentrationOnly && styles.filterChipActive]} onPress={() => setConcentrationOnly((value) => !value)}>
                <Text style={[styles.filterText, concentrationOnly && styles.filterTextActive]}>{tt('Concentra\u00e7\u00e3o')}</Text>
              </TouchableOpacity>
            </ScrollView>

            <ScrollView style={styles.spellList}>
              {visibleSpells.length === 0 && (
                <Text style={styles.noResources}>
                  {spellbookView === 'mine'
                    ? tt('Nenhuma magia disponível neste nível. Abra Adicionar magia quando liberar novos círculos.')
                    : tt('Nenhuma magia encontrada para os círculos liberados deste personagem.')}
                </Text>
              )}
              {visibleSpells.map((spell) => {
                const known = spellbookCharacter?.spellcasting?.knownSpellIds?.includes(spell.id);
                const prepared = spellbookCharacter?.spellcasting?.preparedSpellIds?.includes(spell.id);
                return (
                  <View key={spell.id} style={styles.spellCard}>
                    <TouchableOpacity style={styles.flex} onPress={() => setSpellDetailId(spell.id)}>
                      <View style={styles.spellTitleRow}>
                        <Text style={styles.resourceName}>{spellName(spell, language)}</Text>
                        {spell.concentration && <Text style={styles.ruleBadge}>{tt('Concentração')}</Text>}
                        {spell.ritual && <Text style={styles.ruleBadge}>{tt('Ritual')}</Text>}
                      </View>
                      <Text style={styles.muted}>
                        {spellCircleLabel(spell.circle, language)} {'\u00b7'} {term(spell.school)} {'\u00b7'} {spellMetaText(spell.castingTime, language)}
                      </Text>
                      <Text style={styles.spellSummary}>{spellSummary(spell, language)}</Text>
                    </TouchableOpacity>
                    <View style={styles.spellActions}>
                      {spellbookView === 'catalog' ? (
                        <TouchableOpacity style={[styles.smallAction, known && styles.smallActionActive]} onPress={() => updateSpellbook(spellbookCharacter.id, (value) => toggleKnownSpell(value, spell.id))}>
                          <Text style={[styles.smallActionText, known && styles.smallActionTextActive]}>{known ? tt('Remover') : tt('Adicionar')}</Text>
                        </TouchableOpacity>
                      ) : (
                        <>
                          <TouchableOpacity style={[styles.smallAction, prepared && styles.smallActionActive]} onPress={() => updateSpellbook(spellbookCharacter.id, (value) => togglePreparedSpell(value, spell.id))}>
                            <Text style={[styles.smallActionText, prepared && styles.smallActionTextActive]}>{prepared ? tt('Preparada') : tt('Preparar')}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.castAction} onPress={() => requestConjure(spellbookCharacter.id, spell)}>
                            <Text style={styles.castText}>{tt('Conjurar')}</Text>
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

      <Modal visible={Boolean(castingSpell && spellbookCharacter)} transparent animationType="fade" onRequestClose={() => setCastingSpellId(null)}>
        <View style={styles.detailBackground}>
          <View style={styles.detailCard}>
            <Text style={styles.eyebrow}>{tt('CONJURAR MAGIA')}</Text>
            <Text style={styles.detailTitle}>{spellName(castingSpell, language)}</Text>
            <Text style={styles.muted}>{tt('Escolha qual espaço de magia será consumido.')}</Text>
            <View style={styles.castLevelList}>
              {castingOptions.length === 0 ? (
                <Text style={styles.noResources}>{tt('Nenhum espaço compatível disponível.')}</Text>
              ) : castingOptions.map((option) => (
                <TouchableOpacity
                  key={option.circle}
                  style={styles.castLevelOption}
                  onPress={() => conjure(spellbookCharacter.id, castingSpell.id, option.circle)}
                >
                  <View style={styles.flex}>
                    <Text style={styles.castLevelTitle}>{spellCircleLabel(option.circle, language)}</Text>
                    <Text style={styles.muted}>
                      {option.circle === castingSpell?.circle ? tt('Círculo original') : tt('Nível superior')} · {resourceName(option.resourceName, language)}
                    </Text>
                  </View>
                  <Text style={styles.castLevelCount}>{option.current} {tt('disp.')}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.detailClose} onPress={() => setCastingSpellId(null)}>
              <Text style={styles.primaryText}>{tt('Cancelar')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={Boolean(spellDetail)} transparent animationType="fade" onRequestClose={() => setSpellDetailId(null)}>
        <View style={styles.detailBackground}>
          <View style={styles.detailCard}>
            <Text style={styles.eyebrow}>{spellDetail?.source}</Text>
            <Text style={styles.detailTitle}>{spellName(spellDetail, language)}</Text>
            <Text style={styles.muted}>{spellCircleLabel(spellDetail?.circle, language)} {'\u00b7'} {term(spellDetail?.school)}</Text>
            <View style={styles.detailGrid}>
              <Detail label={tt('Conjuração')} value={spellMetaText(spellDetail?.castingTime, language)} />
              <Detail label={tt('Alcance')} value={spellMetaText(spellDetail?.range, language)} />
              <Detail label={tt('Duração')} value={spellMetaText(spellDetail?.duration, language)} />
              <Detail label={tt('Concentração')} value={spellDetail?.concentration ? tt('Sim') : tt('Não')} />
            </View>
            <Text style={styles.detailSummary}>{spellSummary(spellDetail, language)}</Text>
            <TouchableOpacity style={styles.detailClose} onPress={() => setSpellDetailId(null)}>
              <Text style={styles.primaryText}>{tt('Fechar')}</Text>
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
  castLevelList: { gap: spacing.sm, marginTop: spacing.lg },
  castLevelOption: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, padding: spacing.md },
  castLevelTitle: { color: colors.text, fontSize: 15, fontWeight: '900' },
  castLevelCount: { color: colors.primary, fontSize: 12, fontWeight: '900' },
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
