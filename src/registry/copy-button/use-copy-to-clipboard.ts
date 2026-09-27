import { useEffect, useRef, useState } from 'react';

type UseCopyToClipboardOptions = {
  resetAfter: number;
  onCopy?: (value: string) => void;
};

export function useCopyToClipboard({ resetAfter, onCopy }: UseCopyToClipboardOptions) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return; // Clipboard blocked (e.g. insecure context): don't fake a "copied".
    }
    onCopy?.(value);
    setCopied(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), resetAfter);
  };

  return { copied, copy };
}
