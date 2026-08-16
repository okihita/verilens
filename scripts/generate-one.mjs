import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.GEMINI_API_KEY || '';

const prompt = `Masterpiece Renaissance allegorical painting in the style of Raphael and Leonardo da Vinci. A striking central symbolic emblem: an ornate silver dagger with a crimson velvet hilt strikes and shatters a gilded portrait mirror of a scholar, scattering cracked glass fragments, while right beside it on a classical marble pedestal, an illuminated open codex manuscript radiates calm, golden celestial light, completely pristine and ignored. Deep chiaroscuro shadows, antique Venetian crimson drapery, rich lapis lazuli and gold leaf accents, delicate craquelure fresco plaster texture. Powerful singular silhouette, uncluttered central composition. 1:1 aspect ratio. No modern devices, no cartoons, zero emojis.`;

async function generateImage() {
  const models = [
    'gemini-2.5-flash-image',
    'gemini-3.1-flash-image',
    'gemini-3.1-flash-lite-image',
    'gemini-3-pro-image'
  ];

  for (const model of models) {
    console.log(`\nAttempting generation with model: ${model} via generateContent...`);
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
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
        console.error(`Model ${model} failed (${res.status}):`, data.error?.message || JSON.stringify(data));
        continue;
      }

      console.log(`Response structure keys from ${model}:`, Object.keys(data));
      const candidates = data.candidates;
      if (candidates && candidates[0]?.content?.parts) {
        for (const part of candidates[0].content.parts) {
          if (part.inlineData) {
            const buffer = Buffer.from(part.inlineData.data, 'base64');
            const targetPath = path.join(__dirname, '../apps/web/public/assets/images/fallacies/ad_hominem.jpg');
            fs.mkdirSync(path.dirname(targetPath), { recursive: true });
            fs.writeFileSync(targetPath, buffer);
            console.log(`SUCCESS! Saved ad_hominem.jpg (${buffer.length} bytes, mime: ${part.inlineData.mimeType}) to: ${targetPath}`);
            return true;
          } else if (part.text) {
            console.log(`Text output from ${model}:`, part.text.slice(0, 150));
          }
        }
      } else {
        console.log(`No candidate parts in response from ${model}:`, JSON.stringify(data).slice(0, 200));
      }
    } catch (err) {
      console.error(`Error with ${model}:`, err.message);
    }
  }
}

generateImage();
