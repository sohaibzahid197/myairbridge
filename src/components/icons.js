import React from 'react';
import Svg, { Path, Circle, Polygon, Polyline, Line, Rect } from 'react-native-svg';

// Minimal SVG icon set (stroke-based, 24x24 viewBox).
// Usage: <HomeIcon size={24} color="#fff" filled />

const base = (size) => ({ width: size, height: size, viewBox: '0 0 24 24' });

export function HomeIcon({ size = 24, color = '#000', filled = false }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path
        d="M3 10.5 12 3l9 7.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.25 : 0}
      />
    </Svg>
  );
}

export function MapIcon({ size = 24, color = '#000', filled = false }) {
  return (
    <Svg {...base(size)} fill="none">
      <Polygon
        points="9,4 15,7 21,4 21,20 15,17 9,20 3,17 3,4"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.25 : 0}
      />
      <Line x1="9" y1="4" x2="9" y2="20" stroke={color} strokeWidth={2} />
      <Line x1="15" y1="7" x2="15" y2="17" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function TruckIcon({ size = 24, color = '#000', filled = false }) {
  return (
    <Svg {...base(size)} fill="none">
      <Rect
        x="1"
        y="6"
        width="13"
        height="9"
        rx="1.5"
        stroke={color}
        strokeWidth={2}
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.25 : 0}
      />
      <Path
        d="M14 9h4l3 3v3h-7V9Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.25 : 0}
      />
      <Circle cx="6" cy="18" r="2" stroke={color} strokeWidth={2} />
      <Circle cx="17" cy="18" r="2" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function PersonIcon({ size = 24, color = '#000', filled = false }) {
  return (
    <Svg {...base(size)} fill="none">
      <Circle
        cx="12"
        cy="8"
        r="4"
        stroke={color}
        strokeWidth={2}
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.25 : 0}
      />
      <Path
        d="M4 21c0-4 3.5-6 8-6s8 2 8 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.25 : 0}
      />
    </Svg>
  );
}

export function SearchIcon({ size = 24, color = '#000' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={2} />
      <Line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function HeartIcon({ size = 24, color = '#000', filled = false }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path
        d="M12 21s-7-4.4-9.5-8.6C1 9.5 2.6 6 6 6c2 0 3.2 1.2 4 2.3C10.8 7.2 12 6 14 6c3.4 0 5 3.5 3.5 6.4C19 16.6 12 21 12 21Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
      />
    </Svg>
  );
}

export function StarIcon({ size = 16, color = '#7C3AED' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Polygon
        points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9"
        fill={color}
      />
    </Svg>
  );
}

export function BackIcon({ size = 24, color = '#000' }) {
  return (
    <Svg {...base(size)} fill="none">
      {/* shaft */}
      <Line x1="19" y1="12" x2="5" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
      {/* arrowhead */}
      <Polyline
        points="11,6 5,12 11,18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ShareIcon({ size = 24, color = '#000' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Circle cx="6" cy="12" r="2.5" stroke={color} strokeWidth={2} />
      <Circle cx="18" cy="6" r="2.5" stroke={color} strokeWidth={2} />
      <Circle cx="18" cy="18" r="2.5" stroke={color} strokeWidth={2} />
      <Line x1="8.2" y1="10.8" x2="15.8" y2="7.2" stroke={color} strokeWidth={2} />
      <Line x1="8.2" y1="13.2" x2="15.8" y2="16.8" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function MoonIcon({ size = 24, color = '#000' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path
        d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SendIcon({ size = 22, color = '#000' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Polygon
        points="21,3 3,10.5 10,13 13,21 21,3"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function ChevronRight({ size = 22, color = '#000' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Polyline
        points="9,5 16,12 9,19"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CompassIcon({ size = 40, color = '#7C3AED' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
      <Polygon points="12,12 16,8 13,13" fill={color} />
      <Polygon points="12,12 8,16 11,11" fill={color} fillOpacity={0.5} />
    </Svg>
  );
}

export function CheckIcon({ size = 16, color = '#fff' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Polyline
        points="4,12 10,18 20,6"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ClockIcon({ size = 18, color = '#7C3AED' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
      <Polyline points="12,7 12,12 16,14" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PinIcon({ size = 18, color = '#7C3AED' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path
        d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="10" r="2.5" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function SparkleIcon({ size = 18, color = '#fff' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path
        d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"
        fill={color}
      />
    </Svg>
  );
}

export function ForkKnifeIcon({ size = 22, color = '#7A3346' }) {
  return (
    <Svg {...base(size)} fill="none">
      {/* Fork */}
      <Path
        d="M6 3v4.5a2.5 2.5 0 0 0 5 0V3"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M8.5 3v6.4M8.5 9.4V21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      {/* Knife */}
      <Path
        d="M17 3c-1.9 1.2-2.7 3.9-2.7 6.5H17"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M17 3v18" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function ChefHatIcon({ size = 22, color = '#6D28D9' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path
        d="M7 14a4 4 0 0 1-1.3-7.8 4 4 0 0 1 7.3-2.1 4 4 0 0 1 6.3 2.1A4 4 0 0 1 17 14Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 14v4.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V14"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path d="M10 19.5V15M14 19.5V15" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

export function MailIcon({ size = 18, color = '#6B5B7B' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Rect x="3" y="5" width="18" height="14" rx="2.5" stroke={color} strokeWidth={1.8} />
      <Path
        d="M4 7l8 5.5L20 7"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LockIcon({ size = 18, color = '#6B5B7B' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Rect x="5" y="10" width="14" height="10" rx="2.5" stroke={color} strokeWidth={1.8} />
      <Path d="M8 10V8a4 4 0 0 1 8 0v2" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx="12" cy="14.8" r="1.4" fill={color} />
    </Svg>
  );
}

export function TrophyIcon({ size = 18, color = '#7C3AED', filled = false }) {
  return (
    <Svg {...base(size)} fill="none">
      {/* cup */}
      <Path
        d="M7 4h10v3.5a5 5 0 0 1-10 0V4Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.2 : 0}
      />
      {/* handles */}
      <Path d="M7 5.5H4.5v1a3 3 0 0 0 3 3" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17 5.5h2.5v1a3 3 0 0 1-3 3" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      {/* stem + base */}
      <Path d="M12 12.5V16" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path
        d="M9 20h6l-1-4h-4l-1 4Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.2 : 0}
      />
    </Svg>
  );
}

export function BoltIcon({ size = 16, color = '#7C3AED' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" fill={color} />
    </Svg>
  );
}

export function BagIcon({ size = 18, color = '#7C3AED' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path d="M6 8h12l-1 12H7L6 8Z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      <Path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function RefreshIcon({ size = 18, color = '#7C3AED' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="20,3 20,8 15,8" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="4,21 4,16 9,16" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function BellIcon({ size = 18, color = '#7C3AED' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      <Path d="M10 19a2 2 0 0 0 4 0" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function LinkIcon({ size = 18, color = '#000' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function UnlinkIcon({ size = 18, color = '#000' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="4" y1="4" x2="20" y2="20" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function DownloadIcon({ size = 18, color = '#000' }) {
  return (
    <Svg {...base(size)} fill="none">
      <Path d="M12 4v10" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Polyline points="8,11 12,15 16,11" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5 19h14" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
