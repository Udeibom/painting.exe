---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. You can see the painting and speak to it (scaffolded app)**
  Becomes usable: A running Next.js app showing the gallery-like encounter screen with the parametric SVG painting, origin line, and an input area with the four progress stages; submitting text echoes a placeholder response. Nothing persists yet.
  Why now: Bootstrapping plus the first end-to-end path (render + input + response) so every later slice has somewhere to land; the painting's look is established before behavior.
  PRD ref: `prd.md > The Core Journey` (steps 1-3), `prd.md > Screens and Layout`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Components`, `spec.md > File Structure`, `spec.md > Look and Feel`, `spec.md > Stack`
  Build: Scaffold project per spec file structure; install deps (Next.js 15, Tailwind, Drizzle, Zod, Groq SDK, next/font); implement layout, globals.css, Painting renderer, EncounterInput with stage labels, page with placeholder encounter handler, EB Garamond + Inter fonts, near-black/warm off-white palette.
  Verify (mechanical): `npm install && npm run dev` starts with no errors; open http://localhost:3000 and confirm painting renders and input submits showing stages.
  Learner check: Open the app and say whether the painting and gallery feel match what you pictured.
  Commit: `Scaffold app with painting renderer and encounter input`

- [x] **2. The constitution and original state are seeded and loaded**
  Becomes usable: The page renders the latest committed painting state (params) from Neon, and the constitution is inspectable; original artwork is version 0.
  Why now: Persistence is the first place the data model can be wrong; seeding early makes the encounter pipeline testable; constitution must exist before rules engine.
  PRD ref: `prd.md > Features and Behavior > Constitution`, `prd.md > States and Boundaries` (first use, persistence)
  Spec ref: `spec.md > Data Model`, `spec.md > Components > Encounter API`, `spec.md > Where It Runs`
  Build: Implement Drizzle schema + db client; write seed script loading constitution + original state version 0; migrate; load current state in page; add ConstitutionPanel.
  Verify (mechanical): `npm run db:seed` completes; `npm run dev` shows seeded painting params; constitution panel lists rules.
  Learner check: Open the constitution panel and confirm the rules read as intended.
  Commit: `Add schema, seed, and constitution panel`

- [x] **3. You can speak to the painting and it may change or refuse**
  Becomes usable: Submitting text runs the full encounter pipeline against Groq; the painting responds in its own voice and either commits a permitted change (animating) or refuses with a reason; encounter recorded in memory/history.
  Why now: This is the unique kernel — a painting that can refuse — and the riskiest integration (Groq + rules engine); prove it before panels.
  PRD ref: `prd.md > The Core Journey` (steps 3-7), `prd.md > Features and Behavior > Encounter`, `prd.md > Features and Behavior > Refusal`, `prd.md > States and Boundaries` (AI failure, concurrency)
  Spec ref: `spec.md > Components` (Encounter API, Rules Engine, AI Client), `spec.md > Data Model`, `spec.md > Important Failure Modes`, `spec.md > External Services`
  Build: Implement lib/ai.ts (Groq client, structured prompt, JSON mode), lib/rules-engine.ts (validate against constitution), app/api/encounter/route.ts (pipeline + transaction lock), memory_entry + event_history writes, progress stages wired to client, animation on commit.
  Verify (mechanical): POST to /api/encounter with a permitted request commits new state version; with a protected-form request returns refusal; AI failure path preserves state.
  Learner check: Ask the painting to erase its central form and confirm it refuses; ask for a permitted color change and confirm it commits and animates.
  Commit: `Implement encounter pipeline with AI and rules engine`

- [x] **4. Memory, evolution, and identity panels**
  Becomes usable: Visitor can open Memory, Evolution, and Identity panels; compare original/current/selected states with provenance; distinguish visitor words from AI summary.
  Why now: Inspection is the other half of the kernel — influence is not ownership requires seeing what happened and why.
  PRD ref: `prd.md > Features and Behavior > Memory`, `prd.md > Features and Behavior > Evolution / History`, `prd.md > The Core Journey` (steps 8-9)
  Spec ref: `spec.md > Components` (MemoryPanel, EvolutionPanel, IdentityPanel)
  Build: Implement the three panels reading from Neon; version comparison + provenance display; origin line on first visit.
  Verify (mechanical): Panels render seeded + committed data; comparison shows original vs current; provenance fields present.
  Learner check: Open each panel and confirm the history and provenance are readable and attributed correctly.
  Commit: `Add memory, evolution, and identity panels`

- [x] **5. Failure and concurrency hardening**
  Becomes usable: AI timeout/failure preserves state and reports; rate-limit retry once; empty/invalid input safe; concurrent encounters serialized.
  Why now: Last mile before final review; proves the painting's refusal is real under stress, not just happy path.
  PRD ref: `prd.md > States and Boundaries` (empty input, AI failure, concurrency), `prd.md > Features and Behavior > Vague requests`
  Spec ref: `spec.md > Important Failure Modes`, `spec.md > Data Model` (concurrency)
  Build: Add Zod request validation, AI failure handling + retry, transactional lock, vague-request clarification path, rate-limit handling.
  Verify (mechanical): Invalid input returns safe error with no state change; simulated AI failure preserves state; two concurrent requests serialize without corruption.
  Learner check: Submit empty input and an unclear request; confirm safe, honest responses.
  Commit: `Harden failures and concurrency`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after slice 3 (kernel proven)
- [x] Final kick-the-tires exploration and feedback completed

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: 
Route and stops: 
Edit outcome: 
Reflection: 
Activity mode: 

## Revisions

<!-- Leave empty -->
