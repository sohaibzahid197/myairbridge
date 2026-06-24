import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from './Screen';
import { colors } from '../theme';

export default function Placeholder({ title }) {
  return (
    <Screen>
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>Coming in a later build step</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  sub: { marginTop: 8, color: colors.textMuted },
});
