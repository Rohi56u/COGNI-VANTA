# Cognivanta — Product Upgrade

## Product identity

**Cognivanta** is an AI-powered learning universe: learners capture handwritten notes, transform them into structured concepts, practice active recall, and explore the material through interactive subject worlds.

The name combines *cognition* with a sense of a larger learning universe. It fits the complete product better than a generic notes or quiz-app name.

## Core learning loop

1. **Capture** — upload one or more note pages, diagrams, or study documents.
2. **Understand** — the AI service transcribes the material and extracts a validated concept graph.
3. **Connect** — inspect relationships between primary, secondary, and tertiary ideas.
4. **Recall** — answer node-linked questions with explanations and XP rewards.
5. **Explore** — enter Biology, Physics, History, or Geography learning worlds.
6. **Return** — use the activity profile and Focus Sprint to build a repeatable study habit.

## What was upgraded

- Unified the product identity under **Cognivanta** across source, UI, metadata, storage keys, API descriptions, and documentation.
- Added a persistent **Daily Mission** panel that adapts to the active learning space.
- Added a **25-minute Focus Sprint** with pause, reset, progress tracking, local persistence, and XP reward on completion.
- Added a lightweight installable-web-app manifest for mobile-friendly deployment.
- Added responsive styling for the new study-control surface without changing the existing subject-world visuals.
- Preserved the existing secure UUID-based runtime IDs; these are session/document identifiers, not device fingerprinting.

## Next high-value roadmap

- Add a server-backed spaced-repetition queue using question history and confidence scores.
- Add per-concept mastery levels and weak-area recommendations to the Profile page.
- Add an offline queue for note uploads and a PWA service worker after deployment storage is selected.
- Add teacher/shared-room controls to build on the existing session-members API.
- Add export to Markdown/PDF for generated concept maps and revision sheets.
