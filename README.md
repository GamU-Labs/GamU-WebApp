# Gamu WebApp

Frontend web application for the GamU game recommendation system. GamU enables users to discover games through natural language queries, receiving tailored recommendations with LLM-generated explanations. The WebApp provides the user interface for search, recommendation display.

## Features

- **Natural language game search**: Users describe what they want in plain language (e.g., "relaxing games to play with friends") via a chat-style input with suggestion chips, or search by exact game title using a switchable search mode selector.
- **LLM-powered recommendation display**: Renders AI-generated explanation blocks alongside game cards showing title, similarity score, description, and genre tags in a responsive grid layout.
- **Dark theme gaming UI**: Custom-designed dark-first interface with gradient surfaces, glow effects, and gaming-oriented typography (Chakra Petch + Russo One) built on shadcn/ui (new-york style) and Radix UI primitives.

## Tech Stack

| Component             | Technology                                              |
| --------------------- | ------------------------------------------------------- |
| Framework             | TanStack Start (React SSR with Nitro)                   |
| UI Library            | React 19                                                |
| Routing               | TanStack Router (file-based, auto-generated route tree) |
| Data Fetching         | TanStack Query + TanStack React Form                    |
| Styling               | TailwindCSS v4 with custom theme variables              |
| UI Components         | shadcn/ui (new-york), Radix UI, @base-ui/react          |
| Icons                 | Lucide React, Tabler Icons                              |
| Validation            | Zod (response schemas, form validation, search params)  |
| Form Handling         | react-hook-form + @hookform/resolvers                  |
| Theme                 | Custom dark/light toggle with localStorage persistence  |
| Build Tool            | Vite 7                                                  |
| SSR Server            | Nitro                                                   |
| Linting               | ESLint (typescript-eslint, react-hooks, react-refresh)  |
| Git Hooks             | Husky                                                   |
| Containerization      | Docker (oven/bun:1, multi-stage build)                  |
| Runtime               | Bun                                                     |

## Project Structure

```
src/
  components/
    custom/              Application-specific components
      game-card.tsx        Game recommendation card with tags and similarity
      how-it-works.tsx     Landing page "how it works" section
      llm-response-block.tsx  AI explanation display block
      navbar.tsx           Resizable navigation bar
      search-hero.tsx      Landing page search input with suggestion chips
      search-mode-selector.tsx  Query/title mode switcher dropdown
    ui/                  60+ shadcn/ui and Radix UI primitive components
  hooks/
    use-mobile.ts        Mobile breakpoint detection hook
    use-theme.tsx        Theme context consumer hook
  lib/
    api.ts               Backend API client (recommendByQuery, recommendByTitle, mutations)
    auth.ts              Cookie-based authentication helpers
    schemas.ts           Zod schemas for API responses and request validation
    server/              Server-side utilities
    utils.ts             cn() and shared utilities
  providers/
    theme.tsx            ThemeProvider with dark/light toggle and localStorage
  routes/
    __root.tsx           Root layout (QueryClientProvider, ThemeProvider, HTML shell)
    _backoffice.tsx      Authenticated backoffice layout with sidebar
    _backoffice/management/  Management dashboard (auth-gated)
    about.tsx            About page with team carousel and project timeline
    index.tsx            Home page with search hero, how-it-works, genre grid, footer
    recommend.tsx        Recommendation results page with refine input
  router.tsx            Router creation with scroll restoration
  main.tsx              Application entry point
  index.css             TailwindCSS config, theme variables, custom animations
```

## Getting Started

### Prerequisites

- Bun 1.x or later
- The Gamu Backend service running and accessible (see `VITE_API_BASE_URL`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GamU-Labs/gamu-webapp.git
   cd GamU-WebApp
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create the environment configuration:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and set the backend URL:
   ```
   VITE_API_BASE_URL=http://localhost:8989
   ```

### Running

Development mode:
```bash
bun run dev
```

The dev server starts on port 3000 by default.

Production build:
```bash
bun run build
```

Start production server:
```bash
bun run start
```

Preview production build:
```bash
bun run preview
```

Docker:
```bash
docker compose up --build
```

The Docker build accepts `VITE_API_BASE_URL` as a build argument:
```bash
docker compose up --build -e VITE_API_BASE_URL=https://api.gamu.example.com
```

## Pages and Routes

| Route                      | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| `/`                        | Home page with search hero, how-it-works, genre grid |
| `/recommend?q=...`         | Recommendation results by natural language query     |
| `/recommend?judul=...`     | Recommendation results by game title                 |
| `/about`                   | About page with team info and project timeline                      |


The `/recommend` page supports both search modes via URL search params. The `q` param triggers a natural language query recommendation, while the `judul` param triggers a title-based similarity lookup. Users can refine results by submitting a new query or title directly from the results page.

## Search Modes

The application supports two search modes, switchable via the SearchModeSelector dropdown:

- **Query (Natural Language)**: Users type a free-form description of their preferences. The backend uses LLM intent extraction combined with the ML inference service to return relevant games with an AI-generated explanation.
- **Title (Exact Match)**: Users type a specific game title. The backend looks up precomputed similarity data to return similar games with an AI-generated explanation.

## Theme

The application uses a custom dark-first theme system:

- Default theme is dark mode, persisted in localStorage under the key `theme-preference`
- Theme toggle is available through the `ThemeProvider` context and `useTheme` hook
- CSS variables define a full color palette including primary, surface, accent, chart, and sidebar tokens
- Typography uses Chakra Petch (body) and Russo One (headings) via Google Fonts

## API Integration

The frontend communicates with the Gamu Backend through two endpoints:

- `POST /api/v1/recommend` with `{ query, topN }` for natural language search
- `GET /api/v1/recommend?judul=...&topN=...` for title-based search

All responses are validated against Zod schemas (`postRecommendResponseSchema`, `getRecommendResponseSchema`) before rendering. API calls use TanStack Query mutations with automatic cache updates on success.

## Environment Variables

| Variable             | Description                     | Default                  |
| -------------------- | ------------------------------- | ------------------------ |
| `VITE_API_BASE_URL`  | Gamu Backend API base URL       | `http://localhost:8989`  |
| `HOST`               | Production server host          | `0.0.0.0`                |
| `PORT`               | Production server port          | `3000`                   |
| `NODE_ENV`           | Node environment                | `production` (in Docker) |

## Available Scripts

| Command             | Description                              |
| -------------------- | ---------------------------------------- |
| `bun run dev`        | Start development server with Vite       |
| `bun run build`      | Build for production (Vite build + tsc)  |
| `bun run start`      | Run production build via Nitro server    |
| `bun run preview`    | Preview production build locally         |
| `bun run prepare`    | Install Husky Git hooks                  |