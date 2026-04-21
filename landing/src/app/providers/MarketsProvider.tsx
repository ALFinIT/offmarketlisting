'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { initialMarkets, type Listing, type Market } from "../lib/marketsData";

type ListingInput = Omit<Listing, "id"> & { id?: string };

type MarketsContextValue = {
  markets: Market[];
  ready: boolean;
  addListing: (marketSlug: string, listing: ListingInput) => void;
  updateListing: (marketSlug: string, listingId: string, updates: Partial<Listing>) => void;
  deleteListing: (marketSlug: string, listingId: string) => void;
  setStatus: (marketSlug: string, listingId: string, status: string) => void;
};

const MarketsContext = createContext<MarketsContextValue | null>(null);
const STORAGE_KEY = "oml:markets:v3";

function withId(listing: ListingInput): Listing {
  const id = listing.id ?? (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
  return { ...listing, id };
}

export function MarketsProvider({ children }: { children: ReactNode }) {
  const [markets, setMarkets] = useState<Market[]>(initialMarkets);
  const ready = true;
  const hydratedRef = useRef(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Load data in background
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Market[];
        if (Array.isArray(parsed) && parsed.length) {
          setMarkets(parsed);
        }
      }
    } catch (error) {
      console.warn("Unable to read stored markets", error);
    } finally {
      hydratedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(markets));
      }
    } catch (error) {
      console.warn("Unable to persist markets", error);
    }
  }, [markets]);

  const addListing = (marketSlug: string, listing: ListingInput) => {
    setMarkets((prev) =>
      prev.map((market) =>
        market.slug === marketSlug
          ? { ...market, listings: [withId(listing), ...market.listings] }
          : market
      )
    );
  };

  const updateListing = (marketSlug: string, listingId: string, updates: Partial<Listing>) => {
    setMarkets((prev) =>
      prev.map((market) =>
        market.slug === marketSlug
          ? {
              ...market,
              listings: market.listings.map((listing) =>
                listing.id === listingId ? { ...listing, ...updates, id: listing.id } : listing
              ),
            }
          : market
      )
    );
  };

  const deleteListing = (marketSlug: string, listingId: string) => {
    setMarkets((prev) =>
      prev.map((market) =>
        market.slug === marketSlug
          ? { ...market, listings: market.listings.filter((listing) => listing.id !== listingId) }
          : market
      )
    );
  };

  const setStatus = useCallback((marketSlug: string, listingId: string, status: string) => {
    updateListing(marketSlug, listingId, { status });
  }, [updateListing]);

  const value = useMemo(
    () => ({
      markets,
      ready,
      addListing,
      updateListing,
      deleteListing,
      setStatus,
    }),
    [markets, ready, addListing, updateListing, deleteListing, setStatus]
  );

  return <MarketsContext.Provider value={value}>{children}</MarketsContext.Provider>;
}

export function useMarkets() {
  const ctx = useContext(MarketsContext);
  if (!ctx) throw new Error("useMarkets must be used within MarketsProvider");
  return ctx;
}

export default MarketsProvider;
