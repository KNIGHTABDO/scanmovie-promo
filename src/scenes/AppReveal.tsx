import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const AppReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const phoneScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 15 },
  });
  
  const phoneOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const screenGlow = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const uiOpacity = interpolate(frame, [45, 75], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Phone mockup */}
      <div
        style={{
          opacity: phoneOpacity,
          transform: `scale(${phoneScale})`,
          position: 'relative',
        }}
      >
        {/* Phone frame */}
        <div
          style={{
            width: 380,
            height: 780,
            borderRadius: 55,
            background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)',
            border: '3px solid #333',
            padding: 12,
            boxShadow: `
              0 50px 100px rgba(0, 0, 0, 0.5),
              0 0 ${screenGlow * 100}px rgba(147, 51, 234, ${screenGlow * 0.3}),
              inset 0 0 30px rgba(255, 255, 255, 0.05)
            `,
          }}
        >
          {/* Screen */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 45,
              background: 'linear-gradient(180deg, #0f0f1a 0%, #1a1025 100%)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Status bar */}
            <div
              style={{
                padding: '12px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: uiOpacity,
              }}
            >
              <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>9:41</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 18, height: 10, background: 'white', borderRadius: 2 }} />
              </div>
            </div>
            
            {/* App content */}
            <div style={{ padding: '20px 24px', opacity: uiOpacity }}>
              {/* Search bar */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 16,
                  padding: '14px 20px',
                  marginBottom: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 16 }}>Search movies...</span>
              </div>
              
              {/* Featured section */}
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ color: 'white', fontSize: 22, fontWeight: 600, margin: '0 0 16px 0' }}>Featured</h3>
                <div
                  style={{
                    width: '100%',
                    height: 180,
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 16,
                  }}
                >
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: 0 }}>NOW PLAYING</p>
                    <p style={{ color: 'white', fontSize: 18, fontWeight: 600, margin: '4px 0 0 0' }}>Dune: Part Two</p>
                  </div>
                </div>
              </div>
              
              {/* Trending */}
              <h3 style={{ color: 'white', fontSize: 22, fontWeight: 600, margin: '0 0 16px 0' }}>Trending</h3>
              <div style={{ display: 'flex', gap: 12 }}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 90,
                      height: 130,
                      borderRadius: 12,
                      background: `linear-gradient(${120 + i * 30}deg, #374151 0%, #1f2937 100%)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 35,
            background: '#000',
            borderRadius: 20,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};