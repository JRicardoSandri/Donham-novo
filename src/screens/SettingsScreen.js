import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FadeInView, PressableScale } from '../components/MicroInteractions';
import { LANGUAGES, activeLanguage, t } from '../services/i18nService';
import { colors, radii, spacing } from '../theme';
import HelpScreen from './HelpScreen';

export default function SettingsScreen({ language, settings = {}, onSettingsChange }) {
  const currentLanguage = language;
  const manualMode = settings.languageMode === 'manual';
  const [showHelp, setShowHelp] = useState(false);

  function updateSettings(patch) {
    onSettingsChange((old) => ({
      ...old,
      settings: {
        ...(old.settings || {}),
        ...patch,
      },
    }));
  }

  if (showHelp) {
    return (
      <View style={styles.helpContainer}>
        <PressableScale style={styles.backButton} onPress={() => setShowHelp(false)}>
          <Text style={styles.backButtonText}>{t('helpBackSettings', currentLanguage)}</Text>
        </PressableScale>
        <HelpScreen language={currentLanguage} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>{t('RPG COMBAT TRACKER', currentLanguage)}</Text>
      <Text style={styles.title}>{t('settingsTitle', currentLanguage)}</Text>
      <Text style={styles.subtitle}>{t('settingsSubtitle', currentLanguage)}</Text>

      <FadeInView animationKey="settings-help" style={styles.card}>
        <Text style={styles.cardTitle}>{t('settingsHelpTitle', currentLanguage)}</Text>
        <Text style={styles.mutedBlock}>{t('settingsHelpSubtitle', currentLanguage)}</Text>
        <PressableScale style={styles.helpButton} onPress={() => setShowHelp(true)}>
          <Text style={styles.helpButtonText}>{t('settingsOpenHelp', currentLanguage)}</Text>
        </PressableScale>
      </FadeInView>

      <FadeInView animationKey="settings-language" delay={40} style={styles.card}>
        <Text style={styles.cardTitle}>{t('languageTitle', currentLanguage)}</Text>
        <PressableScale
          style={[styles.option, !manualMode && styles.optionActive]}
          onPress={() => updateSettings({ languageMode: 'auto' })}
        >
          <Text style={styles.optionText}>{t('languageAuto', currentLanguage)}</Text>
          <Text style={styles.muted}>{activeLanguage({ languageMode: 'auto' })}</Text>
        </PressableScale>

        <Text style={styles.sectionLabel}>{t('languageManual', currentLanguage)}</Text>
        {LANGUAGES.map((item) => {
          const selected = manualMode && currentLanguage === item.code;
          return (
            <PressableScale
              key={item.code}
              style={[styles.option, selected && styles.optionActive]}
              onPress={() => updateSettings({ languageMode: 'manual', language: item.code })}
            >
              <Text style={[styles.optionText, selected && styles.optionTextActive]}>{item.label}</Text>
              <Text style={styles.muted}>{item.code}</Text>
            </PressableScale>
          );
        })}
      </FadeInView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: 64 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 28, fontWeight: '900', marginTop: 6 },
  subtitle: { color: colors.textMuted, lineHeight: 20, marginTop: 6, marginBottom: spacing.lg },
  helpContainer: { flex: 1, backgroundColor: colors.background },
  backButton: { alignSelf: 'flex-start', backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.pill, marginLeft: spacing.lg, marginTop: spacing.lg, paddingHorizontal: 14, paddingVertical: 10 },
  backButtonText: { color: colors.primary, fontWeight: '900' },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.md },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '900', marginBottom: spacing.md },
  mutedBlock: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginBottom: spacing.md },
  helpButton: { backgroundColor: colors.primary, borderRadius: radii.md, alignItems: 'center', paddingVertical: 13 },
  helpButtonText: { color: colors.background, fontWeight: '900' },
  sectionLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '900', marginTop: spacing.md, marginBottom: spacing.sm },
  option: { borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, marginBottom: spacing.sm, padding: spacing.md },
  optionActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  optionText: { color: colors.text, fontWeight: '900' },
  optionTextActive: { color: colors.primary },
  muted: { color: colors.textMuted, fontSize: 12, marginTop: 3 },
});
