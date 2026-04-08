'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
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
const STORAGE_KEY = "oml:markets:v1";

function withId(listing: ListingInput): Listing {
  const id = listing.id ?? (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
  return { ...listing, id };
}

export function MarketsProvider({ children }: { children: ReactNode }) {
  const [markets, setMarkets] = useState<Market[]>(initialMarkets);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as Market[];
        if (Array.isArray(parsed) && parsed.length) {
          setMarkets(parsed);
        }
      }
    } catch (error) {
      console.warn("Unable to read stored markets", error);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(markets));
    } catch (error) {
      console.warn("Unable to persist markets", error);
    }
  }, [markets, ready]);

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

  const setStatus = (marketSlug: string, listingId: string, status: string) => {
    updateListing(marketSlug, listingId, { status });
  };

  const value = useMemo(
    () => ({
      markets,
      ready,
      addListing,
      updateListing,
      deleteListing,
      setStatus,
    }),
    [markets, ready]
  );

  return <MarketsContext.Provider value={value}>{children}</MarketsContext.Provider>;
}

export function useMarkets() {
  const ctx = useContext(MarketsContext);
  if (!ctx) throw new Error("useMarkets must be used within MarketsProvider");
  return ctx;
}

export default MarketsProvider;
