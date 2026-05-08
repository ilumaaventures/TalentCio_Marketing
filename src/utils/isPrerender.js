export default function isPrerender() {
  if (typeof window === 'undefined') {
    return false;
  }

  return Boolean(window.__PRERENDER_INJECTED?.prerender);
}
