# PRANALI 3262

PRANALI 3262 is the digital reporting and operations platform for Rotaract District 3262. It is designed to replace fragmented spreadsheets, chat-based reporting, and manual follow-up with a clear, role-aware workspace for clubs, zones, and district leaders.

This foundation focuses on the club secretary experience: a personalized operations dashboard, reporting history, a guided monthly report composer, district event context, notifications, global search, and responsive navigation.

## Key Technologies

- TanStack Start
- React 19
- TypeScript
- Tailwind CSS 4
- Chart.js
- Lucide React
- Netlify

## Experience Highlights

- Premium, responsive district operations shell
- Personalized priority and deadline guidance
- Club performance metrics and score trends
- Monthly report status and submission history
- Multi-section report composer with draft feedback
- Mobile-first navigation and form layouts
- Keyboard-accessible global search with `Cmd/Ctrl + K`
- Notification and autosave interaction states

## Run Locally

```bash
pnpm install
pnpm dev
```

For local Netlify platform emulation:

```bash
netlify dev --port 8889
```

## Project Structure

```text
src/
├── routes/
│   ├── __root.tsx   # Document shell and metadata
│   └── index.tsx    # Interactive application experience
└── styles.css       # Design system and responsive styling
```

The current project is a frontend product foundation. Authentication, persistent reporting data, file storage, and role-enforced server APIs can be integrated as subsequent modules while preserving the established interface architecture.
