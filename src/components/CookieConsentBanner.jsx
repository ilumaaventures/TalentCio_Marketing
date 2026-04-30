import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  applyAnalyticsConsent,
  DEFAULT_COOKIE_PREFERENCES,
  getStoredCookieConsent,
  storeCookieConsent,
  trackPageView
} from '../lib/analytics';

const COOKIE_SETTINGS_EVENT = 'talentcio:open-cookie-settings';
const INITIAL_BANNER_PREFERENCES = {
  ...DEFAULT_COOKIE_PREFERENCES,
  analytics: true
};

export default function CookieConsentBanner() {
  const location = useLocation();
  const pagePath = useMemo(
    () => `${location.pathname}${location.search}${location.hash}`,
    [location.hash, location.pathname, location.search]
  );
  const storedConsent = useMemo(() => getStoredCookieConsent(), []);
  const [isVisible, setIsVisible] = useState(!storedConsent);
  const [isCustomizing, setIsCustomizing] = useState(!storedConsent);
  const [preferences, setPreferences] = useState(
    storedConsent?.preferences || INITIAL_BANNER_PREFERENCES
  );

  useEffect(() => {
    const openCookieSettings = () => {
      const latestConsent = getStoredCookieConsent();
      setPreferences(latestConsent?.preferences || INITIAL_BANNER_PREFERENCES);
      setIsCustomizing(true);
      setIsVisible(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, openCookieSettings);

    return () => {
      window.removeEventListener(COOKIE_SETTINGS_EVENT, openCookieSettings);
    };
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    setIsCustomizing(false);
  };

  const persistConsent = async (status, nextPreferences) => {
    storeCookieConsent(status, nextPreferences);
    const enabled = await applyAnalyticsConsent(Boolean(nextPreferences.analytics));

    if (enabled && nextPreferences.analytics) {
      trackPageView(pagePath);
    }

    closeBanner();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:p-5">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.45)]">
        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Cookies</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
              Choose how TalentCIO uses cookies
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              We use essential cookies to keep the site working. With your permission, we also use
              analytics cookies to understand traffic and improve the marketing experience.
            </p>
            <div className="mt-3">
              <Link to="/cookies" className="text-sm font-semibold text-blue-700 transition hover:text-blue-800">
                Read our Cookies Policy
              </Link>
            </div>

            {!isCustomizing && (
              <div className="mt-5 rounded-[22px] border border-blue-200 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
                <strong>Recommended:</strong> Accept all to help us understand visits, page performance,
                and campaign effectiveness while keeping essential site functions active.
              </div>
            )}

            {isCustomizing && (
              <div className="mt-5 grid gap-3">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">Essential cookies</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Required for core site functions, navigation, and security.
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                      Always on
                    </span>
                  </div>
                </div>

                <label className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Analytics cookies</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Help us measure visits and understand which pages and campaigns perform best.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={Boolean(preferences.analytics)}
                      onChange={(event) =>
                        setPreferences((current) => ({
                          ...current,
                          analytics: event.target.checked
                        }))
                      }
                      className="mt-1 h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </label>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:min-w-[240px]">
            <button
              type="button"
              onClick={() => persistConsent('accepted', { essential: true, analytics: true })}
              className="btn-primary w-full shadow-[0_22px_55px_-22px_rgba(17,92,185,0.95)]"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={() => persistConsent('rejected', { essential: true, analytics: false })}
              className="w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Reject non-essential
            </button>
            {isCustomizing ? (
              <button
                type="button"
                onClick={() => persistConsent('customized', preferences)}
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Save preferences
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsCustomizing(true)}
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Customize preferences
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
