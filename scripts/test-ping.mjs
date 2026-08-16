import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read key from .env.local safely
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

async function ping() {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY not found in apps/web/.env.local');
    process.exit(1);
  }

  console.log('Testing image generation API connection (Billing enabled check)...');

  const models = [
    'gemini-2.5-flash-image',
    'gemini-3.1-flash-image',
    'gemini-3.1-flash-lite-image'
  ];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: 'Classical Renaissance silver dagger striking a mirror, fresco painting, 1:1' }]
          }]
        })
      });

      const data = await res.json();
      if (res.ok) {
        console.log(`[PASS] ${model}: HTTP ${res.status} OK - Model active and billing verified!`);
        if (data.candidates?.[0]?.content?.parts) {
          for (const part of data.candidates[0].content.parts) {
            if (part.inlineData) {
              console.log(`[PASS] Successfully received image binary (${part.inlineData.data.length} b64 chars, ${part.inlineData.mimeType})`);
              return { success: true, model };
            }
          }
        }
      } else {
        console.log(`[FAIL] ${model}: HTTP ${res.status} - ${data.error?.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.log(`[ERROR] ${model}: ${err.message}`);
    }
  }

  return { success: false };
}

ping();
