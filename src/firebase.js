// Firebase (JS SDK) — the only Firebase flavor that runs inside Expo Go.
// Native @react-native-firebase + google-services.json require a dev build.
//
// TO FINISH SETUP: paste your *Web app* config below.
//   Firebase console → Project settings → Your apps → Web app (</>) →
//   "SDK setup and configuration" → Config.
// (A Web app is separate from the Android app — the Android app's
//  google-services.json is for native builds, not the Expo Go JS SDK.)
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyDLgBi9iBjttrS7f-u1oDVB79m5GB8hlh0',
  authDomain: 'myairbridge-df0c2.firebaseapp.com',
  projectId: 'myairbridge-df0c2',
  storageBucket: 'myairbridge-df0c2.firebasestorage.app',
  messagingSenderId: '1021990484494',
  appId: '1:1021990484494:web:9e7e52808e622c2fcb9a5f',
  measurementId: 'G-V7QYDC4P39', // (analytics not used in React Native)
};

// Becomes true once the real values are pasted in — lets the UI fall back
// to the existing mock auth until Firebase is actually configured.
export const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith('PASTE_');

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth;
try {
  // Persist the signed-in user across app restarts (AsyncStorage).
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch {
  // Already initialized (e.g. Fast Refresh re-ran this module).
  auth = getAuth(app);
}

export const db = getFirestore(app);
export { app, auth };
