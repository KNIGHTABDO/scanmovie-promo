import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Easing } from 'remotion';

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Dramatic entrance - everything fades in from deep
  const sceneEntry = spring({
    frame,
    fps,
    config: { damping: 40, stiffness: 60, mass: 1.5 },
  });
  
  // Icon animation with overshoot
  const iconScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });
  
  const iconOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateRight: 'clamp' });
  
  // Glow pulse - breathing effect
  const glowIntensity = interpolate(
    Math.sin(frame / 40),
    [-1, 1],
    [0.3, 0.6]
  );
  
  // App name - letter by letter with spring
  const nameDelay = 45;
  const appName = 'ScanMovie';
  
  // Tagline fade
  const taglineOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  const taglineY = interpolate(frame, [90, 130], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  // CTA button animation
  const ctaProgress = spring({
    frame: frame - 140,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const ctaOpacity = interpolate(ctaProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const ctaY = interpolate(ctaProgress, [0, 1], [20, 0]);
  const ctaScale = interpolate(ctaProgress, [0, 1], [0.95, 1]);
  
  // Final URL/website text
  const urlOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Scene scale for cinematic feel
  const sceneScale = interpolate(frame, [0, 240], [0.95, 1], {
    easing: Easing.out(Easing.ease),
  });
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${sceneScale})`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: sceneEntry,
        }}
      >
        {/* Glow behind icon */}
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(139, 92, 246, ${glowIntensity}) 0%, transparent 70%)`,
            filter: 'blur(50px)',
            transform: `scale(${iconScale})`,
          }}
        />
        
        {/* App Icon */}
        <div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '32px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #4F46E5 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '40px',
            opacity: iconOpacity,
            transform: `scale(${Math.min(1, iconScale)})`,
            boxShadow: `
              0 25px 60px -15px rgba(139, 92, 246, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.1) inset,
              0 -15px 30px -15px rgba(255, 255, 255, 0.15) inset
            `,
          }}
        >
          {/* Clapperboard icon */}
          <svg width="70" height="70" viewBox="0 0 80 80" fill="none">
            <rect x="10" y="28" width="60" height="42" rx="4" fill="white" fillOpacity="0.95"/>
            <rect x="10" y="12" width="60" height="20" rx="4" fill="white"/>
            <path d="M18 12L28 32M38 12L48 32M58 12L68 32" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="40" cy="50" r="12" stroke="#8B5CF6" strokeWidth="3" fill="none"/>
            <circle cx="40" cy="50" r="5" fill="#8B5CF6"/>
          </svg>
        </div>
        
        {/* App Name - Letter by letter animation */}
        <div style={{ display: 'flex', marginBottom: '20px', overflow: 'hidden' }}>
          {appName.split('').map((letter, i) => {
            const letterDelay = nameDelay + i * 3;
            
            const letterProgress = spring({
              frame: frame - letterDelay,
              fps,
              config: { damping: 25, stiffness: 120 },
            });
            
            const letterY = interpolate(letterProgress, [0, 1], [50, 0]);
            const letterOpacity = interpolate(letterProgress, [0, 0.3, 1], [0, 0.5, 1]);
            
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  fontSize: '80px',
                  fontWeight: 700,
                  color: 'white',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  letterSpacing: '-0.03em',
                  opacity: Math.max(0, letterOpacity),
                  transform: `translateY(${letterY}px)`,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
        
        {/* Tagline */}
        <p
          style={{
            fontSize: '28px',
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            fontWeight: 500,
            marginBottom: '48px',
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            letterSpacing: '0.02em',
          }}
        >
          Discover movies instantly. Powered by AI.
        </p>
        
        {/* CTA Button - Web app style */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px) scale(${ctaScale})`,
          }}
        >
          {/* Primary CTA */}
          <div
            style={{
              padding: '18px 40px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
              color: 'white',
              fontSize: '18px',
              fontWeight: 600,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              boxShadow: '0 10px 40px -10px rgba(139, 92, 246, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            Try it Free
            <span style={{ fontSize: '20px' }}>â</span>
          </div>
          
          {/* Secondary - Learn more */}
          <div
            style={{
              padding: '18px 32px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'white',
              fontSize: '18px',
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Learn More
          </div>
        </div>
        
        {/* Website URL */}
        <p
          style={{
            marginTop: '48px',
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Mono", monospace',
            fontWeight: 400,
            opacity: urlOpacity,
            letterSpacing: '0.05em',
          }}
        >
          scanmovie-app.vercel.app
        </p>
      </div>
    </AbsoluteFill>
  );
};
