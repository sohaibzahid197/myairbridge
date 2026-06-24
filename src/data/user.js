// Static persona data — from ANALYSIS.md

export const FOODIE = {
  initials: 'AR',
  name: 'Ada Reyes',
  level: 14,
  levelTitle: 'Explorer',
  xp: 2450,
  stats: { visits: 47, favorites: 12, cities: 4 },
  weeklyQuest: {
    label: 'VISIT 5 NEW TRUCKS THIS WEEK',
    found: 3,
    total: 5,
    reward: 75,
  },
  favorites: ['slider-station', 'bao-box', 'finlos-tacos'],
  history: [
    { item: 'Truffle Mushroom', truck: 'Slider Station', when: 'Yesterday' },
    { item: 'Al Pastor x3', truck: "Finlo's Taco Pop", when: '3 days ago' },
    { item: 'Strawberry Cloud', truck: 'Milkstone', when: 'Last week' },
  ],
};

export const VENDOR = {
  truckSlug: 'slider-station',
  verified: true,
  spot: 'Mission & 18th',
  hours: 'Open until 11:00 PM',
  squareId: 'MLZE3X5P8RQ4F',
  cart: 'Mission District — Cart #2',
  currency: 'USD',
  followers: 284,
  stats: { orders: 38, avgPickup: '6m', repeats: 12, favorites: 284 },
};
