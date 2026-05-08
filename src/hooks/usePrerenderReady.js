import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function usePrerenderReady(isReady = true) {
  const location = useLocation();

  useEffect(() => {
    if (!isReady || typeof document === 'undefined') {
      return;
    }

    const dispatchReadyEvent = () => {
      document.dispatchEvent(new Event('render-event'));
    };

    const delay = location.pathname === '/jobs' ? 600 : 250;
    const timeoutId = window.setTimeout(dispatchReadyEvent, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isReady, location.hash, location.pathname, location.search]);
}
