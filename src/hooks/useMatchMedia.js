import { useSyncExternalStore } from 'react';

/**
 * Subscribes to window.matchMedia. SSR-safe (returns false on server).
 */
export function useMatchMedia(query) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onStoreChange);
      return () => mq.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
