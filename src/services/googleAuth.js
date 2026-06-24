// Google Sign-in (Firebase Auth via expo-auth-session).
//
// WORKS IN: a development build (`expo prebuild` + `expo run:android`) or an
// EAS dev build. It does NOT work in plain Expo Go — Expo retired its auth
// proxy (auth.expo.io), so Expo Go hands Google an `exp://…` redirect that
// Google rejects (redirect_uri_mismatch). A dev build registers the app's own
// scheme (see app.json "scheme") as a valid redirect, so Google completes there.
//
// REMAINING MANUAL SETUP for the dev build:
//   1. Google Cloud Console → Credentials → create an *Android* OAuth client
//      (package name from app.json + your signing SHA-1) and paste its ID into
//      GOOGLE_ANDROID_CLIENT_ID below.
//   2. Firebase → Authentication → Sign-in method → enable Google.
import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase';

// Finishes the auth session if the app was opened via the redirect.
WebBrowser.maybeCompleteAuthSession();

export const GOOGLE_WEB_CLIENT_ID =
  '1021990484494-vikpu35oarl7npfvefvgi7ffc60qc4mn.apps.googleusercontent.com';

// Fill this in after creating the Android OAuth client (step 1 above).
export const GOOGLE_ANDROID_CLIENT_ID = '';

// Hook: returns { promptAsync, ready }. Call promptAsync() to start sign-in.
// On success it signs the user into Firebase; the AppContext auth subscriber
// then picks up the user and populates the profile automatically.
export function useGoogleAuth({ onSuccess, onError } = {}) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_WEB_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID || undefined,
  });

  useEffect(() => {
    if (!response) return;
    if (response.type === 'success') {
      const idToken = response.params?.id_token;
      if (!idToken) {
        onError?.(new Error('Google did not return an id_token.'));
        return;
      }
      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(auth, credential)
        .then((res) => onSuccess?.(res.user))
        .catch((e) => onError?.(e));
    } else if (response.type === 'error') {
      onError?.(response.error || new Error('Google sign-in failed.'));
    }
    // response.type === 'dismiss' | 'cancel' → user backed out; ignore.
  }, [response]);

  return { promptAsync, ready: !!request };
}
