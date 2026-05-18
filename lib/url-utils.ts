/**
 * Normalizes a user-typed URL string into a full valid URL.
 * Handles:
 *   www.google.com        → https://www.google.com
 *   google.com            → https://google.com
 *   google.com/path?q=1   → https://google.com/path?q=1
 *   http://google.com     → http://google.com  (pass-through)
 *   https://google.com    → https://google.com (pass-through)
 *   ftp://files.example   → ftp://files.example (pass-through)
 */
export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  // Already has any valid scheme → pass through
  if (/^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//i.test(trimmed)) return trimmed;

  // Prepend https://
  return `https://${trimmed}`;
}

/**
 * Returns true if the string is a valid URL after normalization.
 */
export function isValidUrl(input: string): boolean {
  const normalized = normalizeUrl(input);
  if (!normalized) return false;
  try {
    new URL(normalized);
    return true;
  } catch {
    return false;
  }
}
