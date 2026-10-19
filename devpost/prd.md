---
doc: prd
status: approved
---

# PAINTING.exe — Product Requirements

A web app where a single digital painting has its own constitution, memory, and evolving state; visitors can speak to it, and it may change, refuse, or remember—never simply obey. For a curious general visitor.
Source: `scope.md > The Unique Kernel`, `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`, `scope.md > The POC Boundary`.

## The Core Journey

1. Visitor opens the app in a browser and sees a gallery-like screen: the painting fills most of the viewport, with a restrained title, a state indicator, and an invitation to approach. On first visit, a short artist-written origin line appears (clearly attributed as the artist's, not visitor history).
2. Visitor reads/looks, then chooses to speak, offer an interpretation, ask what happened, explore history, inspect the constitution, or remain silent.
3. Visitor submits natural-language text. The screen shows a quiet, honest progress line (receiving → interpreting → validating → committing).
4. The painting responds in its own voice. Possible outcomes: acknowledge, offer a competing reading, ask for clarification, refuse, propose/commit a permitted change, or no change.
5. If a permitted change is committed, affected visual parameters animate gradually; the new state renders.
6. If refused, the composition stays put and the response explains the boundary (sometimes enigmatically).
7. The encounter is recorded (memory + event history). Visitor can open Memory, Constitution, Evolution, Identity from the same screen.
8. Visitor can compare original/current/selected historical states and inspect provenance of committed changes.
9. On return visits, the visitor sees the latest committed state and can inspect what happened since.

## Screens and Layout

Single primary surface (the Encounter) plus secondary panels/overlays for Memory, Constitution, Evolution, Identity. Painting occupies the majority of the viewport; encounter input (text area + submit) beneath or beside; supporting controls subordinate. Secondary views never obscure the artwork unnecessarily; visitor can return to the painting from any view. Original artwork accessible from Evolution. On mobile: painting above, input below, artwork retains meaningful size.

## Look and Feel

Painting's voice: refined serif (or slightly uncanny monospace). Interface: neutral sans. Palette: near-black background, warm off-white text; the painting's own colors are the only color. Gallery-like, restrained, slightly uncanny; motion only for actual state changes; respect reduced-motion. Typography distinguishes painting voice, visitor contributions, system explanations, constitutional rules, historical metadata.

## Features and Behavior

### Encounter
- Accept natural-language interpretations, questions, challenges, transformation requests.
- Classify intent (interpretation/question/challenge/transformation request/historical or constitutional inquiry/ambiguous) to guide, not determine, outcome.
- Ground response in identity, constitution, current state, relevant memory.
- Propose a structured transformation when appropriate; may propose none.
- AI proposes; deterministic rules engine validates against constitution before any commit.

### Constitution (inspectable)
- Display active rules: identity, invariants, permitted transformations, prohibitions, behavioral principles, memory/change/ambiguity/refusal policies.
- Distinguish protected vs. mutable features.

### Memory
- Store encounter, interpretation, contradiction, transformation, refusal, disposition change, tension, autonomous event entries.
- Preserve contradictions; frequency is not authority.
- Distinguish visitor's original words from AI summary/interpretation.
- Inspectable as an artistic landscape; move between entry and corresponding historical state.

### Evolution / History
- Original artwork immutable and accessible.
- Versioned committed states; compare original/current/selected.
- Provenance for every committed transformation (triggering event, prior state, resulting state, constitution version).
- Restoration (where permitted) records a new event without deleting history.

### Refusal
- Refuse on invariant conflict, identity conflict, erasing contradiction, vagueness, out-of-capability, undermining irreversible decision, no meaningful reason, or constitution override attempt.
- Acknowledge request, respond in voice, identify boundary when appropriate, leave state unchanged, record if significant.

### Vague requests
- Painting asks the visitor to clarify rather than silently declining or auto-applying.

## States and Boundaries

- **First use:** artist-written origin line (attributed), no fabricated visitor history; painting in original state.
- **Normal use:** painting renders current canonical state; encounter pipeline runs.
- **No-change encounter:** coherent response without transformation; not a malfunction.
- **Empty input / invalid request:** not committed; safe error.
- **AI failure:** state preserved, failure reported, no fabricated response.
- **Persistence:** canonical state, constitution, memory, history persist across sessions.
- **Concurrency:** competing interactions serialized; stale proposals revalidated or rejected.
- **Silence:** valid mode; no interaction required to experience the painting.

## Product Decisions

- Audience narrowed to curious general visitor (per learner).
- Layout: painting-dominant, input beneath/beside, quiet nav (per learner).
- Typography/palette: painting voice serif/monospace, interface sans, near-black + warm off-white (per learner).
- Vague requests prompt clarification rather than decline (per learner).
- First visit shows artist-written origin line (per learner).
- Progress line shows real pipeline stages, not a fake spinner (per learner).

## What We're Building

One painting with immutable original; structured enforceable constitution; protected central form; mutable color/opacity/layer parameters; natural-language encounter pipeline (receive→load→interpret→propose→validate→decide→commit→render); AI proposes, rules engine enforces; refusal with reason; memory entries; state versioning and history; state comparison; provenance; AI failure and concurrency handling; inspectable constitution.

## Deferred From the POC

Full memory landscape UI; contradiction graph; disposition evolution; autonomous between-visit behavior; dormancy; irreversibility with consent; constitution versioning/amendments; restoration UI; mobile polish depth; abuse filtering; public memory sanitization; multiple paintings.

## Possible Later Enhancements

Multi-painting support with isolated identities; richer memory visualization; autonomous rule-governed behavior between visits.

## Non-Goals

User accounts/profiles; marketplace/likes/leaderboards; crypto ownership; voice/VR/AR; fine-tuned model; general art generator; claims of machine consciousness. These don't serve proving the kernel.

## Open Questions

- Constitution is a read-only seed loaded from structured data for the PoC; versioned amendments deferred (per learner).