import React, { useCallback, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import AppSplashScreen from './src/components/AppSplashScreen';
import { FadeInView, PressableScale } from './src/components/MicroInteractions';
import GroupsScreen from './src/screens/GroupsScreen';
import ResourcesScreen from './src/screens/ResourcesScreen';
import CombatScreen from './src/screens/CombatScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { CampaignProvider, useCampaign } from './src/services/CampaignContext';
import { activeLanguage, t } from './src/services/i18nService';
import { colors, shadows } from './src/theme';

export default function App() {
  return (
    <CampaignProvider>
      <AppContent />
    </CampaignProvider>
  );
}

function AppContent() {
  const { state, setState } = useCampaign();
  const [area, setArea] = useState('groups');
  const [showSplash, setShowSplash] = useState(true);
  const finishSplash = useCallback(() => setShowSplash(false), []);
  const language = activeLanguage(state?.settings);

  return (
    <View style={styles.appRoot}>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <FadeInView animationKey={area} style={styles.screen}>
          {area === 'groups' && <GroupsScreen language={language} />}
          {area === 'resources' && <ResourcesScreen language={language} />}
          {area === 'combat' && <CombatScreen language={language} />}
          {area === 'inventory' && <InventoryScreen language={language} />}
          {area === 'settings' && <SettingsScreen language={language} settings={state?.settings} onSettingsChange={setState} />}
        </FadeInView>
        <View style={styles.navigation}>
          <NavButton symbol="♙" label={t('navCharacters', language)} active={area === 'groups'} onPress={() => setArea('groups')} />
          <NavButton symbol="✦" label={t('navResources', language)} active={area === 'resources'} onPress={() => setArea('resources')} />
          <NavButton symbol="⚔" label={t('navCombat', language)} active={area === 'combat'} onPress={() => setArea('combat')} />
          <NavButton symbol="▣" label={t('navItems', language)} active={area === 'inventory'} onPress={() => setArea('inventory')} />
          <NavButton symbol="⚙" label={t('navSettings', language)} active={area === 'settings'} onPress={() => setArea('settings')} />
        </View>
      </SafeAreaView>
      {showSplash && <AppSplashScreen onFinish={finishSplash} />}
    </View>
  );
}

function NavButton({ symbol, label, active, onPress }) {
  return (
    <PressableScale style={[styles.navButton, active && styles.navButtonActive]} onPress={onPress}>
      <View style={[styles.navSymbol, active && styles.navSymbolActive]}>
        <Text style={[styles.navSymbolText, active && styles.navSymbolTextActive]}>{symbol}</Text>
      </View>
      <Text style={[styles.navText, active && styles.navTextActive]}>{label}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  appRoot: { flex: 1, backgroundColor: colors.background },
  safe: { flex: 1, backgroundColor: colors.background },
  screen: { flex: 1 },
  navigation: { flexDirection: 'row', gap: 6, backgroundColor: colors.backgroundRaised, borderTopColor: colors.border, borderTopWidth: 1, paddingHorizontal: 10, paddingTop: 8, paddingBottom: 10, ...shadows.card },
  navButton: { flex: 1, alignItems: 'center', borderRadius: 14, paddingVertical: 5 },
  navButtonActive: { backgroundColor: colors.surfaceHighlight },
  navSymbol: { width: 30, height: 30, borderRadius: 11, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  navSymbolActive: { backgroundColor: colors.primary },
  navSymbolText: { color: colors.textMuted, fontSize: 16, fontWeight: '900' },
  navSymbolTextActive: { color: colors.background },
  navText: { color: colors.textMuted, fontSize: 9, fontWeight: '800', marginTop: 3 },
  navTextActive: { color: colors.primary },
});
