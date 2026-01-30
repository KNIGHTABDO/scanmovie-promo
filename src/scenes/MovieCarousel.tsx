import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Easing } from 'remotion';

// Real movies from ScanMovie with actual ratings
const movies = [
  { title: 'Zootopia 2', year: '2025', rating: '7.6', hue: 220 },
  { title: 'Anaconda', year: '2025', rating: '6.0', hue: 140 },
  { title: 'Migration', year: '2026', rating: '6.5', hue: 200 },
  { title: 'Send Help', year: '2026', rating: '6.9', hue: 280 },
  { title: 'The Wrecking Crew', year: '2026', rating: '6.3', hue: 260 },
  { title: 'Snow White', year: '2025', rating: '5.8', hue: 320 },
];

// Movie card with Apple-quality styling
const MovieCard: React.FC<{
  movie: typeof movies[0];
  index: number;
  frame: number;
  fps: number;
  scrollProgress: number;
}> = ({ movie, index, frame, fps, scrollProgress }) => {
  const delay = 20 + index * 12;
  
  // Entrance animation
  const entryProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 25, stiffness: 60, mass: 1 },
  });
  
  const cardOpacity = interpolate(entryProgress, [0, 1], [0, 1]);
  const cardY = interpolate(entryProgress, [0, 1], [60, 0]);
  const cardScale = interpolate(entryProgress, [0, 1], [0.85, 1]);
  
  // Parallax effect based on position - cards in different "depths"
  const parallaxOffset = (index % 2 === 0 ? 1 : -1) * scrollProgress * 20;
  
  // 3D tilt effect
  const rotateY = interpolate(
    scrollProgress,
    [0, 1],
    [index % 2 === 0 ? 5 : -5, index % 2 === 0 ? -3 : 3]
  );
  
  // Hover-like shine effect
  const shinePosition = interpolate(frame, [0, 360], [0, 200]);
  
  return (
    <div
      style={{
        width: '320px',
        height: '480px',
        flexShrink: 0,
        opacity: cardOpacity,
        transform: `
          translateY(${cardY + parallaxOffset}px) 
          scale(${cardScale})
          perspective(1000px)
          rotateY(${rotateY}deg)
        `,
      }}
    >
      {/* Card with gradient poster */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '24px',
          background: `
            linear-gradient(
              135deg, 
              hsl(${movie.hue}, 50%, 25%) 0%, 
              hsl(${movie.hue + 30}, 40%, 15%) 50%,
              hsl(${movie.hue}, 30%, 8%) 100%
            )
          `,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset
          `,
        }}
      >
        {/* Animated shine overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(
              105deg,
              transparent 40%,
              rgba(255, 255, 255, 0.03) 45%,
              rgba(255, 255, 255, 0.05) 50%,
              rgba(255, 255, 255, 0.03) 55%,
              transparent 60%
            )`,
            transform: `translateX(${shinePosition - 100}%)`,
          }}
        />
        
        {/* Top gradient for visual interest */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: `radial-gradient(
              ellipse at 50% 0%, 
              hsla(${movie.hue}, 60%, 40%, 0.3) 0%, 
              transparent 70%
            )`,
          }}
        />
        
        {/* Rating badge */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '8px 14px',
            borderRadius: '12px',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ color: '#FBBF24', fontSize: '16px' }}>â</span>
          <span style={{ 
            color: 'white', 
            fontSize: '16px', 
            fontWeight: 700,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>{movie.rating}</span>
        </div>
        
        {/* Bottom info section with frosted glass */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
          }}
        >
          <h4
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'white',
              margin: 0,
              marginBottom: '8px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            {movie.title}
          </h4>
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '15px',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            {movie.year}
          </span>
        </div>
      </div>
    </div>
  );
};

export const MovieCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Smooth carousel scroll with easing
  const scrollProgress = interpolate(frame, [30, 300], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });
  
  const scrollX = interpolate(scrollProgress, [0, 1], [100, -600]);
  
  // Title animation
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 40], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  // Scene scale
  const sceneScale = interpolate(frame, [0, 360], [0.98, 1.03], {
    easing: Easing.inOut(Easing.ease),
  });
  
  // Fade transitions
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [300, 360], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeIn * fadeOut,
        transform: `scale(${sceneScale})`,
      }}
    >
      <div style={{ width: '100%', maxWidth: '1600px', padding: '0 60px' }}>
        {/* Section title */}
        <h2
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: 'white',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            marginBottom: '48px',
            letterSpacing: '-0.03em',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Trending movies.
          <br />
          <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Updated daily.</span>
        </h2>
        
        {/* Carousel container with overflow visible for depth effect */}
        <div
          style={{
            display: 'flex',
            gap: '28px',
            transform: `translateX(${scrollX}px)`,
          }}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              movie={movie}
              index={index}
              frame={frame}
              fps={fps}
              scrollProgress={scrollProgress}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
