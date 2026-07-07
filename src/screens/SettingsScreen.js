import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LANGUAGES, activeLanguage, t } from '../services/i18nService';
import { colors, radii, spacing } from '../theme';

export default function SettingsScreen({ language, settings = {}, onSettingsChange }) {
  const currentLanguage = language;
  const manualMode = settings.languageMode === 'manual';

  function updateSettings(patch) {
    onSettingsChange((old) => ({
      ...old,
      settings: {
        ...(old.settings || {}),
        ...patch,
      },
    }));
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>RPG COMBAT TRACKER</Text>
      <Text style={styles.title}>{t('settingsTitle', currentLanguage)}</Text>
      <Text style={styles.subtitle}>{t('settingsSubtitle', currentLanguage)}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('languageTitle', currentLanguage)}</Text>
        <TouchableOpacity
          style={[styles.option, !manualMode && styles.optionActive]}
          onPress={() => updateSettings({ languageMode: 'auto' })}
        >
          <Text style={styles.optionText}>{t('languageAuto', currentLanguage)}</Text>
          <Text style={styles.muted}>{activeLanguage({ languageMode: 'auto' })}</Text>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>{t('languageManual', currentLanguage)}</Text>
        {LANGUAGES.map((item) => {
          const selected = manualMode && currentLanguage === item.code;
          return (
            <TouchableOpacity
              key={item.code}
              style={[styles.option, selected && styles.optionActive]}
              onPress={() => updateSettings({ languageMode: 'manual', language: item.code })}
            >
              <Text style={[styles.optionText, selected && styles.optionTextActive]}>{item.label}</Text>
              <Text style={styles.muted}>{item.code}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: 64 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 28, fontWeight: '900', marginTop: 6 },
  subtitle: { color: colors.textMuted, lineHeight: 20, marginTop: 6, marginBottom: spacing.lg },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, padding: spacing.lg },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '900', marginBottom: spacing.md },
  sectionLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '900', marginTop: spacing.md, marginBottom: spacing.sm },
  option: { borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, marginBottom: spacing.sm, padding: spacing.md },
  optionActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  optionText: { color: colors.text, fontWeight: '900' },
  optionTextActive: { color: colors.primary },
  muted: { color: colors.textMuted, fontSize: 12, marginTop: 3 },
});
