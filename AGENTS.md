# PRANALI 3262 Architecture Guide

## Project Overview

PRANALI 3262 is the district operations and monthly reporting interface for Rotaract District 3262. The current implementation establishes the product shell and a high-fidelity club secretary experience, with room for district, zone, and club role variants.

## Technology

- TanStack Start and TanStack Router
- React 19 and TypeScript
- Tailwind CSS 4 with a custom token-based CSS layer
- Chart.js for analytics visualizations
- Lucide React for interface icons
- Netlify for deployment

## Key Directories

- `src/routes/` contains file-based application routes.
- `src/routes/index.tsx` currently contains the interactive product prototype, page views, and reusable local UI components.
- `src/routes/__root.tsx` defines metadata and the HTML shell.
- `src/styles.css` contains design tokens, component styling, animation, and responsive behavior.
- `public/` contains static browser assets.

## Product Architecture

The interface uses a persistent application shell with a responsive sidebar and top bar. View state currently demonstrates the overview dashboard, reports index, report composer, global search, notifications, and placeholder module states. When server-backed features are added, extract each major view into a feature directory and preserve the existing shell boundaries.

Role-aware navigation should be derived from a centralized permission map. Club roles must remain scoped to their own club; zonal roles must remain scoped to assigned zones. Every server query must enforce the same boundaries independently of the client interface.

## Coding Conventions

- Use PascalCase for React components and camelCase for functions and state.
- Keep user-facing copy short, direct, and helpful.
- Reuse the CSS variables in `src/styles.css` rather than introducing one-off colors.
- Use Lucide icons instead of emoji or custom icon glyphs.
- Maintain keyboard focus states, semantic labels, and large touch targets.
- Favor progressive disclosure and intelligent defaults in reporting forms.
- Avoid duplicated business logic; calculations and permission checks belong in shared modules.

## Design Decisions

The visual system uses warm neutral surfaces, deep charcoal, and Rotaract crimson. Typography pairs Manrope for hierarchy with DM Sans for interface copy. The layout intentionally favors generous whitespace and a single obvious next action over dense dashboard patterns.

The report composer keeps section navigation visible on large screens and converts it into a horizontal rail on smaller screens. Draft saving, completion status, validation guidance, and evidence upload states remain visible throughout the workflow.

## Local Development

Install dependencies with `pnpm install`, then run `pnpm dev`. The Netlify development environment can be started with `netlify dev --port 8889` when platform features are introduced.
