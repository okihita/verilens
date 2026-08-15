# Chrome Web Store Listing & Publishing Guide for VeriLens

This document contains all pre-filled metadata, permissions justifications, privacy disclosures, and asset specifications required to publish **VeriLens** to the Chrome Web Store.

---

## 1. Developer Account & Verification Checklist

* [ ] **Google Developer Account:** Registered at [chrome.google.com/webstore/devpanel](https://chrome.google.com/webstore/devpanel) ($5 USD one-time fee).
* [ ] **2-Step Verification (2FA):** Enabled on developer Google account.
* [ ] **Trader Status:** Non-Trader (since VeriLens is a free, open-source educational project).

---

## 2. Store Listing Metadata

### Extension Name
`VeriLens — AI Cognitive Companion for Media Literacy`

### Short Description (Max 132 chars)
`Real-time rhetorical fallacy detector, framing analyzer, and SIFT lateral reading companion for news articles and social feeds.`

### Detailed Description (Markdown formatted for CWS)
```
VeriLens is an open-access cognitive companion designed for the UNESCO Global MIL Youth Hackathon 2026. It empowers students, educators, and digital citizens to detect algorithmic manipulation, logical fallacies, and sensationalist framing in real time.

🌟 KEY FEATURES:
• Zero-Lag Pure Text Highlighter: Non-destructively scans articles and highlights manipulative phrasing using local heuristics (0% CPU impact).
• In-Page Collapsible Sidebar (Alt + V): Inspect word count, publisher trust dossiers, and flagged rhetorical devices in real time.
• Right-Click SIFT Verification: Highlight any sentence on Twitter, Reddit, or news articles, right-click, and select "⚡ SIFT & Verify with VeriLens".
• Gemini 2.0 Flash-Lite AI Deep Scan: Instant neural analysis streaming customized fallacy breakdowns and UNESCO metacognitive reflection prompts.
• 1-Click SIFT Lateral Actions: Instantly cross-check claims against Google Fact Check Explorer, Reuters/AP consensus wire reporting, and Wikipedia publisher profiles.
• Privacy-First Architecture: 100% of text scanning and learning statistics remain strictly local on your device.

🧭 BASED ON UNESCO GLOBAL MIL & SIFT:
VeriLens embodies the SIFT methodology (Stop, Investigate the Source, Find Better Coverage, Trace Claims) created by Mike Caulfield and Stanford SHEG.
```

### Category
`Productivity` / `Education`

### Language
`English`

---

## 3. Mandatory Permissions Justifications (Copy-Paste for Google Review)

When submitting, Google's review team asks for a plain-English explanation for every declared permission:

| Permission | Manifest Key | Plain-English Justification for Review Team |
| :--- | :--- | :--- |
| **Active Tab** | `"activeTab"` | Required to inspect the title and text of the currently active article when the user explicitly clicks the extension popup or keyboard shortcut. |
| **Storage** | `"storage"` | Required to persist the user's local Cognitive Gym streaks, sensitivity level, and custom Gemini API key locally on their device. |
| **Scripting** | `"scripting"` | Required to dynamically inject the in-page slide-out sidebar and text highlighter when the user triggers the right-click context menu. |
| **Context Menus** | `"contextMenus"` | Required to create the "⚡ SIFT & Verify with VeriLens" and "🔍 SIFT: Trace Image Origin" right-click actions on highlighted text and images. |
| **Host Permissions** | `https://*/*`, `http://*/*` | Required to allow the user to verify news claims, blog articles, and educational content across public websites. |

---

## 4. Privacy & Data Use Disclosures

* **Single Purpose Statement:**  
  *"VeriLens has a single purpose: to help users evaluate rhetorical framing, logical fallacies, and publisher credibility using educational SIFT lateral reading tools."*
* **Data Collection Declarations in Developer Dashboard:**
  * **Personally Identifiable Information (PII):** `No`
  * **Health Information:** `No`
  * **Financial & Payment Info:** `No`
  * **Authentication Info:** `No`
  * **Personal Communications:** `No`
  * **User Activity (Clicks / Browsing History):** `No`
  * **Website Content:** `Yes` *(Only analyzed in-memory or forwarded to Gemini API on explicit user action; never stored on external tracking servers).*
* **Data Sale:** `I do not sell user data to third parties.`
* **Data Usage:** `I do not use or transfer user data for purposes unrelated to the extension's single purpose.`
* **Lending / Credit:** `I do not use or transfer user data to determine creditworthiness or for lending purposes.`

---

## 5. Live Privacy Policy URL

URL to submit in the dashboard:  
`https://verilens.vercel.app/privacy` *(Hosted inside our Next.js app)*

---

## 6. How to Build the Submission ZIP

Run this command in terminal to create the clean ZIP archive:

```bash
zip -r verilens-extension-v1.0.0.zip verilens-extension -x "*.git*" "*/.DS_Store" "*node_modules*"
```
