import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  PanResponder,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import {
  CheckIcon,
  PinIcon,
  StarIcon,
  ClockIcon,
  HeartIcon,
  BagIcon,
  RefreshIcon,
  BellIcon,
  LockIcon,
  LinkIcon,
  UnlinkIcon,
  DownloadIcon,
  SparkleIcon,
  BackIcon,
} from '../components/icons';
import { colors, radii, shadow } from '../theme';
import { s, f } from '../responsive';
import { VENDOR } from '../data/user';
import { getTruck, TRUCK_IMAGE } from '../data/trucks';
import { useApp } from '../store/AppContext';

// Single dull-grey card colour for every plain card on this screen.
const CARD_BG = '#D9D8DD';

// Vendor Profile (Step 9) — matches walkthrough frames (f_088/092/100/117) + ANALYSIS §9.
export default function VendorProfileScreen({ navigation }) {
  const { togglePersona, vendorOpen, setVendorOpen, squareConnected, logout } = useApp();
  const truck = getTruck(VENDOR.truckSlug);

  const signOut = async () => {
    await logout();
    navigation.getParent()?.navigate('Splash');
  };

  return (
    <Screen scroll edges={['top']} bottomInset={s(90)} contentStyle={styles.content}>
      {/* Eyebrow + switch to foodie */}
      <View style={styles.topRow}>
        <Text style={styles.vendorEyebrow}>VENDOR VIEW</Text>
        <Pressable
          style={({ pressed }) => [styles.switchPill, pressed && styles.pressed]}
          onPress={togglePersona}
        >
          <Text style={styles.switchText}>Switch to foodie</Text>
        </Pressable>
      </View>

      {/* Identity + auto-close + open & serving — one card */}
      <View style={styles.topCard}>
        {/* Vendor identity */}
        <View style={styles.idRow}>
          <Image source={TRUCK_IMAGE} style={styles.idThumb} resizeMode="cover" />
          <View style={styles.idInfo}>
            <View style={styles.idNameRow}>
              <Text style={styles.idName} numberOfLines={1}>
                {truck.name}
              </Text>
              {VENDOR.verified && (
                <View style={styles.verified}>
                  <CheckIcon size={s(10)} color="#fff" />
                </View>
              )}
            </View>
            <View style={styles.idMetaRow}>
              <PinIcon size={s(13)} color={colors.primary} />
              <Text style={styles.idSpot}>{VENDOR.spot}</Text>
            </View>
            <View style={styles.idMetaRow}>
              <Text style={styles.idCuisine}>{truck.cuisine}</Text>
              <Text style={styles.idSep}> · </Text>
              <StarIcon size={s(12)} color={colors.primary} />
              <Text style={styles.idRating}> {truck.rating}</Text>
            </View>
          </View>
        </View>

        {/* Auto-close reminder */}
        <View style={styles.acBlock}>
          <AutoCloseReminder />
        </View>

        {/* Open & serving */}
        <Pressable
          onPress={() => setVendorOpen((v) => !v)}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          {vendorOpen ? (
            <View style={[styles.serveBtn, styles.serveOpen]}>
              <View style={styles.serveDotOpen} />
              <Text style={styles.serveTextOpen}>Open &amp; serving</Text>
            </View>
          ) : (
            <View style={[styles.serveBtn, styles.serveClosed]}>
              <View style={styles.serveDotClosed} />
              <Text style={styles.serveTextClosed}>Closed — tap to open</Text>
            </View>
          )}
        </Pressable>
        <Text style={styles.serveSub}>
          {VENDOR.followers} foodies have you on their Quest — they&apos;ll be notified the instant
          you open.
        </Text>
      </View>

      {/* Stat tiles */}
      <View style={styles.stats}>
        <Stat icon={BagIcon} value={VENDOR.stats.orders} label="ORDERS" />
        <Stat icon={ClockIcon} value={VENDOR.stats.avgPickup} label="AVG PICKUP" />
        <Stat icon={RefreshIcon} value={VENDOR.stats.repeats} label="REPEATS" />
        <Stat icon={HeartIcon} value={VENDOR.stats.favorites} label="FAVORITES" />
      </View>

      {/* Square POS integration */}
      <SquareCard />

      {/* Menu preview */}
      <View style={styles.sectionHead}>
        <SparkleIcon size={s(14)} color={colors.primary} />
        <Text style={styles.sectionTitle}>MENU PREVIEW</Text>
        {squareConnected && <Text style={styles.editLink}>Edit →</Text>}
      </View>
      {squareConnected ? (
        <View style={styles.card}>
          {flattenMenu(truck).map((item, i) => (
            <View key={item.name} style={[styles.menuRow, i > 0 && styles.divider]}>
              <View style={styles.flex}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuDesc} numberOfLines={1}>
                  {item.section} · {item.desc}
                </Text>
              </View>
              <Text style={styles.menuPrice}>${item.price}.00</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={[styles.card, styles.emptyCard]}>
          <Text style={styles.emptyText}>
            No menu yet. Connect Square to pull your live catalog, or add items manually.
          </Text>
        </View>
      )}

      {/* Location & hours */}
      <View style={styles.sectionHead}>
        <PinIcon size={s(14)} color={colors.primary} />
        <Text style={styles.sectionTitle}>LOCATION &amp; HOURS</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.locSpot}>{VENDOR.spot}</Text>
        <Text style={styles.locHours}>{VENDOR.hours}</Text>
        <Pressable style={({ pressed }) => [styles.locBtn, pressed && styles.pressed]}>
          <PinIcon size={s(15)} color={colors.primary} />
          <Text style={styles.locBtnText}>Update live location</Text>
        </Pressable>
      </View>

      {/* Account */}
      <View style={styles.sectionHead}>
        <LockIcon size={s(14)} color={colors.primary} />
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.acctRow}>
          <BellIcon size={s(17)} color={colors.text} />
          <Text style={styles.acctLabel}>Notifications</Text>
          <Text style={styles.acctValue}>On</Text>
        </View>
        <View style={[styles.acctRow, styles.divider]}>
          <LockIcon size={s(17)} color={colors.text} />
          <Text style={styles.acctLabel}>Password &amp; security</Text>
          <Text style={styles.acctValue}>Change</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.acctRow, styles.divider, pressed && styles.pressed]}
          onPress={signOut}
        >
          <BackIcon size={s(17)} color="#D9355B" />
          <Text style={[styles.acctLabel, styles.signOut]}>Sign out</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

