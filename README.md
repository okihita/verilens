# VeriLens — AI Cognitive Shield for Media & Information Literacy

[![UNESCO MIL Hackathon 2026](https://img.shields.io/badge/UNESCO-Global%20MIL%20Hackathon%202026-F59E0B?style=for-the-badge)](https://www.unesco.org/en/global-mil-week)
[![Release v1.1.0](https://img.shields.io/badge/Release-v1.1.0-2563EB?style=for-the-badge&logo=github)](https://github.com/okihita/verilens/releases/tag/v1.1.0)
[![Next.js 16](https://img.shields.io/badge/Next.js-16%20Turbopack-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![pnpm Workspace](https://img.shields.io/badge/pnpm-Workspace-F69220?style=for-the-badge&logo=pnpm)](https://pnpm.io)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-4285F4?style=for-the-badge&logo=googlechrome)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Gemini AI](https://img.shields.io/badge/AI%20Engine-Gemini%202.0%20Flash--Lite-8E75B2?style=for-the-badge&logo=googlegemini)](https://aistudio.google.com)
[![Tests Passing](https://img.shields.io/badge/Unit%20Tests-17%2F17%20Passed-10B981?style=for-the-badge)](https://github.com/okihita/verilens)

> **VeriLens** is an open-access dual-ecosystem for media and information literacy built for the **UNESCO Global Media & Information Literacy (MIL) Youth Hackathon 2026**. It pairs a **gamified 10-cycle learning web platform** with an ultra-fast **Manifest V3 browser extension** to protect digital citizens from algorithmic outrage, logical fallacies, and viral scams in under 300ms.

---

## Production Deployment

* **Official Production URL:** [https://verilens.okihita.dev/](https://verilens.okihita.dev/)
* **Illustrated Fallacy Codex:** [https://verilens.okihita.dev/#codex](https://verilens.okihita.dev/#codex)
* **60s Daily Gauntlet:** [https://verilens.okihita.dev/gauntlet](https://verilens.okihita.dev/gauntlet)
* **Real-Time Article Sandbox:** [https://verilens.okihita.dev/sandbox](https://verilens.okihita.dev/sandbox)
* **Smartboard Classroom Showdown:** [https://verilens.okihita.dev/classroom](https://verilens.okihita.dev/classroom)
* **Educator Lesson Plan Generator:** [https://verilens.okihita.dev/educator](https://verilens.okihita.dev/educator)
* **Cognitive Skill Tree:** [https://verilens.okihita.dev/skills](https://verilens.okihita.dev/skills)
* **The Fallacy Forge:** [https://verilens.okihita.dev/forge](https://verilens.okihita.dev/forge)
* **Social Feed Simulator:** [https://verilens.okihita.dev/feed](https://verilens.okihita.dev/feed)
* **1v1 Cognitive Duel:** [https://verilens.okihita.dev/duel](https://verilens.okihita.dev/duel)
* **Global League Leaderboard:** [https://verilens.okihita.dev/leaderboard](https://verilens.okihita.dev/leaderboard)
* **Trophy Room & Cognitive Badges:** [https://verilens.okihita.dev/profile](https://verilens.okihita.dev/profile)
* **GitHub Repository:** [https://github.com/okihita/verilens](https://github.com/okihita/verilens)

---

## Monorepo Architecture

This project is organized as a high-performance **pnpm + Turborepo Monorepo**:

```text
verilens/
├── apps/
│   ├── web/                       # Next.js 16 (Turbopack) & React 19 Web Platform
│   │   ├── app/
│   │   │   ├── (core)/            # /, /sandbox, /extension, /privacy
│   │   │   ├── (simulations)/     # /gauntlet, /arena, /feed, /forge, /duel
│   │   │   ├── (progression)/     # /profile, /skills, /leaderboard
│   │   │   ├── (educators)/       # /classroom, /educator
│   │   │   └── api/analyze/       # Gemini 2.0 Flash-Lite edge router
│   │   ├── components/            # Navbar, CertificateModal, Badges
│   │   └── lib/                   # Gamification, i18n, Theme, Speech synthesis
│   │
│   └── extension/                 # Chrome Manifest V3 Browser Armor
│       ├── manifest.json          # MV3 configuration with contextMenus & activeTab
│       ├── src/content/           # Zero-lag TreeWalker text highlighter & sidebar
│       ├── src/background/        # Service worker & Gemini AI gateway
│       ├── src/popup/             # Sensationalism meter popup
│       └── demo/                  # Offline demo articles for testing
│
├── packages/
│   └── shared/                    # @verilens/shared (Single Source of Truth)
│       ├── src/fallacies.json     # 12 UNESCO Standardized Fallacies & Biases
│       ├── src/scenarios.json     # 15+ Real-world news & scam scenarios
│       ├── src/heuristics.js      # Zero-lag client-side pattern regex engine
│       ├── src/sifter.js          # SIFT lateral URL generator & publisher dossiers
│       └── src/illustrations.js   # 12 Bespoke inline SVG vector illustrations
│
├── docs/                          # UNESCO Hackathon PRDs & Architecture
│   ├── 01_UNESCO_Youth_Hackathon_Overview.md
│   ├── 02_Ideation_Brainstorming_and_Scoring_Matrix.md
│   ├── 03_VeriLens_High_Level_Architecture_and_Code_Design.md
│   └── 04_VeriLens_Web_App_and_Gamified_Platform_PRD.md
│
├── AGENTS.md                      # Strict Git Flow & Development Directives
├── pnpm-workspace.yaml            # pnpm workspace definition
└── turbo.json                     # Turborepo task pipeline
```

---

## Core Feature Highlights

### 1. 12 Illustrated Fallacy Archetypes
A complete taxonomy of rhetorical manipulation patterns, including Ad Hominem, False Dilemma, Straw Man, Appeal to Fear, Sunk Cost, Post Hoc Ergo Propter Hoc, Bandwagon, Halo Effect, Anchoring Bias, Confirmation Bias, Phishing Scams, and In-Group Favoritism.

### 2. 60-Second Daily Gauntlet (`/gauntlet`)
A high-tempo triage speed trial where players classify viral claims under ticking time pressure with combo streaks (up to 4x multipliers).

### 3. SIFT Lateral Reading Engine (`/sandbox`)
Built on the Stanford History Education Group (SHEG) framework:
* **Stop**: Interrupt the emotional reaction.
* **Investigate the Source**: Automated publisher credibility lookup.
* **Find Trusted Coverage**: Automated lateral search queries.
* **Trace Claims**: Primary context and archive locators.

### 4. Interactive Educator Lesson Plan Generator (`/educator`)
A 1-click workshop tool for teachers to configure class duration (15m, 45m, 90m) and generate printable PDF worksheets aligned with the UNESCO MIL Curriculum.

### 5. Multilingual Support (English & Indonesian)
Instant zero-reload language switching (`EN` | `ID`) translating all cards, game prompts, rules, and official completion certificates.

### 6. Executive Theme Engine & Typography
* **Default Theme:** Clean, high-contrast Light mode with Sun, Moon, and System geometric vector toggles.
* **Typography:** `Plus Jakarta Sans` for tight, authoritative headlines and `JetBrains Mono` for tabular numerals and badges.
* **Official Branding:** Geometric optical shield emblem and crisp transparent favicons.

---

## Getting Started Locally

### Prerequisites
* **Node.js:** `>= 18.18.0` (or Node 20+)
* **pnpm:** `>= 9.0.0` (`npm install -g pnpm`)

### Installation & Execution

```bash
# Clone the repository
git clone https://github.com/okihita/verilens.git
cd verilens

# Install all monorepo dependencies
pnpm install

# Start Next.js development server
pnpm dev

# Run all 17 automated tests
pnpm test

# Build production bundle
pnpm build
```

---

## Development & Git Flow

Contributors and AI developers must adhere to the Git Flow directives defined in [`AGENTS.md`](./AGENTS.md):
* **`main`**: Production releases only with semver release tags (`v1.1.0`).
* **`develop`**: Integration branch for ongoing feature iterations.
* **`feature/<name>`**: Isolated feature development branched off `develop`.
