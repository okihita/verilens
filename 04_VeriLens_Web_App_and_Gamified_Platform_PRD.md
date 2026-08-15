# Product Requirements Document (PRD)
# VeriLens: The UNESCO Gamified Media & Information Literacy (MIL) Platform

**Document Version:** 1.0.0  
**Target Competition:** UNESCO Global MIL Youth Hackathon 2026  
**Status:** Approved for Implementation  
**Author:** VeriLens Engineering & Pedagogical Design Team  

---

## 1. Executive Summary & Product Vision

### 1.1 Vision Statement
**VeriLens** is an open-access, dual-ecosystem cognitive companion designed to transform passive digital consumers into resilient, autonomous critical thinkers. By uniting a **gamified web training dojo** (inspired by *yourlogicalfallacyis.com*) with a **lightweight, non-destructive browser extension**, VeriLens closes the critical gap between theoretical media literacy education and real-world digital consumption.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           THE VERILENS ECOSYSTEM                        │
├────────────────────────────────────┬────────────────────────────────────┤
│         1. THE TRAINING DOJO       │         2. THE LIVE FIELD ARMOR    │
│           (Web Application)        │           (Browser Extension)      │
│                                    │                                    │
│  🃏 Cognitive Bias & Fallacy Codex │  ⚡ In-Situ Pure Text Highlighting  │
│  🎮 "Bias Spotter" Gamified Arena  │  🖱️ Right-Click SIFT Verification  │
│  🧪 Live Article Dissector Sandbox │  🤖 Gemini Flash-Lite Deep Scan    │
│  🏫 UNESCO Classroom & Educator Hub│  🧭 1-Click Lateral Search Sifter  │
└────────────────────────────────────┴────────────────────────────────────┘
```

### 1.2 The Core Problem
1. **Algorithmic Outrage & Cognitive Blindspots:** Gen-Z and youth spend 7+ hours daily navigating algorithmic feeds designed to weaponize emotional vulnerability, confirmation bias, artificial urgency, and polarized false dilemmas.
2. **Failure of Passive Debunking:** Traditional fact-checking operates post-facto (*"after the damage is done"*), which research shows often reinforces partisan defensiveness.
3. **The Classroom-to-Reality Chasm:** Educational resources (like PDFs and static websites) are disconnected from the actual moments of social media scrolling and article reading.

### 1.3 The VeriLens Solution: "Pre-Bunking" + Dual-Loop Learning
* **Loop 1 (Conditioning):** In the Web App, youth learn the anatomy of cognitive manipulation through interactive cards, gamified scenario challenges, and instant pedagogical feedback.
* **Loop 2 (Application):** On the live web, the browser extension acts as an on-demand cognitive shield, allowing users to highlight any claim, right-click, and dissect rhetoric in real-time.

---

## 2. Target Personas & User Journeys

### Persona A: Maya, The Digital Native (17, High School Student)
* **Context:** Active on TikTok, Reddit, and Instagram. Frequently encounters sensational health hacks, financial get-rich-quick lures, and political outrage clips.
* **Goal:** Wants to know if viral claims are real without reading 2,000-word academic debunks.
* **Journey:** Visits VeriLens Web App ➔ Plays the 5-round "Bias Spotter" speed game ➔ Unlocks a 3-day streak ➔ Installs the Chrome Extension to protect her live feed.

### Persona B: Mr. Henderson, The High School Educator (38, Media & Civics Teacher)
* **Context:** Teaching digital citizenship under the UNESCO MIL Curriculum. Needs engaging, interactive digital tools that students actually enjoy.
* **Goal:** Wants a zero-install, projector-ready interactive activity for his 45-minute media literacy workshop.
* **Journey:** Projects the VeriLens Web App in class ➔ Uses the **Fallacy Codex** for group discussion ➔ Launches **Classroom Arena Mode** where students vote on fallacy choices.

### Persona C: Elena, The Investigative Reader & Fact-Checker (26, Journalism Graduate)
* **Context:** Regularly reads multiple independent blogs, wire feeds, and Substack newsletters.
* **Goal:** Quickly inspects questionable paragraphs, verifies publisher ownership, and performs lateral reading.
* **Journey:** Pastes a suspicious newsletter excerpt into the **Web Sandbox Dissector** ➔ Reviews the Gemini Flash-Lite fallacy reasoning ➔ Clicks 1-click SIFT links to verify primary consensus.

---

## 3. Product Architecture & Feature Specifications

```
verilens-web/
├── index.html                  # Core single-page application entry point
├── styles/
│   ├── design-system.css       # Color tokens, typography, elevation, spacing
│   ├── codex.css               # Fallacy & bias card flip grid styling
│   ├── arena.css               # Gamified quiz engine & streak counter
│   ├── sandbox.css             # Live text dissector & Gemini viewer
│   └── responsive.css          # Mobile, tablet, and desktop breakpoints
├── scripts/
│   ├── app.js                  # Main navigation, state store, routing
│   ├── codex-data.js           # 12 standardized fallacies & biases with UNESCO tags
│   ├── arena-engine.js         # Gamified quiz loop, scoring math, streak manager
│   ├── sandbox-engine.js       # In-browser heuristics & Gemini Flash-Lite gateway
│   └── sifter-web.js           # Lateral search link builder & publisher dossier
└── assets/
    ├── icons/                  # High-contrast vector SVG iconography
    └── badges/                 # Gamification tier medals & streak badges
