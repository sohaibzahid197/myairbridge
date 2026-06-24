# HungerQuest — App Analysis (from walkthrough video)

Source: `2026-06-22 18-05-26.mp4` (1920×1048, 30fps, 4m41s). Originally a Lovable
web prototype (`preview--food-adventure-ui.lovable.app`) shown in Chrome mobile
emulation (400×834). Target rebuild: **Expo React Native (SDK 54), runs in Expo Go**.

Recording artifacts to ignore: DevTools panel, Chrome "Save password?" popup,
"Edit with Lovable" pill, OBS preview window, Windows desktop flashes.

## Concept
Gamified food-truck ("caravan") discovery app, San Francisco / Mission District.
Two personas toggled in-app:
- **Foodie** (customer): discover, map, favorite, quests/XP.
- **Vendor**: manage own truck, open/close, Square POS menu import, stats.

## Design system
- **Background:** warm vertical gradient — yellow `#FDE047` → orange/peach `#FB923C` → pink/magenta `#EC4899` (top→bottom), reused on every screen.
- **Primary accent:** violet `#7C3AED` (buttons, active tabs, links, prices, icons, progress bars).
- **Secondary button:** soft pink `#F9C4D8`.
- **Success CTA:** green `~#1FBF75` ("Open & serving").
- **Integration card:** dark navy→purple gradient; "DEMO MODE" badge in yellow/olive.
- **Cards:** translucent white, large radius (~16–20px), soft shadow.
- **Typography:** bold large display headings; small UPPERCASE letter-spaced eyebrow/section labels; muted gray body.
- **Status:** OPEN = green dot, CLOSED = gray dot.
- **Bottom nav (4 tabs):** HOME · MAP · TRUCKS · PROFILE. Active = filled purple rounded square behind icon.

## Screens & routes

1. **Splash / Landing** (`/`)
   - Compass logo tile + wordmark `HUNGERQUEST`.
   - H1: "Find hidden food caravans worth the detour."
   - Sub: "A premium guide to your city's best food trucks — mapped, rated, and ready when you are."
   - CTA: ✨ "Begin the Quest" (purple) · "Open the map" (pink).

2. **Onboarding Step 1 — Role** (`/onboarding/role`)
   - "STEP 1 OF 2" · "How will you use HungerQuest?" · "Pick the experience that fits you. You can add the other later."
   - Card "I'm a Foodie": "Discover hidden trucks, save favorites, and follow flavor trails near you." chips: Personalized map · Save & follow trucks · Real-time hours.
   - Card "I'm a Vendor": "List your truck, update your menu & location, and reach hungry locals." chips: Truck profile & menu · Live location updates · Insights & reviews.
   - Footer: "Already have an account? Log in".

3. **Onboarding Step 2 — Signup** (`/onboarding/signup?role=customer`)
   - "STEP 2 OF 2" · eyebrow "FOODIE ACCOUNT" · "Create your account".
   - Fields: Full name (ph "Jamie Rivera"), Email (ph "you@email.com"), Password (ph "At least 8 characters"), each with leading icon.
   - Checkbox: "I agree to the Terms and Privacy Policy."
   - "Create account" (→ "Creating account…") · OR · "Continue with Google".
   - Footer: "Want the other side? Sign up as a vendor".

4. **Home / Discover** (`/home`)
   - Eyebrow "TONIGHT IN THE MISSION" · H1 "Discover hidden caravans" · moon (theme) toggle top-right.
   - Search ph: "Search for tacos, bao, sliders…".
   - Filter chips: "Open now" (active) · "Favorites".
   - Truck cards: photo, status badge (OPEN/CLOSED), heart, name, ★rating, "cuisine · distance", "View Menu".

5. **Truck Detail** (`/truck/:slug`, also `/truck/:slug/menu`)
   - Hero image; overlay buttons: back ←, share, heart, moon.
   - Info card: category (e.g. AMERICAN), ★rating pill, title, description, two tiles HOURS / SPOT, full-width purple "Directions".
   - MENU sections (SLIDERS/SIDES/BAO/TACOS/SWEETS): item name, ingredients line, price, "Order" pill.
   - "MORE TO EXPLORE": 3 nearby-truck rows (thumb, name, cuisine·distance, chevron).

6. **Map** (`/map`)
   - Eyebrow "LIVE MAP" · "Nearby caravans". Google map of SF Mission/Castro.
   - Controls: locate/target, zoom +/−. Pins: blue (user), purple (trucks), magenta (selected).
   - Route banner on select: "Route to {Truck}  {dist} · {min}" + ✕, shows "Loading…" then result; purple polyline drawn.
   - Bottom sheet: toggle "Nearby"/"Favorites"; rows with thumb, name, cuisine·distance, status dot, purple paper-plane (navigate) button.

7. **Trucks roster** (`/trucks`)
   - Eyebrow "YOUR ROSTER" · "All trucks in your city".
   - Rows: thumb, name (+open dot), "cuisine · distance · ★rating", chevron. All 4 trucks.

