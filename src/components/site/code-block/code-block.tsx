import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { codeToHtml } from 'shiki';
import { CopyButton } from '@/registry/copy-button/copy-button';

// Reads from src/registry only, so the build doesn't trace the whole project.
async function highlight(file: string) {
  const source = await readFile(path.join(process.cwd(), 'src', 'registry', file), 'utf8');
  const html = await codeToHtml(source, {
    lang: 'tsx',
    themes: { light: 'github-light', dark: 'github-dark-dimmed' },
    defaultColor: false,
  });
  return { source, html };
}

export async function CodeBlock({ file }: { file: string }) {
  const { source, html } = await highlight(file);

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between border-b bg-muted/60 py-1 pr-1 pl-4">
        <span className="font-mono text-xs text-muted-foreground">{path.basename(file)}</span>
        <CopyButton value={source} />
      </div>
      <div
        className="code max-h-128 overflow-auto text-[13px] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
