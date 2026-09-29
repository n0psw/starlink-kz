/**
 * SatelliteAnimation — lightweight CSS/SVG animation shown instead of
 * KazakhstanMap for non-KZ country sites. Pure CSS animations for performance.
 */
const SatelliteAnimation = () => {
  return (
    <div className="relative w-full max-w-[700px] mx-auto" style={{ aspectRatio: '16/9' }}>
      {/* Central dish */}
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for dish */}
          <linearGradient id="dish-grad" x1="200" y1="120" x2="200" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Soft pulse filter */}
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Signal arcs — CSS-animated opacity for pulse effect */}
        <g filter="url(#soft-glow)">
          {[1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M ${200 - 30 * i} ${180 - 15 * i} A ${30 * i} ${30 * i} 0 0 1 ${200 + 30 * i} ${180 - 15 * i}`}
              stroke="#0ea5e9"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              style={{
                opacity: 0,
                animation: `signal-pulse 3s ${i * 0.5}s ease-out infinite`,
              }}
            />
          ))}
        </g>

        {/* Satellite dish — stylized silhouette */}
        <g filter="url(#glow)">
          {/* Dish body (parabola shape) */}
          <path
            d="M140 210 Q200 140 260 210"
            stroke="url(#dish-grad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Inner parabola */}
          <path
            d="M155 208 Q200 160 245 208"
            stroke="#38bdf8"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            opacity="0.3"
          />
          {/* Receiver arm */}
          <line
            x1="200"
            y1="210"
            x2="200"
            y2="175"
            stroke="#38bdf8"
            strokeWidth="2"
            opacity="0.7"
          />
          {/* LNB (receiver head) */}
          <circle cx="200" cy="172" r="4" fill="#38bdf8" opacity="0.9" />
          {/* Stand */}
          <line
            x1="200"
            y1="210"
            x2="200"
            y2="245"
            stroke="#1e3a5f"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Base */}
          <ellipse
            cx="200"
            cy="248"
            rx="25"
            ry="5"
            fill="#1e3a5f"
            opacity="0.6"
          />
        </g>

        {/* Orbiting satellites — CSS keyframes */}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            r="2.5"
            fill="#38bdf8"
            filter="url(#glow)"
            style={{
              offsetPath: `path('M 50 ${80 + i * 40} Q 200 ${30 + i * 20} 350 ${80 + i * 40}')`,
              animation: `orbit ${5 + i * 2}s ${i * 1.5}s linear infinite`,
              opacity: 0.8,
            }}
          />
        ))}

        {/* Small static stars */}
        {[
          { cx: 50, cy: 40, delay: 0 },
          { cx: 320, cy: 55, delay: 1.2 },
          { cx: 85, cy: 90, delay: 2.5 },
          { cx: 300, cy: 30, delay: 0.8 },
          { cx: 150, cy: 25, delay: 3.1 },
          { cx: 250, cy: 45, delay: 1.8 },
          { cx: 370, cy: 100, delay: 0.5 },
          { cx: 30, cy: 130, delay: 2.2 },
        ].map((star, i) => (
          <circle
            key={i}
            cx={star.cx}
            cy={star.cy}
            r="1"
            fill="white"
            style={{
              animation: `twinkle 4s ${star.delay}s ease-in-out infinite`,
              opacity: 0.3,
            }}
          />
        ))}
      </svg>

      {/* CSS Keyframes — injected inline for component encapsulation */}
      <style>{`
        @keyframes signal-pulse {
          0% { opacity: 0; transform: scale(0.8); }
          30% { opacity: 0.6; }
          100% { opacity: 0; transform: scale(1.1); }
        }
        @keyframes orbit {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { offset-distance: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default SatelliteAnimation
