import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useLocalStorage = (key, value, onLoad) => {
  const router = useRouter();
  const shouldSyncRef = { current: false };

  useEffect(() => {
    // Handle route changes
    const handleRouteChange = (url) => {
      shouldSyncRef.current = url.includes('/firm');
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  // Load from localStorage when navigating to the firm page
  useEffect(() => {
    if (shouldSyncRef.current) {
      const savedValue = localStorage.getItem(key);
      if (savedValue && onLoad) {
        onLoad(JSON.parse(savedValue));
      }
    }
  }, [key, onLoad]);

  // Save to localStorage when navigating to/from the firm page and value changes
  useEffect(() => {
    if (shouldSyncRef.current && value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);
};

export default useLocalStorage;
