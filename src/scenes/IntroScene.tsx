import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const titleY = spring({
    frame,
    fps,
    from: 50,
    to: 0,
    config: { damping: 12 },
  });
  
  const subtitleOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const subtitleY = spring({
    frame: frame - 40,
    fps,
    from: 30,
    to: 0,
    config: { damping: 12 },
  });
  
  const glowIntensity = interpolate(frame, [0, 150], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(147, 51, 234, ${glowIntensity * 0.3}) 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />
      
      <div
        style={{
          textAlign: 'center',
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
        }}
      >
        <h1
          style={{
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 120,
            fontWeight: 700,
            color: 'white',
            margin: 0,
            letterSpacing: '-2px',
            textShadow: '0 0 80px rgba(147, 51, 234, 0.5)',
          }}
        >
          ScanMovie
        </h1>
      </div>
      
      <div
        style={{
          position: 'absolute',
          top: '58%',
          opacity: subtitleOpacity,
          transform: `translateY(${frame >= 40 ? subtitleY : 30}px)`,
        }}
      >
        <p
          style={{
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 36,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0,
            letterSpacing: '0.5px',
          }}
        >
          Discover movies in an instant
        </p>
      </div>
    </AbsoluteFill>
  );
};