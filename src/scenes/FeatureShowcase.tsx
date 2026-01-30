import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Easing } from 'remotion';

interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  { 
    icon: 'â­', 
    title: 'Instant Ratings', 
    description: 'IMDb, Rotten Tomatoes, Metacritic scores at a glance',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  },
  { 
    icon: 'ð¬', 
    title: 'Full Cast & Crew', 
    description: 'Discover directors, actors, and the creative team',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
  },
  { 
    icon: 'ðº', 
    title: 'Where to Stream', 
    description: 'Find it on Netflix, Prime, Disney+ and more',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
  { 
    icon: 'ð¤', 
    title: 'AI Assistant', 
    description: 'Get personalized recommendations powered by AI',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
  },
];

// Feature card with Apple-style glass morphism
const FeatureCard: React.FC<{
  feature: Feature;
  index: number;
  frame: number;
  fps: number;
}> = ({ feature, index, frame, fps }) => {
  const delay = 30 + index * 20;
  
  // Staggered entrance with spring physics
  const entryProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 80, mass: 0.8 },
  });
  
  const cardY = interpolate(entryProgress, [0, 1], [80, 0]);
  const cardOpacity = interpolate(entryProgress, [0, 0.3, 1], [0, 0.5, 1]);
  const cardScale = interpolate(entryProgress, [0, 1], [0.9, 1]);
  
  // Subtle hover-like pulse after entry
  const pulsePhase = Math.max(0, frame - delay - 40);
  const pulse = pulsePhase > 0 ? Math.sin(pulsePhase / 30 + index) * 0.02 + 1 : 1;
  
  // Icon animation
  const iconScale = spring({
    frame: frame - delay - 15,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  
  const iconRotate = interpolate(
    spring({ frame: frame - delay - 15, fps, config: { damping: 15, stiffness: 100 } }),
    [0, 1],
    [-15, 0]
  );
  
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(40px)',
        borderRadius: '28px',
        padding: '40px',
        opacity: Math.max(0, cardOpacity),
        transform: `translateY(${cardY}px) scale(${cardScale * pulse})`,
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: `
          0 4px 24px rgba(0, 0, 0, 0.2),
          0 0 0 1px rgba(255, 255, 255, 0.05) inset,
          0 -20px 40px -20px rgba(255, 255, 255, 0.04) inset
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient glow behind icon */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: feature.gradient,
          filter: 'blur(30px)',
          opacity: 0.4,
        }}
      />
      
      {/* Icon container */}
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: feature.gradient,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '24px',
          fontSize: '36px',
          transform: `scale(${Math.min(1, iconScale)}) rotate(${iconRotate}deg)`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {feature.icon}
      </div>
      
      {/* Title */}
      <h3
        style={{
          fontSize: '26px',
          fontWeight: 600,
          color: 'white',
          marginBottom: '12px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          letterSpacing: '-0.02em',
        }}
      >
        {feature.title}
      </h3>
      
      {/* Description */}
      <p
        style={{
          fontSize: '17px',
          color: 'rgba(255, 255, 255, 0.6)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {feature.description}
      </p>
    </div>
  );
};

export const FeatureShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Title animation
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 40], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  // Scene scale for cinematic depth
  const sceneScale = interpolate(frame, [0, 480], [0.95, 1.02], {
    easing: Easing.inOut(Easing.ease),
  });
  
  // Fade out
  const fadeOut = interpolate(frame, [420, 480], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1400px',
          padding: '0 60px',
        }}
      >
        {/* Section title - Apple style big and bold */}
        <h2
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: 'white',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            marginBottom: '64px',
            letterSpacing: '-0.03em',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: 'center',
          }}
        >
          Everything you need.
          <br />
          <span style={{ 
            background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            One scan away.
          </span>
        </h2>
        
        {/* Feature cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '28px',
            width: '100%',
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              frame={frame}
              fps={fps}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
