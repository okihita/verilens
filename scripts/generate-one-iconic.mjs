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

const prompt = `Masterpiece Renaissance allegorical painting in the style of Raphael and Leonardo da Vinci. A striking central symbolic emblem: an ornate silver dagger with a crimson velvet hilt strikes and shatters a gilded portrait mirror of a scholar, scattering cracked glass fragments, while right beside it on a classical marble pedestal, an illuminated open codex manuscript radiates calm, golden celestial light, completely pristine and ignored. Deep chiaroscuro shadows, antique Venetian crimson drapery, rich lapis lazuli and gold leaf accents, delicate craquelure fresco plaster texture. Powerful singular silhouette, uncluttered central composition. 1:1 aspect ratio. No modern devices, no cartoons, zero emojis.`;

async function generateSingle() {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY not found in apps/web/.env.local');
    process.exit(1);
  }

  const model = 'gemini-2.5-flash-image';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const targetPath = path.join(__dirname, '../apps/web/public/assets/images/fallacies/ad_hominem.jpg');

  console.log('[01. Ad Hominem] Generating Direction 1 iconic emblem (shattered mirror & dagger)...');

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(`Generation failed (${res.status}):`, data.error?.message || JSON.stringify(data));
      return;
    }

    if (data.candidates?.[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const buffer = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync(targetPath, buffer);
          // Also save a copy in brain artifacts dir for review
          const brainPath = 'C:/Users/Okihita/.gemini/antigravity/brain/51687e67-e071-401d-a3fc-87228fe78c18/ad_hominem_iconic.png';
          fs.writeFileSync(brainPath, buffer);
          console.log(`✓ SUCCESS! Saved ad_hominem.jpg (${buffer.length} bytes) to: ${targetPath}`);
          return;
        }
      }
    }
    console.log('No image data in response:', JSON.stringify(data).slice(0, 200));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

generateSingle();
