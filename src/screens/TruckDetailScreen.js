import React from 'react';
import { View, Text, Pressable, Image, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BackIcon,
  ShareIcon,
  HeartIcon,
  MoonIcon,
  StarIcon,
  ClockIcon,
  PinIcon,
  ChevronRight,
} from '../components/icons';
import { colors, radii, shadow } from '../theme';
import { s, f, screen } from '../responsive';
import { getTruck, otherTrucks, TRUCK_IMAGE, TRUCKS } from '../data/trucks';
import { useApp } from '../store/AppContext';

// Hero is roughly half the screen height (matches the reference).
const HERO_H = Math.round(screen.height * 0.46);

export default function TruckDetailScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const truck = getTruck(route.params?.slug) || TRUCKS[0];
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(truck.slug);

  return (
    <View style={styles.root}>
      <LinearGradient colors={colors.gradient} style={StyleSheet.absoluteFill} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + s(30) }}
      >
        {/* Hero — ~half the screen, fades into the background at the bottom */}
        <View style={styles.hero}>
          <Image source={TRUCK_IMAGE} style={styles.heroImg} resizeMode="cover" />
          <LinearGradient colors={['rgba(0,0,0,0.28)', 'transparent']} style={styles.heroScrim} />
          <LinearGradient
            colors={['transparent', 'rgba(251,150,72,0.5)', '#FB923C']}
            style={styles.heroFade}
          />
        </View>

        {/* Info card (overlaps the faded hero) */}
        <LinearGradient colors={['#F9D4E3', '#FDF2E6']} style={styles.infoCard}>
          <View style={styles.infoTop}>
            <Text style={styles.category}>{truck.cuisine.toUpperCase()}</Text>
            <View style={styles.ratingPill}>
              <StarIcon size={s(13)} color={colors.primary} />
              <Text style={styles.ratingText}>{truck.rating}</Text>
            </View>
          </View>

          <Text style={styles.title}>{truck.name}</Text>
          <Text style={styles.desc}>{truck.description}</Text>

          <View style={styles.tiles}>
            <View style={styles.tile}>
              <ClockIcon size={s(16)} color={colors.primary} />
              <Text style={styles.tileLabel}>HOURS</Text>
              <Text style={styles.tileValue}>{truck.hours}</Text>
            </View>
            <View style={styles.tile}>
              <PinIcon size={s(16)} color={colors.primary} />
              <Text style={styles.tileLabel}>SPOT</Text>
              <Text style={styles.tileValue}>{truck.spot}</Text>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [styles.directionsBtn, pressed && styles.pressed]}
            onPress={() => navigation.navigate('Tabs', { screen: 'Map' })}
          >
            <Text style={styles.directionsText}>Directions</Text>
          </Pressable>
        </LinearGradient>

        <View style={styles.body}>
          {/* Menu — ONE panel: the MENU header + section labels + items all live
              inside this card (matches the reference). */}
          <View style={styles.menuCard}>
            <Text style={styles.menuHeader}>MENU</Text>
            {truck.menu.map((section) => (
              <View key={section.section}>
                <Text style={styles.menuSectionName}>{section.section}</Text>
                {section.items.map((item, i) => (
                  <View key={item.name} style={[styles.menuRow, i > 0 && styles.menuRowDivider]}>
                    <View style={styles.menuItemLeft}>
                      <Text style={styles.menuName}>{item.name}</Text>
                      <Text style={styles.menuDesc} numberOfLines={2}>
                        {item.desc}
                      </Text>
                    </View>
                    <View style={styles.menuItemRight}>
                      <Text style={styles.price}>${item.price}</Text>
                      <Pressable
                        style={({ pressed }) => [styles.orderBtn, pressed && styles.pressed]}
                      >
                        <Text style={styles.orderText}>Order</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* More to explore — outside the card */}
          <Text style={styles.sectionEyebrow}>MORE TO EXPLORE</Text>
          {otherTrucks(truck.slug).map((t) => (
            <Pressable
              key={t.slug}
              style={({ pressed }) => [styles.exploreRow, pressed && styles.pressed]}
              onPress={() => navigation.push('TruckDetail', { slug: t.slug })}
            >
              <Image source={TRUCK_IMAGE} style={styles.exploreThumb} resizeMode="cover" />
              <View style={styles.exploreInfo}>
                <Text style={styles.exploreName} numberOfLines={1}>
                  {t.name}
                </Text>
                <Text style={styles.exploreMeta}>
                  {t.cuisine} · {t.distance}
                </Text>
              </View>
              <ChevronRight size={s(20)} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Fixed overlay controls */}
      <View style={[styles.overlay, { top: insets.top + s(8) }]}>
        <Pressable style={styles.circleBtn} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={s(20)} color={colors.text} />
        </Pressable>
        <View style={styles.overlayRight}>
          {/* moon on top; share + like in a row beneath it (like under the moon) */}
          <Pressable style={styles.circleBtn} hitSlop={6}>
            <MoonIcon size={s(18)} color={colors.text} />
          </Pressable>
          <View style={styles.overlayRow}>
            <Pressable style={styles.circleBtn} hitSlop={6}>
              <ShareIcon size={s(18)} color={colors.text} />
            </Pressable>
            <Pressable
              style={[styles.circleBtn, styles.heartBtn]}
              onPress={() => toggleFavorite(truck.slug)}
              hitSlop={6}
            >
              <HeartIcon size={s(18)} color={fav ? colors.primary : colors.text} filled={fav} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  // Hero
  hero: { height: HERO_H, width: '100%' },
  heroImg: { width: '100%', height: '100%' },
  heroScrim: { position: 'absolute', top: 0, left: 0, right: 0, height: s(90) },
  heroFade: { position: 'absolute', bottom: 0, left: 0, right: 0, height: Math.round(HERO_H * 0.45) },

  // Overlay controls
  overlay: {
    position: 'absolute',
    left: s(16),
    right: s(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  overlayRight: { alignItems: 'flex-end' },
  overlayRow: { flexDirection: 'row', marginTop: s(8) },
  circleBtn: {
    width: s(40),
    height: s(40),
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartBtn: { marginLeft: s(8) }, // to the right of share, directly under the moon

  // Info card
  infoCard: {
    marginTop: -s(60),
    marginHorizontal: s(16),
    borderRadius: s(24),
    padding: s(18),
    ...shadow.card,
  },
  infoTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  category: { fontSize: f(12), fontWeight: '800', letterSpacing: 1.5, color: colors.primary },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: radii.pill,
    paddingHorizontal: s(10),
    paddingVertical: s(4),
  },
  ratingText: { marginLeft: s(4), fontSize: f(13), fontWeight: '700', color: colors.text },
  title: { marginTop: s(8), fontSize: f(27), fontWeight: '800', color: colors.text },
  desc: { marginTop: s(6), fontSize: f(14), lineHeight: f(20), color: colors.textMuted },

  tiles: { flexDirection: 'row', marginTop: s(16), gap: s(12) },
  tile: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: s(16),
    padding: s(12),
  },
  tileLabel: {
    marginTop: s(6),
    fontSize: f(10),
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.textMuted,
  },
  tileValue: { marginTop: s(3), fontSize: f(13.5), fontWeight: '700', color: colors.text },

  directionsBtn: {
    marginTop: s(16),
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: s(15),
    alignItems: 'center',
    ...shadow.card,
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
  },
  directionsText: { color: '#fff', fontSize: f(16), fontWeight: '700' },

  // Body (menu + more)
  body: { paddingHorizontal: s(20), paddingTop: s(20) },

  // Menu panel (header + sections + items all inside)
  menuCard: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: s(20),
    paddingHorizontal: s(16),
    paddingTop: s(16),
    paddingBottom: s(8),
    marginBottom: s(22),
  },
  menuHeader: { fontSize: f(12), fontWeight: '800', letterSpacing: 1.5, color: colors.primary },
  menuSectionName: {
    fontSize: f(11.5),
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.textMuted,
    marginTop: s(12),
    marginBottom: s(2),
  },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: s(13) },
  menuRowDivider: { borderTopWidth: 1, borderTopColor: 'rgba(31,18,53,0.08)' },
  menuItemLeft: { flex: 1, marginRight: s(10) },
  menuName: { fontSize: f(15.5), fontWeight: '700', color: colors.text },
  menuDesc: { marginTop: s(3), fontSize: f(12.5), lineHeight: f(17), color: colors.textMuted },
  menuItemRight: { alignItems: 'flex-end' },
  price: { fontSize: f(16), fontWeight: '800', color: colors.text },
  orderBtn: {
    marginTop: s(8),
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: s(15),
    paddingVertical: s(7),
  },
  orderText: { fontSize: f(12.5), fontWeight: '700', color: '#fff' },

  // More to explore
  sectionEyebrow: {
    fontSize: f(12),
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.textMuted,
    marginBottom: s(10),
  },
  exploreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: s(16),
    padding: s(10),
    marginBottom: s(10),
  },
  exploreThumb: {
    width: s(54),
    height: s(54),
    borderRadius: s(12),
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  exploreInfo: { flex: 1, marginLeft: s(12) },
  exploreName: { fontSize: f(15), fontWeight: '700', color: colors.text },
  exploreMeta: { marginTop: s(3), fontSize: f(12.5), color: colors.textMuted },

  pressed: { opacity: 0.85 },
});
