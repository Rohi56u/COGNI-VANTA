# Cognivanta Project Manifest

Cognivanta is a full-stack learning workspace with a React/Vite frontend, an Express API, a SQLite data layer, and an optional FastAPI-based AI extraction service.

## Services

- `frontend/` — browser application and subject experiences
- `backend/` — authentication, uploads, sessions, and API routes
- `ai-models/` — optional AI extraction service

## Local setup

1. Copy each `.env.example` to `.env` in the corresponding service directory.
2. Install dependencies in `frontend/` and `backend/`.
3. Start the AI service if AI extraction is enabled.
4. Start the backend and frontend development servers.

Never commit `.env` files, API keys, databases, uploads, or generated build output.
