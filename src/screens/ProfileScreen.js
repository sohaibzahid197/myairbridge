import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import { MoonIcon, HeartIcon, TrophyIcon, BoltIcon } from '../components/icons';
import { colors, radii, shadow } from '../theme';
import { s, f } from '../responsive';
import { FOODIE } from '../data/user';
import { getTruck, TRUCK_IMAGE } from '../data/trucks';
import { useApp } from '../store/AppContext';

// Magenta heart that fronts the "FAVORITE TRUCKS" label (bottom gradient stop).
const MAGENTA = '#EC4899';

// Single solid card colour. Opaque (not translucent) so the warm background
// gradient can't bleed through and make a card look two-toned.
const CARD_BG = '#E8E8ED';

// "2450" -> "2,450" (Hermes' toLocaleString grouping isn't reliable).
const groupNum = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// "Ada Reyes" -> "AR"; falls back to a single letter or "?".
const initialsOf = (name) => {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
};

// Foodie Profile (Step 8) — matches walkthrough frames f_138–141 + ANALYSIS §8.
export default function ProfileScreen({ navigation }) {
  const { togglePersona, favorites, profile, user } = useApp();

  // Real signed-in identity, falling back to the demo foodie when not signed in.
  const realName = profile?.name || user?.displayName || FOODIE.name;
  const photoURL = user?.photoURL || null;
  const initials = realName === FOODIE.name ? FOODIE.initials : initialsOf(realName);

  const quest = FOODIE.weeklyQuest;
  const progress = Math.min(quest.found / quest.total, 1); // 3 / 5 found
  const progressPct = `${Math.round(progress * 100)}%`;

  // Live favorites when the user has any; otherwise the seeded roster.
  const favSlugs = favorites && favorites.length ? favorites : FOODIE.favorites;
  const favTrucks = favSlugs.map(getTruck).filter(Boolean);

  return (
    <Screen scroll edges={['top']} bottomInset={s(90)} contentStyle={styles.content}>
      {/* Header: centered identity block + floating moon (theme) toggle */}
      <View style={styles.header}>
        <Pressable style={styles.moonBtn} hitSlop={8}>
          <MoonIcon size={s(20)} color={colors.primary} />
        </Pressable>

        <View style={styles.identity}>
          <View style={styles.avatar}>
            {photoURL ? (
              <Image source={{ uri: photoURL }} style={styles.avatarImg} resizeMode="cover" />
            ) : (
              <Text style={styles.avatarText}>{initials}</Text>
            )}
          </View>
          <Text style={styles.name}>{realName}</Text>
          <Text style={styles.level}>
            Level {FOODIE.level} {FOODIE.levelTitle} · {groupNum(FOODIE.xp)} XP
          </Text>

          <Pressable
            style={({ pressed }) => [styles.switchPill, pressed && styles.pressed]}
            onPress={togglePersona}
          >
            <TrophyIcon size={s(15)} color={colors.primary} />
            <Text style={styles.switchText}>Switch to vendor view</Text>
          </Pressable>
        </View>
      </View>

      {/* Weekly Quest */}
      <View style={styles.questCard}>
        <View style={styles.questTop}>
          <View style={styles.row}>
            <TrophyIcon size={s(16)} color={colors.primary} />
            <Text style={styles.questTitle}>Weekly Quest</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.reward}>{quest.reward}</Text>
            <BoltIcon size={s(13)} color={colors.primary} />
          </View>
        </View>

        <View style={styles.track}>
          <View style={[styles.fill, { width: progressPct }]} />
          <View style={[styles.knob, { left: progressPct }]} />
        </View>

        <Text style={styles.questCaption}>
          {quest.label} — {quest.found} / {quest.total} FOUND
        </Text>
      </View>

      {/* Stat tiles */}
      <View style={styles.stats}>
        <Stat value={FOODIE.stats.visits} label="VISITS" />
        <Stat value={FOODIE.stats.favorites} label="FAVORITES" />
        <Stat value={FOODIE.stats.cities} label="CITIES" />
      </View>

      {/* Favorite trucks */}
      <View style={styles.sectionHead}>
        <HeartIcon size={s(15)} color={MAGENTA} filled />
        <Text style={styles.sectionTitle}>FAVORITE TRUCKS</Text>
      </View>
      {favTrucks.map((t) => (
        <Pressable
          key={t.slug}
          style={({ pressed }) => [styles.favRow, pressed && styles.pressed]}
          onPress={() => navigation.navigate('TruckDetail', { slug: t.slug })}
        >
          <Image source={TRUCK_IMAGE} style={styles.favThumb} resizeMode="cover" />
          <View style={styles.favInfo}>
            <Text style={styles.favName} numberOfLines={1}>
              {t.name}
            </Text>
            <View style={styles.favMeta}>
              <View
                style={[styles.dot, { backgroundColor: t.open ? colors.openDot : colors.closedDot }]}
              />
              <Text style={styles.favMetaText}>
                {t.open ? 'OPEN' : 'CLOSED'} · {t.distance}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}

      {/* Recent food history */}
      <View style={[styles.sectionHead, styles.sectionHeadGap]}>
        <Text style={styles.sectionTitle}>RECENT FOOD HISTORY</Text>
      </View>
      <View style={styles.historyCard}>
        {FOODIE.history.map((h, i) => (
          <View key={h.item} style={[styles.historyRow, i > 0 && styles.historyDivider]}>
            <View style={styles.flex}>
              <Text style={styles.historyItem}>{h.item}</Text>
              <Text style={styles.historyTruck}>{h.truck}</Text>
            </View>
            <Text style={styles.historyWhen}>{h.when}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

function Stat({ value, label }) {
  return (
    <View style={styles.statTile}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: s(20) },
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },

  // Header
  header: { marginTop: s(20) },
  moonBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
    width: s(40),
    height: s(40),
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  identity: { alignItems: 'center', paddingTop: s(6) },
  avatar: {
    width: s(86),
    height: s(86),
    borderRadius: s(28),
    backgroundColor: '#FFFDF9',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...shadow.card,
  },
  avatarImg: { width: '100%', height: '100%', borderRadius: s(28) },
  avatarText: { fontSize: f(30), fontWeight: '800', color: colors.primary, letterSpacing: 1 },
  name: { marginTop: s(14), fontSize: f(24), fontWeight: '800', color: colors.text },
  level: { marginTop: s(5), fontSize: f(13.5), fontWeight: '500', color: colors.textMuted },
  switchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(14),
    paddingHorizontal: s(16),
    paddingVertical: s(9),
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  switchText: { marginLeft: s(7), fontSize: f(13), fontWeight: '700', color: colors.primary },

  // Weekly Quest
  questCard: {
    marginTop: s(24),
    backgroundColor: CARD_BG,
    borderRadius: s(20),
    padding: s(19),
    ...shadow.card,
    shadowOpacity: 0.08,
  },
  questTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  questTitle: { marginLeft: s(7), fontSize: f(15), fontWeight: '800', color: colors.text },
  reward: { marginRight: s(3), fontSize: f(14), fontWeight: '800', color: colors.primary },
  track: {
    marginTop: s(16),
    height: s(8),
    borderRadius: radii.pill,
    backgroundColor: 'rgba(124,58,237,0.15)',
    justifyContent: 'center',
  },
  fill: { height: '100%', borderRadius: radii.pill, backgroundColor: colors.primary },
  knob: {
    position: 'absolute',
    width: s(16),
    height: s(16),
    borderRadius: radii.pill,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: colors.primary,
    marginLeft: -s(8),
    ...shadow.card,
    shadowOpacity: 0.18,
  },
  questCaption: {
    marginTop: s(12),
    fontSize: f(11),
    fontWeight: '700',
    letterSpacing: 0.8,
    color: colors.textMuted,
  },

  // Stat tiles
  stats: { flexDirection: 'row', marginTop: s(16) },
  statTile: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: s(18),
    paddingVertical: s(21),
    alignItems: 'center',
    marginHorizontal: s(5),
    ...shadow.card,
    shadowOpacity: 0.06,
  },
  statValue: { fontSize: f(24), fontWeight: '800', color: colors.primary },
  statLabel: {
    marginTop: s(4),
    fontSize: f(10.5),
    fontWeight: '700',
    letterSpacing: 0.8,
    color: colors.textMuted,
  },

  // Section headers
  sectionHead: { flexDirection: 'row', alignItems: 'center', marginTop: s(24), marginBottom: s(12) },
  sectionHeadGap: { marginTop: s(22) },
  sectionTitle: {
    marginLeft: s(7),
    fontSize: f(12),
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.textMuted,
  },

  // Favorite truck rows
  favRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderRadius: s(18),
    padding: s(13),
    marginBottom: s(12),
    ...shadow.card,
    shadowOpacity: 0.07,
  },
  favThumb: {
    width: s(56),
    height: s(56),
    borderRadius: s(14),
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  favInfo: { flex: 1, marginLeft: s(12) },
  favName: { fontSize: f(15.5), fontWeight: '800', color: colors.text },
  favMeta: { flexDirection: 'row', alignItems: 'center', marginTop: s(5) },
  dot: { width: s(7), height: s(7), borderRadius: radii.pill, marginRight: s(6) },
  favMetaText: { fontSize: f(12), fontWeight: '600', color: colors.textMuted, letterSpacing: 0.3 },

  // Recent food history
  historyCard: {
    backgroundColor: CARD_BG,
    borderRadius: s(20),
    paddingHorizontal: s(16),
    ...shadow.card,
    shadowOpacity: 0.06,
  },
  historyRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: s(16) },
  historyDivider: { borderTopWidth: 1, borderTopColor: 'rgba(31,18,53,0.08)' },
  historyItem: { fontSize: f(15), fontWeight: '700', color: colors.text },
  historyTruck: { marginTop: s(3), fontSize: f(12.5), color: colors.textMuted },
  historyWhen: { marginLeft: s(10), fontSize: f(12.5), fontWeight: '600', color: colors.textMuted },

  pressed: { opacity: 0.9 },
});
