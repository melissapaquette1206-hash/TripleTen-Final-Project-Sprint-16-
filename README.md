# TripleTen-Final-Project-Sprint-16-

## Deployment

Check out the live project here: [Final Project](https://melissapaquette1206-hash.github.io/TripleTen-Final-Project-Sprint-16-/)

## Project Pitch

Check out my project pitch video here [Project Pitch Video](https://www.loom.com/share/28357b6fbcf143fb9bc7c69a8f2631b0)

# NewsExplorer

NewsExplorer is a responsive React application that searches recent news articles through NewsAPI. Stage 1 uses frontend stubs for registration, sign-in, token checks, and saved-article actions so every page and UI state can be reviewed without a backend.

## Features

- Search the previous seven days of news by keyword
- Required empty-search validation message
- Loading, no-results, and request-error states
- Three initial cards with incremental **Show more** behavior
- Mock registration, sign-in, token restoration, and logout
- Save and delete article simulations with `localStorage`
- Protected Saved Articles route
- Desktop, tablet, and mobile layouts
- Mobile navigation menu
- Figma SVG bookmark and trash icons
- Locally hosted fonts through `@font-face`

## Technologies

React, React Router, Vite, JavaScript, CSS, BEM, NewsAPI, and GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Environment variable

The project-root `.env` file must contain only the NewsAPI variable:

```env
VITE_NEWS_API_KEY=your_news_api_key
```

Do not put JavaScript declarations such as `const` inside `.env`.

## Production API

Local development uses:

```text
https://newsapi.org/v2/everything
```

Production builds use the required TripleTen proxy:

```text
https://nomoreparties.co/news/v2/everything
```

## Quality checks

```bash
npm run lint
npm run build
```

## Deployment

```bash
npm run deploy
```

Deployed application: https://melissapaquette1206-hash.github.io/TripleTen-Final-Project-Sprint-16-/

## Stage 1 authentication note

Authentication and saved articles are intentionally simulated in the browser for Stage 1. A production application would use a secure backend, hashed passwords, a database, and server-issued JWTs.
