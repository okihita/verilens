import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getApiKey() {
  const envPath = path.join(__dirname, '../apps/web/.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      if (line.startsWith('GEMINI_API_KEY=')) {
        return line.replace('GEMINI_API_KEY=', '').trim();
      }
    }
  }
  return process.env.GEMINI_API_KEY || '';
}

const REMAINING_FALLACIES = [
  {
    id: 'bandwagon',
    name: '08. Bandwagon Effect',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Michelangelo and Raphael. A powerful central symbolic emblem: a gilded Renaissance ceremonial chariot pulled by galloping blindfolded horses plunging off a broken marble bridge into misty clouds, while in sharp contrast on a solid rock plinth, a solitary stone lighthouse lantern radiates steady, piercing white-gold light across the horizon. Imperial violet drapery, antique ochre, deep lapis lazuli sky, dramatic chiaroscuro, fresco craquelure texture. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'sunk_cost',
    name: '09. Sunk Cost Bias',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Albrecht Dürer and Raphael. A striking central symbolic emblem: a massive rusted iron galleon anchor firmly chained to a sinking, fractured stone pillar in dark mire. An ornate wooden chest overflows as golden ducats spill uselessly into the muddy fissure, while right beside it stands a pristine, unyielding granite foundation bathed in clear morning light. Venetian terracotta, tarnished bronze, deep charcoal, fine fresco craquelure. Strong singular silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'halo_effect',
    name: '10. Halo Effect',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Raphael's School of Athens. A striking central symbolic emblem: an empty suit of grand gilded ceremonial armor crowned with a radiant golden halo and velvet crown, emitting an intoxicating brilliance that casts golden beams across a dark stone pedestal, concealing the flawed, rusted brass balance scale lying broken in its shadow. Lapis lazuli blues, warm Venetian golds, delicate craquelure fresco texture. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'cherry_picking',
    name: '11. Cherry Picking',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Leonardo da Vinci and Raphael. A powerful central symbolic emblem: a polished silver footed dish prominently displaying two pristine, glowing golden pomegranates, while beneath the edge of the rich crimson velvet tablecloth, a large woven wicker basket brimming with blackened, rotting fruit is pushed into deep chiaroscuro shadow. Sage emerald foliage, antique Venetian gold, terracotta crimson, delicate plaster craquelure. Strong singular silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'conspiracy_framing',
    name: '12. Conspiracy Framing',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Michelangelo and Albrecht Dürer. A dramatic central symbolic emblem: an intricate, paranoid spiderweb of glowing crimson thread frantically pinned across scattered antique sketches, astrological charts, and wax seal portraits on a stone wall, while through a soaring classical marble arch right beside it, the authentic cosmos shines in pure, uncluttered starry beauty. Deep chiaroscuro shadows, charcoal and crimson tones, delicate antique fresco texture. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'slippery_slope',
    name: '13. Slippery Slope',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Michelangelo's Sistine Chapel. A striking central symbolic emblem: a grand classical white marble staircase where the lowest single step violently fractures and shears away into a terrifying bottomless abyss of jagged rocks and orange volcanic smoke, contrasting sharply with the noble, indestructible marble temple portico standing securely above. Terracotta ochre, fiery amber, charcoal shadows, delicate fresco craquelure texture. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'whataboutism',
    name: '14. Whataboutism',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Raphael's School of Athens. A powerful central symbolic emblem: a classical double-faced marble Janus bust mounted on a fluted pedestal, whose two sculpted hands each hold an unbalanced brass scale while pointing accusingly in opposite directions toward the far corners of the frame, deflecting attention from the corrupted center. Venetian crimson drapery, warm marble tones, dramatic chiaroscuro, antique fresco plaster finish. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'false_cause',
    name: '15. False Cause',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Leonardo da Vinci and Raphael. A whimsical yet dignified symbolic emblem: a majestic gilded brass rooster perched proudly on top of an ornate stone sundial, fitted with visible clockwork brass gears that lead toward the horizon, falsely claiming to mechanically pull up the radiant rising sun. Luminous morning golden rays, deep lapis lazuli azure sky, burnished brass, fine fresco craquelure. Strong singular silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'false_authority',
    name: '16. False Authority',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Raphael. A striking central symbolic emblem: an opulent gilded Renaissance lute draped in an oversized ermine-trimmed royal judge's velvet robe and crown, resting upon an apothecary's marble pedestal with a sealed bottle of flawed elixir, claiming supreme authority in sciences beyond its domain. Emerald green, Venetian gold, deep lapis lazuli, soft chiaroscuro lighting, delicate fresco texture. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'appeal_to_nature',
    name: '17. Appeal to Nature',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Albrecht Dürer and Raphael. A powerful central symbolic emblem: an antique brass balance scale resting in an apothecary garden. One pan holds a lush yet deadly cluster of wild poisonous black hemlock berries wrapped in thorny ivy, weighed favorably against a refined, glowing crystal vial of life-saving alchemical medicine on the other pan. Sage emerald foliage, earthy ochres, soft chiaroscuro, delicate plaster craquelure texture. Strong singular silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'no_true_scotsman',
    name: '18. No True Scotsman',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Michelangelo and Leonardo da Vinci. A striking central symbolic emblem: an antique brass drafting compass poised over a dark marble floor, actively drawing a luminous golden circle that keeps shrinking to exclude identical gilded coins resting just outside the boundary line. Flowing crimson and charcoal velvet drapery, vaulted stone architecture, rich chiaroscuro shadows, fresco plaster craquelure. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'anchoring_bias',
    name: '19. Anchoring Bias',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Raphael. A powerful central symbolic emblem: a colossal, dark iron galleon anchor stamped with an enormous, ornate gilded Roman numeral tablet, dropped onto a delicate brass merchant's scale, violently bending the balance arm and fixing the pointer permanently to an arbitrary weight. Rich terracotta, antique ochre, deep azure, delicate fresco craquelure texture. Strong singular silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'dunning_kruger',
    name: '20. Dunning-Kruger Effect',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Raphael's School of Athens. A striking central symbolic emblem: a tiny, crude clay oil lamp on a miniature pedestal projecting an immense, terrifying shadow silhouette of a roaring lion onto a classical wall, while beside it on the floor, a towering marble statue of a wise philosopher surrounded by decades of written codices rests in serene humility. Venetian gold, lapis lazuli, deep chiaroscuro contrast, fresco texture. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'hasty_generalization',
    name: '21. Hasty Generalization',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Raphael and Albrecht Dürer. A powerful central symbolic emblem: a single black swan feather placed on one side of a balance scale, tilting the arm completely down, claiming to outweigh an entire monumental open codex filled with hundreds of diverse zoological illustrations resting on the marble table. Lapis lazuli water in background, warm ochre tones, delicate fresco plaster craquelure. Strong singular silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'circular_reasoning',
    name: '22. Circular Reasoning',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Michelangelo and Leonardo da Vinci. A striking central symbolic emblem: a magnificent golden Ouroboros serpent swallowing its tail, coiled around a continuous circular loop of antique parchment inscribed with endless looping Latin calligraphy where the conclusion proves the premise in a closed cycle. Soft candlelight chiaroscuro, deep sepia, rich umber, and Venetian gold, classical fresco craquelure. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'in_group_bias',
    name: '23. In-Group Bias',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Michelangelo's Sistine Chapel. A powerful central symbolic emblem: two ornate heraldic marble shields and matching balance scales standing face to face. The lapis lazuli shield heavily favors blue gems while discarding red, while the terracotta crimson shield does the exact reverse, perfectly illustrating tribal double standards. Dynamic drapery, classical civic architecture, deep chiaroscuro, fresco craquelure texture. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'liars_dividend',
    name: '24. The Liar\'s Dividend',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Raphael and Rembrandt. A dramatic central symbolic emblem: an indisputable official parchment document with a pristine crimson wax seal and handwritten royal signature, placed behind a fractured, antique distorted carnival mirror that warps and blurs the authentic proof into an illusion to escape accountability. Deep Venetian crimson, smoky charcoal shadows, classical columns, dramatic chiaroscuro, fresco craquelure. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  }
];

