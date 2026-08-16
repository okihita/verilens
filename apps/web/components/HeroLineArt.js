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
        zIndex: 0,
        // Solution A: Optical Radial Cutout Mask ensuring 100% pristine readability in the center text zone
        maskImage: 'radial-gradient(ellipse 720px 340px at center, transparent 0%, transparent 46%, black 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 720px 340px at center, transparent 0%, transparent 46%, black 85%)'
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 680"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: '100%',
          height: '100%',
          opacity: '0.95'
        }}
      >
        <defs>
          <linearGradient id="humanAmberGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-amber)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="humanEmeraldWave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-emerald-light)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--accent-emerald-light)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="noiseDissolve" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-red)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent-red)" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* 1. Technical Coordinate Grid on Periphery */}
        <g stroke="var(--text-main)" strokeWidth="0.75" opacity="0.04">
          <line x1="120" y1="0" x2="120" y2="680" strokeDasharray="3 8" />
          <line x1="300" y1="0" x2="300" y2="680" strokeDasharray="3 8" />
          <line x1="1140" y1="0" x2="1140" y2="680" strokeDasharray="3 8" />
          <line x1="1320" y1="0" x2="1320" y2="680" strokeDasharray="3 8" />
          <line x1="0" y1="160" x2="1440" y2="160" strokeDasharray="3 8" />
          <line x1="0" y1="520" x2="1440" y2="520" strokeDasharray="3 8" />
        </g>

        {/* 2. Left Flank: Deflected Algorithmic Feed Hooks & Urgency Shards */}
        <g fill="none">
          {/* Deflected Notification Bubble 1 */}
          <g stroke="var(--accent-red)" strokeWidth="1.3" opacity="0.4">
            <path d="M 60,220 C 60,190 90,170 130,170 C 170,170 200,190 200,220 C 200,245 180,265 145,268 L 135,290 L 120,268 C 85,265 60,245 60,220 Z" strokeDasharray="4 2" />
            <circle cx="130" cy="220" r="3.5" fill="var(--accent-red)" opacity="0.6" />
            <line x1="130" y1="200" x2="130" y2="212" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Secondary Notification Bubble (Lower Left) */}
          <g stroke="var(--accent-amber)" strokeWidth="1" opacity="0.3">
            <path d="M 120,380 C 120,355 145,335 180,335 C 215,335 240,355 240,380 C 240,400 220,418 192,420 L 185,438 L 170,420 C 140,418 120,400 120,380 Z" strokeDasharray="3 3" />
            <circle cx="180" cy="380" r="2.5" fill="var(--accent-amber)" opacity="0.5" />
          </g>

          {/* Dissolving viral rage waves */}
          <path
            d="M 30,310 Q 100,270 170,330 T 310,290 T 440,340"
            stroke="url(#noiseDissolve)"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />
          <path
            d="M 40,460 Q 140,410 240,470 T 420,440"
            stroke="var(--accent-red)"
            strokeWidth="1.1"
            opacity="0.28"
            strokeDasharray="2 4"
          />

          {/* Deflected Hook Fragments */}
          <path d="M 180,120 L 200,95 L 220,125 L 240,100" stroke="var(--accent-red)" strokeWidth="1.2" opacity="0.3" />
          <path d="M 280,180 L 295,155 L 310,185 L 325,160" stroke="var(--text-main)" strokeWidth="0.9" opacity="0.12" />

          {/* Left Observer Silhouette (Mirror Balanced Thinker) */}
          <g stroke="var(--text-main)" strokeWidth="1.4" opacity="0.12">
            <path
              d="M 180,150 
                 C 145,155 120,185 105,235 
                 C 95,270 100,310 115,350 
                 C 125,375 130,410 115,460 
                 L 95,570"
              strokeDasharray="6 4"
            />
            <circle cx="120" cy="250" r="24" strokeWidth="0.8" strokeDasharray="3 3" />
          </g>
        </g>

        {/* 3. Right Flank: Handdrawn Editorial Silhouette of the Youth Thinker Profile (X: 1040 - 1380) */}
        <g stroke="var(--text-main)" fill="none">
          {/* Main Hand-drawn Continuous Profile Line */}
          <path
            d="M 1120,110 
               C 1155,110 1200,125 1235,155 
               C 1270,185 1290,225 1290,270 
               C 1290,285 1285,300 1275,315 
               C 1280,322 1288,330 1288,340 
               C 1288,350 1278,358 1270,362 
               C 1273,370 1275,380 1270,390 
               C 1262,405 1242,415 1220,425 
               C 1205,432 1190,450 1185,490 
               L 1180,620"
            strokeWidth="2.4"
            opacity="0.3"
            strokeLinecap="round"
          />

          {/* Expressive Sketch Duplicate Line */}
          <path
            d="M 1118,113 
               C 1153,113 1198,127 1233,157 
               C 1268,186 1287,224 1287,268 
               C 1287,283 1282,298 1273,313 
               C 1278,320 1286,328 1286,338 
               C 1286,348 1276,356 1268,360 
               C 1271,368 1273,378 1268,388 
               C 1260,403 1240,413 1218,423 
               C 1203,430 1188,448 1183,488 
               L 1178,620"
            strokeWidth="1"
            strokeDasharray="8 4"
            opacity="0.18"
          />

          {/* Facial Profile Contours: Forehead, Nose, Lips, Chin, Jaw */}
          <path
            d="M 1235,155 
               C 1252,190 1260,225 1258,250 
               C 1258,265 1275,285 1292,292 
               C 1298,294 1287,305 1276,310 
               C 1280,320 1291,325 1287,335 
               C 1282,342 1271,345 1273,355 
               C 1277,365 1285,372 1277,382 
               C 1266,395 1244,400 1222,410 
               C 1190,425 1158,455 1142,520 
               L 1132,620"
            strokeWidth="1.9"
            opacity="0.25"
            strokeLinecap="round"
          />

          {/* Back of Head & Hair Strands (Editorial Gestural Flow) */}
          <path
            d="M 1120,110 
               C 1055,115 1000,155 980,215 
               C 962,260 968,320 995,375 
               C 1018,420 1050,460 1068,520 
               L 1072,620"
            strokeWidth="1.6"
            opacity="0.2"
            strokeLinecap="round"
          />
          <path
            d="M 1100,125 C 1045,150 1005,200 995,260 C 990,305 1005,350 1028,395"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.14"
          />

          {/* Eye of Discernment (The SIFT Focus Crosshair at 1252, 270) */}
          <g transform="translate(1252, 270)">
            <ellipse cx="0" cy="0" rx="9" ry="5" stroke="var(--accent-amber)" strokeWidth="1.8" opacity="0.75" />
            <circle cx="0" cy="0" r="3" fill="var(--accent-amber)" opacity="0.85" />
            <line x1="-16" y1="0" x2="16" y2="0" stroke="var(--accent-amber)" strokeWidth="0.8" opacity="0.45" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="var(--accent-amber)" strokeWidth="0.8" opacity="0.45" />
          </g>
        </g>

        {/* 4. Radiating Cognitive Clarity Waves on Right Periphery */}
        <g fill="none">
          {/* SIFT Concentric Cognitive Halo */}
          <circle cx="1252" cy="270" r="65" stroke="url(#humanAmberGlow)" strokeWidth="1.3" strokeDasharray="3 5" />
          <circle cx="1252" cy="270" r="120" stroke="var(--accent-amber)" strokeWidth="1" opacity="0.3" strokeDasharray="4 8" />
          <circle cx="1252" cy="270" r="190" stroke="var(--accent-emerald-light)" strokeWidth="0.85" opacity="0.25" strokeDasharray="2 6" />

          {/* Harmonious Flowing Truth Waves (Projecting forward from gaze towards right edge) */}
          <path
            d="M 1265,270 L 1330,255 L 1400,250 L 1440,250"
            stroke="url(#humanAmberGlow)"
            strokeWidth="2.2"
          />
          <path
            d="M 1265,285 L 1340,300 L 1410,310 L 1440,315"
            stroke="url(#humanEmeraldWave)"
            strokeWidth="2"
          />
          <path
            d="M 1260,305 Q 1330,270 1400,305 T 1440,305"
            stroke="var(--accent-blue-light)"
            strokeWidth="1.3"
            opacity="0.35"
          />

          {/* Lateral Reading Annotation Mark */}
          <text
            x="1290"
            y="236"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="800"
            fill="var(--accent-amber)"
            opacity="0.5"
            letterSpacing="0.8"
          >
            SIFT_RADAR // VERIFIED
          </text>
        </g>

        {/* 5. Technical Corner Registration Crosshairs */}
        <g stroke="var(--text-main)" strokeWidth="1" opacity="0.12">
          <line x1="30" y1="35" x2="50" y2="35" />
          <line x1="40" y1="25" x2="40" y2="45" />
          <line x1="1390" y1="35" x2="1410" y2="35" />
          <line x1="1400" y1="25" x2="1400" y2="45" />
          <line x1="30" y1="645" x2="50" y2="645" />
          <line x1="40" y1="635" x2="40" y2="655" />
          <line x1="1390" y1="645" x2="1410" y2="645" />
          <line x1="1400" y1="635" x2="1400" y2="655" />
        </g>
      </svg>
    </div>
  );
}
