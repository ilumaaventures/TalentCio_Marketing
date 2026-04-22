const LOCAL_HOST_PATTERN = /^(localhost|127\.0\.0\.1)$/i;

const normalizeApiUrl = (rawUrl) => {
  const trimmedUrl = String(rawUrl || '').trim();

  if (!trimmedUrl) {
    return '';
  }

  // Prevent CORS preflight redirects when api.talentcio.in is accidentally configured over HTTP.
  return trimmedUrl.replace(/^http:\/\/api\.talentcio\.in$/i, 'https://api.talentcio.in');
};

export const resolveApiBaseUrl = () => {
  const configuredUrl = normalizeApiUrl(import.meta.env.VITE_API_URL);
  if (configuredUrl) {
    return configuredUrl;
  }

  if (typeof window !== 'undefined' && LOCAL_HOST_PATTERN.test(window.location.hostname)) {
    return 'http://localhost:2000';
  }

  return 'https://api.talentcio.in';
};

export const getPublicJobsApiMissingKey = () => `talentcio_public_jobs_api_missing:${resolveApiBaseUrl()}`;
