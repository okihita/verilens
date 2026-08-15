# VeriLens: AI-Powered Cognitive Companion for Media & Information Literacy (MIL)

[![UNESCO MIL Hackathon](https://img.shields.io/badge/Target-UNESCO%20Youth%20MIL%20Hackathon-blue.svg)](https://www.unesco.org/en/global-mil-week)
[![Manifest V3](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-amber.svg)](https://developer.chrome.com/docs/extensions/mv3/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

> **"A Cognitive Gym for the Mind, Not a Black-Box Truth Censor."**  
> VeriLens is an open-source browser extension that cultivates critical thinking in real-time across live news articles and social media feeds using the **SIFT Framework** (*Stop, Investigate the source, Find better coverage, Trace claims*).

---

## 🌟 Key Features

1. **In-Situ Rhetorical Fallacy Highlighting:**  
   Subtle, non-intrusive dotted underlines appear directly on phrases containing logical fallacies (*Ad Metum, False Dilemma, Weasel Words, Ad Hominem*).
2. **Pedagogical Cognitive Hovercards:**  
   Hovering over any flagged phrase reveals plain-language explanations and a thoughtful reflection prompt (*"Ask yourself: Does the evidence justify this degree of alarm?"*).
3. **Popup SIFT Command Center:**  
   Real-time Sensationalism Gauge (0–100 dial), publisher trust dossier, and 1-click lateral search queries (Google Fact Check, Reuters, Wikipedia).
4. **Multimodal Social Media Lens:**  
   Ambient `⚡ SIFT Post` badges on Instagram, TikTok, and X video/image cards with 1-click reverse media frame tracing.
5. **Two-Tier Architecture (Free & Offline First):**  
   - **Tier 1 (Instant & Offline):** Fast client-side regex heuristics that work with zero API cost.
   - **Tier 2 (Deep AI):** Optional integration with Google Gemini Flash for deep structured reasoning and multimodal frame analysis.

---

## 🚀 How to Install & Test (Developer Mode)

### Step 1: Open Chrome Extensions
1. Open Google Chrome, Brave, or Microsoft Edge.
2. Navigate to `chrome://extensions` in your address bar.
3. Toggle on **Developer mode** in the top-right corner.

### Step 2: Load Unpacked Extension
1. Click the **Load unpacked** button in the top-left.
2. Select the `verilens-extension` folder:
   ```
   /Users/okihita/Documents/Grimoire/Hackathon/UNESCO Youth/verilens-extension
   ```
3. VeriLens will appear in your extensions list and toolbar!

### Step 3: Test with the Interactive Mock Article
1. Open the included demo test file directly in your browser:
   ```
   file:///Users/okihita/Documents/Grimoire/Hackathon/UNESCO Youth/verilens-extension/demo/mock_article.html
   ```
2. Hover over the dotted phrases to see the cognitive hovercards in action.
3. Click the VeriLens icon in your extension toolbar to view the live **Sensationalism Dial & SIFT Toolkit**.

---

## 📂 Project Structure

```
verilens-extension/
├── manifest.json                 # Manifest V3 configuration & permissions
├── icons/                        # Scalable vector & PNG icon set
│   ├── icon16.svg
│   ├── icon32.svg
│   ├── icon48.svg
│   └── icon128.svg
├── src/
│   ├── background/
│   │   └── background.js         # Service worker: Gemini Flash AI gateway & caching
│   ├── content/
│   │   ├── content.js            # In-page DOM parser, highlights & social media lens
│   │   └── content.css           # Subtle styling for underlines & cognitive hovercards
│   ├── popup/
│   │   ├── popup.html            # SIFT Dashboard layout
│   │   ├── popup.css             # Dark-slate modern editorial styling
│   │   └── popup.js              # Gauge rotation, dossier loader & SIFT triggers
│   ├── options/
│   │   ├── options.html          # BYOK (Gemini API Key) & sensitivity preferences
│   │   ├── options.css           # Settings page styles
│   │   └── options.js            # Stores user configs in chrome.storage.local
│   └── shared/
│       ├── fallacies.json        # 15 standardized logical/rhetorical fallacy definitions
│       ├── heuristics.js         # Fast client-side regex pattern matcher
│       └── sifter.js             # SIFT lateral search & reverse image query builder
├── demo/
│   └── mock_article.html         # Offline test environment with simulated news & social cards
└── README.md
```

---

## 🏛️ UNESCO MIL Framework Alignment

VeriLens is designed to directly address the 5 evaluation pillars of the **UNESCO Global MIL Youth Hackathon**:
* **Pedagogical Autonomy (25%):** Fosters cognitive self-defense rather than black-box censorship.
* **Creativity & Innovation (25%):** Real-time in-situ rhetorical decoding combined with multimodal social media frame tracing.
* **Technical Feasibility (20%):** Robust, zero-dependency Manifest V3 architecture with instant client-side heuristics and optional Gemini Flash integration.
* **Inclusivity & Accessibility (15%):** Works offline, client-side first, zero user data harvesting.
* **Scalability (15%):** Embeds effortlessly into daily web browsing habits.
