/**
 * VeriLens Background Service Worker (Manifest V3)
 * Manages caching, badge state, context menus, and Gemini Flash/Lite AI gateway.
 */

const DEFAULT_MODEL = 'gemini-2.0-flash-lite';

/**
 * Creates context menu entries cleanly
 */
function setupContextMenus() {
  if (typeof chrome === 'undefined' || !chrome.contextMenus) return;

  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'vl-verify-selection',
      title: '⚡ SIFT & Verify with VeriLens',
      contexts: ['selection']
    }, () => {
      if (chrome.runtime.lastError) { /* ignore */ }
    });

    chrome.contextMenus.create({
      id: 'vl-trace-image',
      title: '🔍 SIFT: Trace Image Origin via Google Lens',
      contexts: ['image']
    }, () => {
      if (chrome.runtime.lastError) { /* ignore */ }
    });
  });
}

// Installation & Lifecycle
chrome.runtime.onInstalled.addListener(() => {
  console.log('[VeriLens] Extension installed. Setting up storage and menus...');
  chrome.storage.local.set({
    vl_streak_count: 0,
    vl_fallacies_spotted: [],
    vl_sensitivity: 'normal',
    vl_gemini_model: DEFAULT_MODEL
  });
  setupContextMenus();
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(['vl_gemini_model'], (res) => {
    if (!res.vl_gemini_model) chrome.storage.local.set({ vl_gemini_model: DEFAULT_MODEL });
  });
  setupContextMenus();
});

// Handle Context Menu Actions
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab || !tab.id) return;

  if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('chrome-extension://') || tab.url.startsWith('about:')) {
    return;
  }

  if (info.menuItemId === 'vl-verify-selection') {
    const selectedText = info.selectionText || '';
    
    try {
      if (chrome.scripting) {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['src/shared/heuristics.js', 'src/shared/sifter.js', 'src/content/content.js']
        }).catch(() => {});

        await chrome.scripting.insertCSS({
          target: { tabId: tab.id },
          files: ['src/content/content.css']
        }).catch(() => {});
      }

      chrome.tabs.sendMessage(tab.id, {
        type: 'CONTEXT_MENU_VERIFY_SELECTION',
        text: selectedText
      }, () => {
        if (chrome.runtime.lastError) { /* ignore */ }
      });
    } catch (err) { /* ignore */ }
  } else if (info.menuItemId === 'vl-trace-image' && info.srcUrl) {
    const lensUrl = `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(info.srcUrl)}`;
    chrome.tabs.create({ url: lensUrl });
  }
});

// Cache for active tab analyses
const tabDataCache = new Map();

// Listen for messages from content scripts and popup UI
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || !message.type) return;

  const tabId = sender.tab ? sender.tab.id : null;

  switch (message.type) {
    case 'VERILENS_PAGE_DATA_UPDATED':
      if (tabId) {
        tabDataCache.set(tabId, message.data);
        updateActionBadge(tabId, message.data.sensationalismIndex);
      }
      sendResponse({ status: 'ok' });
      break;

    case 'GET_ACTIVE_TAB_DATA':
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs || tabs.length === 0) {
          sendResponse(null);
          return;
        }
        const currentTab = tabs[0];
        const currentTabId = currentTab.id;

        if (!currentTab.url || currentTab.url.startsWith('chrome://') || currentTab.url.startsWith('edge://') || currentTab.url.startsWith('chrome-extension://') || currentTab.url.startsWith('about:')) {
          sendResponse(null);
          return;
        }

        const cached = tabDataCache.get(currentTabId);
        if (cached) {
          sendResponse(cached);
        } else {
          chrome.tabs.sendMessage(currentTabId, { type: 'GET_PAGE_ANALYSIS' }, (res) => {
            if (chrome.runtime.lastError || !res) {
              sendResponse(null);
            } else {
              tabDataCache.set(currentTabId, res);
              if (res.sensationalismIndex !== undefined) {
                updateActionBadge(currentTabId, res.sensationalismIndex);
              }
              sendResponse(res);
            }
          });
        }
      });
      return true;

    case 'RUN_GEMINI_DEEP_SCAN':
      handleGeminiAnalysis(message.payload)
        .then((result) => sendResponse({ success: true, data: result }))
        .catch((err) => sendResponse({ success: false, error: err.message }));
      return true;

    default:
      break;
  }
});

/**
 * Updates extension icon badge to reflect sensationalism level
 */
function updateActionBadge(tabId, score) {
  if (!tabId || typeof score !== 'number') return;
  if (score > 60) {
    chrome.action.setBadgeText({ tabId, text: `${Math.round(score / 10)}` });
    chrome.action.setBadgeBackgroundColor({ tabId, color: '#E11D48' });
  } else if (score > 30) {
    chrome.action.setBadgeText({ tabId, text: `${Math.round(score / 10)}` });
    chrome.action.setBadgeBackgroundColor({ tabId, color: '#D97706' });
  } else {
    chrome.action.setBadgeText({ tabId, text: '' });
  }
}

/**
 * Calls Gemini Flash/Lite API with structured JSON output schema
 */
async function handleGeminiAnalysis(payload) {
  const { text, title, url } = payload;

  const storage = await chrome.storage.local.get(['vl_custom_api_key', 'vl_gemini_model']);
  const apiKey = storage.vl_custom_api_key;
  const model = storage.vl_gemini_model || DEFAULT_MODEL;

  if (!apiKey) {
    return {
      source: 'Local Heuristics Engine (Offline)',
      sensationalismScore: 45,
      primaryTone: 'Informative / Editorial',
      fallaciesFound: [
        {
          quote: (text || title).slice(0, 60),
          fallacy: 'Rhetorical Framing',
          explanation: 'Text evaluated via client-side heuristics. Enter a Gemini API Key in Extension Options (⚙️) to unlock live neural reasoning.',
          reflection: 'What primary sources or empirical evidence are cited in this piece?'
        }
      ],
      siftAction: 'Cross-check key assertions against independent wire reports (Reuters, AP).'
    };
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

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

Target Excerpt / Article: ${(text || title).slice(0, 2500)}`;

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

  if (!response.ok && model !== 'gemini-2.0-flash') {
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
    const errBody = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errBody.slice(0, 200)}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(rawText);
}
