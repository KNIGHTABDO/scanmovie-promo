# ScanMovie Promo Video

An Apple-style promotional video for the ScanMovie web app, built with [Remotion](https://remotion.dev).

## Overview

ScanMovie is an AI-powered **web application** that lets you discover any movie instantly:
- Movie ratings from IMDb, Rotten Tomatoes, Metacritic
- Full cast & crew information
- Streaming availability across platforms
- AI-powered recommendations and assistant

**Live App:** [scanmovie-app.vercel.app](https://scanmovie-app.vercel.app)

## Video Features

This professional promo video showcases:

### Visual Design
- Cinematic gradient backgrounds with film grain texture
- MacBook Pro mockup displaying the real web app UI
- Frosted glass effects matching the app's design language
- Purple/violet color palette consistent with ScanMovie branding

### Animation Techniques
- Spring physics with proper damping/stiffness/mass parameters
- Letter-by-letter text reveals for Apple-quality typography
- Parallax depth effects on movie carousel
- Staggered entrance animations with custom easing
- 3D perspective transforms and subtle rotations
- Breathing/pulsing effects for visual interest
- Cinematic camera movements (slow zooms, scale transitions)

### Scenes
1. **Intro** (0-6s): Logo reveal with spring animation and tagline
2. **App Reveal** (6-12s): MacBook rises with ScanMovie UI
3. **Feature Showcase** (12-20s): Four key features in glass cards
4. **Movie Carousel** (20-26s): Trending movies with parallax scroll
5. **Closing** (26-30s): CTA buttons and website URL

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
Start Remotion Studio to preview and edit:
```bash
npm start
```

### Render
Export the final video:
```bash
npm run build
```

Output: `out/video.mp4`

## Project Structure

```
src/
âââ index.ts                 # Remotion entry point
âââ Root.tsx                 # Composition registration
âââ ScanMoviePromo.tsx       # Main video composition
âââ components/
â   âââ GradientBackground.tsx  # Cinematic background with orbs & grain
âââ scenes/
    âââ IntroScene.tsx       # Logo + letter animation
    âââ AppReveal.tsx        # MacBook mockup + real UI
    âââ FeatureShowcase.tsx  # Feature cards with springs
    âââ MovieCarousel.tsx    # Parallax movie cards
    âââ ClosingScene.tsx     # CTA + breathing typography
```

## Video Specifications

| Property | Value |
|----------|-------|
| Duration | 30 seconds |
| Resolution | 1920x1080 (Full HD) |
| Frame Rate | 60 FPS |
| Total Frames | 1800 |
| Codec | H.264 |

## Animation Reference

### Spring Configurations Used
- **Cinematic entrance**: `{ damping: 30, stiffness: 50, mass: 1.2 }`
- **Icon bounce**: `{ damping: 12, stiffness: 100, mass: 0.8 }`
- **Card stagger**: `{ damping: 20, stiffness: 80, mass: 0.8 }`
- **Letter reveal**: `{ damping: 25, stiffness: 120 }`

### Easing Functions
- `Easing.out(Easing.cubic)` - Smooth deceleration
- `Easing.inOut(Easing.ease)` - Gentle camera movements

## License

MIT

---

Built with [Remotion](https://remotion.dev) | Designed for [ScanMovie](https://scanmovie-app.vercel.app)
