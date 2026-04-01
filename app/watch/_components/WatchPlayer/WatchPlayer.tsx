'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type WatchPlayerProps = {
  src: string | null;
  poster: string;
  title: string;
  loadingText: string;
  unavailableText: string;
};

const WatchPlayer: React.FC<WatchPlayerProps> = ({
  src,
  poster,
  title,
  loadingText,
  unavailableText,
}) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isBuffering, setIsBuffering] = React.useState(false);
  const [isUnavailable, setIsUnavailable] = React.useState(false);

  React.useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || !src) {
      setIsUnavailable(!src);
      setIsBuffering(false);
      return;
    }

    let mounted = true;
    let hlsInstance: { destroy: () => void } | null = null;

    const bootPlayer = async () => {
      setIsUnavailable(false);
      setIsBuffering(true);

      try {
        const canPlayNativeHls = videoElement.canPlayType(
          'application/vnd.apple.mpegurl',
        );

        if (canPlayNativeHls) {
          videoElement.src = src;
          videoElement.load();
          return;
        }

        const { default: Hls } = await import('hls.js');

        if (!mounted) return;

        if (!Hls.isSupported()) {
          setIsUnavailable(true);
          setIsBuffering(false);
          return;
        }

        const hls = new Hls({
          enableWorker: true,
        });

        hls.loadSource(src);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.ERROR, (_event: string, data: { fatal: boolean }) => {
          if (!mounted) return;

          if (data.fatal) {
            setIsUnavailable(true);
            setIsBuffering(false);
          }
        });

        hlsInstance = hls;
      } catch {
        if (!mounted) return;

        setIsUnavailable(true);
        setIsBuffering(false);
      }
    };

    bootPlayer();

    return () => {
      mounted = false;

      if (hlsInstance) {
        hlsInstance.destroy();
      }

      videoElement.pause();
      videoElement.removeAttribute('src');
      videoElement.load();
    };
  }, [src]);

  if (!src || isUnavailable) {
    return (
      <div className='flex h-full min-h-[320px] items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-6 text-center md:min-h-[420px]'>
        <p className='max-w-md text-sm text-white/75 md:text-base'>{unavailableText}</p>
      </div>
    );
  }

  return (
    <div className='relative h-full'>
      <video
        ref={videoRef}
        controls
        autoPlay
        playsInline
        poster={poster}
        className='h-full w-full bg-black object-contain'
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onCanPlay={() => setIsBuffering(false)}
        onError={() => {
          setIsUnavailable(true);
          setIsBuffering(false);
        }}
      >
        {title}
      </video>

      <div
        className={cn(
          'pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-medium text-white transition-opacity duration-200',
          isBuffering ? 'opacity-100' : 'opacity-0',
        )}
      >
        {loadingText}
      </div>
    </div>
  );
};

export default WatchPlayer;
