import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, shadow } from '../theme';


export function BlurPill({ children, style }) {
  return <View style={[styles.pill, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    ...shadow.card,
  },
});
