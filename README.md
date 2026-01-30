# ScanMovie Promo Video

An Apple-style promotional video for ScanMovie, built with [Remotion](https://www.remotion.dev/).

## Features

- 30-second cinematic promo video (1920x1080 @ 30fps)
- Apple-inspired design language with smooth animations
- 5 scenes: Intro, App Reveal, Feature Showcase, Movie Carousel, Closing
- Dynamic gradient backgrounds
- Spring-based animations for natural motion

## Project Structure

```
src/
├── Root.tsx              # Remotion composition setup
├── ScanMoviePromo.tsx    # Main video composition
├── components/
│   └── GradientBackground.tsx
└── scenes/
    ├── IntroScene.tsx
    ├── AppReveal.tsx
    ├── FeatureShowcase.tsx
    ├── MovieCarousel.tsx
    └── ClosingScene.tsx
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Remotion Studio:
   ```bash
   npm start
   ```

3. Render the final video:
   ```bash
   npm run build
   ```

## Customization

- **Duration**: Edit `durationInFrames` in `src/Root.tsx`
- **Colors**: Modify gradient values in `GradientBackground.tsx`
- **Content**: Update text and features in each scene component
- **Timing**: Adjust `Sequence` `from` and `durationInFrames` in `ScanMoviePromo.tsx`

## Output

The rendered video will be saved to `out/video.mp4`.

## License

MIT
