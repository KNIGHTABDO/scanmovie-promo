import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Easing } from 'remotion';

// MacBook Pro component with realistic styling
const MacBookPro: React.FC<{ children: React.ReactNode; scale?: number; opacity?: number }> = ({ 
  children, 
  scale = 1,
  opacity = 1 
}) => {
  return (
    <div style={{ transform: `scale(${scale})`, opacity }}>
      {/* Screen */}
      <div
        style={{
          width: '1200px',
          height: '750px',
          background: '#0a0a0f',
          borderRadius: '16px 16px 0 0',
          border: '2px solid #2a2a2a',
          borderBottom: 'none',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 -10px 60px rgba(139, 92, 246, 0.1)',
        }}
      >
        {/* Notch/Camera area */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '24px',
            background: '#1a1a1a',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#333' }} />
        </div>
        
        {/* Screen content */}
        <div style={{ width: '100%', height: '100%', paddingTop: '24px' }}>
          {children}
        </div>
      </div>
      
      {/* Base/Keyboard area */}
      <div
        style={{
          width: '1300px',
          height: '18px',
          background: 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)',
          borderRadius: '0 0 12px 12px',
          marginLeft: '-50px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        }}
      />
      
      {/* Bottom lip */}
      <div
        style={{
          width: '400px',
          height: '6px',
          background: '#1a1a1a',
          borderRadius: '0 0 4px 4px',
          margin: '0 auto',
          marginTop: '-2px',
        }}
      />
    </div>
  );
};

// ScanMovie App UI Component - Based on actual scanmovie-app.vercel.app design
const ScanMovieUI: React.FC<{ frame: number }> = ({ frame }) => {
  // Staggered content reveal
  const navOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const heroOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });
  const cardsOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' });
  
  const heroX = interpolate(frame, [15, 45], [-30, 0], { 
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      background: 'linear-gradient(180deg, #0f0f1a 0%, #0a0a12 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Navigation Bar - Frosted glass effect */}
      <div
        style={{
          height: '64px',
          background: 'rgba(20, 20, 30, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          opacity: navOpacity,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '16px' }}>ð¬</span>
          </div>
          <span style={{ 
            color: 'white', 
            fontSize: '20px', 
            fontWeight: 700,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>ScanMovie</span>
        </div>
        
        {/* Nav links */}
        <div style={{ display: 'flex', gap: '32px', marginLeft: '48px' }}>
          {['Home', 'Discover', 'Library', 'Party ð'].map((item, i) => (
            <span key={i} style={{ 
              color: i === 0 ? 'white' : 'rgba(255,255,255,0.6)', 
              fontSize: '15px',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 500,
            }}>{item}</span>
          ))}
        </div>
        
        {/* AI Assistant button */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(139, 92, 246, 0.5)',
            color: '#A78BFA',
            fontSize: '14px',
            fontWeight: 500,
          }}>â¨ AI Assistant</div>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
          }}>ð¤</div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div style={{ 
        display: 'flex', 
        height: 'calc(100% - 64px)',
        padding: '32px',
        gap: '40px',
        opacity: heroOpacity,
        transform: `translateX(${heroX}px)`,
      }}>
        {/* Left: Movie info card with frosted glass */}
        <div style={{
          width: '400px',
          background: 'rgba(30, 30, 45, 0.6)',
          backdropFilter: 'blur(24px)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Featured badge */}
          <div style={{
            alignSelf: 'flex-start',
            padding: '6px 12px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'white',
            marginBottom: '20px',
          }}>ð¥ Featured Today</div>
          
          {/* Movie title */}
          <h2 style={{
            color: 'white',
            fontSize: '36px',
            fontWeight: 700,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            margin: 0,
            marginBottom: '12px',
            lineHeight: 1.2,
          }}>The Wrecking Crew</h2>
          
          {/* Meta info */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <span style={{ color: '#FBBF24', fontSize: '14px' }}>â­ 6.3</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>ð 2026</span>
          </div>
          
          {/* Description */}
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '14px',
            lineHeight: 1.6,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            margin: 0,
            marginBottom: '24px',
            flex: 1,
          }}>
            Estranged half-brothers reunite following their father's mysterious death, 
            uncovering family secrets and a conspiracy that threatens everything...
          </p>
          
          {/* CTA Button */}
          <button style={{
            padding: '14px 28px',
            borderRadius: '12px',
            background: 'white',
            border: 'none',
            color: '#8B5CF6',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
          }}>
            View Details <span>â</span>
          </button>
        </div>
        
        {/* Right: Movie backdrop with gradient overlay */}
        <div style={{
          flex: 1,
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #1e1e3f 0%, #2d1f4e 50%, #1a1a2e 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Simulated movie scene */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at 30% 40%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)
            `,
          }} />
          
          {/* Carousel dots */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
          }}>
            <div style={{ width: '24px', height: '8px', borderRadius: '4px', background: '#8B5CF6' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
          </div>
        </div>
      </div>
      
      {/* Trending Section Preview */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '32px',
        right: '32px',
        height: '180px',
        opacity: cardsOpacity,
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
          marginBottom: '16px',
        }}>
          <span style={{ fontSize: '14px' }}>ð¥</span>
          <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>Trending This Week</span>
        </div>
        
        {/* Movie cards row */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { title: 'Zootopia 2', rating: '7.6' },
            { title: 'Anaconda', rating: '6.0' },
            { title: 'Migration', rating: '6.5' },
            { title: 'Send Help', rating: '6.9' },
          ].map((movie, i) => (
            <div key={i} style={{
              width: '140px',
              height: '100px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, hsl(${200 + i * 30}, 50%, 20%) 0%, hsl(${220 + i * 30}, 40%, 10%) 100%)`,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                padding: '4px 8px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.6)',
                fontSize: '11px',
                color: 'white',
                fontWeight: 600,
              }}>â­ {movie.rating}</div>
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                right: '8px',
                fontSize: '12px',
                color: 'white',
                fontWeight: 600,
              }}>{movie.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AppReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Cinematic MacBook entrance - rises from below with perspective
  const entryProgress = spring({
    frame,
    fps,
    config: { damping: 30, stiffness: 50, mass: 1.2 },
  });
  
  const macbookY = interpolate(entryProgress, [0, 1], [400, 0]);
  const macbookScale = interpolate(entryProgress, [0, 1], [0.85, 0.75]);
  const macbookOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  
  // Subtle float animation after entry
  const floatY = frame > 60 ? Math.sin((frame - 60) / 45) * 8 : 0;
  
  // Glow behind MacBook
  const glowOpacity = interpolate(frame, [30, 90], [0, 0.6], { extrapolateRight: 'clamp' });
  
  // Cinematic camera push
  const sceneScale = interpolate(frame, [0, 360], [1, 1.08], {
    easing: Easing.inOut(Easing.ease),
  });
  
  // Scene fade out
  const fadeOut = interpolate(frame, [300, 360], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Content reveal starts after MacBook settles
  const contentFrame = Math.max(0, frame - 60);
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut,
        transform: `scale(${sceneScale})`,
      }}
    >
      {/* Glow effect behind MacBook */}
      <div
        style={{
          position: 'absolute',
          width: '1400px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: glowOpacity,
          transform: `translateY(${macbookY + floatY + 100}px)`,
        }}
      />
      
      {/* MacBook */}
      <div
        style={{
          transform: `translateY(${macbookY + floatY}px)`,
        }}
      >
        <MacBookPro scale={macbookScale} opacity={macbookOpacity}>
          <ScanMovieUI frame={contentFrame} />
        </MacBookPro>
      </div>
    </AbsoluteFill>
  );
};
