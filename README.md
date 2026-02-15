# Image to Base64 Converter

**Live Demo: [img64.dev](https://img64.dev)**

A simple, fast, and private image to Base64 converter built with Next.js.

## Features

- 🖱️ Drag & drop, click, or paste from clipboard
- ⚡ Instant conversion (client-side, no upload)
- 🔒 100% private (nothing leaves your browser)
- 📱 Mobile-friendly responsive design
- 🚀 Works offline

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for production

```bash
npm run build
```

The static export will be in the `out` folder.

## Deployment

### Vercel (recommended)

```bash
npx vercel
```

### Netlify

1. Run `npm run build`
2. Deploy the `out` folder

### GitHub Pages

1. Push to GitHub
2. Enable GitHub Pages in repo settings
3. Set source to the `out` folder

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS