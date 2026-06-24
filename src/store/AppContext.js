import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FOODIE } from '../data/user';
import { isFirebaseConfigured } from '../firebase';
import { subscribeAuth, signUpWithEmail, signInWithEmail, signOutUser } from '../services/auth';
import { saveUserProfile, getUserProfile } from '../services/users';
import { signOutGoogle } from '../services/googleAuth';

const STORAGE_KEY = '@hungerquest/state/v1';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [hydrated, setHydrated] = useState(false);

  // persona: 'foodie' | 'vendor'
  const [persona, setPersona] = useState('foodie');
  // saved favorites (truck slugs)
  const [favorites, setFavorites] = useState(FOODIE.favorites);
  // auth profile (name/email/role) — from Firebase when configured, else mock
  const [profile, setProfile] = useState(null);
  // vendor live state
  const [vendorOpen, setVendorOpen] = useState(true);
  const [squareConnected, setSquareConnected] = useState(false);

  // Firebase auth user (null until signed in). authReady gates startup.
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(!isFirebaseConfigured);

  // Load persisted local state once
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const s = JSON.parse(raw);
          if (s.persona) setPersona(s.persona);
          if (Array.isArray(s.favorites)) setFavorites(s.favorites);
          if (s.profile) setProfile(s.profile);
          if (typeof s.vendorOpen === 'boolean') setVendorOpen(s.vendorOpen);
          if (typeof s.squareConnected === 'boolean') setSquareConnected(s.squareConnected);
        }
      } catch (e) {
        // ignore — fall back to defaults
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  // Subscribe to Firebase auth state (only when configured). This also
  // restores the session on app restart, thanks to AsyncStorage persistence.
  useEffect(() => {
    if (!isFirebaseConfigured) return undefined;
    const unsub = subscribeAuth(async (u) => {
      setUser(u);
      if (u) {
        try {
          const p = await getUserProfile(u.uid);
          if (p?.persona) setPersona(p.persona);
          if (Array.isArray(p?.favorites)) setFavorites(p.favorites);
          setProfile({ name: p?.name || u.displayName || '', email: u.email, role: p?.role });
        } catch (e) {
          setProfile({ name: u.displayName || '', email: u.email });
        }
      }
      setAuthReady(true);
    });
    return unsub;
  }, []);

  // Persist local state on change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ persona, favorites, profile, vendorOpen, squareConnected })
    ).catch(() => {});
  }, [hydrated, persona, favorites, profile, vendorOpen, squareConnected]);

  // Mirror favorites to Firestore for signed-in users
  useEffect(() => {
    if (!isFirebaseConfigured || !user) return;
    saveUserProfile(user.uid, { favorites }).catch(() => {});
  }, [favorites, user]);

  const toggleFavorite = (slug) =>
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  const isFavorite = (slug) => favorites.includes(slug);

  const togglePersona = () => setPersona((p) => (p === 'foodie' ? 'vendor' : 'foodie'));

  // --- Auth actions: real Firebase when configured, mock fallback otherwise ---

  const register = async ({ name, email, password, role }) => {
    const nextPersona = role === 'vendor' ? 'vendor' : 'foodie';
    setPersona(nextPersona);
    if (isFirebaseConfigured) {
      const u = await signUpWithEmail({ name, email, password });
      try {
        await saveUserProfile(u.uid, {
          name: name || '',
          email,
          role: role || 'customer',
          persona: nextPersona,
          favorites,
        });
      } catch (e) {
        // Firestore not set up yet — auth succeeded; profile sync is best-effort.
      }
      setProfile({ name: name || '', email, role });
    } else {
      setProfile({ name: name || 'Ada Reyes', email, role });
    }
  };

  const login = async ({ email, password }) => {
    if (isFirebaseConfigured) {
      const u = await signInWithEmail({ email, password });
      let p = null;
      try {
        p = await getUserProfile(u.uid);
      } catch (e) {
        // Firestore not set up yet — non-fatal.
      }
      if (p?.persona) setPersona(p.persona);
      if (Array.isArray(p?.favorites)) setFavorites(p.favorites);
      setProfile({ name: p?.name || u.displayName || '', email: u.email, role: p?.role });
    } else {
      setProfile({ name: 'Ada Reyes', email });
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured) {
      try {
        await signOutUser();
      } catch (e) {
        // ignore
      }
    }
    await signOutGoogle();
    setUser(null);
    setProfile(null);
    setPersona('foodie');
  };

  const value = {
    hydrated,
    authReady,
    user,
    isAuthed: isFirebaseConfigured ? !!user : !!profile,
    firebaseEnabled: isFirebaseConfigured,
    persona,
    setPersona,
    togglePersona,
    favorites,
    toggleFavorite,
    isFavorite,
    profile,
    setProfile,
    vendorOpen,
    setVendorOpen,
    squareConnected,
    setSquareConnected,
    register,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
