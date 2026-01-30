import { AbsoluteFill, Sequence } from 'remotion';
import { GradientBackground } from './components/GradientBackground';
import { IntroScene } from './scenes/IntroScene';
import { AppReveal } from './scenes/AppReveal';
import { FeatureShowcase } from './scenes/FeatureShowcase';
import { MovieCarousel } from './scenes/MovieCarousel';
import { ClosingScene } from './scenes/ClosingScene';

/**
 * ScanMovie Promo Video - Apple-Style Product Reveal
 * 
 * Scene breakdown (60fps, 30 seconds total = 1800 frames):
 * 
 * 1. Intro (0-6s / 0-360f): Logo reveal with letter-by-letter animation
 * 2. App Reveal (6-12s / 360-720f): MacBook mockup with real ScanMovie UI
 * 3. Feature Showcase (12-20s / 720-1200f): Four key features with staggered cards
 * 4. Movie Carousel (20-26s / 1200-1560f): Trending movies with parallax scroll
 * 5. Closing (26-30s / 1560-1800f): CTA with breathing typography
 */

export const ScanMoviePromo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Cinematic gradient background with film grain */}
      <GradientBackground />
      
      {/* Scene 1: Intro - Logo & tagline reveal */}
      <Sequence from={0} durationInFrames={360}>
        <IntroScene />
      </Sequence>
      
      {/* Scene 2: App Reveal - MacBook with real ScanMovie UI */}
      <Sequence from={360} durationInFrames={360}>
        <AppReveal />
      </Sequence>
      
      {/* Scene 3: Feature Showcase - Key features with glass cards */}
      <Sequence from={720} durationInFrames={480}>
        <FeatureShowcase />
      </Sequence>
      
      {/* Scene 4: Movie Carousel - Trending movies with parallax */}
      <Sequence from={1200} durationInFrames={360}>
        <MovieCarousel />
      </Sequence>
      
      {/* Scene 5: Closing - CTA and website */}
      <Sequence from={1560} durationInFrames={240}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
