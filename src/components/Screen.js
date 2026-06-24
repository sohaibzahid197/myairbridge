import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';


const ANDROID_TOP = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;


export default function Screen({
  children,
  scroll = false,
  contentStyle,
  edges = ['top'],
  bottomInset = 0,
}) {
  const insets = useSafeAreaInsets();
  const padTop = edges.includes('top') ? Math.max(insets.top, ANDROID_TOP) : 0;
  const padBottom = edges.includes('bottom') ? insets.bottom : 0;

  if (scroll) {
    return (
      <LinearGradient colors={colors.gradient} style={styles.flex}>
        <ScrollView
          style={styles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            contentStyle,
            // Safe-area top goes LAST so a screen's contentStyle can't override it
            // (padding on the content container is reliable; on the ScrollView it is not).
            { paddingTop: padTop + 10, paddingBottom: 24 + bottomInset + padBottom },
          ]}
        >
          {children}
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={colors.gradient} style={styles.flex}>
      <View style={[styles.flex, { paddingTop: padTop, paddingBottom: padBottom }, contentStyle]}>
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },
});
