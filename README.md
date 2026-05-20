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

> If you publish this repository to GitHub Pages, make sure you deploy the built `dist/` output rather than the raw source files. The project is configured to use `GH_PAGES` mode for the repo path `/sbk_cip/`.
