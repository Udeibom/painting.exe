---
doc: scope
status: approved
---

# PAINTING.exe

A web app where a single digital painting has its own constitution, memory, and evolving state; visitors can speak to it, and it may change, refuse, or remember—never simply obey.

## The Unique Kernel
A painting that can refuse. Influence is not ownership: a visitor's interpretation never automatically becomes the painting's truth, and the painting keeps its identity while it evolves.

## Who It's For
A curious general visitor opening it in a browser, encountering an artwork that seems to have a life of its own. They aren't looking for a tool; they're meeting something.

## The Core Loop
Open → see the painting → speak an interpretation or request → the painting responds in its own voice (acknowledge, offer a competing reading, refuse, or commit a permitted change) → the encounter is recorded → the visitor can inspect memory and history → return later to find it changed. Visitors come back to see what the painting has become.

## Inspiration & Identity
Gallery-like, restrained, slightly uncanny. The artwork provides color and complexity; the interface provides space. References: contemporary art installation, archive, encounter. (No URLs supplied.)

## Why This Matters to the Learner
Others should use it; it should expose the learner to the world of painting. Also a vehicle for practicing with coding agents (Kilo specifically) and spec-driven work.

## What "Working" Looks Like
A clean-browser visitor encounters one painting, speaks to it, and sees it either refuse to erase its protected central form or commit a permitted visual change (e.g., color emphasis)—with the response grounded in the constitution and prior memory. They can inspect the original, the current state, the history, and the refusal. The "oh, that's cool" beat: the painting says no, and means it.

## The POC Boundary
In: one painting with immutable original; structured constitution (identity, invariants, permissions, prohibitions, behavior, memory, change, ambiguity, refusal); protected central form; a few mutable visual parameters; natural-language encounter pipeline (receive → load context → interpret → propose → validate → decide → commit → render); AI proposes, deterministic rules engine enforces; refusal with reason; memory entries (encounter, interpretation, refusal, transformation); state versioning and history; state comparison UI; provenance on committed changes; AI failure handling; concurrency safety (serialize).

## Later
Multiple paintings; full memory landscape UI; contradiction graph; disposition evolution; autonomous between-visit behavior; dormancy; irreversibility with consent; constitution versioning/amendments; restoration; mobile polish; accessibility depth; abuse filtering; public memory sanitization.

## Explicitly Cut
User accounts/profiles; marketplace/likes/leaderboards; crypto ownership; multiple paintings in v1; voice/VR/AR; fine-tuned model; general art generator. These don't serve proving the kernel and would displace identity/constitution/memory/refusal as the center.
