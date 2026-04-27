export const GA_MEASUREMENT_IDS = ['G-4Z5SHXV17F', 'G-S885N066JW'];

const canTrack = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

export const trackPageView = (pagePath) => {
  if (!canTrack()) {
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

export const trackEvent = (eventName, params = {}) => {
  if (!canTrack()) {
    return;
  }

  GA_MEASUREMENT_IDS.forEach((measurementId) => {
    window.gtag('event', eventName, {
      send_to: measurementId,
      ...params
    });
  });
};
