import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RECOVERY } from '../data/classProgression';
import { loadCampaignState, saveCampaignState } from '../services/campaignService';
import { recoverResources, resourcesForCharacter, spendResource } from '../services/resourceService';
import { levelFromXp } from '../services/rulesService';
import { colors, radii, spacing } from '../theme';

export default function ResourcesScreen() {
  const [state, setState] = useState(null);

  useEffect(() => {
    loadCampaignState().then((saved) => {
      setState({
        ...saved,
        characters: saved.characters.map((character) => ({
          ...character,
          resources: resourcesForCharacter(character),
        })),
      });
    });
  }, []);

  useEffect(() => {
    if (state) saveCampaignState(state);
  }, [state]);

  const characters = useMemo(() => state?.characters || [], [state]);

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

  if (!state) return <Text style={styles.loading}>Carregando recursos...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>PROGRESSÃO AUTOMÁTICA</Text>
      <Text style={styles.title}>Recursos e magias</Text>
      <Text style={styles.subtitle}>Classe e XP determinam automaticamente recursos e espaços de magia.</Text>

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

          {(character.resources || []).length === 0 ? (
            <Text style={styles.noResources}>Esta classe não possui recursos automáticos neste nível.</Text>
          ) : character.resources.map((item) => (
            <View key={item.id} style={styles.resource}>
              <View style={styles.flex}>
                <Text style={styles.resourceName}>{item.name}</Text>
                <Text style={styles.muted}>Recupera em descanso {item.recovery === RECOVERY.SHORT ? 'curto' : 'longo'}</Text>
              </View>
              <TouchableOpacity style={styles.control} onPress={() => updateResources(character.id, (items) => spendResource(items, item.id, -1))}>
                <Text style={styles.controlText}>−</Text>
              </TouchableOpacity>
              <Text style={[styles.count, item.current === 0 && styles.emptyCount]}>{item.current}/{item.max}</Text>
              <TouchableOpacity style={styles.control} onPress={() => updateResources(character.id, (items) => spendResource(items, item.id, 1))}>
                <Text style={styles.controlText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.rest} onPress={() => updateResources(character.id, (items) => recoverResources(items, RECOVERY.SHORT))}>
              <Text style={styles.restText}>Descanso curto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rest} onPress={() => updateResources(character.id, (items) => recoverResources(items, RECOVERY.LONG))}>
              <Text style={styles.restText}>Descanso longo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
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
  resource: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, borderTopColor: colors.border, borderTopWidth: 1, marginTop: spacing.md, paddingTop: spacing.md },
  flex: { flex: 1 },
  resourceName: { color: colors.text, fontSize: 13, fontWeight: '800' },
  control: { width: 36, height: 36, borderRadius: radii.sm, backgroundColor: colors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  controlText: { color: colors.text, fontSize: 22, fontWeight: '900' },
  count: { color: colors.primary, minWidth: 46, textAlign: 'center', fontWeight: '900' },
  emptyCount: { color: colors.danger },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  rest: { flex: 1, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', padding: 12 },
  restText: { color: colors.text, fontWeight: '800' },
});
