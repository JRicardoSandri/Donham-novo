import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GroupsScreen from './src/screens/GroupsScreen';
import ResourcesScreen from './src/screens/ResourcesScreen';
import CombatScreen from './src/screens/CombatScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import { CampaignProvider } from './src/services/CampaignContext';
import { colors, shadows } from './src/theme';

export default function App() {
  return (
    <CampaignProvider>
      <AppContent />
    </CampaignProvider>
  );
}

function AppContent() {
  const [area, setArea] = useState('groups');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.screen}>
        {area === 'groups' && <GroupsScreen />}
        {area === 'resources' && <ResourcesScreen />}
        {area === 'combat' && <CombatScreen />}
        {area === 'inventory' && <InventoryScreen />}
      </View>
      <View style={styles.navigation}>
        <NavButton symbol="P" label="Personagens" active={area === 'groups'} onPress={() => setArea('groups')} />
        <NavButton symbol="R" label="Recursos" active={area === 'resources'} onPress={() => setArea('resources')} />
        <NavButton symbol="C" label="Combate" active={area === 'combat'} onPress={() => setArea('combat')} />
        <NavButton symbol="I" label="Itens" active={area === 'inventory'} onPress={() => setArea('inventory')} />
      </View>
    </SafeAreaView>
  );
}

function NavButton({ symbol, label, active, onPress }) {
  return (
    <TouchableOpacity style={[styles.navButton, active && styles.navButtonActive]} onPress={onPress}>
      <View style={[styles.navSymbol, active && styles.navSymbolActive]}>
        <Text style={[styles.navSymbolText, active && styles.navSymbolTextActive]}>{symbol}</Text>
      </View>
      <Text style={[styles.navText, active && styles.navTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  screen: { flex: 1 },
  navigation: { flexDirection: 'row', gap: 6, backgroundColor: colors.backgroundRaised, borderTopColor: colors.border, borderTopWidth: 1, paddingHorizontal: 10, paddingTop: 8, paddingBottom: 10, ...shadows.card },
  navButton: { flex: 1, alignItems: 'center', borderRadius: 14, paddingVertical: 5 },
  navButtonActive: { backgroundColor: colors.surfaceHighlight },
  navSymbol: { width: 28, height: 28, borderRadius: 10, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  navSymbolActive: { backgroundColor: colors.primary },
  navSymbolText: { color: colors.textMuted, fontSize: 11, fontWeight: '900' },
  navSymbolTextActive: { color: colors.background },
  navText: { color: colors.textMuted, fontSize: 9, fontWeight: '800', marginTop: 3 },
  navTextActive: { color: colors.primary },
});