async function generateFallacy(item, apiKey) {
  const model = 'gemini-2.5-flash-image';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const targetDir = path.join(__dirname, '../apps/web/public/assets/images/fallacies');
  const targetPath = path.join(targetDir, `${item.id}.jpg`);
  const brainPath = `C:/Users/Okihita/.gemini/antigravity/brain/51687e67-e071-401d-a3fc-87228fe78c18/${item.id}_iconic.png`;

  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 500000) {
    console.log(`[${item.name}] Already generated (${fs.statSync(targetPath).size} bytes), skipping.`);
    return true;
  }

  console.log(`\n[${item.name}] Generating iconic emblem...`);

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(30000),
        body: JSON.stringify({
          contents: [{
            parts: [{ text: item.prompt }]
          }]
        })
      });

      const data = await res.json();
      if (!res.ok) {
        console.warn(`  Attempt ${attempt} warning (${res.status}): ${data.error?.message || 'Error'}`);
        if (attempt < 3) {
          console.log(`  Retrying in 4s...`);
          await new Promise(r => setTimeout(r, 4000));
          continue;
        }
        return false;
      }

      if (data.candidates?.[0]?.content?.parts) {
        for (const part of data.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            const buffer = Buffer.from(part.inlineData.data, 'base64');
            fs.writeFileSync(targetPath, buffer);
            fs.writeFileSync(brainPath, buffer);
            console.log(`  ✓ Saved ${item.id}.jpg (${buffer.length} bytes)`);
            return true;
          }
        }
      }
      console.warn(`  No image bytes returned for ${item.id}`);
      return false;
    } catch (err) {
      console.warn(`  Attempt ${attempt} network error: ${err.message}`);
      if (attempt < 3) await new Promise(r => setTimeout(r, 4000));
    }
  }
  return false;
}

async function run() {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY not found in apps/web/.env.local');
    process.exit(1);
  }

  console.log('='.repeat(65));
  console.log(`Generating Direction 1 Iconic Emblems for Remaining Archetypes (08 to 24)...`);
  console.log('='.repeat(65));

  let count = 0;
  for (let i = 0; i < REMAINING_FALLACIES.length; i++) {
    const item = REMAINING_FALLACIES[i];
    const success = await generateFallacy(item, apiKey);
    if (success) count++;
    if (i < REMAINING_FALLACIES.length - 1) {
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  console.log('\n' + '='.repeat(65));
  console.log(`Batch complete: ${count} / ${REMAINING_FALLACIES.length} verified/generated!`);
  console.log('='.repeat(65));
}

run();
