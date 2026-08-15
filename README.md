# VeriLens — AI Cognitive Shield for Media & Information Literacy

[![UNESCO MIL Hackathon 2026](https://img.shields.io/badge/UNESCO-Global%20MIL%20Hackathon%202026-F59E0B?style=for-the-badge)](https://www.unesco.org/en/global-mil-week)
[![Next.js 14](https://img.shields.io/badge/Next.js-14%20App%20Router-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-4285F4?style=for-the-badge&logo=googlechrome)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Gemini AI](https://img.shields.io/badge/AI%20Engine-Gemini%202.0%20Flash--Lite-8E75B2?style=for-the-badge&logo=googlegemini)](https://aistudio.google.com)
[![Tests Passing](https://img.shields.io/badge/Unit%20Tests-17%2F17%20Passed-10B981?style=for-the-badge)](https://github.com/okihita/verilens)

> **VeriLens** is an open-access dual-ecosystem for media and information literacy built for the **UNESCO Global Media & Information Literacy (MIL) Youth Hackathon 2026**. It pairs a **gamified 10-cycle learning web platform** with an ultra-fast **Manifest V3 browser extension** to protect digital citizens from algorithmic outrage, logical fallacies, and viral scams in under 300ms.

---

## 🌐 Live Production Links

* 🚀 **Live Web Platform:** [https://web-six-lac-47.vercel.app](https://web-six-lac-47.vercel.app)
* 🃏 **Illustrated Fallacy Codex:** [https://web-six-lac-47.vercel.app/#codex](https://web-six-lac-47.vercel.app/#codex)
* ⚔️ **60s Daily Gauntlet:** [https://web-six-lac-47.vercel.app/gauntlet](https://web-six-lac-47.vercel.app/gauntlet)
* 🌳 **Cognitive Skill Tree:** [https://web-six-lac-47.vercel.app/skills](https://web-six-lac-47.vercel.app/skills)
* 🧪 **The Fallacy Forge:** [https://web-six-lac-47.vercel.app/forge](https://web-six-lac-47.vercel.app/forge)
* 📱 **Social Feed Simulator:** [https://web-six-lac-47.vercel.app/feed](https://web-six-lac-47.vercel.app/feed)
* ⚔️ **1v1 Cognitive Duel:** [https://web-six-lac-47.vercel.app/duel](https://web-six-lac-47.vercel.app/duel)
* 🏆 **Global League Leaderboard:** [https://web-six-lac-47.vercel.app/leaderboard](https://web-six-lac-47.vercel.app/leaderboard)
* 🏫 **Classroom Showdown:** [https://web-six-lac-47.vercel.app/classroom](https://web-six-lac-47.vercel.app/classroom)
* 🏆 **Trophy Room Profile:** [https://web-six-lac-47.vercel.app/profile](https://web-six-lac-47.vercel.app/profile)
* 📦 **GitHub Release v1.0.0:** [https://github.com/okihita/verilens/releases/tag/v1.0.0](https://github.com/okihita/verilens/releases/tag/v1.0.0)

---

## 🏗️ Monorepo Architecture Overview

This project is organized as a unified **Turborepo Workspace**:

```
verilens/
├── apps/
│   ├── web/                       # Next.js 14 App Router Gamified Web Platform
│   │   ├── app/                   # 18 Static & Dynamic Routes (Codex, Arena, Gauntlet, Skills, etc.)
│   │   ├── components/            # Reusable UI (Navbar, CertificateModal, Badges)
│   │   └── lib/                   # Gamification engine, Illustrations, Heuristics, Sifter
│   │
│   └── extension/                 # Chrome Manifest V3 Browser Armor
│       ├── manifest.json          # MV3 configuration with contextMenus & activeTab
│       ├── src/content/           # Zero-lag TreeWalker text highlighter & in-DOM sidebar
│       ├── src/background/        # Service worker & Gemini 2.0 Flash-Lite gateway
│       ├── src/popup/             # 400px Linear Sensationalism meter popup
│       └── src/options/           # User model selection & sensitivity settings
│
├── packages/
│   └── shared/                    # @verilens/shared (Single Source of Truth)
│       ├── src/fallacies.json     # 12 UNESCO Standardized Fallacies & Biases
│       ├── src/scenarios.json     # 15+ Real-world viral news & scam scenarios
│       ├── src/heuristics.js      # Zero-lag client-side pattern regex engine
│       └── src/sifter.js          # SIFT lateral URL generator & publisher dossiers
│
├── docs/                          # Comprehensive Hackathon & Architecture Documentation
│   ├── 01_UNESCO_Youth_Hackathon_Overview.md
│   ├── 02_Ideation_Brainstorming_and_Scoring_Matrix.md
│   ├── 03_VeriLens_High_Level_Architecture_and_Code_Design.md
│   └── 04_VeriLens_Web_App_and_Gamified_Platform_PRD.md
│
├── package.json                   # Root workspace package configuration
└── turbo.json                     # Turborepo task pipeline
```

---

## 🎮 The 10 Gamification Modes

| Mode | Route | Core Pedagogical Value |
| :--- | :--- | :--- |
| **1. Illustrated Codex** | `/` | 12 custom vector illustrations (*yourlogicalfallacyis* style) on 3D flip cards with viral examples and reflection prompts. |
| **2. Trophy Room** | `/profile` | RPG Level progression (Level 1 Novice to Level 10 Grand Inquisitor), 8 achievement badges, and XP trackers. |
| **3. Daily Gauntlet** | `/gauntlet` | 60-Second rapid-fire timed survival mode with 4x combo multipliers. |
| **4. Immunity Certificate** | Modal | Official-grade printable UNESCO certification with custom username and verification hash. |
| **5. Classroom Showdown** | `/classroom` | Smartboard presenter mode with Team Alpha vs Team Beta live scoreboard and debate timers. |
| **6. Skill Tree** | `/skills` | 4 Skill Branches (Dialectical, Statistical, Emotional, Scam) with unlockable passive booster perks. |
| **7. Fallacy Forge** | `/forge` | Reverse-gamification: take neutral facts and weaponize headlines to learn spin construction. |
| **8. Global League** | `/leaderboard` | International student ladder positioning player rank based on total XP. |
| **9. 1v1 Cognitive Duel** | `/duel` | 2-Player pass-and-play split keyboard battle dealing damage to opponent's Credibility Shield. |
| **10. Feed Simulator** | `/feed` | Simulated vertical social feed with live Critical Hygiene score and Community Notes moderation. |

---

## 🧩 Chrome Extension Installation (30 Seconds)

1. Clone or download this repository.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Toggle **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the [`apps/extension/`](file:///Users/okihita/Documents/Grimoire/Hackathon/UNESCO%20Youth/apps/extension) folder.
5. Highlight any text on Twitter, Reddit, or news articles, right-click, and select **"⚡ SIFT & Verify with VeriLens"**!

---

## 🧪 Testing Suite (100% Pass Rate)

Run all automated unit test suites across the monorepo:

```bash
# Run shared package tests
node --test packages/shared/test/shared.test.js

# Run extension unit tests
node --test apps/extension/tests/unit.test.js

# Run web gamification & illustrations tests
node --test apps/web/test/gamification.test.js
```

---

## 📚 Project Documentation

* [01. UNESCO Youth Hackathon Overview & Past Winners](docs/01_UNESCO_Youth_Hackathon_Overview.md)
* [02. Ideation Brainstorming & Scoring Matrix](docs/02_Ideation_Brainstorming_and_Scoring_Matrix.md)
* [03. High-Level Architecture & Code Design](docs/03_VeriLens_High_Level_Architecture_and_Code_Design.md)
* [04. Web App & Gamified Platform PRD](docs/04_VeriLens_Web_App_and_Gamified_Platform_PRD.md)
* [Chrome Web Store Publishing Guide](apps/extension/CHROMEWEBSTORE.md)

---

## ⚖️ License & Credits

Developed for the **UNESCO Global Media & Information Literacy Youth Hackathon 2026**. Open source under the MIT License.
