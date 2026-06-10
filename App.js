import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CompanionScreen from './src/screens/CompanionScreen';
import GroupsScreen from './src/screens/GroupsScreen';
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
      <GroupsScreen onOpenLegacy={() => setArea('legacy')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },
  backButton: {
    backgroundColor: colors.surface,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backText: { color: colors.primary, fontWeight: '800' },
});
