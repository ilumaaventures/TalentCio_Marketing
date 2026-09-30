import axios from 'axios';

const BKONNECT_TOKEN_KEY = 'bkonnect_handoff_token';

/**
 * Register user on BKonnected platform.
 */
export const registerOnBkonnect = async (data) => {
  const bkonnectUrl = import.meta.env.VITE_BKONNECT_URL;
  if (!bkonnectUrl) {
    console.debug('VITE_BKONNECT_URL is not configured. Skipping BKonnect registration.');
    return null;
  }

  const response = await axios.post(
    `${bkonnectUrl}/auth/register`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

/**
 * Background login / token fetch for existing users on BKonnected.
 */
export const fetchBkonnectToken = async ({ email, password }) => {
  try {
    const bkonnectUrl = import.meta.env.VITE_BKONNECT_URL;
    if (!bkonnectUrl || !email) return null;

    const response = await axios.post(
      `${bkonnectUrl}/auth/login`,
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const token =
      response.data?.token ||
      response.data?.handoffToken ||
      response.data?.accessToken;

    if (token) {
      localStorage.setItem(BKONNECT_TOKEN_KEY, token);
    }
    return token;
  } catch (err) {
    console.debug('BKonnect token fetch skipped:', err?.response?.data?.message || err.message);
    return null;
  }
};

/**
 * Silently registers/syncs user on BKonnected and caches their handoff token.
 * If user already exists (HTTP 400/409), attempts to quietly acquire token via login.
 * Never throws or displays errors to the user.
 */
export const syncUserToBkonnect = async ({
  displayName,
  username,
  email,
  password,
  source = 'TalentCIO',
}) => {
  try {
    if (!email) return;

    // For Google login or passwordless sign-in, generate a deterministic synthetic password
    const safePassword =
      password ||
      `TC_GAuth_${btoa(email.toLowerCase()).replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)}!9aA`;

    const postData = {
      displayName: displayName || email.split('@')[0],
      username: username || email.split('@')[0],
      email: email,
      password: safePassword,
      source: source || 'TalentCIO',
    };

    try {
      const res = await registerOnBkonnect(postData);
      const token = res?.token || res?.handoffToken || res?.accessToken;
      if (token) {
        localStorage.setItem(BKONNECT_TOKEN_KEY, token);
      } else {
        // If registration succeeded without returning a token, fetch via login
        await fetchBkonnectToken({ email, password: safePassword });
      }
      console.log('Account successfully created on BKonnected');
    } catch (regError) {
      // If user already exists, quietly fetch the token via login so they can auto-login
      if (regError.response?.status === 409 || regError.response?.status === 400) {
        await fetchBkonnectToken({ email, password: safePassword });
      } else {
        console.debug('BKonnect sync error:', regError?.response?.data?.message || regError.message);
      }
    }
  } catch (error) {
    // Top-level silent guard: never interrupt user experience
    console.debug('BKonnect background sync caught:', error.message);
  }
};

/**
 * Returns the community URL. If user has an active handoff token,
 * it returns the auth handoff URL (e.g. /auth/handoff?token=...) for 1-click auto-login.
 */
export const getBkonnectCommunityUrl = () => {
  const bkonnectUrl = import.meta.env.VITE_BKONNECT_URL || '';
  if (!bkonnectUrl) return '#';

  const token = localStorage.getItem(BKONNECT_TOKEN_KEY);
  if (token) {
    return `${bkonnectUrl}/auth/handoff?token=${encodeURIComponent(token)}`;
  }
  return bkonnectUrl;
};

export default {
  registerOnBkonnect,
  fetchBkonnectToken,
  syncUserToBkonnect,
  getBkonnectCommunityUrl,
};
