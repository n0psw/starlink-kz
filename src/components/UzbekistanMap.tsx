import { useState, useCallback, useRef, useEffect } from 'react'

const UZ_PATH = 'M530.883,439.079L531.983,408.224L478.891,386.488L437.15,361.461L411.118,337.234L365.466,301.401L345.846,247.227L332.454,237.602L289.298,240.046L274.026,229.161L269.759,186.421L215.978,157.817L182.351,189.251L148.252,207.755L154.805,234.63L109.774,235.357L108.207,33.528L210.954,0L218.412,4.946L280.278,45.462L312.942,66.662L351.059,116.639L397.857,108.617L466.311,104.311L514.096,144.412L511.117,198.711L530.566,199.087L538.684,242.798L589.447,244.519L600.385,269.531L615.256,269.197L632.721,231.337L685.365,194.054L708.249,184.098L720.101,189.404L686.604,224.108L716.054,244.116L744.483,230.877L791.793,258.796L740.682,296.603L710.32,291.455L693.844,292.806L688.127,278.246L696.447,253.822L643.077,266.083L630.39,299.718L611.422,328.437L578.094,326.002L567.748,348.734L597.037,360.992L605.659,398.979L583.226,450L553.122,439.412Z'

interface City {
  id: string
  nameRu: string
  nameLocal: string
  x: number
  y: number
  isWarehouse: boolean
}

const CITIES: City[] = [
  { id: 'tashkent', nameRu: 'Ташкент', nameLocal: 'Toshkent', x: 639.5, y: 236.3, isWarehouse: true },
  { id: 'samarkand', nameRu: 'Самарканд', nameLocal: 'Samarqand', x: 548.9, y: 324, isWarehouse: true },
  { id: 'bukhara', nameRu: 'Бухара', nameLocal: 'Buxoro', x: 447.1, y: 316.2, isWarehouse: true }
]

const CONNECTIONS = [
  { from: 'tashkent', to: 'samarkand' },
  { from: 'samarkand', to: 'bukhara' }
]

interface UzbekistanMapProps {
  language: string
  isMobile: boolean
  onCityHover?: (city: { id: string; nameRu: string; nameLocal: string; isWarehouse: boolean } | null) => void
}

