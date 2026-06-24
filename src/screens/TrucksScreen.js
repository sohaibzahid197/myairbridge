import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import { StarIcon, ChevronRight } from '../components/icons';
import { colors, radii } from '../theme';
import { s, f } from '../responsive';
import { TRUCKS, TRUCK_IMAGE } from '../data/trucks';

export default function TrucksScreen({ navigation }) {
  return (
    <Screen scroll edges={['top']} bottomInset={s(80)} contentStyle={styles.content}>
      {/* Header */}
      <Text style={styles.eyebrow}>YOUR ROSTER</Text>
      <Text style={styles.h1}>All trucks in your city</Text>

      {/* Rows */}
      <View style={styles.list}>
        {TRUCKS.map((t) => (
          <Pressable
            key={t.slug}
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}
            onPress={() => navigation.navigate('TruckDetail', { slug: t.slug })}
          >
            <Image source={TRUCK_IMAGE} style={styles.thumb} resizeMode="cover" />
            <View style={styles.info}>
              <View style={styles.nameRow}>
                <Text style={styles.name} numberOfLines={1}>
                  {t.name}
                </Text>
                <View
                  style={[styles.dot, { backgroundColor: t.open ? colors.openDot : colors.closedDot }]}
                />
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.meta}>
                  {t.cuisine} · {t.distance} ·{' '}
                </Text>
                <StarIcon size={s(12)} color={colors.textMuted} />
                <Text style={styles.meta}> {t.rating}</Text>
              </View>
            </View>
            <ChevronRight size={s(20)} color={colors.textMuted} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: s(20) },

  eyebrow: {
    marginTop: s(4),
    fontSize: f(12),
    fontWeight: '700',
    letterSpacing: 1.5,
    color: colors.textMuted,
  },
  h1: { marginTop: s(4), fontSize: f(26), fontWeight: '800', color: colors.text },

  list: { marginTop: s(18) },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: s(20),
    padding: s(12),
    marginBottom: s(14),
  },
  thumb: {
    width: s(64),
    height: s(64),
    borderRadius: s(14),
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  info: { flex: 1, marginLeft: s(12) },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: f(16), fontWeight: '800', color: colors.text, flexShrink: 1 },
  dot: { width: s(8), height: s(8), borderRadius: radii.pill, marginLeft: s(8) },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: s(4) },
  meta: { fontSize: f(12.5), color: colors.textMuted },

  pressed: { opacity: 0.9 },
});