// ---- Auto-close reminder: a drag-to-snap slider over three stops -------------
const STOPS = [
  { label: '1h 30m', pos: 0.3 },
  { label: '2h', pos: 0.58 },
  { label: '3h 15m', pos: 0.9 },
];

function AutoCloseReminder() {
  const [idx, setIdx] = useState(0);
  const widthRef = useRef(1);

  const snap = (ratio) => {
    const r = Math.max(0, Math.min(1, ratio));
    let best = 0;
    let bestD = Infinity;
    STOPS.forEach((stp, i) => {
      const d = Math.abs(stp.pos - r);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setIdx(best);
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => snap(e.nativeEvent.locationX / widthRef.current),
      onPanResponderMove: (e) => snap(e.nativeEvent.locationX / widthRef.current),
    })
  ).current;

  const pct = `${Math.round(STOPS[idx].pos * 100)}%`;

  return (
    <View>
      <View style={styles.questTop}>
        <View style={styles.row}>
          <BellIcon size={s(15)} color={colors.primary} />
          <Text style={styles.acHead}>AUTO-CLOSE REMINDER</Text>
        </View>
        <Text style={styles.acValue}>{STOPS[idx].label}</Text>
      </View>

      <View
        style={styles.sliderTouch}
        onLayout={(e) => {
          widthRef.current = e.nativeEvent.layout.width || 1;
        }}
        {...pan.panHandlers}
      >
        <View style={styles.sliderTrack}>
          <View style={[styles.sliderFill, { width: pct }]} />
          <View style={[styles.sliderKnob, { left: pct }]} />
        </View>
      </View>

      <Text style={styles.acCopy}>
        We&apos;ll ping you {STOPS[idx].label} after opening and auto-close your truck if you
        don&apos;t tap &quot;still cooking&quot;.
      </Text>
    </View>
  );
}

