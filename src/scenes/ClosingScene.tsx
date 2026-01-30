import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const logoScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12 },
  });
  
  const logoOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const taglineOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const ctaOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const ctaY = spring({
    frame: frame - 60,
    fps,
    from: 20,
    to: 0,
    config: { damping: 12 },
  });
  
  const glowPulse = interpolate(
    frame,
    [0, 75, 150],
    [0.3, 0.6, 0.3],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Animated glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(147, 51, 234, ${glowPulse}) 0%, transparent 60%)`,
          filter: 'blur(100px)',
        }}
      />
      
      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          textAlign: 'center',
          marginBottom: 30,
        }}
      >
        <h1
          style={{
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 100,
            fontWeight: 700,
            color: 'white',
            margin: 0,
            letterSpacing: '-2px',
          }}
        >
          ScanMovie
        </h1>
      </div>
      
      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          marginBottom: 50,
        }}
      >
        <p
          style={{
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 0,
          }}
        >
          Movies at your fingertips
        </p>
      </div>
      
      {/* CTA Button */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${frame >= 60 ? ctaY : 20}px)`,
        }}
      >
        <div
          style={{
            padding: '18px 48px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            borderRadius: 16,
            boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)',
          }}
        >
          <span
            style={{
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: 22,
              fontWeight: 600,
              color: 'white',
            }}
          >
            Download on the App Store
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};