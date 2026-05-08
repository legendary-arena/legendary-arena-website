export function LegendaryArenaLogo({ className = "", width = 400, height = 200 }: { className?: string; width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Arena Structure - Hexagonal base */}
      <g id="arena-mark">
        {/* Main hexagonal arena boundary */}
        <path
          d="M 60 50 L 90 30 L 120 50 L 120 90 L 90 110 L 60 90 Z"
          stroke="#1a1a1a"
          strokeWidth="3"
          fill="none"
        />

        {/* Inner converging lines - representing mastery paths */}
        <path d="M 60 50 L 90 70" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M 90 30 L 90 70" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M 120 50 L 90 70" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M 120 90 L 90 70" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M 90 110 L 90 70" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M 60 90 L 90 70" stroke="#1a1a1a" strokeWidth="2" />

        {/* Central point - the apex of mastery */}
        <circle cx="90" cy="70" r="5" fill="#1a1a1a" />

        {/* Upward thrust elements - vertical pillars */}
        <rect x="82" y="35" width="4" height="20" fill="#1a1a1a" />
        <rect x="94" y="35" width="4" height="20" fill="#1a1a1a" />

        {/* Sharp terminals at top */}
        <path d="M 84 35 L 86 28 L 88 35" fill="#1a1a1a" />
        <path d="M 96 35 L 98 28 L 100 35" fill="#1a1a1a" />
      </g>

      {/* Wordmark - LEGENDARY */}
      <g id="legendary-text">
        <text
          x="145"
          y="65"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize="36"
          fontWeight="400"
          fill="#1a1a1a"
          letterSpacing="3"
        >
          LEGENDARY
        </text>
      </g>

      {/* Wordmark - ARENA */}
      <g id="arena-text">
        <text
          x="145"
          y="100"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize="36"
          fontWeight="400"
          fill="#1a1a1a"
          letterSpacing="5"
        >
          ARENA
        </text>

        {/* Underline element - representing the foundation/arena floor */}
        <rect x="145" y="105" width="160" height="3" fill="#1a1a1a" />
      </g>

      {/* Skill-tier marks - small geometric indicators */}
      <g id="tier-marks">
        <rect x="145" y="115" width="8" height="8" fill="#1a1a1a" />
        <rect x="157" y="115" width="8" height="8" fill="#1a1a1a" />
        <rect x="169" y="115" width="8" height="8" fill="#1a1a1a" />
      </g>
    </svg>
  );
}
