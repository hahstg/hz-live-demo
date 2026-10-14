# HZ Live Demo

A lightweight static web app with a service worker for offline support and a clean demo UI.

## Features

- Offline-first app shell
- Service worker install/activate lifecycle
- Network-first navigation fallback
- Cache-first static asset handling
- Simple demo UI with online/offline status
- PWA manifest and app icons

## Run locally

Open a local static server in the project root:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Deployment

This project is ready to be deployed to GitHub Pages, Netlify, Vercel, or any static host.

## Notes

- The service worker must be served over HTTPS or localhost.
- Update the cache version in `service-worker.js` when you change static assets.
- The app expects the following static files to exist:
  - `index.html`
  - `styles.css`
  - `app.js`
  - `manifest.json`
  - `service-worker.js`
  - `icon-192.png`
  - `icon-512.png`

## Example icon files

The app references `icon-192.png` and `icon-512.png`. Create those files in the project root with your preferred branding before publishing.
