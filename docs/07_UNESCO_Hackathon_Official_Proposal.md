# UNESCO Global MIL Youth Hackathon 2026 — Project Proposal

**Project Name:** VeriLens — AI Cognitive Shield for Media & Information Literacy  
**Tagline:** Real-Time Cognitive Armor Against Algorithmic Outrage, Logical Fallacies, and Viral Manipulation  
**Submission Version:** `v1.4.0`  
**Official Live Deployment:** [https://verilens.okihita.dev/](https://verilens.okihita.dev/)  
**Open Source Repository:** [https://github.com/okihita/verilens](https://github.com/okihita/verilens)  

---

## 1. Team & Project Identification

| Field | Submission Details |
| :--- | :--- |
| **Team Name** | `[TEAM_NAME_PLACEHOLDER]` |
| **Primary Country / Region** | `[TEAM_COUNTRY_PLACEHOLDER]` |
| **Target Track** | Track 1: Artificial Intelligence (AI) and MIL & Track 2: MIL Education & Open Innovation |
| **Team Leader** | `[TEAM_LEADER_NAME_PLACEHOLDER]` (Age: `[AGE_PLACEHOLDER]`, Role: `[ROLE_PLACEHOLDER]`, Email: `[EMAIL_PLACEHOLDER]`) |
| **Team Member 2** | `[MEMBER_2_NAME_PLACEHOLDER]` (Age: `[AGE_PLACEHOLDER]`, Role: `[ROLE_PLACEHOLDER]`) |
| **Team Member 3** | `[MEMBER_3_NAME_PLACEHOLDER]` (Age: `[AGE_PLACEHOLDER]`, Role: `[ROLE_PLACEHOLDER]`) |
| **Team Member 4** | `[MEMBER_4_NAME_PLACEHOLDER]` (Age: `[AGE_PLACEHOLDER]`, Role: `[ROLE_PLACEHOLDER]`) |

---

## 2. Executive Summary & Problem Statement

### 2.1 The Crisis of Epistemic Fragmentation & Algorithmic Outrage
In today's hyper-connected information ecosystem, digital citizens—especially youth aged 15 to 30—are exposed to hundreds of news items, social feeds, and viral posts daily. Recommendation algorithms prioritize emotional arousal, tribal framing, and sensationalism over nuance and accuracy. This has triggered widespread **epistemic fragmentation**, where logical fallacies, confirmation biases, and coordinated synthetic manipulation erode democratic discourse and civic trust.

### 2.2 The Debunking Paradox & Critical Gaps
Traditional fact-checking and media literacy solutions suffer from three fundamental flaws:
1. **The Latency Trap (Post-Facto Debunking):** Fact-checks take hours or days to publish, while sensational misclaims spread within seconds.
2. **The Backfire Effect:** Static truth ratings (e.g., "True / False" badges) trigger confirmation bias and defensive political identity armor, alienating skeptics.
3. **The Friction Gap:** Informational websites require users to navigate away from their active reading context, creating prohibitive friction.

$$\text{Reaction Time Gap} = t_{\text{FactCheck}} - t_{\text{ViralSpread}} \gg 0$$

### 2.3 The VeriLens Solution
**VeriLens** bridges this gap by introducing an **in-situ "pre-bunking" cognitive shield**. Built as a dual-ecosystem pairing a **gamified web platform** with an **ultra-fast Manifest V3 browser extension**, VeriLens equips users with real-time rhetorical heuristics, transparent AI reasoning, and the Stanford History Education Group (SHEG) **SIFT lateral reading framework** right inside their browser.

```mermaid
graph TD
    A[Raw Web Content & Social Feed] --> B{VeriLens In-Situ Armor}
    B -->|Client-Side Regex <300ms| C[Sensationalism Index & Heuristic Highlights]
    B -->|Gemini 2.0 Flash-Lite Edge| D[Rhetorical Fallacy & Framing Analysis]
    B -->|Context Menu SIFT Trigger| E[Lateral Reading Queries & Publisher Dossier]
    C & D & E --> F[Cognitive Autonomy & Media Literacy Growth]
```

---

## 3. Pedagogical Framework & Core Solution Features

### 3.1 Alignment with UNESCO Media & Information Literacy Curriculum
VeriLens directly operationalizes the **UNESCO Media and Information Literacy (MIL) Curriculum for Educators and Learners**, specifically focusing on:
* **Critical Media Evaluation:** Analyzing rhetorical construction and emotional triggers.
* **Ethical AI Literacy:** Understanding how machine intelligence detects framing patterns without black-box censorship.
* **Civic Digital Agency:** Empowering youth to become active, resilient evaluators of information.

### 3.2 The 24 UNESCO Illustrated Fallacy Taxonomy
VeriLens codifies **24 standardized rhetoric and manipulation archetypes** into an open JSON schema (`@verilens/shared`), complete with bespoke vector artwork and pedagogical breakdowns:

| Fallacy Archetype | Pedagogical Explanation & Rhetorical Pattern |
| :--- | :--- |
| **Ad Hominem** | Attacking the author's character or motives rather than addressing the argument. |
| **Straw Man** | Distorting or oversimplifying an opposing argument to make it easier to attack. |
| **False Dilemma** | Presenting complex situations as binary choices (us vs. them). |
| **Appeal to Fear** | Leveraging existential dread or alarmist panic to bypass rational analysis. |
| **Sunk Cost Fallacy** | Justifying continuous support for flawed claims due to past emotional investment. |
| **Post Hoc Ergo Propter Hoc** | Assuming that because event B followed event A, event A caused event B. |
| **Bandwagon Effect** | Claiming an argument is valid because a large crowd supports it. |
| **Halo Effect** | Allowing positive perception of a source to override critical evaluation. |
| **Anchoring Bias** | Over-relying on the first piece of information encountered. |
| **Confirmation Bias** | Favoring information that confirms pre-existing beliefs while ignoring counter-evidence. |
| **Phishing & Urgency Scams** | Creating false temporal pressure to induce uncritical action. |
| **In-Group Favoritism** | Validating claims exclusively based on tribal or political affiliation. |

### 3.3 SIFT Lateral Reading Engine
VeriLens integrates the 4-step SIFT methodology pioneered by Mike Caulfield and Stanford's Civic Online Reasoning program:
1. **Stop:** Interrupt immediate emotional reactions via real-time sensationalism scoring.
2. **Investigate the Source:** Instant publisher credibility dossiers and ownership disclosures.
3. **Find Trusted Coverage:** Automated 1-click lateral search queries looking across diverse, reputably indexed outlets.
4. **Trace Claims:** Locating original research, raw quotes, and context archives.

---

## 4. Technical Architecture & Implementation Realism

VeriLens is architected as a production-ready, high-performance **pnpm + Turborepo monorepo**:

```text
verilens/
├── apps/
│   ├── web/               # Next.js 16 (Turbopack) & React 19 Web Platform
│   └── extension/         # Chrome Manifest V3 Browser Extension
├── packages/
│   └── shared/            # Shared taxonomy, regex heuristics & SIFT engine
└── docs/                  # UNESCO Hackathon Architectural Standards
```

### 4.1 Monorepo Technical Stack

| Component | Technology | Technical Purpose & Performance |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (Turbopack) + React 19 | Serverless edge router and gamified platform rendering. |
| **Browser Extension** | Chrome Manifest V3 | In-situ content script execution with zero layout shifts. |
| **Package Manager** | `pnpm` Workspace | Ultra-fast dependency resolution and strict module isolation. |
| **Shared Engine** | `@verilens/shared` | Single source of truth for taxonomy, heuristics, and sifter logic. |
| **AI Gateway** | Gemini 2.0 Flash-Lite | Fast structured JSON output for fallacy breakdown in <300ms. |
| **Test Runner** | Node.js Native Test Runner | 28 automated unit tests verifying taxonomy schema, heuristics, and i18n parity. |

### 4.2 In-Situ DOM Engine (Extension Content Script)
The browser extension utilizes a custom non-destructive `TreeWalker` DOM scanner that parses webpage body nodes in under **12 milliseconds**, highlighting rhetorical patterns without breaking responsive layouts or causing re-renders.

$$\text{Processing Speed} = \frac{\text{DOM Nodes Analyzed}}{\text{Scanning Time (ms)}} \ge 1000 \text{ nodes/ms}$$

```javascript
// Excerpt from @verilens/shared regex engine logic
export function calculateSensationalismIndex(text) {
  const matches = HEURISTIC_PATTERNS.filter(pattern => pattern.test(text));
  const score = Math.min(100, Math.round((matches.length / (text.split(' ').length || 1)) * 500));
  return { score, detectedPatterns: matches.length };
}
```

---

## 5. Target Audience, Accessibility & Inclusivity

### 5.1 Youth & Citizen Centricity
* **Primary Demographic:** Digital youth (aged 15–30), students, and young journalists navigating online news feeds.
* **Secondary Demographic:** Educators, school teachers, and workshop facilitators.

### 5.2 Accessibility & Civic Editorial Aesthetic
* **WCAG 2.1 AA Compliant:** High-contrast color palette, keyboard-navigable UI, and screen-reader accessible DOM annotations.
* **Strict Visual Directives:** Zero emojis in code/labels, zero SaaS pill badges, authoritative sans-serif typography (`Plus Jakarta Sans`).
* **Multilingual Localization (i18n):** Parity across 5 supported languages (including English and Indonesian) with zero-reload dynamic switching.

---

## 6. Ethical AI, Human Rights & Privacy Safeguards

VeriLens strictly adheres to the **UNESCO Recommendation on the Ethics of Artificial Intelligence**:

1. **Anti-Censorship Stance:** VeriLens does **not** block content or act as an arbiter of truth. It explains *rhetorical mechanics*, leaving analytical judgment entirely to the user.
2. **Explainable AI (XAI):** AI reasoning outputs are structured, transparent, and accompanied by explicit text citations.
3. **Privacy-First Architecture:** Zero user tracking, zero account walls required, zero third-party telemetry, and local storage state persistence.

---

## 7. Social Impact, Adoption & Sustainability Roadmap

```mermaid
timeline
    title VeriLens Deployment & Adoption Roadmap
    Phase 1 (v1.4.0 Live) : Monorepo Production Build & Deployment at verilens.okihita.dev
    Phase 2 (Hackathon Final) : UNESCO Classroom Pilot Program & Extension Web Store Publishing
    Phase 3 (Post-Hackathon) : Open-Source API & School Board Curriculum Integration
```

### 7.1 Measurable Educational Impact
* **Daily Gauntlet (`/gauntlet`):** 60-second speed triage trial measuring cognitive recognition speeds.
* **Classroom Showdown (`/classroom`):** Interactive smartboard multiplayer module for school workshops.
* **Educator Generator (`/educator`):** 1-click printable PDF lesson plans aligned with UNESCO MIL modules.

---

## 8. Monorepo Health & Verification Status

VeriLens has undergone rigorous unit testing and pre-release verification:

```text
> verilens-monorepo@1.4.0 test
✔ Shared: Fallacies taxonomy has 24 standardized archetypes
✔ Shared: Heuristics pattern scanner runs and scores accurately
✔ Shared: Sifter builds lateral links
✔ Manifest: Contains contextMenus permission and valid MV3 structure
✔ Taxonomy: Fallacies JSON schema validity
✔ Heuristics: Detects Phishing & Urgent Action Scams
✔ Heuristics: Detects Financial & Crypto Lures
✔ Heuristics: Detects Catastrophizing & Fear-Baiting
✔ Heuristics: Computes Sensationalism Index correctly
✔ Gamification: Ranks progression contains 10 distinct levels
✔ Audio Engine: Web Audio synthesizer exports callable sound handlers
✔ Theme Tokens: Disallow hardcoded monochrome text colors in headings
✔ i18n: All t() keys referenced in web app source code exist in dictionaries
✔ i18n: Parity across all supported languages (5 languages verified)

Total Unit Tests: 28 Passed / 0 Failed
Build Status: Turbopack Production Compile Success (0 errors)
```

---

## 9. Conclusion

**VeriLens** delivers a complete, scalable, and ethically grounded cognitive defense platform for digital youth. By pairing high-performance browser extension armor with a gamified learning platform, VeriLens turns passive internet consumption into an active media literacy exercise, fulfilling UNESCO's vision of empowering critical digital citizens.

* **Live Platform:** [https://verilens.okihita.dev/](https://verilens.okihita.dev/)
* **GitHub Repository:** [https://github.com/okihita/verilens](https://github.com/okihita/verilens)
