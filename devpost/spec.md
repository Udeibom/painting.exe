---
doc: spec
status: approved
---

# PAINTING.exe — Technical Spec

## How This Works, In Plain Language

The app is one Next.js website. The browser shows a gallery-like screen with the painting filling most of the viewport and a small input area beneath it. When a visitor types something and submits, the text goes to a server function (an API route) running on Vercel. That function loads the painting's current state, its constitution, and relevant memory from a Postgres database (Neon), sends them plus the visitor's text to Groq's GPT-OSS 120B model, and asks the model to interpret and possibly propose a change. The model's proposal is never applied directly — a deterministic rules engine in our own code checks it against the constitution (protected central form, permitted transformations, prohibitions). If it passes, the new state is committed as a new version with provenance; if it fails, the painting refuses and the state stays put. Either way, the encounter is recorded in memory and history. The visitor sees the painting respond in its own voice, and can open panels to inspect memory, constitution, evolution, and identity.

This shape (one full-stack app, serverless functions, managed Postgres, one LLM call behind a rules engine) keeps everything in one deployable unit with no separate backend to run, and the rules engine — not the model — holds the authority over what can change. That's what makes "the painting can refuse" real rather than cosmetic.

## The Core Journey Through the System

PRD ref: `prd.md > The Core Journey`.

1. Visitor opens the app → browser requests the Encounter page from Vercel → server renders the latest committed painting state from Neon → painting fills viewport, origin line shown on first visit (artist-attributed, from seeded data).
2. Visitor types text → submits → request hits `/api/encounter` → "receiving" stage shown.
3. Server loads constitution + current state + relevant memory from Neon → "interpreting" stage.
4. Server calls Groq GPT-OSS 120B with a structured prompt (identity, constitution, state, memory, visitor text) → model returns intent classification + response text + optional proposed transformation → "validating" stage.
5. Rules engine validates the proposal against constitution (protected form, permitted params, invariants) → decide: commit / refuse / ask clarification / no change.
6. If commit: new state version written to Neon with provenance (triggering event, prior state, resulting state, constitution version); memory entry written → "committing" stage.
7. If refuse/no-change/clarify: state unchanged, encounter recorded if significant.
8. Response returned to browser → painting re-renders (animated transition for committed changes) → visitor can open Memory/Constitution/Evolution/Identity panels.

## Stack

- **Language:** TypeScript (strict).
- **Framework:** Next.js 15 (App Router) — UI + API routes in one unit.
- **Styling:** Tailwind CSS — neutral sans interface, near-black bg, warm off-white text; painting colors are the only color.
- **Painting renderer:** SVG (parametric: protected central form + mutable color/opacity/layer params). SVG keeps it declarative and animatable.
- **Database:** Postgres via Neon (serverless, free tier). ORM: Drizzle.
- **AI:** Groq, model `openai/gpt-oss-120b` (free tier). OpenAI-compatible SDK pointed at Groq base URL. JSON object mode for structured proposals.
- **Hosting:** Vercel (Hobby/free tier), deployed from GitHub.
- **Validation:** Zod for request/response schemas.

Doc links:
- Next.js: https://nextjs.org/docs
- Drizzle: https://orm.drizzle.team/docs
- Neon: https://neon.tech/docs
- Groq: https://console.groq.com/docs
- Tailwind: https://tailwindcss.com/docs
- Zod: https://zod.dev

Unverified (check early in build): exact Groq free-tier rate limits for GPT-OSS 120B at demo time; Neon cold-start latency; whether Vercel serverless function timeout (10s default) suffices for the encounter pipeline (may need 30s config or streaming).

## Where It Runs and How Someone Tries It

- Runtime: browser (client) + Vercel serverless functions (Node runtime).
- Requirements: Node 20+, a Neon Postgres connection string, a Groq API key (free, no card).
- Env vars: `DATABASE_URL`, `GROQ_API_KEY`.
- Start locally: `npm install && npm run dev` → open http://localhost:3000.
- Seed: `npm run db:seed` loads constitution + original artwork state.
- Deploy: push to GitHub → import in Vercel → set env vars → deploy. Public URL for demo.
- Demo recording: run the app (local or deployed), record browser showing encounter → refusal → inspection panels. Submission needs short video + public GitHub repo; deployed URL optional but included.

## Look and Feel

