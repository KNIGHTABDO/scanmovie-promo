import { Composition } from 'remotion';
import { ScanMoviePromo } from './ScanMoviePromo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ScanMoviePromo"
        component={ScanMoviePromo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};