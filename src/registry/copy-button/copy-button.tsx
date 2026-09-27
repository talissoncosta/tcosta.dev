'use client';

import { AnimatePresence, motion, type Variants } from 'motion/react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { IconButton } from '../icon-button';
import { CheckIcon, CopyIcon } from './icons';
import { useCopyToClipboard } from './use-copy-to-clipboard';

type CopyButtonProps = Omit<ComponentProps<typeof IconButton>, 'label' | 'onClick' | 'children'> & {
  value: string;
  resetAfter?: number;
  onCopy?: (value: string) => void;
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, filter: 'blur(4px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
};

export function CopyButton({
  value,
  resetAfter = 1800,
  onCopy,
  className,
  ...props
}: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard({ resetAfter, onCopy });

  return (
    <IconButton
      label={copied ? 'Copied' : 'Copy to clipboard'}
      variant="ghost"
      size="sm"
      onClick={() => copy(value)}
      className={cn('text-muted-foreground', className)}
      {...props}
    >
      <>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? 'check' : 'copy'}
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', duration: 0.3, bounce: 0.25 }}
            className="flex"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </motion.span>
        </AnimatePresence>
        <span className="sr-only" aria-live="polite">
          {copied ? 'Copied to clipboard' : ''}
        </span>
      </>
    </IconButton>
  );
}
