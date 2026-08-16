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

const BATCH = [
  {
    id: 'false_dilemma',
    name: '02. False Dilemma',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Michelangelo and Albrecht Dürer. A powerful central symbolic emblem: a colossal carved marble balance scale positioned at a dramatic canyon crossroads. One heavy scale pan burns with a roaring volcanic inferno of orange flames, while the other pan is frozen in towering spires of black glacial ice. Cutting cleanly through the center between both extreme monoliths is a luminous sunlit pathway of warm golden light and green olive branches leading into a tranquil open dawn. Terracotta ochre, deep charcoal slate, and Venetian gold, dramatic chiaroscuro, delicate Renaissance fresco craquelure texture. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'ad_metum',
    name: '03. Appeal to Fear',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Michelangelo's Sistine Chapel and Raphael. A dramatic central symbolic emblem: a magnificent, intricately crafted brass Renaissance celestial astrolabe and armillary sphere glowing with radiant golden light, projecting harmonious star constellations and compass lines. Looming from the dark perimeter, a monstrous claw of black storm clouds and a smoking crimson torch attempts to blot out the light, but is repelled by the sphere's serene illumination. Deep chiaroscuro, Venetian crimson, lapis lazuli azure, and burnished gold, delicate antique fresco plaster texture. Powerful iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'confirmation_bias',
    name: '04. Confirmation Bias',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Raphael and Leonardo da Vinci. A striking central symbolic emblem: an ornate brass Renaissance telescope mounted on a marble stand, pointed directly into a small curved gilded mirror that only reflects a single painted eye, while behind it through an open vaulted stone arch, an infinite starry night sky filled with radiant celestial globes and glowing scientific codices shines completely ignored. Imperial violet velvet drapery, antique ochre, deep azure, delicate fresco craquelure. Strong singular silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'weasel_words',
    name: '05. Weasel Words',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Michelangelo and Raphael. A powerful central symbolic emblem: a classical sculpted bronze bust whose head splits into three hollow theatrical masks facing different directions, exhaling coils of elusive misty golden smoke. The smoke wraps around an unrolled parchment scroll lying on a stone plinth, leaving behind blank lines and phantom dissolving letters. Smoky charcoal, rich Venetian ochre, deep umber, atmospheric chiaroscuro shadows, delicate antique fresco plaster texture. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'scam_urgency',
    name: '06. Artificial Urgency',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Albrecht Dürer and Raphael. A dramatic central symbolic emblem: a colossal antique brass hourglass fitted with great feathered clockwork wings, wrapped in taut iron chains. Inside the glass, liquid molten fire and glowing golden sand rush frantically downward, splashing onto an uninspected parchment ledger resting on a dark marble table. Deep terracotta red, burnished copper gold, dramatic chiaroscuro lighting, classical fresco craquelure. Strong iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  },
  {
    id: 'strawman',
    name: '07. Strawman Argument',
    prompt: `Masterpiece Renaissance allegorical painting in the style of Raphael's School of Athens. A striking central symbolic emblem: a towering burlap and straw effigy mannequin fitted with an oversized grotesque mask and dented iron helmet, dramatically pierced by a blazing steel sword, while beside it on an elevated marble plinth rests a pristine golden laurel wreath and a heavy leather-bound codex of authentic wisdom, untouched. Venetian crimson, sage emerald, and gold ochre drapery, classical chiaroscuro, delicate plaster craquelure texture. Bold iconic silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`
  }
];

async function generateFallacy(item, apiKey) {
  const model = 'gemini-2.5-flash-image';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const targetDir = path.join(__dirname, '../apps/web/public/assets/images/fallacies');
  const targetPath = path.join(targetDir, `${item.id}.jpg`);
  const brainPath = `C:/Users/Okihita/.gemini/antigravity/brain/51687e67-e071-401d-a3fc-87228fe78c18/${item.id}_iconic.png`;

  console.log(`\n[${item.name}] Generating iconic emblem...`);

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
  console.log('Generating Direction 1 Iconic Emblems for Fallacies 02 to 07...');
  console.log('='.repeat(65));

  let count = 0;
  for (let i = 0; i < BATCH.length; i++) {
    const success = await generateFallacy(BATCH[i], apiKey);
    if (success) count++;
    if (i < BATCH.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log('\n' + '='.repeat(65));
  console.log(`Batch finished: ${count} / ${BATCH.length} images generated successfully.`);
  console.log('='.repeat(65));
}

run();
