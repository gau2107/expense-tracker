import { useCallback, useRef } from 'react';

export default function useDebounce() {
  const timeoutRef = useRef(null);

  return useCallback((callback, delay) => {
    return (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }, []);
}