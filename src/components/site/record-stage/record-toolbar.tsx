import Link from 'next/link';
import { cn } from '@/lib/utils';
import { frames, zooms, type Frame } from './options';
import { ToolbarButton, toolbarButtonVariants } from './toolbar-button';

type RecordToolbarProps = {
  backHref: string;
  frame: Frame;
  zoom: number;
  onFrameChange: (frame: Frame) => void;
  onZoomChange: (zoom: number) => void;
  onReplay: () => void;
  onHide: () => void;
};

const toolbarClassName = cn(
  'fixed inset-x-0 bottom-4 mx-auto flex w-fit flex-wrap items-center justify-center gap-3',
  'rounded-xl border bg-background/90 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur',
);

function Divider() {
  return <span aria-hidden className="h-4 w-px bg-border" />;
}

export function RecordToolbar({
  backHref,
  frame,
  zoom,
  onFrameChange,
  onZoomChange,
  onReplay,
  onHide,
}: RecordToolbarProps) {
  return (
    <div role="toolbar" aria-label="Recording controls" className={toolbarClassName}>
      <Link href={backHref} className={toolbarButtonVariants()}>
        ← Exit
      </Link>
      <Divider />
      <div role="group" aria-label="Frame" className="flex gap-0.5">
        {frames.map((option) => (
          <ToolbarButton
            key={option.label}
            pressable
            title={option.size}
            aria-pressed={option === frame}
            onClick={() => onFrameChange(option)}
          >
            {option.label}
          </ToolbarButton>
        ))}
      </div>
      <Divider />
      <div role="group" aria-label="Zoom" className="flex gap-0.5">
        {zooms.map((option) => (
          <ToolbarButton
            key={option}
            pressable
            aria-pressed={option === zoom}
            onClick={() => onZoomChange(option)}
          >
            {option}×
          </ToolbarButton>
        ))}
      </div>
      <Divider />
      <ToolbarButton shortcut="R" onClick={onReplay}>
        Replay
      </ToolbarButton>
      <ToolbarButton shortcut="H" onClick={onHide}>
        Hide
      </ToolbarButton>
    </div>
  );
}
