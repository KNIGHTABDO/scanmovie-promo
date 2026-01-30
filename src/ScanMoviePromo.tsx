import { AbsoluteFill, Sequence } from 'remotion';
import { GradientBackground } from './components/GradientBackground';
import { IntroScene } from './scenes/IntroScene';
import { AppReveal } from './scenes/AppReveal';
import { FeatureShowcase } from './scenes/FeatureShowcase';
import { MovieCarousel } from './scenes/MovieCarousel';
import { ClosingScene } from './scenes/ClosingScene';

export const ScanMoviePromo: React.FC = () => {
  return (
    <AbsoluteFill>
      <GradientBackground />
      
      {/* Intro: 0-150 frames (0-5s) */}
      <Sequence from={0} durationInFrames={150}>
        <IntroScene />
      </Sequence>
      
      {/* App Reveal: 150-330 frames (5-11s) */}
      <Sequence from={150} durationInFrames={180}>
        <AppReveal />
      </Sequence>
      
      {/* Feature Showcase: 330-570 frames (11-19s) */}
      <Sequence from={330} durationInFrames={240}>
        <FeatureShowcase />
      </Sequence>
      
      {/* Movie Carousel: 570-750 frames (19-25s) */}
      <Sequence from={570} durationInFrames={180}>
        <MovieCarousel />
      </Sequence>
      
      {/* Closing: 750-900 frames (25-30s) */}
      <Sequence from={750} durationInFrames={150}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};