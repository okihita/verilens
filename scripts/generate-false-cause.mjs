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

const prompt = `Masterpiece Renaissance allegorical painting in the style of Leonardo da Vinci and Raphael. A whimsical yet dignified central symbolic emblem: a majestic gilded brass rooster perched proudly on top of an ornate stone sundial, fitted with visible clockwork brass gears that lead toward the horizon, falsely claiming to mechanically pull up the radiant rising sun. Luminous morning golden rays, deep lapis lazuli azure sky, burnished brass, fine fresco craquelure. Strong singular silhouette, 1:1 aspect ratio. No modern devices, zero emojis.`;

async function generateSingle() {
  const apiKey = getApiKey();
  const model = 'gemini-2.5-flash-image';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const targetPath = path.join(__dirname, '../apps/web/public/assets/images/fallacies/false_cause.jpg');
  const brainPath = `C:/Users/Okihita/.gemini/antigravity/brain/51687e67-e071-401d-a3fc-87228fe78c18/false_cause_iconic.png`;

  console.log('[15. False Cause] Generating iconic emblem...');

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(45000),
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      const data = await res.json();
      if (!res.ok) {
        console.warn(`  Attempt ${attempt} warning (${res.status}):`, data.error?.message);
        await new Promise(r => setTimeout(r, 4000));
        continue;
      }

      if (data.candidates?.[0]?.content?.parts) {
        for (const part of data.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            const buffer = Buffer.from(part.inlineData.data, 'base64');
            fs.writeFileSync(targetPath, buffer);
            fs.writeFileSync(brainPath, buffer);
            console.log(`✓ Saved false_cause.jpg (${buffer.length} bytes) to: ${targetPath}`);
            return true;
          }
        }
      }
      console.warn(`  Attempt ${attempt} returned no image parts, retrying...`);
      await new Promise(r => setTimeout(r, 3000));
    } catch (err) {
      console.warn(`  Attempt ${attempt} error:`, err.message);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  return false;
}

generateSingle();
