import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { ogSize } from './og-size';

// Latin subsets without OpenType layout tables: with Geist's kerning, Satori mis-measures
// words and leaves uneven gaps between them.
const fontsDir = path.join(process.cwd(), 'src/assets/fonts');
const [regular, semibold] = await Promise.all([
  readFile(path.join(fontsDir, 'Geist-Regular.ttf')),
  readFile(path.join(fontsDir, 'Geist-SemiBold.ttf')),
]);

type OgImageOptions = {
  eyebrow: string;
  title: string;
  description?: string;
  url: string;
};

// Same look as the site: white background, neutral type.
export function ogImage({ eyebrow, title, description, url }: OgImageOptions) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#fff',
        fontFamily: 'Geist',
        color: '#0a0a0a',
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 600 }}>{eyebrow}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
        <div
          style={{
            fontSize: 68,
            fontWeight: 600,
            letterSpacing: -2,
            lineHeight: 1.1,
            textWrap: 'balance',
          }}
        >
          {title}
        </div>
        {description && (
          <div style={{ fontSize: 30, color: '#737373', lineHeight: 1.4 }}>{description}</div>
        )}
      </div>
      <div style={{ fontSize: 26, color: '#737373' }}>{url}</div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: 'Geist', data: regular, weight: 400, style: 'normal' },
        { name: 'Geist', data: semibold, weight: 600, style: 'normal' },
      ],
    },
  );
}
