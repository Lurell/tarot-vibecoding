export function CardBack() {
  return (
    <svg viewBox="0 0 200 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d1b4e" />
          <stop offset="50%" stopColor="#1a1128" />
          <stop offset="100%" stopColor="#2d1b4e" />
        </linearGradient>
        <pattern id="stars" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.5" fill="#8b5cf6" opacity="0.3" />
          <circle cx="0" cy="0" r="1" fill="#a78bfa" opacity="0.2" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="200" height="280" rx="12" fill="url(#bg)" />
      <rect width="200" height="280" rx="12" fill="url(#stars)" />

      {/* Border */}
      <rect x="8" y="8" width="184" height="264" rx="8" fill="none" stroke="#4c1d95" strokeWidth="1.5" />
      <rect x="12" y="12" width="176" height="256" rx="6" fill="none" stroke="#6d28d9" strokeWidth="0.5" />

      {/* Center eye/mandala */}
      <circle cx="100" cy="130" r="30" fill="none" stroke="#a78bfa" strokeWidth="0.8" opacity="0.5" />
      <circle cx="100" cy="130" r="20" fill="none" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.6" />
      <circle cx="100" cy="130" r="10" fill="none" stroke="#c4b5fd" strokeWidth="1" opacity="0.7" />
      <circle cx="100" cy="130" r="3" fill="#f59e0b" opacity="0.8" />

      {/* Corner ornaments */}
      {[[25,40],[175,40],[25,220],[175,220]].map(([x, y]) => (
        <g key={`${x}-${y}`} opacity="0.4">
          <circle cx={x} cy={y} r="8" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
          <circle cx={x} cy={y} r="4" fill="#a78bfa" opacity="0.3" />
        </g>
      ))}
    </svg>
  );
}
