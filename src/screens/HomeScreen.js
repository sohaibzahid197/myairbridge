import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Image, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import { SearchIcon, HeartIcon, StarIcon, MoonIcon } from '../components/icons';
import { colors, radii, shadow } from '../theme';
import { s, f } from '../responsive';
import { TRUCKS, TRUCK_IMAGE } from '../data/trucks';
import { useApp } from '../store/AppContext';

export default function HomeScreen({ navigation }) {
  const { isFavorite, toggleFavorite } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('open'); // 'open' (default feed) | 'favorites'

  let data = filter === 'favorites' ? TRUCKS.filter((t) => isFavorite(t.slug)) : TRUCKS;
  const q = query.trim().toLowerCase();
  if (q) {
    data = data.filter(
      (t) => t.name.toLowerCase().includes(q) || t.cuisine.toLowerCase().includes(q)
    );
  }

  return (
    <Screen scroll edges={['top']} bottomInset={s(80)} contentStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.flex}>
          <Text style={styles.eyebrow}>TONIGHT IN THE MISSION</Text>
          <Text style={styles.h1}>Discover hidden caravans</Text>
        </View>
        <Pressable style={styles.moonBtn} hitSlop={8}>
          <MoonIcon size={s(20)} color={colors.primary} />
        </Pressable>
      </View>

      {/* Search */}
      <View style={styles.search}>
        <SearchIcon size={s(18)} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for tacos, bao, sliders…"
          placeholderTextColor="rgba(31,18,53,0.45)"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <FilterChip label="Open now" active={filter === 'open'} onPress={() => setFilter('open')} />
        <FilterChip
          label="Favorites"
          active={filter === 'favorites'}
          onPress={() => setFilter('favorites')}
        />
      </View>

      {/* Feed */}
      {data.length === 0 ? (
        <Text style={styles.empty}>
          {filter === 'favorites'
            ? 'No favorites yet — tap a heart to save one.'
            : 'No trucks match.'}
        </Text>
      ) : (
        data.map((truck) => (
          <TruckCard
            key={truck.slug}
            truck={truck}
            favorite={isFavorite(truck.slug)}
            onToggleFav={() => toggleFavorite(truck.slug)}
            onPress={() => navigation.navigate('TruckDetail', { slug: truck.slug })}
          />
        ))
      )}
    </Screen>
  );
}

function FilterChip({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

function TruckCard({ truck, favorite, onToggleFav, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={onPress}>
      {/* Hero image */}
      <View style={styles.hero}>
        <Image source={TRUCK_IMAGE} style={styles.heroImg} resizeMode="cover" />

        {/* Status badge */}
        <View style={styles.badge}>
          <View
            style={[styles.dot, { backgroundColor: truck.open ? colors.openDot : colors.closedDot }]}
          />
          <Text style={styles.badgeText}>{truck.open ? 'OPEN' : 'CLOSED'}</Text>
        </View>

        {/* Heart */}
        <Pressable style={styles.heart} onPress={onToggleFav} hitSlop={8}>
          <HeartIcon
            size={s(18)}
            color={favorite ? colors.primary : colors.text}
            filled={favorite}
          />
        </Pressable>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {truck.name}
          </Text>
          <View style={styles.rating}>
            <StarIcon size={s(14)} color={colors.text} />
            <Text style={styles.ratingText}>{truck.rating}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.cuisineChip}>
            <Text style={styles.cuisineText}>{truck.cuisine}</Text>
          </View>
          <Text style={styles.distance}> · {truck.distance}</Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.viewBtn, pressed && styles.viewBtnPressed]}
          onPress={onPress}
        >
          <Text style={styles.viewBtnText}>View Menu</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingHorizontal: s(20) },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: s(4),
  },
  eyebrow: { fontSize: f(12), fontWeight: '700', letterSpacing: 1.5, color: colors.textMuted },
  h1: { fontSize: f(26), fontWeight: '800', color: colors.text, marginTop: s(4) },
  moonBtn: {
    width: s(40),
    height: s(40),
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: s(2),
  },

  // Search
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: s(16),
    paddingHorizontal: s(14),
    height: s(50),
    marginTop: s(16),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  searchInput: { flex: 1, marginLeft: s(10), fontSize: f(15), color: colors.text, padding: 0 },

  // Filters
  filters: { flexDirection: 'row', marginTop: s(14), marginBottom: s(6) },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: radii.pill,
    paddingHorizontal: s(16),
    paddingVertical: s(9),
    marginRight: s(10),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: f(13.5), fontWeight: '700', color: colors.text },
  chipTextActive: { color: '#fff' },

  // Card
  card: {
    backgroundColor: '#FBF1E2', // solid light cream (not translucent — "full light color")
    borderRadius: s(22),
    padding: s(10),
    marginTop: s(16),
    ...shadow.card,
  },
  cardPressed: { opacity: 0.97 },
  hero: {
    height: s(240),
    borderRadius: s(16),
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  heroImg: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute',
    left: s(12),
    bottom: s(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: radii.pill,
    paddingHorizontal: s(10),
    paddingVertical: s(5),
  },
  dot: { width: s(7), height: s(7), borderRadius: radii.pill, marginRight: s(6) },
  badgeText: { fontSize: f(11), fontWeight: '700', color: colors.text, letterSpacing: 0.5 },
  heart: {
    position: 'absolute',
    right: s(12),
    top: s(12),
    width: s(34),
    height: s(34),
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: { paddingHorizontal: s(6), paddingTop: s(12) },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { flex: 1, marginRight: s(8), fontSize: f(18), fontWeight: '800', color: colors.text },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: s(4), fontSize: f(14), fontWeight: '700', color: colors.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: s(8) },
  cuisineChip: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: radii.pill,
    paddingHorizontal: s(10),
    paddingVertical: s(4),
  },
  cuisineText: { fontSize: f(11.5), fontWeight: '600', color: colors.textMuted },
  distance: { marginLeft: s(2), fontSize: f(12.5), color: colors.textMuted },

  viewBtn: {
    marginTop: s(12),
    marginBottom: s(2),
    backgroundColor: '#FFFDF9', // solid white button, pops against the cream card
    borderRadius: s(14),
    paddingVertical: s(14),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(31,18,53,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  viewBtnPressed: { opacity: 0.8 },
  viewBtnText: { fontSize: f(15), fontWeight: '700', color: colors.text },

  empty: { textAlign: 'center', color: colors.textMuted, marginTop: s(40), fontSize: f(14) },
});
