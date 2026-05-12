declare module 'qrcode' {
  interface QRCodeOptions {
    width?: number;
    margin?: number;
    color?: { dark?: string; light?: string };
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
    type?: string;
  }
  function toDataURL(text: string, options?: QRCodeOptions): Promise<string>;
  function toString(text: string, options?: QRCodeOptions & { type?: 'svg' | 'terminal' | 'utf8' }): Promise<string>;
  export { toDataURL, toString };
}
