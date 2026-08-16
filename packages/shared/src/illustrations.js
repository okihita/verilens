/**
 * VeriLens Bespoke Vector Illustrations (YourLogicalFallacyIs Style)
 * High-contrast, iconic geometric visual metaphors for all 12 UNESCO fallacies.
 */

export const FALLACY_ILLUSTRATIONS = {
  ad_hominem: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="fallacy-svg">
      <circle cx="100" cy="100" r="90" fill="#EF4444" fill-opacity="0.12" stroke="#EF4444" stroke-width="2.5"/>
      <!-- Target Silhouette -->
      <circle cx="100" cy="72" r="24" fill="#EF4444" fill-opacity="0.3" stroke="#EF4444" stroke-width="2"/>
      <path d="M56 142C56 118 76 106 100 106C124 106 144 118 144 142" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
      <!-- Piercing Dagger / Smear Arrow -->
      <line x1="36" y1="40" x2="90" y2="80" stroke="#F87171" stroke-width="4" stroke-linecap="round"/>
      <polygon points="90,80 76,70 82,88" fill="#F87171"/>
      <line x1="164" y1="40" x2="110" y2="80" stroke="#F87171" stroke-width="4" stroke-linecap="round"/>
      <polygon points="110,80 118,88 124,70" fill="#F87171"/>
      <!-- Crosshair Marks -->
      <circle cx="100" cy="72" r="34" stroke="#F87171" stroke-width="1.5" stroke-dasharray="4 4"/>
      <line x1="100" y1="30" x2="100" y2="42" stroke="#F87171" stroke-width="2"/>
      <line x1="100" y1="102" x2="100" y2="114" stroke="#F87171" stroke-width="2"/>
    </svg>
  `,

  false_dilemma: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="fallacy-svg">
      <circle cx="100" cy="100" r="90" fill="#F59E0B" fill-opacity="0.12" stroke="#F59E0B" stroke-width="2.5"/>
      <!-- The Split Chasm Monoliths -->
      <rect x="36" y="50" width="46" height="100" rx="6" fill="#F59E0B" fill-opacity="0.35" stroke="#F59E0B" stroke-width="2.5"/>
      <rect x="118" y="50" width="46" height="100" rx="6" fill="#F59E0B" fill-opacity="0.35" stroke="#F59E0B" stroke-width="2.5"/>
      <!-- Letter Labels: A vs B -->
      <text x="59" y="110" fill="#FBBF24" font-size="28" font-weight="900" text-anchor="middle" font-family="system-ui">A</text>
      <text x="141" y="110" fill="#FBBF24" font-size="28" font-weight="900" text-anchor="middle" font-family="system-ui">B</text>
      <!-- Lightning Bolt / Void Split -->
      <path d="M100 40L96 85L104 115L100 160" stroke="#EF4444" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 3"/>
      <!-- Erased Middle Bridge -->
      <line x1="82" y1="100" x2="118" y2="100" stroke="#F87171" stroke-width="2" stroke-dasharray="3 3"/>
      <line x1="94" y1="92" x2="106" y2="108" stroke="#EF4444" stroke-width="3"/>
      <line x1="106" y1="92" x2="94" y2="108" stroke="#EF4444" stroke-width="3"/>
    </svg>
  `,

  ad_metum: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="fallacy-svg">
      <circle cx="100" cy="100" r="90" fill="#DC2626" fill-opacity="0.12" stroke="#DC2626" stroke-width="2.5"/>
      <!-- Erupting Volcano Cone -->
      <polygon points="50,154 150,154 116,92 84,92" fill="#DC2626" fill-opacity="0.3" stroke="#DC2626" stroke-width="2.5"/>
      <!-- Lava Plume & Blast Shockwaves -->
      <path d="M84 92C70 60 100 42 100 42C100 42 130 60 116 92" fill="#F87171" fill-opacity="0.6"/>
      <circle cx="100" cy="40" r="14" fill="#F59E0B" fill-opacity="0.8"/>
      <circle cx="82" cy="54" r="8" fill="#EF4444"/>
      <circle cx="118" cy="54" r="8" fill="#EF4444"/>
      <!-- Alarm Pulse Rings -->
      <circle cx="100" cy="100" r="75" stroke="#F87171" stroke-width="1.5" stroke-dasharray="6 6"/>
      <!-- Warning Triangle -->
      <polygon points="100,108 86,134 114,134" fill="#FBBF24" stroke="#B45309" stroke-width="1.5"/>
      <circle cx="100" cy="128" r="1.5" fill="#000"/>
      <line x1="100" y1="116" x2="100" y2="124" stroke="#000" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  confirmation_bias: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="fallacy-svg">
      <circle cx="100" cy="100" r="90" fill="#8B5CF6" fill-opacity="0.12" stroke="#8B5CF6" stroke-width="2.5"/>
      <!-- Looking Glass Mirror Frame -->
      <circle cx="95" cy="85" r="46" fill="#8B5CF6" fill-opacity="0.25" stroke="#8B5CF6" stroke-width="3"/>
      <line x1="130" y1="120" x2="164" y2="154" stroke="#8B5CF6" stroke-width="8" stroke-linecap="round"/>
      <!-- Internal Matching Star -->
      <polygon points="95,58 101,75 119,75 104,86 110,103 95,92 80,103 86,86 71,75 89,75" fill="#C4B5FD"/>
      <!-- Rejected Counter-Evidence Circles Bouncing Away -->
      <circle cx="44" cy="70" r="10" stroke="#F87171" stroke-width="2" stroke-dasharray="2 2"/>
      <path d="M48 64L36 76" stroke="#EF4444" stroke-width="2"/>
      <circle cx="152" cy="62" r="10" stroke="#F87171" stroke-width="2" stroke-dasharray="2 2"/>
      <path d="M156 56L144 68" stroke="#EF4444" stroke-width="2"/>
    </svg>
  `,

  weasel_words: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="fallacy-svg">
      <circle cx="100" cy="100" r="90" fill="#3B82F6" fill-opacity="0.12" stroke="#3B82F6" stroke-width="2.5"/>
      <!-- Nebula Fog Clouds -->
      <path d="M50 110C42 110 36 104 36 96C36 88 43 82 51 82C53 72 62 64 74 64C87 64 97 73 99 85C104 83 111 86 114 91C119 91 123 95 123 100C123 106 118 110 112 110Z" fill="#3B82F6" fill-opacity="0.3" stroke="#60A5FA" stroke-width="2"/>
      <!-- Whispering Ghost Mask -->
      <circle cx="130" cy="95" r="26" fill="#1E293B" stroke="#60A5FA" stroke-width="2.5"/>
      <circle cx="122" cy="90" r="4" fill="#93C5FD"/>
      <circle cx="138" cy="90" r="4" fill="#93C5FD"/>
      <path d="M124 106C128 112 134 112 138 106" stroke="#93C5FD" stroke-width="2" stroke-linecap="round"/>
      <!-- Vague Quotation Marks -->
      <text x="64" y="100" fill="#93C5FD" font-size="28" font-weight="900" font-family="serif">“...”</text>
      <!-- Anonymous Label Badge -->
      <rect x="55" y="132" width="90" height="22" rx="4" fill="#1E3A8A" stroke="#3B82F6" stroke-width="1.5"/>
      <text x="100" y="147" fill="#93C5FD" font-size="9" font-weight="800" text-anchor="middle" font-family="system-ui">"EXPERTS SAY"</text>
    </svg>
  `,

  scam_urgency: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="fallacy-svg">
      <circle cx="100" cy="100" r="90" fill="#E11D48" fill-opacity="0.12" stroke="#E11D48" stroke-width="2.5"/>
      <!-- Hourglass Container -->
      <path d="M68 54H132L108 96H92L68 54Z" fill="#E11D48" fill-opacity="0.35" stroke="#E11D48" stroke-width="2.5"/>
      <path d="M68 146H132L108 104H92L68 146Z" fill="#E11D48" fill-opacity="0.35" stroke="#E11D48" stroke-width="2.5"/>
      <!-- Falling Sand Particles -->
      <line x1="100" y1="96" x2="100" y2="124" stroke="#FBBF24" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 3"/>
      <!-- Lightning Bolt Alert -->
      <polygon points="144,70 126,96 138,96 122,126 150,92 136,92" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>
      <!-- Red Siren Flashes -->
      <circle cx="60" cy="68" r="6" fill="#EF4444"/>
      <circle cx="140" cy="138" r="6" fill="#EF4444"/>
      <text x="100" y="172" fill="#F87171" font-size="11" font-weight="900" text-anchor="middle" font-family="system-ui">00:14:59</text>
    </svg>
  `,

  strawman: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="fallacy-svg">
      <circle cx="100" cy="100" r="90" fill="#F97316" fill-opacity="0.12" stroke="#F97316" stroke-width="2.5"/>
      <!-- Scarecrow Post & Arms -->
      <line x1="100" y1="46" x2="100" y2="156" stroke="#F97316" stroke-width="5" stroke-linecap="round"/>
      <line x1="50" y1="88" x2="150" y2="88" stroke="#F97316" stroke-width="4" stroke-linecap="round"/>
      <!-- Straw Head -->
      <circle cx="100" cy="62" r="18" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
      <polygon points="80,50 120,50 100,28" fill="#C2410C"/>
      <!-- Straw Hat Rim -->
      <line x1="74" y1="50" x2="126" y2="50" stroke="#7C2D12" stroke-width="3"/>
      <!-- Tattered Burlap Body -->
      <polygon points="82,88 118,88 126,134 74,134" fill="#F97316" fill-opacity="0.35" stroke="#F97316" stroke-width="2"/>
      <!-- Flaming Torch Attack -->
      <line x1="160" y1="130" x2="128" y2="104" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>
      <circle cx="126" cy="102" r="7" fill="#F59E0B"/>
    </svg>
  `,

  bandwagon: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="fallacy-svg">
      <circle cx="100" cy="100" r="90" fill="#10B981" fill-opacity="0.12" stroke="#10B981" stroke-width="2.5"/>
      <!-- The Speeding Locomotive / Train Car -->
      <rect x="44" y="70" width="80" height="52" rx="8" fill="#10B981" fill-opacity="0.3" stroke="#10B981" stroke-width="2.5"/>
      <circle cx="64" cy="130" r="12" fill="#047857" stroke="#34D399" stroke-width="2"/>
      <circle cx="104" cy="130" r="12" fill="#047857" stroke="#34D399" stroke-width="2"/>
      <!-- Train Smokestack & Herd Momentum -->
      <rect x="100" y="52" width="16" height="18" fill="#059669"/>
      <circle cx="122" cy="46" r="8" fill="#6EE7B7" fill-opacity="0.6"/>
      <circle cx="138" cy="38" r="12" fill="#6EE7B7" fill-opacity="0.4"/>
      <!-- Crowd Silhouettes Onboard -->
      <circle cx="64" cy="88" r="7" fill="#34D399"/>
      <circle cx="84" cy="88" r="7" fill="#34D399"/>
      <circle cx="104" cy="88" r="7" fill="#34D399"/>
      <!-- Speed Lines -->
      <line x1="28" y1="84" x2="40" y2="84" stroke="#34D399" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="98" x2="38" y2="98" stroke="#34D399" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  sunk_cost: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="fallacy-svg">
      <circle cx="100" cy="100" r="90" fill="#6366F1" fill-opacity="0.12" stroke="#6366F1" stroke-width="2.5"/>
      <!-- Giant Heavy Iron Anchor -->
      <circle cx="100" cy="54" r="14" fill="none" stroke="#6366F1" stroke-width="4"/>
      <line x1="100" y1="68" x2="100" y2="152" stroke="#6366F1" stroke-width="6" stroke-linecap="round"/>
      <line x1="74" y1="88" x2="126" y2="88" stroke="#6366F1" stroke-width="4" stroke-linecap="round"/>
      <!-- Anchor Flukes Curve -->
      <path d="M54 126C54 156 146 156 146 126" stroke="#6366F1" stroke-width="6" stroke-linecap="round" fill="none"/>
      <!-- Sinking Coin Sacks / Heavy Chains -->
      <circle cx="68" cy="120" r="10" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>
      <circle cx="132" cy="120" r="10" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>
      <text x="68" y="124" fill="#000" font-size="9" font-weight="900" text-anchor="middle">$</text>
      <text x="132" y="124" fill="#000" font-size="9" font-weight="900" text-anchor="middle">$</text>
      <!-- Downward Sinking Arrows -->
      <path d="M100 158L100 174M94 168L100 174L106 168" stroke="#818CF8" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,

  halo_effect: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="fallacy-svg">
      <circle cx="100" cy="100" r="90" fill="#EC4899" fill-opacity="0.12" stroke="#EC4899" stroke-width="2.5"/>
      <!-- Glowing Celestial Halo -->
      <ellipse cx="100" cy="52" rx="38" ry="12" fill="none" stroke="#FBBF24" stroke-width="4"/>
      <!-- Celebrity Head with Sunglasses -->
      <circle cx="100" cy="94" r="28" fill="#EC4899" fill-opacity="0.35" stroke="#EC4899" stroke-width="2.5"/>
      <rect x="82" y="88" width="16" height="10" rx="3" fill="#1E293B"/>
      <rect x="102" y="88" width="16" height="10" rx="3" fill="#1E293B"/>
      <line x1="98" y1="92" x2="102" y2="92" stroke="#1E293B" stroke-width="2"/>
      <!-- Unrelated Medical Stethoscope Crossed Out -->
      <path d="M72 136C72 156 128 156 128 136" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" fill="none"/>
      <line x1="78" y1="130" x2="122" y2="162" stroke="#EF4444" stroke-width="3"/>
      <!-- Sparkles -->
      <polygon points="152,50 156,60 166,64 156,68 152,78 148,68 138,64 148,60" fill="#FBBF24"/>
      <polygon points="48,62 50,68 56,70 50,72 48,78 46,72 40,70 46,68" fill="#FBBF24"/>
    </svg>
  `,

  cherry_picking: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="fallacy-svg">
      <circle cx="100" cy="100" r="90" fill="#14B8A6" fill-opacity="0.12" stroke="#14B8A6" stroke-width="2.5"/>
      <!-- Withered Orchard / Gray Data Points -->
      <circle cx="50" cy="80" r="8" fill="#475569"/>
      <circle cx="70" cy="120" r="8" fill="#475569"/>
      <circle cx="130" cy="130" r="8" fill="#475569"/>
      <circle cx="150" cy="80" r="8" fill="#475569"/>
      <circle cx="80" cy="60" r="8" fill="#475569"/>
      <circle cx="120" cy="60" r="8" fill="#475569"/>
      <!-- Plucked Glowing Red Cherries -->
      <circle cx="92" cy="108" r="14" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
      <circle cx="118" cy="116" r="14" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
      <!-- Cherry Stems Linked to Leaf -->
      <path d="M92 94C92 74 104 62 104 62" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M118 102C118 80 104 62 104 62" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="116" cy="56" rx="10" ry="5" fill="#34D399" transform="rotate(-20 116 56)"/>
      <!-- Selective Magnifying Focus -->
      <circle cx="106" cy="110" r="38" stroke="#14B8A6" stroke-width="2" stroke-dasharray="3 3"/>
    </svg>
  `,

  conspiracy_framing: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="fallacy-svg">
      <circle cx="100" cy="100" r="90" fill="#A855F7" fill-opacity="0.12" stroke="#A855F7" stroke-width="2.5"/>
      <!-- Star Constellation / Unrelated Nodes -->
      <circle cx="50" cy="60" r="7" fill="#C084FC"/>
      <circle cx="150" cy="60" r="7" fill="#C084FC"/>
      <circle cx="100" cy="150" r="7" fill="#C084FC"/>
      <circle cx="60" cy="130" r="6" fill="#C084FC"/>
      <circle cx="140" cy="130" r="6" fill="#C084FC"/>
      <!-- Red Yarn Connecting Everything to Center -->
      <line x1="50" y1="60" x2="100" y2="100" stroke="#EF4444" stroke-width="2"/>
      <line x1="150" y1="60" x2="100" y2="100" stroke="#EF4444" stroke-width="2"/>
      <line x1="100" y1="150" x2="100" y2="100" stroke="#EF4444" stroke-width="2"/>
      <line x1="60" y1="130" x2="100" y2="100" stroke="#EF4444" stroke-width="2"/>
      <line x1="140" y1="130" x2="100" y2="100" stroke="#EF4444" stroke-width="2"/>
      <line x1="50" y1="60" x2="150" y2="60" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="2 2"/>
      <!-- Central Puppet Eye -->
      <circle cx="100" cy="100" r="18" fill="#1E293B" stroke="#A855F7" stroke-width="2.5"/>
      <circle cx="100" cy="100" r="6" fill="#F87171"/>
    </svg>
  `
};
