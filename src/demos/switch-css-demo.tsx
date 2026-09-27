'use client';

import { useRef, useState, type ReactNode } from 'react';
import { Button } from '@/registry/button';
import { Switch } from '@/registry/switch';
import { SwitchCss } from '@/registry/switch-css';

// Side by side: a real spring (Motion) vs an overshooting bezier (CSS). "Mash" interrupts both.
export default function SwitchCssDemo() {
  const [on, setOn] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const mash = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [0, 90, 180, 270, 360].map((ms) => setTimeout(() => setOn((v) => !v), ms));
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-12">
        <Labeled label="Motion spring">
          <Switch checked={on} onCheckedChange={setOn} aria-label="Motion spring switch" />
        </Labeled>
        <Labeled label="CSS bezier">
          <SwitchCss checked={on} onCheckedChange={setOn} aria-label="CSS switch" />
        </Labeled>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" onClick={mash}>
          Mash (5 toggles in 360 ms)
        </Button>
        <p className="max-w-xs text-center text-xs text-muted-foreground">
          The spring keeps its velocity when interrupted; the CSS transition restarts from a
          standstill each time.
        </p>
      </div>
    </div>
  );
}

function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {children}
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
