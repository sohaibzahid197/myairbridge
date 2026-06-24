// Static truck data — transcribed from the walkthrough (ANALYSIS.md)

// Shared hero photo used on every truck card / detail hero (per design).
export const TRUCK_IMAGE = require('../../assets/img1.jpeg');

export const TRUCKS = [
  {
    slug: 'slider-station',
    name: 'Slider Station',
    cuisine: 'American',
    rating: 4.9,
    open: true,
    distance: '0.4 mi',
    spot: 'Mission & 18th',
    hours: 'Open until 11:00 PM',
    description:
      'Smashed wagyu sliders on house brioche, hand-cut fries, twelve sauces.',
    color: '#2FB7A6', // hero accent (teal truck)
    emoji: '🍔',
    hero: ['#34C7B4', '#1E8576'],
    menu: [
      {
        section: 'SLIDERS',
        items: [
          { name: 'Classic Wagyu', price: 7, desc: 'American cheese, pickle, secret sauce' },
          { name: 'Truffle Mushroom', price: 9, desc: 'Wild mushroom, gruyere, truffle aioli' },
          { name: 'Nashville Hot', price: 8, desc: 'Crispy chicken, hot honey, slaw' },
          { name: 'BBQ Brisket', price: 9, desc: 'House BBQ, pickled onion' },
        ],
      },
      {
        section: 'SIDES',
        items: [
          { name: 'Hand-cut Fries', price: 5, desc: 'Sea salt, rosemary' },
          { name: 'Loaded Tots', price: 8, desc: 'Bacon, scallion, queso' },
        ],
      },
    ],
  },
  {
    slug: 'bao-box',
    name: 'The Bao Box',
    cuisine: 'Asian Fusion',
    rating: 4.7,
    open: false,
    distance: '1.2 mi',
    spot: 'Dolores Park',
    hours: 'Opens at 5:00 PM',
    description:
      'Pillowy steamed bao stuffed with slow-braised meats and crisp pickles.',
    color: '#E0556E',
    emoji: '🥟',
    hero: ['#EC6A82', '#B83C53'],
    menu: [
      {
        section: 'BAO',
        items: [
          { name: 'Pork Belly Bao', price: 6, desc: 'Hoisin, cucumber, scallion' },
          { name: 'Crispy Tofu Bao', price: 5, desc: 'Sweet chili, herbs' },
          { name: 'Five-Spice Duck', price: 8, desc: 'Plum glaze, pickled daikon' },
        ],
      },
    ],
  },
  {
    slug: 'finlos-tacos',
    name: "Finlo's Taco Pop",
    cuisine: 'Mexican',
    rating: 4.8,
    open: true,
    distance: '0.8 mi',
    spot: 'Valencia & 22nd',
    hours: 'Open until 10:00 PM',
    description:
      'Heirloom corn tortillas pressed to order, charcoal-grilled meats, salsas made daily.',
    color: '#E8743B',
    emoji: '🌮',
    hero: ['#F2864D', '#C9551F'],
    menu: [
      {
        section: 'TACOS',
        items: [
          { name: 'Al Pastor', price: 4, desc: 'Pineapple, cilantro, onion' },
          { name: 'Carne Asada', price: 5, desc: 'Charred steak, salsa verde' },
          { name: 'Hongos', price: 4, desc: 'Mushroom, queso fresco' },
        ],
      },
    ],
  },
  {
    slug: 'milkstone',
    name: 'Milkstone',
    cuisine: 'Desserts',
    rating: 4.6,
    open: true,
    distance: '1.7 mi',
    spot: 'Golden Gate Park',
    hours: 'Open until 9:30 PM',
    description:
      'Small-batch soft serve, sea-salt caramel sundaes, fresh berry sorbets.',
    color: '#EC79A8',
    emoji: '🍦',
    hero: ['#F58FBA', '#D85B91'],
    menu: [
      {
        section: 'SWEETS',
        items: [
          { name: 'Strawberry Cloud', price: 6, desc: 'Fresh strawberry soft serve' },
          { name: 'Salted Caramel Sundae', price: 8, desc: 'House caramel, sea salt, almond' },
        ],
      },
    ],
  },
];

export const getTruck = (slug) => TRUCKS.find((t) => t.slug === slug);

// "More to explore" = every other truck
export const otherTrucks = (slug) => TRUCKS.filter((t) => t.slug !== slug);
