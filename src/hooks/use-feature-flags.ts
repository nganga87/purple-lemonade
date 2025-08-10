
'use client';

import { useState, useEffect, useCallback } from 'react';

const FEATURE_FLAGS_KEY = 'addressChainFeatureFlags';

type FeatureFlags = {
  addressMarketplace: boolean;
  shareMarket: boolean;
  tokenization: boolean;
};

const defaultFlags: FeatureFlags = {
  addressMarketplace: true,
  shareMarket: true,
  tokenization: true,
};

function getInitialFlags(): FeatureFlags {
  if (typeof window === 'undefined') {
    return defaultFlags;
  }
  try {
    const item = window.localStorage.getItem(FEATURE_FLAGS_KEY);
    return item ? { ...defaultFlags, ...JSON.parse(item) } : defaultFlags;
  } catch (error) {
    console.warn(`Error reading localStorage key “${FEATURE_FLAGS_KEY}”:`, error);
    return defaultFlags;
  }
}

export default function useFeatureFlags() {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(getInitialFlags);

  useEffect(() => {
    setFeatureFlags(getInitialFlags());
  }, []);

  const setFeatureFlag = useCallback((flag: keyof FeatureFlags, value: boolean) => {
    setFeatureFlags((prevFlags) => {
      const newFlags = { ...prevFlags, [flag]: value };
      try {
        window.localStorage.setItem(FEATURE_FLAGS_KEY, JSON.stringify(newFlags));
      } catch (error) {
        console.warn(`Error setting localStorage key “${FEATURE_FLAGS_KEY}”:`, error);
      }
      return newFlags;
    });
  }, []);

  return { featureFlags, setFeatureFlag };
}
