import React, { useState } from 'react';
import { View, Text, Pressable, Image, ScrollView, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Circle, Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SendIcon, PinIcon } from '../components/icons';
import { colors, radii, shadow } from '../theme';
import { s, f } from '../responsive';
import { TRUCKS, TRUCK_IMAGE, getTruck } from '../data/trucks';
import { useApp } from '../store/AppContext';

// Pin positions on the stylized map (fraction of the screen).
const PINS = {
  'slider-station': { x: 0.62, y: 0.3 },
  'bao-box': { x: 0.28, y: 0.44 },
  'finlos-tacos': { x: 0.72, y: 0.46 },
  milkstone: { x: 0.24, y: 0.22 },
};
const USER = { x: 0.46, y: 0.37 };

// Stylized SF-style map (Expo Go can't run native maps without a dev build).
function FauxMap() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <Rect x="0" y="0" width="400" height="800" fill="#E9E3D6" />
      {/* water corner (the bay) */}
      <Path d="M300 0 L400 0 L400 160 Q350 80 300 0 Z" fill="#AED6E8" />
      {/* parks */}
      <Rect x="34" y="330" width="100" height="78" rx="16" fill="#C2E2AC" />
      <Circle cx="305" cy="500" r="54" fill="#C2E2AC" />
      {/* main roads */}
      <Line x1="-10" y1="200" x2="410" y2="168" stroke="#FFFFFF" strokeWidth="11" />
      <Line x1="-10" y1="430" x2="410" y2="470" stroke="#FFFFFF" strokeWidth="11" />
      <Line x1="-10" y1="640" x2="410" y2="612" stroke="#FFFFFF" strokeWidth="9" />
      <Line x1="100" y1="-10" x2="135" y2="810" stroke="#FFFFFF" strokeWidth="10" />
      <Line x1="258" y1="-10" x2="238" y2="810" stroke="#FFFFFF" strokeWidth="10" />
      {/* minor roads */}
      <Line x1="-10" y1="310" x2="410" y2="326" stroke="#F4F1EA" strokeWidth="6" />
      <Line x1="-10" y1="548" x2="410" y2="532" stroke="#F4F1EA" strokeWidth="6" />
      <Line x1="182" y1="-10" x2="168" y2="810" stroke="#F4F1EA" strokeWidth="6" />
      <Line x1="344" y1="-10" x2="332" y2="810" stroke="#F4F1EA" strokeWidth="6" />
    </Svg>
  );
}

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { isFavorite } = useApp();
  const [filter, setFilter] = useState('nearby'); // 'nearby' | 'favorites'
  const [selected, setSelected] = useState(null); // slug

  const rows = filter === 'favorites' ? TRUCKS.filter((t) => isFavorite(t.slug)) : TRUCKS;
  const selTruck = selected ? getTruck(selected) : null;
  const sheetBottom = Math.max(insets.bottom, 10) + s(74); // clear the floating tab bar

  return (
    <View style={styles.root}>
      {/* Map */}
      <View style={StyleSheet.absoluteFill}>
        <FauxMap />
      </View>

      {/* User location */}
      <View style={[styles.userRing, { left: `${USER.x * 100}%`, top: `${USER.y * 100}%` }]} />
      <View style={[styles.userDot, { left: `${USER.x * 100}%`, top: `${USER.y * 100}%` }]} />

      {/* Truck pins */}
      {TRUCKS.map((t) => {
        const p = PINS[t.slug];
        if (!p) return null;
        const isSel = selected === t.slug;
        return (
          <Pressable
            key={t.slug}
            onPress={() => setSelected(t.slug)}
            style={[
              styles.pin,
              { left: `${p.x * 100}%`, top: `${p.y * 100}%` },
              { backgroundColor: isSel ? '#EC4899' : colors.primary },
              isSel && styles.pinSelected,
            ]}
          >
            <PinIcon size={s(13)} color="#fff" />
          </Pressable>
        );
      })}

      {/* Header card */}
      <View style={[styles.headerCard, { top: insets.top + s(10) }]} pointerEvents="none">
        <Text style={styles.eyebrow}>LIVE MAP</Text>
        <Text style={styles.h1}>Nearby caravans</Text>
      </View>

      {/* Controls */}
      <View style={[styles.controls, { top: insets.top + s(10) }]}>
        <Pressable style={styles.ctrlBtn} hitSlop={6}>
          <PinIcon size={s(18)} color={colors.primary} />
        </Pressable>
        <View style={styles.zoom}>
          <Pressable style={styles.zoomBtn} hitSlop={4}>
            <Text style={styles.zoomTxt}>+</Text>
          </Pressable>
          <View style={styles.zoomDivider} />
          <Pressable style={styles.zoomBtn} hitSlop={4}>
            <Text style={styles.zoomTxt}>−</Text>
          </Pressable>
        </View>
      </View>

      {/* Bottom sheet */}
      <View style={[styles.sheet, { bottom: sheetBottom }]}>
        <View style={styles.handle} />

        <View style={styles.toggleRow}>
          {['nearby', 'favorites'].map((key) => (
            <Pressable
              key={key}
              style={[styles.toggle, filter === key && styles.toggleActive]}
              onPress={() => setFilter(key)}
            >
              <Text style={[styles.toggleTxt, filter === key && styles.toggleTxtActive]}>
                {key === 'nearby' ? 'Nearby' : 'Favorites'}
              </Text>
            </Pressable>
          ))}
        </View>

        {selTruck && (
          <View style={styles.routeBanner}>
            <Text style={styles.routeText} numberOfLines={1}>
              Route to {selTruck.name}
            </Text>
            <Text style={styles.routeDist}>{selTruck.distance}</Text>
            <Pressable onPress={() => setSelected(null)} hitSlop={8}>
              <Text style={styles.routeClose}>✕</Text>
            </Pressable>
          </View>
        )}

        {rows.length === 0 ? (
          <Text style={styles.empty}>No favorites yet — tap a heart to save one.</Text>
        ) : (
          <ScrollView style={styles.sheetScroll} showsVerticalScrollIndicator={false}>
            {rows.map((t) => {
              const isSel = selected === t.slug;
              return (
                <Pressable key={t.slug} style={styles.sheetRow} onPress={() => setSelected(t.slug)}>
                  <Image source={TRUCK_IMAGE} style={styles.sheetThumb} resizeMode="cover" />
                  <View style={styles.sheetInfo}>
                    <Text style={styles.sheetName} numberOfLines={1}>
                      {t.name}
                    </Text>
                    <Text style={styles.sheetMeta}>
                      {t.cuisine} · {t.distance}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: t.open ? colors.openDot : colors.closedDot },
                    ]}
                  />
                  <Pressable
                    style={[styles.sendBtn, isSel && styles.sendBtnActive]}
                    onPress={() => setSelected(t.slug)}
                    hitSlop={6}
                  >
                    <SendIcon size={s(16)} color={isSel ? '#fff' : colors.primary} />
                  </Pressable>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#E9E3D6' },

  // Pins
  pin: {
    position: 'absolute',
    width: s(30),
    height: s(30),
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -s(15),
    marginTop: -s(15),
    ...shadow.card,
    shadowOpacity: 0.25,
  },
  pinSelected: { transform: [{ scale: 1.18 }] },
  userDot: {
    position: 'absolute',
    width: s(16),
    height: s(16),
    borderRadius: radii.pill,
    backgroundColor: '#3B82F6',
    borderWidth: 3,
    borderColor: '#fff',
    marginLeft: -s(8),
    marginTop: -s(8),
  },
  userRing: {
    position: 'absolute',
    width: s(38),
    height: s(38),
    borderRadius: radii.pill,
    backgroundColor: 'rgba(59,130,246,0.18)',
    marginLeft: -s(19),
    marginTop: -s(19),
  },

  // Header card
  headerCard: {
    position: 'absolute',
    left: s(16),
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: s(20),
    paddingHorizontal: s(18),
    paddingVertical: s(12),
    ...shadow.card,
    shadowOpacity: 0.12,
  },
  eyebrow: { fontSize: f(12), fontWeight: '700', letterSpacing: 1.5, color: colors.textMuted },
  h1: { fontSize: f(24), fontWeight: '800', color: colors.text, marginTop: s(2) },

  // Controls
  controls: { position: 'absolute', right: s(16), alignItems: 'center' },
  ctrlBtn: {
    width: s(40),
    height: s(40),
    borderRadius: radii.pill,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(10),
    ...shadow.card,
    shadowOpacity: 0.18,
  },
  zoom: {
    backgroundColor: '#fff',
    borderRadius: s(14),
    overflow: 'hidden',
    ...shadow.card,
    shadowOpacity: 0.18,
  },
  zoomBtn: { width: s(40), height: s(40), alignItems: 'center', justifyContent: 'center' },
  zoomTxt: { fontSize: f(22), fontWeight: '500', color: colors.text },
  zoomDivider: { height: 1, backgroundColor: 'rgba(0,0,0,0.08)' },

  // Bottom sheet
  sheet: {
    position: 'absolute',
    left: s(12),
    right: s(12),
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: s(24),
    padding: s(14),
    ...shadow.card,
  },
  handle: {
    alignSelf: 'center',
    width: s(40),
    height: s(4),
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.12)',
    marginBottom: s(12),
  },
  toggleRow: { flexDirection: 'row', marginBottom: s(10) },
  toggle: {
    backgroundColor: 'rgba(124,58,237,0.08)',
    borderRadius: radii.pill,
    paddingHorizontal: s(16),
    paddingVertical: s(8),
    marginRight: s(10),
  },
  toggleActive: { backgroundColor: colors.primary },
  toggleTxt: { fontSize: f(13.5), fontWeight: '700', color: colors.primary },
  toggleTxtActive: { color: '#fff' },

  routeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124,58,237,0.1)',
    borderRadius: s(12),
    paddingHorizontal: s(12),
    paddingVertical: s(10),
    marginBottom: s(8),
  },
  routeText: { flex: 1, fontSize: f(13), fontWeight: '700', color: colors.primary },
  routeDist: { fontSize: f(12.5), color: colors.textMuted, marginRight: s(10) },
  routeClose: { fontSize: f(15), color: colors.textMuted, fontWeight: '700' },

  // Show ~3 rows; the rest scrolls.
  sheetScroll: { maxHeight: s(204) },
  sheetRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: s(8) },
  sheetThumb: {
    width: s(46),
    height: s(46),
    borderRadius: s(12),
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  sheetInfo: { flex: 1, marginLeft: s(12) },
  sheetName: { fontSize: f(14.5), fontWeight: '700', color: colors.text },
  sheetMeta: { marginTop: s(2), fontSize: f(12), color: colors.textMuted },
  statusDot: { width: s(8), height: s(8), borderRadius: radii.pill, marginRight: s(10) },
  sendBtn: {
    width: s(38),
    height: s(38),
    borderRadius: radii.pill,
    backgroundColor: 'rgba(124,58,237,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: { backgroundColor: colors.primary },
  empty: { textAlign: 'center', color: colors.textMuted, paddingVertical: s(16), fontSize: f(13) },
});
