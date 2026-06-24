// Email/password auth helpers (Firebase JS SDK — Expo Go compatible).
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';

// Subscribe to sign-in state; returns an unsubscribe fn.
export function subscribeAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function signUpWithEmail({ name, email, password }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (name) await updateProfile(cred.user, { displayName: name });
  return cred.user;
}

export async function signInWithEmail({ email, password }) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export function signOutUser() {
  return signOut(auth);
}

// Map Firebase error codes to friendly copy for the UI.
export function friendlyAuthError(code) {
  const map = {
    'auth/email-already-in-use': 'That email is already registered.',
    'auth/invalid-email': 'That email address looks invalid.',
    'auth/operation-not-allowed': 'Enable Email/Password sign-in in your Firebase console.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/missing-password': 'Please enter a password.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/user-not-found': 'No account found for that email.',
    'auth/wrong-password': 'Email or password is incorrect.',
    'auth/network-request-failed': 'Network error — check your connection.',
    'auth/too-many-requests': 'Too many attempts. Try again in a bit.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}