const UzbekistanMap = ({ language, isMobile, onCityHover }: UzbekistanMapProps) => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({ x: y * -8, y: x * 12 })
    },
    [isMobile]
  )

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setHoveredCity(null)
    if (onCityHover) onCityHover(null)
  }, [onCityHover])

  const getCity = (id: string) => CITIES.find(c => c.id === id)

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative w-full transition-all duration-1000 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          filter: isVisible ? 'none' : 'blur(8px)',
        }}
      >
        <div
          className="relative w-full transition-transform duration-200 ease-out"
          style={{
            transform: isMobile
              ? undefined
              : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <svg
            viewBox="0 0 900 450"
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 4px 20px rgba(14,165,233,0.12))' }}
          >
            <defs>
              <linearGradient id="uz-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(14,165,233,0.08)" />
                <stop offset="50%" stopColor="rgba(56,189,248,0.05)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.1)" />
              </linearGradient>

              <linearGradient id="uz-border" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(14,165,233,0.7)" />
                <stop offset="50%" stopColor="rgba(56,189,248,0.5)" />
                <stop offset="100%" stopColor="rgba(2,132,199,0.7)" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="city-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <clipPath id="uz-clip">
                <path d={UZ_PATH} />
              </clipPath>

              <linearGradient id="scan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(56,189,248,0)" />
                <stop offset="45%" stopColor="rgba(56,189,248,0.08)" />
                <stop offset="50%" stopColor="rgba(56,189,248,0.15)" />
                <stop offset="55%" stopColor="rgba(56,189,248,0.08)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0)" />
              </linearGradient>
            </defs>

            <g clipPath="url(#uz-clip)" opacity="0.5">
              {Array.from({ length: 35 }, (_, row) =>
                Array.from({ length: 70 }, (_, col) => {
                  const cx = 20 + col * 12.5
                  const cy = 20 + row * 12.5
                  return (
                    <circle
                      key={`${row}-${col}`}
                      cx={cx}
                      cy={cy}
                      r="0.8"
                      fill="rgba(14,165,233,0.25)"
                    />
                  )
                })
              )}
            </g>

            <path
              d={UZ_PATH}
              fill="url(#uz-fill)"
              stroke="none"
            />

            <g clipPath="url(#uz-clip)">
              <rect
                x="0"
                y="0"
                width="900"
                height="450"
                fill="url(#scan-grad)"
                style={{ animation: 'scan-beam 8s linear infinite' }}
              />
            </g>

            <path
              d={UZ_PATH}
              fill="none"
              stroke="url(#uz-border)"
              strokeWidth="1.8"
              strokeLinejoin="round"
              filter="url(#glow)"
            />

            {CONNECTIONS.map((conn) => {
              const from = getCity(conn.from)
              const to = getCity(conn.to)
              if (!from || !to) return null

              const isActive = hoveredCity === conn.from || hoveredCity === conn.to

              return (
                <line
                  key={`${conn.from}-${conn.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isActive ? 'rgba(56,189,248,0.35)' : 'rgba(14,165,233,0.1)'}
                  strokeWidth={isActive ? '1.2' : '0.6'}
                  strokeDasharray="6 4"
                  style={{
                    transition: 'all 0.3s ease',
                    animation: 'data-flow 2s linear infinite',
                  }}
                />
              )
            })}

            {CITIES.map((city) => {
              const isHovered = hoveredCity === city.id
              const isConnected = hoveredCity && CONNECTIONS.some(
                c => (c.from === hoveredCity && c.to === city.id) || (c.to === hoveredCity && c.from === city.id)
              )

              return (
                <g key={city.id}>
                  {city.isWarehouse && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="8"
                      fill="none"
                      stroke="rgba(56,189,248,0.3)"
                      strokeWidth="1"
                      style={{ animation: 'pulse-ring 3s ease-out infinite' }}
                    />
                  )}

                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={city.isWarehouse ? 6 : 3.5}
                    fill={city.isWarehouse ? 'rgba(56,189,248,0.15)' : 'rgba(56,189,248,0.08)'}
                    filter={city.isWarehouse ? 'url(#city-glow)' : undefined}
                  />

                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={isHovered ? (city.isWarehouse ? 5 : 4) : (city.isWarehouse ? 4 : 2.5)}
                    fill={
                      isHovered || isConnected
                        ? '#38bdf8'
                        : city.isWarehouse
                          ? '#0ea5e9'
                          : 'rgba(14,165,233,0.5)'
                    }
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      filter: isHovered ? 'drop-shadow(0 0 8px rgba(56,189,248,0.6))' : 'none',
                    }}
                    onMouseEnter={() => {
                      setHoveredCity(city.id)
                      if (onCityHover) onCityHover({ id: city.id, nameRu: city.nameRu, nameLocal: city.nameLocal, isWarehouse: city.isWarehouse })
                    }}
                    onMouseLeave={() => {
                      setHoveredCity(null)
                      if (onCityHover) onCityHover(null)
                    }}
                  />
                  <text
                    x={city.x}
                    y={city.y - (city.isWarehouse ? 14 : 10)}
                    textAnchor="middle"
                    fill={isHovered || city.isWarehouse ? '#38bdf8' : 'rgba(226,232,240,0.85)'}
                    fontSize={isHovered ? '12' : city.isWarehouse ? '10' : '8.5'}
                    fontWeight="600"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif"
                    style={{
                      pointerEvents: 'none',
                      transition: 'all 0.2s ease',
                      textShadow: '0 2px 5px rgba(5,8,16,0.95), 0 0 10px rgba(56,189,248,0.3)',
                      opacity: isHovered ? 1 : city.isWarehouse ? 0.95 : 0.55,
                    }}
                  >
                    {language === 'ru' ? city.nameRu : city.nameLocal}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}

export default UzbekistanMap
