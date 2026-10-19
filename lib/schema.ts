import { pgTable, uuid, integer, jsonb, timestamp, text, boolean } from "drizzle-orm/pg-core";

export const constitution = pgTable("constitution", {
  id: text("id").primaryKey(),
  version: integer("version").notNull(),
  identity: text("identity").notNull(),
  invariants: jsonb("invariants").notNull(),
  permittedTransforms: jsonb("permitted_transforms").notNull(),
  prohibitions: jsonb("prohibitions").notNull(),
  behavioralPrinciples: jsonb("behavioral_principles").notNull(),
  memoryPolicy: text("memory_policy").notNull(),
  changePolicy: text("change_policy").notNull(),
  ambiguityPolicy: text("ambiguity_policy").notNull(),
  refusalPolicy: text("refusal_policy").notNull(),
});

export const paintingState = pgTable("painting_state", {
  id: uuid("id").defaultRandom().primaryKey(),
  version: integer("version").notNull(),
  parentVersion: integer("parent_version"),
  params: jsonb("params").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  provenance: jsonb("provenance").notNull(),
});

export const memoryEntry = pgTable("memory_entry", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").notNull(),
  visitorText: text("visitor_text"),
  aiSummary: text("ai_summary"),
  aiInterpretation: text("ai_interpretation"),
  stateVersionRef: integer("state_version_ref"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const eventHistory = pgTable("event_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").notNull(),
  payload: jsonb("payload").notNull(),
  stateVersionBefore: integer("state_version_before"),
  stateVersionAfter: integer("state_version_after"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
