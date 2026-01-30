import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

const features = [
  { icon: 'ð¸', title: 'Scan & Discover', description: 'Point your camera at any movie poster' },
  { icon: 'â¡', title: 'Instant Results', description: 'Get ratings, reviews & streaming info' },
  { icon: 'ð¬', title: 'Personal Watchlist', description: 'Save movies for later viewing' },
];

export const FeatureShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 60,
          padding: '0 100px',
        }}
      >
        {features.map((feature, index) => {
          const delay = index * 25;
          
          const cardOpacity = interpolate(frame, [delay, delay + 30], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          });
          
          const cardY = spring({
            frame: frame - delay,
            fps,
            from: 60,
            to: 0,
            config: { damping: 12 },
          });
          
          const cardScale = spring({
            frame: frame - delay,
            fps,
            from: 0.9,
            to: 1,
            config: { damping: 15 },
          });

          return (
            <div
              key={index}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${frame > delay ? cardY : 60}px) scale(${frame > delay ? cardScale : 0.9})`,
                width: 340,
                padding: 40,
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 32,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  marginBottom: 24,
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: 28,
                  fontWeight: 600,
                  color: 'white',
                  margin: '0 0 16px 0',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: 18,
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};