```

---

## 4. Detailed Functional Requirements

### Module 1: The Cognitive Bias & Fallacy Codex (`#codex`)
An interactive, tactile exploration grid inspired by *YourLogicalFallacyIs*, but modernized for Gen-Z digital contexts with UNESCO MIL competencies.

#### 1.1 Card Taxonomy (12 Standardized Archetypes)
1. **Ad Hominem (Character Smear):** Attacking the person rather than the empirical evidence.
2. **False Dilemma (Forced Dichotomy):** Erasing nuanced spectrums into a rigid either/or trap.
3. **Appeal to Fear (Ad Metum / Catastrophizing):** Exploiting panic and existential dread to bypass critical evaluation.
4. **Confirmation Bias:** Selectively seeking and believing only facts that validate pre-existing beliefs.
5. **Weasel Words (Vague Attribution):** Using passive, unverified sourcing (*"Many people are saying..."*).
6. **Artificial Urgency (Scam Pressure):** Rushing the victim with time-limited panic to prevent independent verification.
7. **Strawman Argument:** Misrepresenting an opponent's position to make it easier to attack.
8. **Bandwagon Effect (Social Proof Manipulation):** Arguing that a claim must be true because millions believe it.
9. **Sunk Cost Fallacy:** Continuing a harmful belief or action because of past emotional or financial investment.
10. **Halo Effect:** Assuming a celebrity or charismatic influencer is an expert on unrelated complex scientific or geopolitical topics.
11. **Cherry Picking (Suppressed Evidence):** Highlighting isolated data points while concealing overriding scientific consensus.
12. **Conspiracy Framing (Suppression Myth):** Claiming that lack of evidence is proof of a sinister cover-up.

#### 1.2 Card Interaction Model
* **Front Face:** Bold icon, crisp archetype title, category pill (*Logic, Emotion, Attribution, Cognitive*), and 1-sentence plain-English punchline.
* **Flip State (On Click):**
  * 📖 **The Anatomy:** Formal definition with psychological root cause.
  * 📱 **Viral Web Scenario:** A realistic social media headline, tweet, or WhatsApp forward demonstrating the fallacy in action.
  * 💡 **UNESCO "Check Yourself" Prompt:** A reflective question designed to build cognitive metacognition.
  * 🔍 **SIFT Action Button:** 1-Click link to test this fallacy in the live sandbox.

---

### Module 2: The "Bias Spotter" Gamified Arena (`#arena`)
An interactive micro-game designed for high replayability, classroom engagement, and viral social sharing.

#### 2.1 Game Loop Mechanics
1. **Round Initialization:** The engine randomly selects 5 distinct scenarios from a curated database of real-world viral claims (financial scams, outrage headlines, deepfake transcripts, health hoaxes).
2. **The Prompt:** Displays the scenario styled as a realistic digital card (social media post, breaking news banner, or private chat forward).
3. **User Input:** 4 multiple-choice options displaying fallacy/bias archetypes.
4. **Feedback & Pedagogical Payoff:**
   * **Correct Answer:** Sound pulse, +100 XP, streak increment, and detailed breakdown of *why* this fallacy is dangerous.
   * **Incorrect Answer:** Gentle correction, explanation of the subtle nuance, and the correct UNESCO MIL strategy.
5. **Session Summary & Shareable Card:**
   * Overall Accuracy Score (e.g. *80% — Critical Thinker Grade*).
   * UNESCO MIL Competency Mastery Badge.
   * 1-Click "Challenge a Friend" link or Twitter/WhatsApp share card.

---

### Module 3: The Live Article Dissector Sandbox (`#sandbox`)
Allows judges, educators, and mobile users to test the VeriLens text analysis and AI reasoning engine directly on the web page without installing the browser extension.

#### 3.1 Functionality
* **Preset Scenario Picker:** 1-Click buttons to instantly load representative test cases:
  1. 💊 *Miracle Health Cure & Conspiracy* (High Sensationalism: 85/100)
  2. 💰 *Guaranteed Crypto Arbitrage Scam* (High Urgency: 90/100)
  3. 🏛️ *Polarizing Political Outrage Headline* (Moderate Nuance: 55/100)
  4. 📰 *Reuters Neutral Wire Report* (Reflective: 10/100)
* **Custom Text Area:** Users can paste any custom article text, headline, or essay (up to 3,500 characters).
* **Instant Dissection:**
  * Displays the **Sensationalism Index Meter (0–100%)**.
  * Renders in-situ highlight spans over detected manipulative phrasing.
  * Clicking any highlight displays the **Cognitive Hovercard**.
  * **`[ 🤖 Run Gemini Flash-Lite Deep Scan ]`**: Sends text to Google's official Gemini endpoint and renders live AI fallacy explanations and customized reflection questions.
  * **1-Click SIFT Lateral Links**: Automatically generates Google Fact Check, Consensus Search, and Wikipedia entity profiles for the analyzed text.

