# Creature Pod

Original wildlife field-scanner project.

## What works
- Green Creature Pod-style interface
- Camera/photo chooser on Android
- Scanning animation
- No fake/random identification
- Manual creature selection
- Creature profiles
- Save creatures with localStorage
- Speech synthesis
- PWA manifest + service worker starter

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Important
The scanner intentionally does **not** claim to identify a species until a real vision model/API is connected.

## Next step: real recognition
Replace the scan fallback with a server-side endpoint such as `/api/identify` that sends the image to a real vision model. Never put secret API keys directly in browser code.
