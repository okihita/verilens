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
        viewBox="0 0 1400 680"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: '100%',
          height: '100%',
          opacity: '0.92'
        }}
      >
        <defs>
          <linearGradient id="humanAmberGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-amber)" stopOpacity="0.75" />
            <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="humanEmeraldWave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-emerald-light)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent-emerald-light)" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="noiseDissolve" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-red)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent-red)" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* 1. Subtle Editorial Grid & Measurement Guides */}
        <g stroke="var(--text-main)" strokeWidth="0.75" opacity="0.035">
          <line x1="140" y1="0" x2="140" y2="680" strokeDasharray="3 8" />
          <line x1="380" y1="0" x2="380" y2="680" strokeDasharray="3 8" />
          <line x1="700" y1="0" x2="700" y2="680" strokeDasharray="3 8" />
          <line x1="1020" y1="0" x2="1020" y2="680" strokeDasharray="3 8" />
          <line x1="1260" y1="0" x2="1260" y2="680" strokeDasharray="3 8" />
          <line x1="0" y1="180" x2="1400" y2="180" strokeDasharray="3 8" />
          <line x1="0" y1="360" x2="1400" y2="360" strokeDasharray="3 8" />
          <line x1="0" y1="520" x2="1400" y2="520" strokeDasharray="3 8" />
        </g>

        {/* 2. Left Side: Deflected Algorithmic Feed Hooks & Urgency Shards */}
        <g fill="none">
          {/* Notification bubble outline (drifting and fading away) */}
          <g stroke="var(--accent-red)" strokeWidth="1.2" opacity="0.35">
            <path d="M 120,240 C 120,210 150,190 190,190 C 230,190 260,210 260,240 C 260,265 240,285 205,288 L 195,310 L 180,288 C 145,285 120,265 120,240 Z" strokeDasharray="4 2" />
            <circle cx="190" cy="240" r="3.5" fill="var(--accent-red)" opacity="0.5" />
            {/* Panic exclamation line */}
            <line x1="190" y1="220" x2="190" y2="232" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Jagged viral rage pulse waves dissolving before reaching the center */}
          <path
            d="M 60,340 Q 140,300 220,360 T 380,320 T 520,370 L 620,360"
            stroke="url(#noiseDissolve)"
            strokeWidth="1.75"
            strokeDasharray="4 3"
          />
          <path
            d="M 90,420 Q 200,380 310,440 T 500,410 L 640,420"
            stroke="var(--accent-red)"
            strokeWidth="1"
            opacity="0.25"
            strokeDasharray="2 4"
          />

          {/* Dissolving bait hooks */}
          <path
            d="M 280,160 L 300,135 L 320,165 L 340,140"
            stroke="var(--accent-red)"
            strokeWidth="1.2"
            opacity="0.3"
          />
          <path
            d="M 440,240 L 455,215 L 470,245 L 485,220"
            stroke="var(--text-main)"
            strokeWidth="1"
            opacity="0.1"
          />
        </g>

        {/* 3. Center-Right: Handdrawn Editorial Silhouette of the Youth Thinker Profile */}
        <g stroke="var(--text-main)" fill="none">
          {/* Main Hand-drawn Continuous Profile Line */}
          <path
            d="M 820,130 
               C 850,130 890,145 920,175 
               C 950,205 965,245 965,290 
               C 965,305 960,320 950,335 
               C 955,342 962,350 962,360 
               C 962,370 952,378 945,382 
               C 948,390 950,400 945,410 
               C 938,425 920,435 900,445 
               C 885,452 870,470 865,510 
               L 860,620"
            strokeWidth="2.2"
            opacity="0.25"
            strokeLinecap="round"
          />

          {/* Expressive Sketch Duplicate Line (gives hand-drawn pencil/pen feel) */}
          <path
            d="M 818,133 
               C 848,133 888,147 918,177 
               C 946,206 962,244 962,288 
               C 962,303 957,318 948,333 
               C 953,340 960,348 960,358 
               C 960,368 950,376 943,380 
               C 946,388 948,398 943,408 
               C 936,423 918,433 898,443 
               C 883,450 868,468 863,508 
               L 858,620"
            strokeWidth="0.9"
            strokeDasharray="8 4"
            opacity="0.16"
          />

          {/* Facial Profile Contours: Forehead, Nose, Lips, Chin, Jaw */}
          <path
            d="M 920,175 
               C 935,210 942,245 940,270 
               C 940,285 955,305 970,312 
               C 975,314 965,325 955,330 
               C 958,340 968,345 965,355 
               C 960,362 950,365 952,375 
               C 955,385 962,392 955,402 
               C 945,415 925,420 905,430 
               C 875,445 845,475 830,540 
               L 820,620"
            strokeWidth="1.8"
            opacity="0.22"
            strokeLinecap="round"
          />

          {/* Back of Head & Hair Strands (Editorial Gestural Flow) */}
          <path
            d="M 820,130 
               C 760,135 710,175 690,235 
               C 675,280 680,340 705,395 
               C 725,440 755,480 770,540 
               L 775,620"
            strokeWidth="1.5"
            opacity="0.18"
            strokeLinecap="round"
          />
          <path
            d="M 800,145 C 750,170 715,220 705,280 C 700,325 715,370 735,415"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.12"
          />
          <path
            d="M 840,140 C 800,165 770,210 755,265 C 745,310 755,360 770,400"
            strokeWidth="0.8"
            opacity="0.1"
          />

          {/* Eye of Discernment (The SIFT Focus Crosshair) */}
          <g transform="translate(935, 290)">
            <ellipse cx="0" cy="0" rx="9" ry="5" stroke="var(--accent-amber)" strokeWidth="1.6" opacity="0.65" />
            <circle cx="0" cy="0" r="3" fill="var(--accent-amber)" opacity="0.8" />
            {/* Subtle Crosshairs */}
            <line x1="-15" y1="0" x2="15" y2="0" stroke="var(--accent-amber)" strokeWidth="0.75" opacity="0.4" />
            <line x1="0" y1="-10" x2="0" y2="10" stroke="var(--accent-amber)" strokeWidth="0.75" opacity="0.4" />
          </g>
        </g>

        {/* 4. Radiating Cognitive Clarity Waves (The Mind's Shield) */}
        <g fill="none">
          {/* SIFT Concentric Cognitive Halo */}
          <circle cx="935" cy="290" r="70" stroke="url(#humanAmberGlow)" strokeWidth="1.2" strokeDasharray="3 5" />
          <circle cx="935" cy="290" r="130" stroke="var(--accent-amber)" strokeWidth="0.9" opacity="0.25" strokeDasharray="4 8" />
          <circle cx="935" cy="290" r="210" stroke="var(--accent-emerald-light)" strokeWidth="0.75" opacity="0.2" strokeDasharray="2 6" />
          <circle cx="935" cy="290" r="300" stroke="var(--text-main)" strokeWidth="0.6" opacity="0.08" strokeDasharray="6 12" />

          {/* Harmonious Flowing Truth Waves (Projecting forward from gaze) */}
          <path
            d="M 945,290 L 1080,270 L 1220,260 L 1380,260"
            stroke="url(#humanAmberGlow)"
            strokeWidth="2"
          />
          <path
            d="M 945,305 L 1100,320 L 1250,330 L 1380,335"
            stroke="url(#humanEmeraldWave)"
            strokeWidth="1.8"
          />
          <path
            d="M 940,325 Q 1040,285 1140,325 T 1340,325"
            stroke="var(--accent-blue-light)"
            strokeWidth="1.2"
            opacity="0.3"
          />
          <path
            d="M 935,270 Q 1035,230 1135,270 T 1335,270"
            stroke="var(--text-main)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            opacity="0.12"
          />

          {/* Lateral Reading Annotation Mark */}
          <text
            x="1100"
            y="252"
            fontFamily="var(--font-mono)"
            fontSize="9.5"
            fontWeight="700"
            fill="var(--accent-amber)"
            opacity="0.45"
            letterSpacing="1"
          >
            COGNITIVE_IMMUNITY // SIFT
          </text>
        </g>

        {/* 5. Left Mirror Human Profile (Soft Background Balance) */}
        <g stroke="var(--text-main)" fill="none" opacity="0.08">
          <path
            d="M 280,160 
               C 240,165 210,195 195,245 
               C 185,280 190,320 205,360 
               C 215,385 220,420 205,470 
               L 190,560"
            strokeWidth="1.2"
            strokeDasharray="5 5"
          />
          <circle cx="215" cy="270" r="30" stroke="var(--text-main)" strokeWidth="0.75" strokeDasharray="3 3" />
        </g>

        {/* 6. Technical Corner Registration Crosshairs */}
        <g stroke="var(--text-main)" strokeWidth="1" opacity="0.1">
          <line x1="30" y1="35" x2="50" y2="35" />
          <line x1="40" y1="25" x2="40" y2="45" />
          <line x1="1350" y1="35" x2="1370" y2="35" />
          <line x1="1360" y1="25" x2="1360" y2="45" />
          <line x1="30" y1="645" x2="50" y2="645" />
          <line x1="40" y1="635" x2="40" y2="655" />
          <line x1="1350" y1="645" x2="1370" y2="645" />
          <line x1="1360" y1="635" x2="1360" y2="655" />
        </g>
      </svg>
    </div>
  );
}
