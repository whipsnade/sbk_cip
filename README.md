<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/dfb11f31-906f-4d96-a8e4-28017101f6fe

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Build for Production

1. Build the app:
   `npm run build`
2. Deploy the generated `dist/` folder to GitHub Pages.

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Push to the `main` branch.
2. In GitHub, open **Settings > Pages**.
3. Set **Build and deployment > Source** to **GitHub Actions**.

The workflow runs `npm ci`, builds the Vite app with `GH_PAGES=true`, and deploys the generated `dist/` folder. Do not use **Deploy from a branch** for the raw repository files, because GitHub Pages cannot serve `src/main.tsx` as a browser-ready JavaScript module.
