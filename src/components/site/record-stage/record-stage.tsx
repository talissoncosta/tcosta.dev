'use client';

import { MotionConfig } from 'motion/react';
import { useState, type ReactNode } from 'react';
import { useReplay } from '@/hooks/use-replay';
import { useShortcuts } from '@/hooks/use-shortcuts';
import { cn } from '@/lib/utils';
import { frames } from './options';
import { RecordToolbar } from './record-toolbar';

type RecordStageProps = {
  children: ReactNode;
  backHref: string;
};

// Largest frame of the given ratio that fits the viewport, leaving room for the toolbar.
function frameWidth(ratio: number, hasToolbar: boolean) {
  const reserved = hasToolbar ? '7rem' : '2rem';
  return `min(calc(100vw - 2rem), calc((100dvh - ${reserved}) * ${ratio}))`;
}

export function RecordStage({ children, backHref }: RecordStageProps) {
  const [frame, setFrame] = useState(frames[0]);
  const [zoom, setZoom] = useState(1.5);
  const [hasToolbar, setHasToolbar] = useState(true);
  const { key, replay } = useReplay();

  useShortcuts({
    r: replay,
    h: () => setHasToolbar((visible) => !visible),
  });

  return (
    <div className={cn('flex h-dvh items-center justify-center p-4', hasToolbar && 'pb-24')}>
      {/* `contain` keeps paint inside the frame. */}
      <div
        style={{
          width: frameWidth(frame.ratio, hasToolbar),
          aspectRatio: frame.ratio,
          contain: 'layout paint',
        }}
        className="relative bg-muted/60"
      >
        {/* Scaled with a transform, not CSS `zoom`: Floating UI positions menus correctly under a
            transform, and the transformed box is also the containing block for fixed pieces (the
            toaster). transformPagePoint keeps drags (the switch) following the pointer 1:1. */}
        <div
          key={key}
          style={{
            width: `${100 / zoom}%`,
            height: `${100 / zoom}%`,
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
          }}
          className="flex items-center justify-center"
        >
          <MotionConfig transformPagePoint={({ x, y }) => ({ x: x / zoom, y: y / zoom })}>
            {children}
          </MotionConfig>
        </div>
      </div>

      {hasToolbar && (
        <RecordToolbar
          backHref={backHref}
          frame={frame}
          zoom={zoom}
          onFrameChange={setFrame}
          onZoomChange={setZoom}
          onReplay={replay}
          onHide={() => setHasToolbar(false)}
        />
      )}
    </div>
  );
}
