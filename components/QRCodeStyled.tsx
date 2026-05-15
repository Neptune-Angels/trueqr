'use client';

import { useEffect, useRef } from 'react';

type StyleConfig = {
  dotStyle?: string;
  markerStyle?: string;
  color?: string;
  bgColor?: string;
};

type Props = {
  url: string;
  styleConfig?: StyleConfig;
  size?: number;
  logoUrl?: string;
};

export default function QRCodeStyled({ url, styleConfig, size = 256, logoUrl }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);

  const dotStyle  = styleConfig?.dotStyle   ?? 'square';
  const markerStyle = styleConfig?.markerStyle ?? 'square';
  const color     = styleConfig?.color      ?? '#000000';
  const bgColor   = styleConfig?.bgColor    ?? '#ffffff';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { default: QRCodeStyling } = await import('qr-code-styling');
      if (cancelled || !containerRef.current) return;

      const options: any = {
        width: size,
        height: size,
        data: url,
        dotsOptions:          { type: dotStyle,    color },
        backgroundOptions:    { color: bgColor },
        cornersSquareOptions: { type: markerStyle },
        cornersDotOptions:    { type: markerStyle === 'dot' ? 'dot' : 'square' },
      };
      if (logoUrl) {
        options.image = logoUrl;
        options.imageOptions = { crossOrigin: 'anonymous', margin: 4 };
      }

      if (instanceRef.current) {
        instanceRef.current.update(options);
      } else {
        const { default: QRCodeStyling2 } = await import('qr-code-styling');
        const instance = new QRCodeStyling2(options);
        instanceRef.current = instance;
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          instance.append(containerRef.current);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [url, dotStyle, markerStyle, color, bgColor, size, logoUrl]);

  return <div ref={containerRef} style={{ width: size, height: size }} />;
}
