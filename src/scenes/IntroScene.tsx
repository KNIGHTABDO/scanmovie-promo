import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Easing } from 'remotion';

// Cinematic spring config - slow, confident, Apple-style
const CINEMATIC_SPRING = {
  damping: 200,
  stiffness: 100,
  mass: 1,
};

// Letter-by-letter text animation component
const AnimatedText: React.FC<{
  text: string;
  startFrame: number;
  fontSize: number;
  fontWeight?: number;
  color?: string;
  letterSpacing?: string;
  staggerDelay?: number;
}> = ({ text, startFrame, fontSize, fontWeight = 600, color = 'white', letterSpacing = '-0.02em', staggerDelay = 2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  return (
    <div style={{ display: 'flex', overflow: 'hidden' }}>
      {text.split('').map((letter, i) => {
        const delay = startFrame + i * staggerDelay;
        
        const opacity = spring({
          frame: frame - delay,
          fps,
          config: { damping: 30, stiffness: 120 },
        });
        
        const y = interpolate(
          spring({ frame: frame - delay, fps, config: { damping: 25, stiffness: 100 } }),
          [0, 1],
          [40, 0]
        );
        
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              fontSize,
              fontWeight,
              color,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing,
              opacity: Math.max(0, Math.min(1, opacity)),
              transform: `translateY(${y}px)`,
              whiteSpace: letter === ' ' ? 'pre' : 'normal',
            }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Icon reveal with scale overshoot
  const iconProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  
  const iconScale = interpolate(iconProgress, [0, 1], [0.3, 1]);
  const iconRotate = interpolate(iconProgress, [0, 1], [-20, 0]);
  const iconOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  
  // Glow pulse behind icon
  const glowPulse = Math.sin(frame / 30) * 0.3 + 0.7;
  
  // Tagline fade in (delayed)
  const taglineOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  
  const taglineY = interpolate(frame, [120, 160], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  // Scene fade out
  const fadeOut = interpolate(frame, [300, 360], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Cinematic zoom effect throughout scene
  const sceneScale = interpolate(frame, [0, 360], [1, 1.05], {
    easing: Easing.inOut(Easing.ease),
  });
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut,
        transform: `scale(${sceneScale})`,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Glowing backdrop for icon */}
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(139, 92, 246, ${0.3 * glowPulse}) 0%, transparent 70%)`,
            filter: 'blur(40px)',
            transform: `scale(${iconScale})`,
          }}
        />
        
        {/* App Icon - ScanMovie style with clapperboard */}
        <div
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '36px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #4F46E5 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: `
              0 25px 50px -12px rgba(139, 92, 246, 0.5),
              0 0 0 1px rgba(255,255,255,0.1) inset,
              0 -20px 40px -20px rgba(255,255,255,0.15) inset
            `,
            marginBottom: '48px',
            opacity: iconOpacity,
            transform: `scale(${iconScale}) rotate(${iconRotate}deg)`,
          }}
        >
          {/* Clapperboard icon */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <rect x="10" y="28" width="60" height="42" rx="4" fill="white" fillOpacity="0.95"/>
            <rect x="10" y="12" width="60" height="20" rx="4" fill="white"/>
            <path d="M18 12L28 32M38 12L48 32M58 12L68 32" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="40" cy="50" r="12" stroke="#8B5CF6" strokeWidth="3" fill="none"/>
            <circle cx="40" cy="50" r="5" fill="#8B5CF6"/>
          </svg>
        </div>
        
        {/* App Name - Letter by letter reveal */}
        <AnimatedText
          text="ScanMovie"
          startFrame={30}
          fontSize={96}
          fontWeight={700}
          letterSpacing="-0.03em"
        />
        
        {/* Tagline with smooth fade */}
        <p
          style={{
            marginTop: '24px',
            fontSize: '28px',
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            fontWeight: 400,
            letterSpacing: '0.02em',
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          Your AI-Powered Movie Discovery
        </p>
      </div>
    </AbsoluteFill>
  );
};