// ---- Square POS card: connect -> opening -> importing -> synced --------------
function SquareCard() {
  const { squareConnected, setSquareConnected } = useApp();
  const [phase, setPhase] = useState(squareConnected ? 'done' : 'idle'); // idle|connecting|importing|done
  const [count, setCount] = useState(0);
  const [note, setNote] = useState('Synced 12 items · just now');
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach((clear) => clear()), []);

  const track = (clear) => timers.current.push(clear);

  const runImport = () => {
    setPhase('importing');
    setCount(0);
    let c = 0;
    const iv = setInterval(() => {
      c += 1;
      setCount(c);
      if (c >= 12) {
        clearInterval(iv);
        setNote('Synced 12 items · just now');
        setSquareConnected(true);
        setPhase('done');
      }
    }, 130);
    track(() => clearInterval(iv));
  };

  const connect = () => {
    setPhase('connecting');
    const t = setTimeout(runImport, 1100);
    track(() => clearTimeout(t));
  };

  const disconnect = () => {
    setSquareConnected(false);
    setPhase('idle');
  };

  const syncPrices = () => {
    setNote('Syncing prices…');
    const t = setTimeout(() => setNote('Prices synced · just now'), 900);
    track(() => clearTimeout(t));
  };

  return (
    <LinearGradient
      colors={[colors.darkCard, colors.darkCardEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.squareCard}
    >
      {/* header */}
      <View style={styles.squareHead}>
        <View style={styles.squareLogo} />
        <View style={styles.flex}>
          <Text style={styles.squareEyebrow}>INTEGRATION</Text>
          <Text style={styles.squareTitle}>Square POS</Text>
        </View>
        <View style={styles.demoBadge}>
          <Text style={styles.demoText}>DEMO MODE</Text>
        </View>
      </View>

      {phase === 'idle' && (
        <>
          <Text style={styles.squareCopy}>
            Sign in with Square to instantly import your catalog — items, modifiers, prices, and
            photos stay in sync.
          </Text>
          {['One-tap menu import', 'Live price sync', 'Auto stock updates'].map((b) => (
            <View key={b} style={styles.bulletRow}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>{b}</Text>
            </View>
          ))}
          <Pressable
            style={({ pressed }) => [styles.connectBtn, pressed && styles.pressed]}
            onPress={connect}
          >
            <LinkIcon size={s(17)} color={colors.text} />
            <Text style={styles.connectText}>Connect Square</Text>
          </Pressable>
        </>
      )}

      {phase === 'connecting' && (
        <View style={styles.squareBusy}>
          <ActivityIndicator color="#fff" />
          <Text style={styles.squareBusyText}>Opening Square sign-in…</Text>
        </View>
      )}

      {(phase === 'importing' || phase === 'done') && (
        <>
          <View style={styles.connectedCard}>
            <View style={styles.connectedTop}>
              <View style={styles.connectedCheck}>
                <CheckIcon size={s(11)} color="#fff" />
              </View>
              <Text style={styles.connectedName}>{getTruck(VENDOR.truckSlug).name}</Text>
            </View>
            <Text style={styles.connectedMeta}>{VENDOR.cart}</Text>
            <Text style={styles.connectedId}>
              ID {VENDOR.squareId} · {VENDOR.currency}
            </Text>
          </View>

          {phase === 'importing' ? (
            <>
              <Text style={styles.importText}>Importing menu… {count}/12</Text>
              <View style={styles.importTrack}>
                <View style={[styles.importFill, { width: `${(count / 12) * 100}%` }]} />
              </View>
            </>
          ) : (
            <>
              <View style={styles.syncedRow}>
                <SparkleIcon size={s(13)} color={colors.demoBadge} />
                <Text style={styles.syncedText}>{note}</Text>
              </View>
              <View style={styles.actionRow}>
                <ActionBtn icon={DownloadIcon} label="RE-IMPORT" onPress={runImport} />
                <ActionBtn icon={RefreshIcon} label="SYNC PRICES" onPress={syncPrices} />
                <ActionBtn icon={UnlinkIcon} label="DISCONNECT" onPress={disconnect} />
              </View>
            </>
          )}
        </>
      )}
    </LinearGradient>
  );
}

