import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

const movies = [
  { title: 'Oppenheimer', rating: '8.9', color: '#1a1a2e' },
  { title: 'Barbie', rating: '7.3', color: '#ff69b4' },
  { title: 'Poor Things', rating: '8.1', color: '#2d5a27' },
  { title: 'Killers of the Flower Moon', rating: '8.0', color: '#8b4513' },
  { title: 'The Holdovers', rating: '7.9', color: '#2f4f4f' },
];

export const MovieCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scrollX = interpolate(frame, [0, 180], [0, -400], {
    extrapolateRight: 'clamp',
  });
  
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          opacity: titleOpacity,
        }}
      >
        <h2
          style={{
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 56,
            fontWeight: 600,
            color: 'white',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Your Watchlist, Perfected
        </h2>
      </div>
      
      {/* Movie cards carousel */}
      <div
        style={{
          display: 'flex',
          gap: 30,
          transform: `translateX(${scrollX}px)`,
          marginTop: 100,
        }}
      >
        {movies.map((movie, index) => {
          const cardDelay = index * 10;
          
          const cardOpacity = interpolate(frame, [cardDelay, cardDelay + 30], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          });
          
          const cardScale = spring({
            frame: frame - cardDelay,
            fps,
            from: 0.85,
            to: 1,
            config: { damping: 12 },
          });

          return (
            <div
              key={index}
              style={{
                opacity: cardOpacity,
                transform: `scale(${frame > cardDelay ? cardScale : 0.85})`,
                width: 260,
                height: 390,
                borderRadius: 24,
                background: `linear-gradient(180deg, ${movie.color} 0%, #0a0a0a 100%)`,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: 16,
                  padding: 16,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: 20,
                    fontWeight: 600,
                    color: 'white',
                    margin: '0 0 8px 0',
                  }}
                >
                  {movie.title}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#fbbf24', fontSize: 16 }}>â</span>
                  <span
                    style={{
                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: 16,
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {movie.rating}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};