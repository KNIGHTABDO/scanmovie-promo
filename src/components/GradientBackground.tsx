import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';

export const GradientBackground: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Cinematic slow rotation - Apple style is subtle and elegant
  const rotation = interpolate(frame, [0, 1800], [0, 45], {
    easing: Easing.inOut(Easing.ease),
  });
  
  // Deep purple to dark blue - ScanMovie's actual color palette
  const hue1 = interpolate(frame, [0, 900, 1800], [260, 280, 260]);
  const hue2 = interpolate(frame, [0, 900, 1800], [220, 240, 220]);
  
  // Breathing intensity for dramatic effect
  const breathe = Math.sin(frame / 120) * 0.5 + 0.5;
  
  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(ellipse 150% 100% at 50% 0%, 
            hsl(${hue1}, 60%, ${8 + breathe * 4}%) 0%, 
            hsl(${hue2}, 50%, 4%) 50%,
            #050510 100%
          )
        `,
      }}
    >
      {/* Primary orb - top right, purple glow */}
      <div
        style={{
          position: 'absolute',
          width: '1200px',
          height: '1200px',
          borderRadius: '50%',
          background: `radial-gradient(circle, 
            hsla(270, 80%, 50%, ${0.08 + breathe * 0.04}) 0%, 
            transparent 60%
          )`,
          top: '-20%',
          right: '-10%',
          transform: `
            rotate(${rotation}deg) 
            scale(${1 + Math.sin(frame / 90) * 0.05})
          `,
          filter: 'blur(80px)',
        }}
      />
      
      {/* Secondary orb - bottom left, blue accent */}
      <div
        style={{
          position: 'absolute',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: `radial-gradient(circle, 
            hsla(220, 70%, 40%, ${0.06 + breathe * 0.03}) 0%, 
            transparent 60%
          )`,
          bottom: '-30%',
          left: '-15%',
          transform: `
            rotate(${-rotation * 0.7}deg)
            scale(${1 + Math.cos(frame / 75) * 0.04})
          `,
          filter: 'blur(100px)',
        }}
      />
      
      {/* Subtle film grain texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Vignette for cinematic depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
