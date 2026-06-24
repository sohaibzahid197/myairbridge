// Google Sign-in → Firebase Auth, via @react-native-google-signin/google-signin
// (Expo's currently recommended Google library; the old expo-auth-session
// Google provider is deprecated in SDK 54).
//
// REQUIRES A DEVELOPMENT BUILD — the native module is not in Expo Go.
//
// MANUAL SETUP (one-time, in your own consoles):
//   1. Firebase → Authentication → Sign-in method → enable **Google**.
//   2. Firebase → Project settings → add an **Android app** with package
//      `com.anonymous.myairbridge` and the build's **SHA-1**, then download
//      `google-services.json` into the project root (app.json points to it).
//   The webClientId below already belongs to this Firebase project
//   (sender id 1021990484494), so the id_token it returns is valid for Firebase.
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase';

// Web (server) OAuth client ID — required so signIn() returns an id_token that
// Firebase accepts.
export const GOOGLE_WEB_CLIENT_ID =
  '1021990484494-vikpu35oarl7npfvefvgi7ffc60qc4mn.apps.googleusercontent.com';

// iOS OAuth client (CLIENT_ID from GoogleService-Info.plist). Ignored on Android.
export const GOOGLE_IOS_CLIENT_ID =
  '1021990484494-274nn0605jk7jjk29i1h4r8qsjjonekc.apps.googleusercontent.com';

let configured = false;
function ensureConfigured() {
  if (configured) return;
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    offlineAccess: false,
  });
  configured = true;
}

// Runs the native Google flow and signs the user into Firebase.
// Returns the Firebase user on success, or null if the user cancelled.
// The AppContext auth subscriber then picks up the user + populates the profile.
export async function signInWithGoogle() {
  ensureConfigured();
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    if (!isSuccessResponse(response)) return null; // cancelled / no credential
    const idToken = response.data?.idToken;
    if (!idToken) throw new Error('Google did not return an id_token.');
    const credential = GoogleAuthProvider.credential(idToken);
    const cred = await signInWithCredential(auth, credential);
    return cred.user;
  } catch (e) {
    if (
      isErrorWithCode(e) &&
      (e.code === statusCodes.SIGN_IN_CANCELLED || e.code === statusCodes.IN_PROGRESS)
    ) {
      return null; // user backed out — treat as a no-op
    }
    throw e;
  }
}

// Best-effort native Google sign-out (call alongside Firebase signOut).
export async function signOutGoogle() {
  try {
    ensureConfigured();
    await GoogleSignin.signOut();
  } catch (e) {
    // ignore
  }
}
