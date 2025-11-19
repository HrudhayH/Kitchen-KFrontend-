/**
 * Normalizes image src values for Next.js Image component.
 * Returns a safe src or fallback placeholder.
 */
export const normalizeSrc = (src?: string | null): string => {
  if (!src) return "/placeholder.png";
  
  // Already absolute URL
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  
  // Already starts with slash
  if (src.startsWith("/")) return src;
  
  // Valid relative path - prefix with slash
  if (src.length > 4) return `/${src}`;
  
  // Fallback for invalid/short values
  return "/placeholder.png";
};
