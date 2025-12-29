"use client";

import { useState, useEffect, DependencyList } from "react";

export function useAsyncEffect(
  effect: (
    isMounted: () => boolean,
    setLoading: (state: boolean) => void
  ) => Promise<void>,
  deps: DependencyList = []
) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const isMounted = () => mounted;

    // Mulai proses async
    setIsLoading(true);

    effect(isMounted, (state: boolean) => {
      if (isMounted()) setIsLoading(state);
    }).finally(() => {
      if (isMounted()) setIsLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, deps);

  return { isLoading };
}
