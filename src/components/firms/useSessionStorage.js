import { useEffect } from 'react';

const useSessionStorage = (key, value, onLoad) => {
  // Load from sessionStorage on mount
  useEffect(() => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue && onLoad) {
      onLoad(JSON.parse(savedValue));
    }
  }, [key, onLoad]);

  // Save to sessionStorage whenever the value changes
  useEffect(() => {
    if (value !== undefined) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);
};

export default useSessionStorage;
