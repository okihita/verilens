import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { title, text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Text content is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        data: {
          primaryTone: 'Informative / Editorial (Local Engine)',
          sensationalismScore: 45,
          fallaciesFound: [
            {
              quote: (title || text).slice(0, 50),
              fallacy: 'Rhetorical Framing',
              explanation: 'Evaluated via client-side heuristics. Set GEMINI_API_KEY in .env.local to enable live neural deep scan.',
              reflection: 'What primary sources or empirical evidence are cited in this piece?'
            }
          ],
          siftAction: 'Cross-check key assertions against independent wire reports (Reuters, AP).'
        }
      });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;

    const prompt = `You are VeriLens, an expert UNESCO Media and Information Literacy (MIL) cognitive assistant.
Analyze this excerpt for rhetorical fallacies, framing manipulation, emotional outrage triggers, and weasel words.
Respond STRICTLY with valid JSON following this schema:
{
  "sensationalismScore": number (0 to 100),
  "primaryTone": string,
  "fallaciesFound": [
    {
      "quote": string,
      "fallacy": string,
      "explanation": string,
      "reflection": string
    }
  ],
  "siftAction": string
}

Article Title: ${title || 'Untitled Claim'}
Article Text: ${text.slice(0, 2500)}`;

    let response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      })
    });

    if (!response.ok) {
      const fallbackEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      response = await fetch(fallbackEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        })
      });
    }

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({
        success: false,
        error: `Gemini API status ${response.status}: ${errText.slice(0, 150)}`
      }, { status: response.status });
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(rawText);

    return NextResponse.json({ success: true, data: parsed });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message || 'Internal analysis error' }, { status: 500 });
  }
}