8. **Foodie Profile** (`/profile`)
   - Avatar "AR" · "Ada Reyes" · "Level 14 Explorer · 2,450 XP" · "🏆 Switch to vendor view".
   - "Weekly Quest" card: "75⚡", purple progress bar ~70%, "VISIT 5 NEW TRUCKS THIS WEEK — 3 / 5 FOUND".
   - Stat tiles: 47 VISITS · 12 FAVORITES · 4 CITIES.
   - "FAVORITE TRUCKS": Slider Station (OPEN · 0.4 mi), The Bao Box (CLOSED · 1.2 mi), Finlo's Taco Pop (OPEN · 0.8 mi).
   - "RECENT FOOD HISTORY": Truffle Mushroom — Slider Station — Yesterday; Al Pastor x3 — Finlo's Taco Pop — 3 days ago; Strawberry Cloud — Milkstone — Last week.

9. **Vendor Profile** (`/vendor/profile`)
   - Eyebrow "VENDOR VIEW" · pill "Switch to foodie".
   - Vendor card: Slider Station (verified ✓), 📍 Mission & 18th, "American · ★ 4.9".
   - "AUTO-CLOSE REMINDER" card: draggable slider (seen 1h30m / 2h / 3h15m), copy "We'll ping you {X} after opening and auto-close your truck if you don't tap 'still cooking'."
   - Green CTA "● Open & serving"; sub "284 foodies have you on their Quest — they'll be notified the instant you open."
   - Stat tiles: 38 ORDERS · 6m AVG PICKUP · 12 REPEATS · 284 FAVORITES.
   - "Square POS" integration card (DEMO MODE): "Sign in with Square to instantly import your catalog — items, modifiers, prices, and photos stay in sync." bullets: One-tap menu import · Live price sync · Auto stock updates. Button "🔗 Connect Square".
     - Flow: Connect → "Opening Square sign-in…" → connected card (Slider Station, "Mission District — Cart #2", "ID MLZE3X5P8RQ4F · USD") → "Importing menu… 8/12" (yellow progress) → "✦ Synced 12 items · just now"; buttons RE-IMPORT / SYNC PRICES / DISCONNECT.
   - "MENU PREVIEW": empty state "No menu yet. Connect Square to pull your live catalog, or add items manually." → populated list after import (with `$0.00` prices) + "Edit →".
   - "LOCATION & HOURS": Mission & 18th / Open until 11:00 PM / "📍 Update live location".
   - "ACCOUNT" / "↩ Sign out".

## Seed data (trucks)

| Truck | slug | Cuisine | Rating | Status | Spot | Hours | Distance |
|---|---|---|---|---|---|---|---|
| Slider Station | slider-station | American | 4.9 | OPEN | Mission & 18th | Open until 11:00 PM | 0.4 mi |
| The Bao Box | bao-box | Asian Fusion | 4.7 | CLOSED | Dolores Park | Opens at 5:00 PM | 1.2 mi |
| Finlo's Taco Pop | finlos-tacos | Mexican | 4.8 | OPEN | Valencia & 22nd | Open until 10:00 PM | 0.8 mi |
| Milkstone | milkstone | Desserts | 4.6 | OPEN | Golden Gate Park | Open until 9:30 PM | 1.7 mi |

Descriptions:
- Slider Station: "Smashed wagyu sliders on house brioche, hand-cut fries, twelve sauces."
- The Bao Box: "Pillowy steamed bao stuffed with slow-braised meats and crisp pickles."
- Finlo's Taco Pop: "Heirloom corn tortillas pressed to order, charcoal-grilled meats, salsas made daily."
- Milkstone: "Small-batch soft serve, sea-salt caramel sundaes, fresh berry sorbets."

Menus:
- **Slider Station** — SLIDERS: Classic Wagyu $7 (American cheese, pickle, secret sauce); Truffle Mushroom $9 (Wild mushroom, gruyere, truffle aioli); Nashville Hot $8 (Crispy chicken, hot honey, slaw); BBQ Brisket $9 (House BBQ, pickled onion). SIDES: Hand-cut Fries $5 (Sea salt, rosemary); Loaded Tots $8 (Bacon, scallion, queso).
- **The Bao Box** — BAO: Pork Belly Bao $6 (Hoisin, cucumber, scallion); Crispy Tofu Bao $5 (Sweet chili, herbs); Five-Spice Duck $8 (Plum glaze, pickled daikon).
- **Finlo's Taco Pop** — TACOS: Al Pastor $4 (Pineapple, cilantro, onion); Carne Asada $5 (Charred steak, salsa verde); Hongos $4 (Mushroom, queso fresco).
- **Milkstone** — SWEETS: Strawberry Cloud $6 (Fresh strawberry soft serve); Salted Caramel Sundae $8 (House caramel, sea salt, almond).

Foodie profile: Ada Reyes — Level 14 Explorer — 2,450 XP — 47 visits / 12 favorites / 4 cities — weekly quest 3/5 (75 XP).
Vendor: Slider Station — Cart #2 — ID MLZE3X5P8RQ4F — USD — 38 orders / 6m avg pickup / 12 repeats / 284 favorites.

## Rebuild notes (Expo)
- Navigation: bottom tabs (Home/Map/Trucks/Profile) + stack for Splash, Onboarding (2 steps), Truck detail.
- State: persona (foodie/vendor) global toggle; favorites; vendor open/closed + Square mock import.
- Maps in Expo Go: `react-native-maps` (Google provider on Android Expo Go).
- All data is mock/static (no backend in the prototype).