function ActionBtn({ icon: Icon, label, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]} onPress={onPress}>
      <Icon size={s(16)} color="#fff" />
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <View style={styles.statTile}>
      <Icon size={s(16)} color={colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// Flatten a truck's sectioned menu into a single list for the catalog preview.
function flattenMenu(truck) {
  const sentence = (sec) => sec.charAt(0) + sec.slice(1).toLowerCase();
  return truck.menu.flatMap((sec) =>
    sec.items.map((it) => ({ ...it, section: sentence(sec.section) }))
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: s(20) },
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },

  // Top eyebrow + switch
  topRow: {
    marginTop: s(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vendorEyebrow: { fontSize: f(12), fontWeight: '800', letterSpacing: 1.5, color: colors.textMuted },
  switchPill: {
    paddingHorizontal: s(14),
    paddingVertical: s(8),
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  switchText: { fontSize: f(12.5), fontWeight: '700', color: colors.primary },

  // Shared grey card
  card: {
    backgroundColor: CARD_BG,
    borderRadius: s(20),
    padding: s(16),
    marginBottom: s(4),
    ...shadow.card,
    shadowOpacity: 0.08,
  },

  // Identity card
  topCard: {
    backgroundColor: CARD_BG,
    borderRadius: s(22),
    padding: s(16),
    marginTop: s(16),
    ...shadow.card,
    shadowOpacity: 0.08,
  },
  idRow: { flexDirection: 'row', alignItems: 'center' },
  acBlock: { marginTop: s(18) },
  idThumb: { width: s(60), height: s(60), borderRadius: s(16), backgroundColor: 'rgba(0,0,0,0.05)' },
  idInfo: { flex: 1, marginLeft: s(14) },
  idNameRow: { flexDirection: 'row', alignItems: 'center' },
  idName: { fontSize: f(18), fontWeight: '800', color: colors.text, flexShrink: 1 },
  verified: {
    width: s(18),
    height: s(18),
    borderRadius: radii.pill,
    backgroundColor: colors.openDot,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: s(7),
  },
  idMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: s(5) },
  idSpot: { marginLeft: s(5), fontSize: f(13), fontWeight: '600', color: colors.textMuted },
  idCuisine: { fontSize: f(13), fontWeight: '600', color: colors.textMuted },
  idSep: { fontSize: f(13), color: colors.textMuted },
  idRating: { fontSize: f(13), fontWeight: '700', color: colors.text },

  // Auto-close reminder (lives in a grey card)
  questTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  acHead: { marginLeft: s(7), fontSize: f(12), fontWeight: '800', letterSpacing: 1, color: colors.text },
  acValue: { fontSize: f(13.5), fontWeight: '800', color: colors.primary },
  sliderTouch: { marginTop: s(14), paddingVertical: s(10), justifyContent: 'center' },
  sliderTrack: { height: s(8), borderRadius: radii.pill, backgroundColor: 'rgba(0,0,0,0.12)' },
  sliderFill: { height: '100%', borderRadius: radii.pill, backgroundColor: colors.text },
  sliderKnob: {
    position: 'absolute',
    top: -s(6), // centres a 20px knob on the 8px track ((8-20)/2)
    width: s(20),
    height: s(20),
    borderRadius: radii.pill,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    marginLeft: -s(10),
    ...shadow.card,
    shadowOpacity: 0.25,
  },
  acCopy: { marginTop: s(12), fontSize: f(12.5), lineHeight: f(18), color: colors.textMuted },

  // Open & serving
  serveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
    paddingVertical: s(16),
    marginTop: s(14),
    ...shadow.card,
  },
  serveOpen: { backgroundColor: colors.green, shadowColor: colors.green, shadowOpacity: 0.35 },
  serveClosed: { backgroundColor: '#B9B4C4', shadowOpacity: 0.12 },
  serveDotOpen: { width: s(9), height: s(9), borderRadius: radii.pill, backgroundColor: '#fff', marginRight: s(9) },
  serveDotClosed: { width: s(9), height: s(9), borderRadius: radii.pill, backgroundColor: '#fff', marginRight: s(9), opacity: 0.8 },
  serveTextOpen: { color: '#fff', fontSize: f(16), fontWeight: '800' },
  serveTextClosed: { color: '#fff', fontSize: f(15.5), fontWeight: '700' },
  serveSub: {
    marginTop: s(10),
    fontSize: f(12.5),
    lineHeight: f(18),
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: s(8),
  },

  // Stat tiles (4-up)
  stats: { flexDirection: 'row', marginTop: s(18) },
  statTile: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: s(16),
    paddingVertical: s(14),
    alignItems: 'center',
    marginHorizontal: s(3),
    ...shadow.card,
    shadowOpacity: 0.06,
  },
  statValue: { marginTop: s(6), fontSize: f(19), fontWeight: '800', color: colors.text },
  statLabel: { marginTop: s(3), fontSize: f(8.5), fontWeight: '700', letterSpacing: 0.4, color: colors.textMuted },

  // Square POS card
  squareCard: { borderRadius: s(22), padding: s(18), marginTop: s(20), marginBottom: s(4), ...shadow.card },
  squareHead: { flexDirection: 'row', alignItems: 'center' },
  squareLogo: { width: s(34), height: s(34), borderRadius: s(9), backgroundColor: '#fff' },
  squareEyebrow: { marginLeft: s(12), fontSize: f(9.5), fontWeight: '700', letterSpacing: 1.5, color: 'rgba(255,255,255,0.55)' },
  squareTitle: { marginLeft: s(12), fontSize: f(17), fontWeight: '800', color: '#fff', marginTop: s(1) },
  demoBadge: { backgroundColor: colors.demoBadge, borderRadius: radii.pill, paddingHorizontal: s(9), paddingVertical: s(4) },
  demoText: { fontSize: f(9.5), fontWeight: '800', letterSpacing: 0.5, color: '#3A340A' },

  squareCopy: { marginTop: s(14), fontSize: f(13), lineHeight: f(19), color: 'rgba(255,255,255,0.8)' },
  bulletRow: { flexDirection: 'row', alignItems: 'center', marginTop: s(8) },
  bullet: { width: s(4), height: s(4), borderRadius: radii.pill, backgroundColor: 'rgba(255,255,255,0.6)', marginRight: s(9), marginLeft: s(3) },
  bulletText: { fontSize: f(12.5), color: 'rgba(255,255,255,0.7)' },
  connectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: s(14),
    paddingVertical: s(14),
    marginTop: s(16),
  },
  connectText: { marginLeft: s(8), fontSize: f(15), fontWeight: '700', color: colors.text },

  squareBusy: { alignItems: 'center', paddingVertical: s(28) },
  squareBusyText: { marginTop: s(12), fontSize: f(13.5), fontWeight: '600', color: 'rgba(255,255,255,0.85)' },

  connectedCard: { marginTop: s(14), backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: s(14), padding: s(13), borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  connectedTop: { flexDirection: 'row', alignItems: 'center' },
  connectedCheck: { width: s(18), height: s(18), borderRadius: radii.pill, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center', marginRight: s(9) },
  connectedName: { fontSize: f(15), fontWeight: '800', color: '#fff' },
  connectedMeta: { marginTop: s(8), fontSize: f(12.5), color: 'rgba(255,255,255,0.8)' },
  connectedId: { marginTop: s(3), fontSize: f(11), letterSpacing: 0.5, color: 'rgba(255,255,255,0.5)' },

  importText: { marginTop: s(14), fontSize: f(12.5), fontWeight: '600', color: 'rgba(255,255,255,0.85)' },
  importTrack: { marginTop: s(9), height: s(7), borderRadius: radii.pill, backgroundColor: 'rgba(255,255,255,0.12)' },
  importFill: { height: '100%', borderRadius: radii.pill, backgroundColor: colors.demoBadge },

  syncedRow: { flexDirection: 'row', alignItems: 'center', marginTop: s(14) },
  syncedText: { marginLeft: s(7), fontSize: f(12.5), fontWeight: '600', color: 'rgba(255,255,255,0.85)' },
  actionRow: { flexDirection: 'row', marginTop: s(14) },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: s(12),
    paddingVertical: s(11),
    marginHorizontal: s(3),
  },
  actionText: { marginTop: s(5), fontSize: f(9.5), fontWeight: '800', letterSpacing: 0.3, color: '#fff' },

  // Sections
  sectionHead: { flexDirection: 'row', alignItems: 'center', marginTop: s(24), marginBottom: s(12) },
  sectionTitle: { marginLeft: s(7), fontSize: f(12), fontWeight: '800', letterSpacing: 1.5, color: colors.textMuted },
  editLink: { marginLeft: 'auto', fontSize: f(12.5), fontWeight: '700', color: colors.primary },

  // Menu preview
  emptyCard: { paddingVertical: s(22) },
  emptyText: { fontSize: f(13.5), lineHeight: f(20), color: colors.textMuted, textAlign: 'center' },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: s(13) },
  divider: { borderTopWidth: 1, borderTopColor: 'rgba(31,18,53,0.08)' },
  menuName: { fontSize: f(15), fontWeight: '700', color: colors.text },
  menuDesc: { marginTop: s(3), fontSize: f(12), color: colors.textMuted },
  menuPrice: { marginLeft: s(10), fontSize: f(15), fontWeight: '800', color: colors.primary },

  // Location & hours
  locSpot: { fontSize: f(16), fontWeight: '800', color: colors.text },
  locHours: { marginTop: s(4), fontSize: f(13), color: colors.textMuted },
  locBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(124,58,237,0.1)',
    borderRadius: s(14),
    paddingVertical: s(13),
    marginTop: s(14),
  },
  locBtnText: { marginLeft: s(8), fontSize: f(14), fontWeight: '700', color: colors.primary },

  // Account
  acctRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: s(15) },
  acctLabel: { flex: 1, marginLeft: s(12), fontSize: f(14.5), fontWeight: '600', color: colors.text },
  acctValue: { fontSize: f(13), fontWeight: '600', color: colors.textMuted },
  signOut: { color: '#D9355B', fontWeight: '700' },

  pressed: { opacity: 0.85 },
});
