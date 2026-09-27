'use client';

import { Button } from '@/registry/button';
import { Toaster, toast } from '@/registry/toast';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const examples = [
  {
    label: 'Default',
    run: () => toast('Event created', { description: 'Sunday, 12 October at 9:00' }),
  },
  { label: 'Success', run: () => toast.success('Changes saved') },
  {
    label: 'Error',
    run: () => toast.error('Upload failed', { description: 'The file is larger than 10 MB.' }),
  },
  {
    label: 'Promise',
    run: () =>
      toast.promise(
        wait(1600).then(() => 'report.pdf'),
        {
          loading: 'Generating report…',
          success: (file) => `${file} is ready`,
          error: "Couldn't generate the report",
        },
      ),
  },
  {
    label: 'With action',
    run: () =>
      toast('Message archived', {
        action: { label: 'Undo', onClick: () => toast.success('Message restored') },
      }),
  },
];

export default function ToastDemo() {
  return (
    <div className="flex max-w-md flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {examples.map(({ label, run }) => (
          <Button key={label} variant="outline" onClick={run}>
            {label}
          </Button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Toasts appear bottom-right. Hover to expand · swipe right or press Esc to dismiss.
      </p>
      <Toaster />
    </div>
  );
}