Carried from `prd.md > Look and Feel` and `scope.md > Inspiration & Identity`. Gallery-like, restrained, slightly uncanny. Painting voice: refined serif (or slightly uncanny monospace) — implement as a serif font (e.g., a Google Font like "Cormorant Garamond" or "EB Garamond") for painting voice, neutral sans (Inter/system) for interface. Palette: near-black background (#0a0a0a-ish), warm off-white text (#f5f1ea), painting's own colors are the only color. Motion only for actual state changes; respect `prefers-reduced-motion`. Typography distinguishes: painting voice, visitor contributions, system explanations, constitutional rules, historical metadata (via font family + weight + size).

## Components

### Encounter Page (`app/page.tsx`)
Main surface. Renders painting + input + quiet nav. Loads current state. PRD ref: `prd.md > Screens and Layout`, `prd.md > The Core Journey`.

### Painting Renderer (`components/Painting.tsx`)
SVG renderer for protected central form + mutable params (color emphasis, opacity, layers). Accepts a state object. Animates changes. PRD ref: `prd.md > Features and Behavior > Encounter`.

### Encounter Input (`components/EncounterInput.tsx`)
Text area + submit. Shows progress line stages. PRD ref: `prd.md > The Core Journey` step 3.

### Encounter API (`app/api/encounter/route.ts`)
Orchestrates the pipeline: receive → load context → interpret (Groq) → propose → validate (rules engine) → decide → commit → render. Serializes concurrent requests (DB transaction / advisory lock). PRD ref: `prd.md > Features and Behavior > Encounter`, `prd.md > States and Boundaries > Concurrency`.

### Rules Engine (`lib/rules-engine.ts`)
Deterministic validator: checks proposed transformation against constitution (invariants, permitted transforms, prohibitions, protected form). Returns commit/refuse/clarify/no-change + reason. PRD ref: `prd.md > Features and Behavior > Encounter` ("AI proposes; deterministic rules engine validates").

### AI Client (`lib/ai.ts`)
Wraps Groq SDK. Builds structured prompt; parses JSON proposal. Handles AI failure → state preserved, failure reported. PRD ref: `prd.md > States and Boundaries > AI failure`.

### Constitution Panel (`components/ConstitutionPanel.tsx`)
Displays active rules, distinguishes protected vs mutable. PRD ref: `prd.md > Features and Behavior > Constitution`.

### Memory Panel (`components/MemoryPanel.tsx`)
Lists memory entries (encounter, interpretation, refusal, transformation, etc.). Preserves contradictions; distinguishes visitor words from AI summary. PRD ref: `prd.md > Features and Behavior > Memory`.

### Evolution Panel (`components/EvolutionPanel.tsx`)
Original (immutable) + versioned states + comparison + provenance. PRD ref: `prd.md > Features and Behavior > Evolution / History`.

### Identity Panel (`components/IdentityPanel.tsx`)
Artist origin line + painting identity. PRD ref: `prd.md > The Core Journey` step 1.

## Data Model

Postgres tables (Drizzle):

- `constitution` — seeded, read-only for PoC. Fields: id, version, identity, invariants (jsonb), permitted_transforms (jsonb), prohibitions (jsonb), behavioral_principles (jsonb), memory_policy, change_policy, ambiguity_policy, refusal_policy.
- `painting_state` — versioned. Fields: id (uuid), version (int), parent_version (int nullable), params (jsonb: color emphasis, opacity, layers), created_at, provenance (jsonb: triggering_event_id, prior_state_version, resulting_state_version, constitution_version).
- `memory_entry` — Fields: id, type (encounter/interpretation/contradiction/transformation/refusal/disposition/tension/autonomous), visitor_text, ai_summary, ai_interpretation, state_version_ref, created_at.
- `event_history` — Fields: id, type, payload (jsonb), state_version_before, state_version_after, created_at.

Original artwork state = version 0, immutable (no updates, only inserts of new versions). Concurrency: encounter endpoint wraps load+validate+commit in a transaction with `SELECT ... FOR UPDATE` on the current state row (or advisory lock) so competing interactions serialize; stale proposals revalidated or rejected.

## File Structure

```
painting/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── api/
│       └── encounter/
│           └── route.ts
├── components/
│   ├── Painting.tsx
│   ├── EncounterInput.tsx
│   ├── ConstitutionPanel.tsx
│   ├── MemoryPanel.tsx
│   ├── EvolutionPanel.tsx
│   └── IdentityPanel.tsx
├── lib/
│   ├── ai.ts
│   ├── rules-engine.ts
│   ├── db.ts
│   └── schema.ts
├── scripts/
│   └── seed.ts
├── drizzle/
│   └── migrations/
├── devpost/
├── .env.example
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## External Services and Dependencies

- **Groq API** — `https://api.groq.com/openai/v1`, model `openai/gpt-oss-120b`. Auth: Bearer `GROQ_API_KEY`. Free tier: 30 rpm / 1,000 rpd / 8K tpm / 200K tpd (GPT-OSS 120B). Structured output via JSON object mode. Doc: https://console.groq.com/docs
- **Neon Postgres** — connection string `DATABASE_URL`. Free tier 0.5 GB. Doc: https://neon.tech/docs
- **Vercel** — hosting, free Hobby tier. Doc: https://vercel.com/docs
- **Google Fonts** — serif for painting voice (e.g., EB Garamond), sans for interface (Inter). Loaded via next/font.

## Important Failure Modes

- **AI failure / timeout** → state preserved, failure reported to visitor ("the painting is quiet right now"), no fabricated response. Encounter recorded as failed if significant.
- **Empty/invalid input** → not committed; safe error message; no state change.
- **Vague request** → painting asks for clarification rather than declining or auto-applying.
- **Concurrency conflict** → serialized via transaction; stale proposal revalidated or rejected with explanation.
- **Rate limit (Groq 429)** → show "the painting is thinking slowly" and retry once; if still failing, report failure, preserve state.

## What Was Simplified and Why

- **Constitution is a read-only seed** (not versioned amendments) — amendments deferred per PRD Open Questions. Avoids constitution-versioning complexity in PoC.
- **Memory inspectable as list, not full landscape UI** — full memory landscape deferred. List + links to corresponding state is enough to prove memory.
- **Restoration records a new event but no dedicated UI** — restoration UI deferred; provenance still tracked.
- **Single painting only** — multi-painting deferred.
- **No auth/accounts** — visitor is anonymous; no login before experiencing the painting.
- **Concurrency via DB transaction, not distributed locks** — single Postgres, sufficient for PoC.

## Decisions and Open Issues

Decisions:
- Stack: Next.js/TS/Tailwind + Neon Postgres + Groq GPT-OSS 120B + Vercel. Rationale: single deployable unit, all free, agent-friendly, one-click deploy. Tradeoff: serverless cold starts; Neon connection pooling needed.
- AI model: Groq `openai/gpt-oss-120b` (free). Tradeoff: rate limits (1K rpd) may constrain heavy demo usage; fallback to 20B.
- Painting voice tone: restrained gallery voice, measured concise sentences, calm firm refusal. Tradeoff: less warm/personable, but matches "painting that can refuse."
- Progress line: four PRD stages verbatim (receiving → interpreting → validating → committing).
- Renderer: SVG parametric. Tradeoff: less painterly than canvas, but declarative and animatable; sufficient for color/opacity/layer params.

Genuine learner uncertainty: none newly surfaced beyond stack/AI choices, which were resolved above. The learner's stated learning goal (practicing agent prompting with Kilo) is carried into the build as the practice context.

Open issues carried from PRD:
- Constitution read-only seed (versioned amendments deferred).
- Unverified: Groq rate limits at demo time, Neon cold start, Vercel function timeout for encounter pipeline.<|end|><|start|>write to=assistant<|channel|>analysis<|message|>Now I need to show it in review format (markdown). Let me tell the user it's written and ask for review. Actually, the skill says show it in their Review Format (markdown) and invite careful read. Let me summarize briefly and ask.<|end|><|start|>-assistant<|channel|>final<|message|>I've written `devpost/spec.md` with `status: draft`. It covers: plain-language how-it-works, core journey through the system, stack (Next.js/TS/Tailwind + Neon + Groq GPT-OSS 120B, Vercel), run/deploy instructions, look-and-feel, components, data model, file structure, external services, failure modes, simplifications, and decisions/open issues.

Does this look good, or would you change anything? A clear "looks good" is approval.<|end|><|start|>user<|channel|>Looks good


<environment_details>
Message time: 2026-10-19T01:54:38Z
Working directory: /home/caleb/painting
Workspace root folder: /
</environment_details><|end|><|start|>-assistant<|channel|>analysis<|message|>Set status to approved.<|end|><|start|>-assistant to=edit<|channel|>analysis <|constrain|>xml<|message|><rfl:parameter name="filePath">
/home/caleb/painting/devpost/spec.md