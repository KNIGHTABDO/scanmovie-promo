import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const GradientBackground: React.FC = () => {
  const frame = useCurrentFrame();
  
  const hue1 = interpolate(frame, [0, 900], [220, 280], {
    extrapolateRight: 'clamp',
  });
  
  const hue2 = interpolate(frame, [0, 900], [260, 320], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(
          135deg,
          hsl(${hue1}, 80%, 8%) 0%,
          hsl(${hue2}, 70%, 12%) 50%,
          hsl(${hue1 + 20}, 60%, 6%) 100%
        )`,
      }}
    />
  );
};