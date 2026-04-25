import React, { useEffect, useRef, useState } from 'react';
import { GOOGLE_CLIENT_ID, isGoogleAuthEnabled } from '../config/googleAuth';

let googleScriptPromise = null;

const loadGoogleScript = () => {
  if (window.google?.accounts?.id) {
    return Promise.resolve(window.google);
  }

  if (googleScriptPromise) {
    return googleScriptPromise;
  }

  googleScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-google-identity="true"]');

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.google), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Google Identity failed to load.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = 'true';
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error('Google Identity failed to load.'));
    document.head.appendChild(script);
  });

  return googleScriptPromise;
};

export default function GoogleSignInButton({ onCredential, text = 'continue_with', disabled = false }) {
  const containerRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isGoogleAuthEnabled || !containerRef.current) {
      return undefined;
    }

    let active = true;

    loadGoogleScript()
      .then((google) => {
        if (!active || !google?.accounts?.id || !containerRef.current) {
          return;
        }

        setError('');
        containerRef.current.innerHTML = '';

        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: ({ credential }) => {
            if (credential) {
              onCredential?.(credential);
            }
          },
          ux_mode: 'popup',
          auto_select: false
        });

        google.accounts.id.renderButton(containerRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          text,
          width: Math.max(containerRef.current.offsetWidth || 0, 280)
        });
      })
      .catch((loadError) => {
        if (active) {
          setError(loadError.message || 'Google sign-in is unavailable right now.');
        }
      });

    return () => {
      active = false;
    };
  }, [onCredential, text]);

  if (!isGoogleAuthEnabled) {
    return null;
  }

  return (
    <div className={disabled ? 'pointer-events-none opacity-60' : ''}>
      <div ref={containerRef} className="min-h-[44px] w-full" />
      {error ? <p className="mt-2 text-center text-xs text-slate-500">{error}</p> : null}
    </div>
  );
}
