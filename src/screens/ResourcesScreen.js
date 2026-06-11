import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RECOVERY } from '../data/classProgression';
import { useCampaign } from '../services/CampaignContext';
import { recoverResources, spendResource } from '../services/resourceService';
import { levelFromXp } from '../services/rulesService';
import { colors, radii, spacing } from '../theme';

export default function ResourcesScreen() {
  const { state, setState } = useCampaign();

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

      {characters.map((character) => (
        <View key={character.id} style={styles.card}>
          <Text style={styles.cardTitle}>{character.name}</Text>
          <Text style={styles.muted}>{character.classKey} · nível {levelFromXp(character.xp)} · {character.xp} XP</Text>

          <View style={styles.tokenRow}>
            <Token label="Inspiração" value={character.inspiration || 0} onMinus={() => changeToken(character.id, 'inspiration', -1)} onPlus={() => changeToken(character.id, 'inspiration', 1)} />
            <Token label="Pontos de Enredo" value={character.plotPoints || 0} onMinus={() => changeToken(character.id, 'plotPoints', -1)} onPlus={() => changeToken(character.id, 'plotPoints', 1)} />
          </View>

          {(character.resources || []).length === 0 ? (
            <Text style={styles.noResources}>Esta classe não possui recursos automáticos neste nível.</Text>
          ) : character.resources.map((item) => (
            <View key={item.id} style={styles.resource}>
              <View style={styles.flex}>
                <Text style={styles.resourceName}>{item.name}</Text>
                <Text style={styles.muted}>Recupera em descanso {item.recovery === RECOVERY.SHORT ? 'curto' : 'longo'}</Text>
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
    </ScrollView>
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
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '900' },
  muted: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  noResources: { color: colors.textMuted, marginTop: spacing.md },
  globalActions: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  globalRest: { flex: 1, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', padding: 12 },
  tokenRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  token: { flex: 1, backgroundColor: colors.primarySoft, borderRadius: radii.md, padding: spacing.sm },
  tokenLabel: { color: colors.primary, fontSize: 11, fontWeight: '900', textAlign: 'center' },
  tokenControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.sm },
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
});
