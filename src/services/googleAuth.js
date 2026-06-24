// Google Sign-in config + plan.
//
// STATUS: Firebase → Authentication → Google provider is ENABLED, and the
// Web client ID below is saved. The remaining blocker is purely an Expo Go
// platform limit (see note), so the actual sign-in flow is wired during the
// dev build.
//
// Why not Expo Go: Google's OAuth requires an https (or registered native)
// redirect URI. Expo retired its auth proxy (auth.expo.io), so Expo Go now
// hands Google an `exp://…` redirect, which Google rejects
// (redirect_uri_mismatch). A development build registers the app's own
// scheme as a valid redirect, so Google completes there.
export const GOOGLE_WEB_CLIENT_ID =
  '1021990484494-vikpu35oarl7npfvefvgi7ffc60qc4mn.apps.googleusercontent.com';

// Dev-build wire-up (activated when we run `expo prebuild` + `expo run:android`):
//
//   import * as Google from 'expo-auth-session/providers/google';
//   import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
//   import { auth } from '../firebase';
//
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: GOOGLE_WEB_CLIENT_ID,
//   });
//   // on response.type === 'success':
//   //   signInWithCredential(auth, GoogleAuthProvider.credential(response.params.id_token))
