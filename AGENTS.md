# AGENTS.md — Development & Git Flow Directives for VeriLens

This document establishes the strict engineering, branching, and operational standards for all AI and human developers working within the `verilens` repository.

---

## 1. Strict Git Flow Branching Strategy

All contributors must adhere to Git Flow conventions:

```text
       [ hotfix/v1.1.1 ] ──────────────────────────┐
              ▲                                    │
              │                                    ▼
main ─────────┴───────────────●────────────────────●─── (Production Releases with tags: v1.1.0)
                              ▲                    ▲
                              │                    │
develop ──────●───────────────┴──●─────────────────┴─── (Integration Branch)
              ▲                  ▲
              │                  │
feature ──────┴──────────────────┘ (feature/branch-name)
```

### Branch Roles:
1. **`main`**: Production releases only. Every merge into `main` must be tagged with a semantic version (`vX.Y.Z`) and pass 100% of automated tests and production builds.
2. **`develop`**: Primary integration branch for active development. Features branch off `develop` and merge back into `develop`.
3. **`feature/<name>`**: Isolated feature work (e.g. `feature/lateral-sift-inspector`, `feature/accessibility-tts`).
4. **`release/<version>`**: Preparation branch for upcoming releases (version bumps, changelog updates, final testing).
5. **`hotfix/<version>`**: Emergency fixes created directly from `main` and merged back into both `main` and `develop`.

---

## 2. Commit Message Conventions

Use Conventional Commits standard:
* `feat(...)`: New user-facing feature or capability.
* `fix(...)`: Bug fix.
* `refactor(...)`: Code restructuring without functional changes.
* `style(...)`: Formatting, typography, and CSS design system updates.
* `docs(...)`: Documentation updates.
* `chore(...)`: Dependency updates, build configurations, and tooling.
* `test(...)`: Adding or updating unit/integration tests.

---

## 3. Package Management & Tooling

* **Package Manager:** `pnpm` (version >= 9.0.0) with Turborepo (`turbo`).
* **Framework:** Next.js 16 (Turbopack) with React 19.
* **Workspace Resolution:** Native `workspace:*` references across `apps/*` and `packages/*`.
* **Testing:** Node.js native test runner (`node --test`).
* **Design Aesthetic:** High-contrast civic editorial, zero emojis in codebase UI/labels, WCAG 2.1 AA accessibility.

---

## 4. Pre-Release Verification Protocol

Before merging to `main` or creating a release tag:
1. Run all unit tests: `pnpm test` (Must achieve 100% pass rate).
2. Run production build: `pnpm build` (Must compile with zero errors).
3. Update version in:
   * `package.json` (root)
   * `apps/web/package.json`
   * `apps/extension/manifest.json`
   * `packages/shared/package.json`
4. Tag commit with `v<version>` (e.g. `v1.1.0`).
