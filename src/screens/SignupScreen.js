import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Screen from '../components/Screen';
import {
  BackIcon,
  ForkKnifeIcon,
  ChefHatIcon,
  PersonIcon,
  MailIcon,
  LockIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
} from '../components/icons';
import { colors, radii, shadow } from '../theme';
import { s, f } from '../responsive';
import { useApp } from '../store/AppContext';
import { friendlyAuthError } from '../services/auth';
import { signInWithGoogle } from '../services/googleAuth';

export default function SignupScreen({ navigation, route }) {
  const role = route.params?.role === 'vendor' ? 'vendor' : 'customer';
  const isVendor = role === 'vendor';
  const { register } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (busy) return;
    setError('');
    if (!agree) {
      setError('Please accept the Terms to continue.');
      return;
    }
    setBusy(true);
    try {
      await register({ name, email, password, role });
      navigation.replace('Tabs');
    } catch (e) {
      setError(friendlyAuthError(e?.code));
    } finally {
      setBusy(false);
    }
  };

  const onGoogle = async () => {
    if (busy) return;
    setError('');
    setBusy(true);
    try {
      const user = await signInWithGoogle();
      if (user) navigation.replace('Tabs');
    } catch (e) {
      setError(e?.message ? `Google sign-in failed: ${e.message}` : 'Google sign-in failed.');
    } finally {
      setBusy(false);
    }
  };

  const TitleIcon = isVendor ? ChefHatIcon : ForkKnifeIcon;

  return (
    <Screen edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.root}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable style={styles.backBtn} onPress={() => navigation.goBack()} hitSlop={8}>
              <BackIcon size={s(20)} color={colors.text} />
            </Pressable>
            <Text style={styles.step}>STEP 2 OF 2</Text>
          </View>

          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Eyebrow + title */}
            <View style={styles.titleRow}>
              <View style={styles.titleIcon}>
                <TitleIcon size={s(24)} color={colors.primary} />
              </View>
              <View style={styles.flex}>
                <Text style={styles.eyebrow}>
                  {isVendor ? 'VENDOR ACCOUNT' : 'FOODIE ACCOUNT'}
                </Text>
                <Text style={styles.title}>Create your account</Text>
              </View>
            </View>

            {/* Fields */}
            <Field
              label="Full name"
              icon={PersonIcon}
              value={name}
              onChangeText={setName}
              placeholder="Jamie Rivera"
            />
            <Field
              label="Email"
              icon={MailIcon}
              value={email}
              onChangeText={setEmail}
              placeholder="you@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Field
              label="Password"
              icon={LockIcon}
              value={password}
              onChangeText={setPassword}
              placeholder="At least 8 characters"
              secureTextEntry={!showPw}
              autoCapitalize="none"
              autoCorrect={false}
              rightSlot={
                <Pressable onPress={() => setShowPw((v) => !v)} hitSlop={10}>
                  {showPw ? (
                    <EyeOffIcon size={s(20)} color={colors.textMuted} />
                  ) : (
                    <EyeIcon size={s(20)} color={colors.textMuted} />
                  )}
                </Pressable>
              }
            />

            {/* Agree */}
            <Pressable style={styles.agreeRow} onPress={() => setAgree((v) => !v)} hitSlop={6}>
              <View style={[styles.checkbox, agree && styles.checkboxOn]}>
                {agree && <CheckIcon size={s(13)} color="#fff" />}
              </View>
              <Text style={styles.agreeText}>
                I agree to the <Text style={styles.link}>Terms</Text> and{' '}
                <Text style={styles.link}>Privacy Policy</Text>.
              </Text>
            </Pressable>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {/* Create */}
            <Pressable
              style={({ pressed }) => [styles.primaryBtn, (pressed || busy) && styles.pressed]}
              onPress={submit}
              disabled={busy}
            >
              <Text style={styles.primaryText}>
                {busy ? 'Creating account…' : 'Create account'}
              </Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.or}>OR</Text>
              <View style={styles.line} />
            </View>

            {/* Google */}
            <Pressable
              style={({ pressed }) => [styles.googleBtn, (pressed || busy) && styles.pressed]}
              onPress={onGoogle}
              disabled={busy}
            >
              <GoogleIcon size={s(20)} />
              <Text style={styles.googleText}>Sign up with Google</Text>
            </Pressable>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Want the other side? </Text>
              <Pressable
                onPress={() => navigation.setParams({ role: isVendor ? 'customer' : 'vendor' })}
                hitSlop={8}
              >
                <Text style={styles.footerLink}>
                  Sign up as a {isVendor ? 'foodie' : 'vendor'}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function Field({ label, icon: Icon, rightSlot, ...inputProps }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <Icon size={s(19)} color={colors.textMuted} />
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(31,18,53,0.4)"
          {...inputProps}
        />
        {rightSlot}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: s(22) },
  flex: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: s(46),
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

  scroll: { paddingTop: s(18), paddingBottom: s(28) },

  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: s(26) },
  titleIcon: {
    width: s(54),
    height: s(54),
    borderRadius: s(16),
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(14),
    ...shadow.card,
    shadowOpacity: 0.08,
  },
  eyebrow: { fontSize: f(11.5), fontWeight: '700', letterSpacing: 1.5, color: colors.textMuted },
  title: { fontSize: f(26), fontWeight: '800', color: colors.text, marginTop: s(3) },

  field: { marginBottom: s(20) },
  label: { fontSize: f(13.5), fontWeight: '600', color: colors.text, marginBottom: s(9) },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: s(18),
    paddingHorizontal: s(16),
    height: s(60),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  input: { flex: 1, marginLeft: s(11), fontSize: f(16), color: colors.text, padding: 0 },

  agreeRow: { flexDirection: 'row', alignItems: 'center', marginTop: s(4), marginBottom: s(22) },
  checkbox: {
    width: s(21),
    height: s(21),
    borderRadius: s(6),
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(11),
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  checkboxOn: { backgroundColor: colors.primary },
  agreeText: { flex: 1, fontSize: f(13.5), color: colors.textMuted },
  link: { color: colors.primary, fontWeight: '600' },

  error: { color: '#C0392B', fontSize: f(13), fontWeight: '600', marginBottom: s(12) },

  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: s(18),
    alignItems: 'center',
    ...shadow.card,
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
  },
  primaryText: { color: '#fff', fontSize: f(16.5), fontWeight: '700' },

  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: s(20) },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(31,18,53,0.12)' },
  or: { marginHorizontal: s(12), fontSize: f(12), fontWeight: '700', color: colors.textMuted },

  googleBtn: {
    flexDirection: 'row',
    backgroundColor: colors.pink,
    borderRadius: radii.pill,
    paddingVertical: s(18),
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
    shadowOpacity: 0.12,
  },
  googleText: { color: colors.text, fontSize: f(16.5), fontWeight: '700', marginLeft: s(10) },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: s(22) },
  footerText: { fontSize: f(13.5), color: colors.textMuted },
  footerLink: { fontSize: f(13.5), fontWeight: '700', color: colors.primary },

  pressed: { opacity: 0.85 },
});
