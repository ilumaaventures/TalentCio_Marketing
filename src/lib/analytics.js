export const GA_MEASUREMENT_IDS = ['G-4Z5SHXV17F', 'G-S885N066JW'];
export const COOKIE_CONSENT_STORAGE_KEY = 'talentcio_cookie_consent';
export const DEFAULT_COOKIE_PREFERENCES = {
  essential: true,
  analytics: false
};

let analyticsBootPromise = null;

const canUseBrowser = () => typeof window !== 'undefined';

const setAnalyticsDisabled = (disabled) => {
  if (!canUseBrowser()) {
    return;
  }

  GA_MEASUREMENT_IDS.forEach((measurementId) => {
    window[`ga-disable-${measurementId}`] = disabled;
  });
};

const ensureGtagStub = () => {
  if (!canUseBrowser()) {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
};

const configureAnalytics = () => {
  if (!canUseBrowser() || typeof window.gtag !== 'function') {
    return;
  }

  if (window.__talentcioAnalyticsConfigured) {
    return;
  }

  window.gtag('js', new Date());
  GA_MEASUREMENT_IDS.forEach((measurementId) => {
    window.gtag('config', measurementId, { send_page_view: false });
  });
  window.__talentcioAnalyticsConfigured = true;
};

const dispatchPageView = (pagePath) => {
  if (!canUseBrowser() || typeof window.gtag !== 'function') {
    return;
  }

  GA_MEASUREMENT_IDS.forEach((measurementId) => {
    window.gtag('config', measurementId, {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title
    });
  });
};

const dispatchEvent = (eventName, params) => {
  if (!canUseBrowser() || typeof window.gtag !== 'function') {
    return;
  }

  GA_MEASUREMENT_IDS.forEach((measurementId) => {
    window.gtag('event', eventName, {
      send_to: measurementId,
      ...params
    });
  });
};

export const getStoredCookieConsent = () => {
  if (!canUseBrowser()) {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue);
    return {
      status: parsed.status || 'customized',
      preferences: {
        ...DEFAULT_COOKIE_PREFERENCES,
        ...(parsed.preferences || {})
      },
      updatedAt: parsed.updatedAt || null
    };
  } catch (error) {
    return null;
  }
};

export const hasAnalyticsConsent = () => Boolean(getStoredCookieConsent()?.preferences?.analytics);

export const storeCookieConsent = (status, preferences) => {
  if (!canUseBrowser()) {
    return;
  }

  window.localStorage.setItem(
    COOKIE_CONSENT_STORAGE_KEY,
    JSON.stringify({
      status,
      preferences: {
        ...DEFAULT_COOKIE_PREFERENCES,
        ...preferences
      },
      updatedAt: new Date().toISOString()
    })
  );
};

export const loadGoogleAnalytics = async () => {
  if (!canUseBrowser() || !hasAnalyticsConsent()) {
    return false;
  }

  setAnalyticsDisabled(false);

  if (window.__talentcioAnalyticsLoaded) {
    ensureGtagStub();
    configureAnalytics();
    return true;
  }

  if (analyticsBootPromise) {
    return analyticsBootPromise;
  }

  analyticsBootPromise = new Promise((resolve) => {
    const existingScript = document.getElementById('talentcio-ga-script');

    ensureGtagStub();

    if (existingScript) {
      configureAnalytics();
      window.__talentcioAnalyticsLoaded = true;
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'talentcio-ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_IDS[0]}`;
    script.onload = () => {
      window.__talentcioAnalyticsLoaded = true;
      configureAnalytics();
      resolve(true);
    };
    script.onerror = () => {
      analyticsBootPromise = null;
      resolve(false);
    };

    document.head.appendChild(script);
  });

  return analyticsBootPromise;
};

export const applyAnalyticsConsent = async (enabled) => {
  setAnalyticsDisabled(!enabled);

  if (!enabled) {
    return false;
  }

  return loadGoogleAnalytics();
};

export const trackPageView = (pagePath) => {
  if (!hasAnalyticsConsent()) {
    return;
  }

  if (canUseBrowser() && typeof window.gtag === 'function' && window.__talentcioAnalyticsLoaded) {
    dispatchPageView(pagePath);
    return;
  }

  loadGoogleAnalytics().then((loaded) => {
    if (loaded && hasAnalyticsConsent()) {
      dispatchPageView(pagePath);
    }
  });
};

export const trackEvent = (eventName, params = {}) => {
  if (!hasAnalyticsConsent()) {
    return;
  }

  if (canUseBrowser() && typeof window.gtag === 'function' && window.__talentcioAnalyticsLoaded) {
    dispatchEvent(eventName, params);
    return;
  }

  loadGoogleAnalytics().then((loaded) => {
    if (loaded && hasAnalyticsConsent()) {
      dispatchEvent(eventName, params);
    }
  });
};