---

### Module 4: The UNESCO Educator & Classroom Mode (`#educator`)
Dedicated toolkit for teachers, workshop facilitators, and youth leaders.

#### 4.1 Educator Features
* **Projector Presentation View:** Clean, full-screen toggle for classroom smartboards.
* **Curriculum Alignment Matrix:** Maps each of the 12 fallacies directly to the official **UNESCO MIL Five Laws & Global Curriculum Modules**.
* **Downloadable Resource Kit:** 1-Click printable PDF cheat sheet and workshop discussion guide.

---

### Module 5: The Extension Bridge & Download Hub (`#extension`)
* Live extension feature showcase (Right-Click verification, in-page DOM sidebar, 0% CPU footprint).
* Step-by-step 30-second installation guide with direct download link.
* Video pitch player embed.

---

## 5. Information Architecture & Navigation

```
[ Navigation Bar ]
├── ⚡ VeriLens Brand Mark + UNESCO MIL 2026 Tag
├── 🃏 Bias Codex (Explore 12 Fallacies)
├── 🎮 Spotter Arena (Gamified Quiz)
├── 🧪 Live Sandbox (Test Any Article)
├── 🏫 Educator Kit (Classroom Guide)
└── [ 🧩 Install Extension ] (Primary CTA)
```

---

## 6. Design System & UI/UX Principles

### 6.1 Design Philosophy: "Prestigious Editorial Civic-Tech"
* **Strict Avoidance of "Vibe-Coded" Gimmicks:** No neon cyberpunk glow, no random gaming emojis, no clutter.
* **Color Palette (Accessible High-Contrast Dark Slate):**
  * Base Background: `#0A0F1D` (Deep Civic Navy)
  * Surface Card: `#141E33` (Slate Surface)
  * Surface Elevated: `#1E2D4A` (Hover & Active state)
  * Text Primary: `#F8FAFC` (Pure High-Legibility Slate)
  * Text Secondary: `#94A3B8` (Muted Label Slate)
  * Accent Amber: `#F59E0B` (UNESCO Warning & Critical Thought)
  * Accent Blue: `#3B82F6` (Verification & SIFT Links)
  * Accent Green: `#10B981` (Factual & Reflective State)
  * Accent Red: `#EF4444` (Severe Manipulation & Urgent Scam)
* **Typography:** System Editorial Stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`), high x-height, generous line-height (`1.55`), and strict typographic hierarchy.

---

## 7. Technical Specifications & Performance Guarantees

1. **Zero-Dependency Architecture:** Pure Vanilla HTML5, CSS3, and modern ES6+ JavaScript. No heavy React/Vue runtime build steps, ensuring instant sub-500ms page load speeds and zero vulnerability dependencies.
2. **Instant Deployment:** Ready for GitHub Pages, UNESCO cloud hosting, or Netlify with 100% static uptime.
3. **Mobile & Tablet Optimized:** Fluid CSS grid and flexbox layouts ensuring seamless performance from a 375px iPhone screen to a 4K classroom projector.
4. **API Integration:** Direct browser-to-Gemini REST gateway with pre-configured BYOK support and automatic Flash-Lite / Flash 2.0 fallback.

---

## 8. UNESCO Youth Hackathon Rubric Alignment

| UNESCO Criterion | Weight | How the VeriLens Platform Scores Maximum (100%) |
| :--- | :---: | :--- |
| **Problem-Solution Fit & UNESCO Alignment** | **30%** | Built explicitly around the UNESCO MIL Curriculum and SIFT framework. Emphasizes pre-bunking and youth cognitive autonomy. |
| **Innovation & Creativity** | **20%** | Blends the virality of *YourLogicalFallacyIs* with an interactive AI text dissector and seamless browser extension bridge. |
| **Youth Appeal & Inclusivity** | **15%** | Gamified quiz arena, responsive mobile access, accessible high-contrast UI, and culturally diverse scam scenarios. |
| **Feasibility & Technical Realism** | **20%** | 100% working code, automated unit test suite (`tests/unit.test.js`), Playwright E2E testing, sub-60ms execution. |
| **Impact & Scalability** | **15%** | Dedicated Educator Mode for immediate classroom adoption worldwide with zero software licensing costs. |

---

## 9. Next Steps & Implementation Roadmap

1. **Phase 1 (Web Platform Core):** Build `index.html`, `styles/`, and core navigation.
2. **Phase 2 (Codex & Gamified Arena):** Implement the 12 interactive fallacy cards and the 5-round speed quiz engine with score calculation.
3. **Phase 3 (Sandbox Dissector):** Connect the live text parser, local heuristics engine, and Gemini Flash-Lite AI gateway.
4. **Phase 4 (Educator & Extension Launchpad):** Finalize classroom presentation mode and extension download guides.
5. **Phase 5 (Verification & Polish):** Test across mobile and desktop viewport matrix.
