const FALLBACK_GOOGLE_CLIENT_ID = '485252065297-kuf4ijabspu0manp3jvkdvlmsjjqa5th.apps.googleusercontent.com';

export const GOOGLE_CLIENT_ID = String(
  import.meta.env.VITE_GOOGLE_CLIENT_ID || FALLBACK_GOOGLE_CLIENT_ID
).trim();

export const isGoogleAuthEnabled = Boolean(GOOGLE_CLIENT_ID);
