'use client';

import QRCodeStyled from '@/components/QRCodeStyled';

export type FrameStyle = 'none' | 'banner' | 'banner-top' | 'rounded-box' | 'speech';

export type StyleConfig = {
  dotStyle?: string;
  markerStyle?: string;
  color?: string;
  bgColor?: string;
  frameStyle?: FrameStyle;
  frameText?: string;
  frameColor?: string;
};

type Props = {
  url: string;
  styleConfig?: StyleConfig;
  size?: number;
};

export const FRAME_STYLES = [
  { id: 'none',        label: 'None' },
  { id: 'banner',      label: 'Banner Bottom' },
  { id: 'banner-top',  label: 'Banner Top' },
  { id: 'rounded-box', label: 'Rounded Box' },
  { id: 'speech',      label: 'Speech Bubble' },
] as const;

const BANNER_H = 40;
const BORDER_W = 8;
const TAB_H    = 24;
const POINTER  = 14;

export default function QRCodeFrame({ url, styleConfig, size = 256 }: Props) {
  const frameStyle = styleConfig?.frameStyle ?? 'none';
  const frameText  = styleConfig?.frameText  ?? 'SCAN ME';
  const frameColor = styleConfig?.frameColor ?? '#10b981';

  const qr = <QRCodeStyled url={url} styleConfig={styleConfig} size={size} />;

  if (frameStyle === 'none') {
    return <div style={{ width: size, height: size }}>{qr}</div>;
  }

  if (frameStyle === 'banner' || frameStyle === 'banner-top') {
    const top = frameStyle === 'banner-top';
    const banner = (
      <div
        className="flex items-center justify-center text-white font-bold tracking-wider"
        style={{ background: frameColor, height: BANNER_H, fontSize: 15, letterSpacing: '0.1em' }}
      >
        {frameText}
      </div>
    );
    return (
      <div className="flex flex-col" style={{ width: size }}>
        {top && banner}
        <div style={{ width: size, height: size }}>{qr}</div>
        {!top && banner}
      </div>
    );
  }

  if (frameStyle === 'rounded-box') {
    return (
      <div
        className="relative inline-flex items-center justify-center"
        style={{
          width: size + BORDER_W * 2,
          padding: BORDER_W,
          border: `${BORDER_W}px solid ${frameColor}`,
          borderRadius: 16,
          boxSizing: 'border-box',
          paddingBottom: BORDER_W + TAB_H / 2,
        }}
      >
        <div style={{ width: size, height: size }}>{qr}</div>
        <div
          className="absolute left-1/2 -translate-x-1/2 text-white font-bold tracking-wider flex items-center justify-center px-4"
          style={{
            background: frameColor,
            bottom: -(TAB_H / 2),
            height: TAB_H,
            borderRadius: 12,
            fontSize: 13,
            whiteSpace: 'nowrap',
            minWidth: 80,
          }}
        >
          {frameText}
        </div>
      </div>
    );
  }

  // speech bubble
  return (
    <div className="relative inline-flex flex-col items-center">
      <div
        style={{
          padding: BORDER_W,
          border: `${BORDER_W}px solid ${frameColor}`,
          borderRadius: 12,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: size, height: size }}>{qr}</div>
      </div>
      {/* triangle pointer */}
      <div style={{
        width: 0, height: 0,
        borderLeft: `${POINTER}px solid transparent`,
        borderRight: `${POINTER}px solid transparent`,
        borderTop: `${POINTER}px solid ${frameColor}`,
      }} />
      {frameText && (
        <div className="font-bold tracking-wider mt-1" style={{ color: frameColor, fontSize: 13 }}>
          {frameText}
        </div>
      )}
    </div>
  );
}
