import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import { CompassIcon, SparkleIcon } from '../components/icons';
import { colors, radii, shadow } from '../theme';
import { s, f } from '../responsive';

// Line breaks are forced (\n) to match the reference exactly on every device.
const HEADLINE = 'Find hidden\nfood caravans\nworth the detour.';
const SUBTITLE =
  "A premium guide to your city's best food trucks —\nmapped, rated, and ready when you are.";

// Splash / Landing. Vertical rhythm uses proportional spacers (not centering)
// so the gaps match the reference: a large top margin, a moderate logo→headline
// gap, then most of the empty space sits between the subtitle and the buttons.
export default function SplashScreen({ navigation }) {
  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={{ flex: 1 }} />

        {/* Brand */}
        <View style={styles.brand}>
          <View style={styles.logo}>
            <CompassIcon size={s(40)} color={colors.primary} />
          </View>
          <Text style={styles.wordmark}>HUNGERQUEST</Text>
        </View>

        <View style={{ flex: 1 }} />

        {/* Hero copy */}
        <View style={styles.hero}>
          <Text style={styles.h1} numberOfLines={3} adjustsFontSizeToFit>
            {HEADLINE}
          </Text>
          <Text style={styles.sub} numberOfLines={3} adjustsFontSizeToFit>
            {SUBTITLE}
          </Text>
        </View>

        <View style={{ flex: 2 }} />

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
            onPress={() => navigation.navigate('Role')}
          >
            <SparkleIcon size={s(18)} color="#fff" />
            <Text style={styles.primaryText}>Begin the Quest</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}
            onPress={() => navigation.replace('Tabs', { screen: 'Map' })}
          >
            <Text style={styles.secondaryText}>Open the map</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(28),
    paddingBottom: s(20),
  },

  // Brand
  brand: { alignItems: 'center' },
  logo: {
    width: s(84),
    height: s(84),
    borderRadius: s(24),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  wordmark: {
    marginTop: s(16),
    fontSize: f(13),
    fontWeight: '700',
    letterSpacing: 4,
    color: colors.textMuted,
  },

  // Hero
  hero: { alignItems: 'center' },
  h1: {
    fontSize: f(34),
    lineHeight: f(40),
    fontWeight: '800',
    letterSpacing: -0.4,
    color: colors.text,
    textAlign: 'center',
  },
  sub: {
    marginTop: s(16),
    fontSize: f(14.5),
    lineHeight: f(21),
    fontWeight: '500',
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: s(340),
  },

  // Actions
  actions: { width: '100%' },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: s(17),
    ...shadow.card,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
  },
  primaryText: {
    color: '#fff',
    fontSize: f(16.5),
    fontWeight: '700',
    marginLeft: s(9),
  },
  secondaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pink,
    borderRadius: radii.pill,
    paddingVertical: s(17),
    marginTop: s(14),
    ...shadow.card,
    shadowOpacity: 0.12,
  },
  secondaryText: {
    color: colors.text,
    fontSize: f(16.5),
    fontWeight: '700',
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
});
