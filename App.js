import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CompanionScreen from './src/screens/CompanionScreen';
import GroupsScreen from './src/screens/GroupsScreen';
import ResourcesScreen from './src/screens/ResourcesScreen';
import CombatScreen from './src/screens/CombatScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import { colors } from './src/theme';

export default function App() {
  const [area, setArea] = useState('groups');

  if (area === 'legacy') {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setArea('groups')}>
          <Text style={styles.backText}>Voltar para grupos</Text>
        </TouchableOpacity>
        <CompanionScreen />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.screen}>
        {area === 'groups' && <GroupsScreen onOpenLegacy={() => setArea('legacy')} />}
        {area === 'resources' && <ResourcesScreen />}
        {area === 'combat' && <CombatScreen />}
        {area === 'inventory' && <InventoryScreen />}
      </View>
      <View style={styles.navigation}>
        <NavButton label="Grupos" active={area === 'groups'} onPress={() => setArea('groups')} />
        <NavButton label="Recursos" active={area === 'resources'} onPress={() => setArea('resources')} />
        <NavButton label="Combate" active={area === 'combat'} onPress={() => setArea('combat')} />
        <NavButton label="Itens" active={area === 'inventory'} onPress={() => setArea('inventory')} />
      </View>
    </SafeAreaView>
  );
}

function NavButton({ label, active, onPress }) {
  return (
    <TouchableOpacity style={[styles.navButton, active && styles.navButtonActive]} onPress={onPress}>
      <Text style={[styles.navText, active && styles.navTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },
  screen: { flex: 1 },
  navigation: { flexDirection: 'row', gap: 8, backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1, padding: 10 },
  navButton: { flex: 1, alignItems: 'center', borderRadius: 10, padding: 10 },
  navButtonActive: { backgroundColor: colors.primary },
  navText: { color: colors.textMuted, fontWeight: '900' },
  navTextActive: { color: colors.background },
  backButton: {
    backgroundColor: colors.surface,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backText: { color: colors.primary, fontWeight: '800' },
});
