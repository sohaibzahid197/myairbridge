import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { HomeIcon, MapIcon, TruckIcon, PersonIcon } from '../components/icons';
import { colors, shadow } from '../theme';
import { s, f } from '../responsive';
import { useApp } from '../store/AppContext';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import TrucksScreen from '../screens/TrucksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VendorProfileScreen from '../screens/VendorProfileScreen';

const Tab = createBottomTabNavigator();

const ICONS = {
  Home: HomeIcon,
  Map: MapIcon,
  Trucks: TruckIcon,
  Profile: PersonIcon,
};
const LABELS = { Home: 'HOME', Map: 'MAP', Trucks: 'TRUCKS', Profile: 'PROFILE' };

function TabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {/* shadow lives on an outer rounded view so it isn't clipped by the
          blur/gradient's overflow:hidden. */}
      <View style={styles.barShadow}>
        <BlurView
          intensity={55}
          tint="light"
          experimentalBlurMethod="dimezisBlurView"
          style={styles.barBlur}
        >
          {/* Translucent white gradient = the frosted-glass look. This renders
              on every device, so the bar looks like glass even where the native
              blur above doesn't draw (Android in Expo Go). */}
          <LinearGradient
            colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.25)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.barInner}
          >
            {state.routes.map((route, index) => {
              const focused = state.index === index;
              const Icon = ICONS[route.name];
              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
              };
              return (
                <Pressable key={route.key} onPress={onPress} style={styles.item}>
                  <View style={styles.iconBox}>
                    {focused && <View style={styles.iconBoxActive} />}
                    <Icon
                      size={s(22)}
                      color={focused ? colors.textOnPrimary : colors.text}
                      filled={focused}
                    />
                  </View>
                  <Text style={[styles.label, focused && styles.labelActive]}>
                    {LABELS[route.name]}
                  </Text>
                </Pressable>
              );
            })}
          </LinearGradient>
        </BlurView>
      </View>
    </View>
  );
}

// Profile tab swaps screen based on persona
function ProfileSwitch(props) {
  const { persona } = useApp();
  return persona === 'vendor' ? (
    <VendorProfileScreen {...props} />
  ) : (
    <ProfileScreen {...props} />
  );
}

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Trucks" component={TrucksScreen} />
      <Tab.Screen name="Profile" component={ProfileSwitch} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: s(10),
    backgroundColor: 'transparent',
  },
  barShadow: {
    borderRadius: s(28),
    backgroundColor: 'rgba(255,255,255,0.08)',
    ...shadow.card,
  },
  barBlur: {
    borderRadius: s(28),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  barInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: s(12),
    paddingHorizontal: s(8),
  },
  item: { alignItems: 'center', flex: 1, paddingVertical: s(4) },
  iconBox: {
    width: s(40),
    height: s(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Rendered as a fresh child only while focused, so Android draws the rounded
  // background from scratch every time. Toggling backgroundColor on an existing
  // view can drop the borderRadius on Android (it renders as a square).
  iconBoxActive: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: f(10),
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.textMuted,
    marginTop: s(2),
  },
  labelActive: { color: colors.primary },
});
