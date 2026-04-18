# my-bingo-mixer

A React + TypeScript Bingo Mixer app built with Vite.

The app generates a 5x5 bingo card with a center free space, lets users shuffle prompts, reset the deck, and add custom challenge prompts. The current theme is a neon cyberpunk redesign with glass panels, glowing buttons, and a polished arcade-style UI.

## Setup

1. Run `npm install`
2. Run `npm run dev`
3. Open the local URL shown by Vite

## Available scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint over the codebase
- `npm run typecheck` — Run TypeScript type checks

## Features

- 5x5 bingo card with a center free space
- Shuffle the bingo card on demand
- Add custom prompt items to the deck
- Reset deck to the default prompt set
- Mark tiles and track bingo lines in play mode
- Persist deck and card state in local storage

## GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/pages.yml` that deploys the `dist` folder to the `gh-pages` branch on every push to `main`.

## Docker and Azure Deployment

The project now includes Docker deployment support.

- `Dockerfile` — multi-stage build for production static site deployment with Nginx
- `.dockerignore` — ignore build artifacts and local files
- `docker-compose.yml` — local Docker development service
- `.github/workflows/azure-container-deploy.yml` — Azure Container Registry and Azure Web App container deployment

### Azure deployment secrets

This workflow expects these GitHub secrets:
- `ACR_LOGIN_SERVER`
- `ACR_USERNAME`
- `ACR_PASSWORD`
- `AZURE_WEBAPP_NAME`
- `AZURE_CREDENTIALS`

### Local Docker commands

Build and run locally:
```bash
docker build -t my-bingo-mixer .
docker run --rm -p 4173:80 my-bingo-mixer
```

Or start with Compose:
```bash
docker compose up --build
```

## Custom Agent

A custom Quiz Master agent is available at `.github/agents/quiz-master.agent.md` for generating creative themed bingo prompt sets and quiz questions.

## Specifications

- `product.md` — product vision, user experience goals, open source anchor
- `tech.mdm` — technical master document, architecture, persistence, extension points
- `rules.md` — coding, design, open source, and agent workflow rules
