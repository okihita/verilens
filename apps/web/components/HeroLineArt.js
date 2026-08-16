'use client';

export default function HeroLineArt() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1400 640"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: '100%',
          height: '100%',
          opacity: '0.9'
        }}
      >
        <defs>
          <linearGradient id="amberBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-amber)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="emeraldBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-emerald-light)" stopOpacity="0.65" />
            <stop offset="100%" stopColor="var(--accent-emerald-light)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="chaosPulse" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-red)" stopOpacity="0.05" />
            <stop offset="80%" stopColor="var(--accent-red)" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* 1. Technical Coordinate Grid */}
        <g stroke="var(--text-main)" strokeWidth="0.75" opacity="0.04">
          <line x1="100" y1="0" x2="100" y2="640" strokeDasharray="3 6" />
          <line x1="350" y1="0" x2="350" y2="640" strokeDasharray="3 6" />
          <line x1="700" y1="0" x2="700" y2="640" strokeDasharray="3 6" />
          <line x1="1050" y1="0" x2="1050" y2="640" strokeDasharray="3 6" />
          <line x1="1300" y1="0" x2="1300" y2="640" strokeDasharray="3 6" />
          <line x1="0" y1="160" x2="1400" y2="160" strokeDasharray="3 6" />
          <line x1="0" y1="320" x2="1400" y2="320" strokeDasharray="3 6" />
          <line x1="0" y1="480" x2="1400" y2="480" strokeDasharray="3 6" />
        </g>

        {/* 2. SIFT Radar / Concentric Verification Arcs (Center-Right) */}
        <g stroke="var(--text-main)" fill="none" strokeWidth="1" opacity="0.07">
          <circle cx="820" cy="300" r="140" strokeDasharray="4 8" />
          <circle cx="820" cy="300" r="220" strokeDasharray="2 6" />
          <circle cx="820" cy="300" r="310" strokeDasharray="5 12" />
        </g>

        {/* 3. Handdrawn Chaotic Feed Noise Stream (Upper-Left to Center Prism) */}
        <g fill="none">
          <path
            d="M 60,180 Q 140,240 220,160 T 380,210 T 540,170 T 680,260 L 760,280"
            stroke="url(#chaosPulse)"
            strokeWidth="1.75"
            strokeDasharray="4 2"
          />
          <path
            d="M 90,260 Q 180,310 270,220 T 430,280 T 590,230 L 740,290"
            stroke="var(--accent-red)"
            strokeWidth="1.25"
            opacity="0.35"
          />
          <path
            d="M 120,120 Q 240,160 360,110 T 520,180 T 640,240 L 750,275"
            stroke="var(--text-main)"
            strokeWidth="1"
            strokeDasharray="2 4"
            opacity="0.08"
          />
          <path
            d="M 460,250 L 475,225 L 490,255 L 505,235 L 520,260"
            stroke="var(--accent-red)"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <path
            d="M 310,170 L 325,145 L 340,175 L 355,150"
            stroke="var(--text-main)"
            strokeWidth="1.2"
            opacity="0.1"
          />
        </g>

        {/* 4. Handdrawn Architectural Prism Sketch (Center Anchor at 780, 290) */}
        <g stroke="var(--text-main)" fill="none">
          <polygon
            points="780,140 680,380 920,380"
            strokeWidth="1.8"
            opacity="0.22"
          />
          <polygon
            points="782,143 684,378 916,378"
            strokeWidth="0.8"
            strokeDasharray="6 3"
            opacity="0.15"
          />
          <line x1="780" y1="140" x2="800" y2="380" strokeWidth="1.2" opacity="0.18" />
          <line x1="780" y1="140" x2="740" y2="380" strokeWidth="0.9" strokeDasharray="3 3" opacity="0.12" />
          
          <path
            d="M 750,210 A 60,60 0 0,1 810,210"
            strokeWidth="1"
            opacity="0.2"
          />
          <text
            x="816"
            y="214"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fontWeight="700"
            fill="var(--text-secondary)"
            opacity="0.3"
          >
            58.4° SIFT
          </text>

          <circle cx="780" cy="290" r="3.5" fill="var(--accent-amber)" opacity="0.6" />
          <circle cx="780" cy="290" r="8" stroke="var(--accent-amber)" strokeWidth="1" opacity="0.35" strokeDasharray="2 2" />
        </g>

        {/* 5. Refracted Harmonic Truth Streams (Prism to Right Edge) */}
        <g fill="none">
          <path
            d="M 800,285 L 940,270 L 1120,265 L 1380,265"
            stroke="url(#amberBeam)"
            strokeWidth="2.2"
          />
          <path
            d="M 800,285 L 950,280 L 1160,280 L 1380,280"
            stroke="var(--accent-amber)"
            strokeWidth="1"
            strokeDasharray="8 4"
            opacity="0.35"
          />

          <path
            d="M 800,295 L 960,315 L 1150,325 L 1380,330"
            stroke="url(#emeraldBeam)"
            strokeWidth="2"
          />
          <path
            d="M 800,295 L 980,330 L 1180,345 L 1380,350"
            stroke="var(--accent-emerald-light)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.4"
          />

          <path
            d="M 820,310 Q 900,260 980,310 T 1140,310 T 1300,310 T 1400,310"
            stroke="var(--accent-blue-light)"
            strokeWidth="1.2"
            opacity="0.25"
          />
          <path
            d="M 820,330 Q 910,290 1000,330 T 1180,330 T 1360,330"
            stroke="var(--text-main)"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            opacity="0.1"
          />

          <g stroke="var(--accent-emerald-light)" fill="none" opacity="0.4" strokeWidth="1">
            <line x1="1020" y1="250" x2="1020" y2="360" strokeDasharray="2 3" />
            <line x1="1200" y1="240" x2="1200" y2="370" strokeDasharray="2 3" />
            <circle cx="1020" cy="265" r="2.5" fill="var(--accent-amber)" />
            <circle cx="1020" cy="325" r="2.5" fill="var(--accent-emerald-light)" />
            <circle cx="1200" cy="265" r="2.5" fill="var(--accent-amber)" />
            <circle cx="1200" cy="330" r="2.5" fill="var(--accent-emerald-light)" />
          </g>

          <text
            x="1026"
            y="248"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="700"
            fill="var(--text-secondary)"
            opacity="0.25"
          >
            LATERAL_VERIFY
          </text>
        </g>

        {/* 6. Technical Corner Crosshairs */}
        <g stroke="var(--text-main)" strokeWidth="1" opacity="0.12">
          <line x1="30" y1="40" x2="50" y2="40" />
          <line x1="40" y1="30" x2="40" y2="50" />
          <line x1="1350" y1="40" x2="1370" y2="40" />
          <line x1="1360" y1="30" x2="1360" y2="50" />
          <line x1="30" y1="590" x2="50" y2="590" />
          <line x1="40" y1="580" x2="40" y2="600" />
          <line x1="1350" y1="590" x2="1370" y2="590" />
          <line x1="1360" y1="580" x2="1360" y2="600" />
        </g>
      </svg>
    </div>
  );
}
