import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import { BackIcon, ForkKnifeIcon, ChefHatIcon } from '../components/icons';
import { colors, radii, shadow } from '../theme';
import { s, f } from '../responsive';
import { useApp } from '../store/AppContext';

// chipRows = explicit rows so the chip grouping matches the reference exactly
// on every device (Foodie = 2 + 1, Vendor = 1 + 2), instead of depending on
// auto-wrap which shifts with screen width / system font size.
const ROLES = [
  {
    key: 'customer',
    persona: 'foodie',
    title: "I'm a Foodie",
    desc: 'Discover hidden trucks, save favorites, and follow flavor trails near you.',
    chipRows: [['Personalized map', 'Save & follow trucks'], ['Real-time hours']],
    tile: ['#FAD0DE', '#F7C9A6'],
    iconColor: '#7A3346',
    Icon: ForkKnifeIcon,
  },
  {
    key: 'vendor',
    persona: 'vendor',
    title: "I'm a Vendor",
    desc: 'List your truck, update your menu & location, and reach hungry locals.',
    chipRows: [['Truck profile & menu'], ['Live location updates', 'Insights & reviews']],
    tile: ['#E2D5FB', '#C4ABF5'],
    iconColor: '#6D28D9',
    Icon: ChefHatIcon,
  },
];

export default function RoleScreen({ navigation }) {
  const { setPersona } = useApp();

  const choose = (role) => {
    setPersona(role.persona);
    navigation.navigate('Signup', { role: role.key });
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={s(20)} color={colors.text} />
          </Pressable>
          <Text style={styles.step}>STEP 1 OF 2</Text>
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>How will you{'\n'}use HungerQuest?</Text>
          <Text style={styles.sub}>
            Pick the experience that fits you. You can add the other later.
          </Text>

          {ROLES.map((role) => {
            const Icon = role.Icon;
            return (
              <Pressable
                key={role.key}
                style={({ pressed }) => [styles.card, pressed && styles.pressed]}
                onPress={() => choose(role)}
              >
                <LinearGradient
                  colors={role.tile}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.tile}
                >
                  <Icon size={s(24)} color={role.iconColor} />
                </LinearGradient>

                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{role.title}</Text>
                  <Text style={styles.cardDesc}>{role.desc}</Text>
                  <View style={styles.chips}>
                    {role.chipRows.map((row, ri) => (
                      <View key={ri} style={styles.chipRow}>
                        {row.map((c) => (
                          <View key={c} style={styles.chip}>
                            <Text style={styles.chipText} numberOfLines={1} allowFontScaling={false}>
                              {c}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Pressable onPress={() => navigation.replace('Tabs')} hitSlop={8}>
            <Text style={styles.footerLink}>Log in</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: s(20) },
  flex: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: s(44),
    marginTop: s(4),
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    width: s(40),
    height: s(40),
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  step: { fontSize: f(12), fontWeight: '700', letterSpacing: 2, color: colors.textMuted },

  scroll: { paddingTop: s(18), paddingBottom: s(12) },
  title: {
    fontSize: f(27),
    lineHeight: f(33),
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  sub: {
    marginTop: s(10),
    fontSize: f(14),
    lineHeight: f(20),
    color: colors.textMuted,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: s(320),
  },

  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: s(20),
    padding: s(16),
    marginTop: s(18),
    ...shadow.card,
  },
  tile: {
    width: s(52),
    height: s(52),
    borderRadius: s(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: { flex: 1, marginLeft: s(14) },
  cardTitle: { fontSize: f(17), fontWeight: '800', color: colors.text },
  cardDesc: { marginTop: s(3), fontSize: f(13), lineHeight: f(18), color: colors.textMuted },

  chips: { marginTop: s(8) },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(31,18,53,0.06)',
    borderRadius: radii.pill,
    paddingHorizontal: s(8),
    paddingVertical: s(5),
    marginRight: s(6),
    marginBottom: s(7),
  },
  chipText: { fontSize: f(10.5), fontWeight: '600', color: colors.text },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: s(10),
  },
  footerText: { fontSize: f(13.5), color: colors.textMuted },
  footerLink: { fontSize: f(13.5), fontWeight: '700', color: colors.primary },

  pressed: { opacity: 0.9, transform: [{ scale: 0.995 }] },
});
