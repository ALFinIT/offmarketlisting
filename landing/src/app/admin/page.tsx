'use client';

import { useEffect, useMemo, useState } from "react";
import { useMarkets } from "../providers/MarketsProvider";
import type { Listing } from "../lib/marketsData";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "offmarket2026";
const PLACEHOLDER_IMAGE = "/markets/istanbul/galata-ferry.jpg";

type FormState = {
  marketSlug: string;
  title: string;
  location: string;
  price: string;
  size: string;
  highlights: string;
  status: string;
  images: string;
};

const emptyForm = (defaultMarket: string): FormState => ({
  marketSlug: defaultMarket,
  title: "",
  location: "",
  price: "",
  size: "",
  highlights: "",
  status: "Available",
  images: "",
});

function pill(color: string, label: string) {
  return (
    <span
      style={{
        background: color,
        color: "#0f1e30",
        padding: "0.15rem 0.55rem",
        borderRadius: "999px",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  );
}

export default function AdminPage() {
  const { markets, ready, addListing, updateListing, deleteListing, setStatus } = useMarkets();
  const defaultMarket = markets[0]?.slug || "istanbul";
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [authed, setAuthed] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm(defaultMarket));
  const [editing, setEditing] = useState<{ id: string | null; market: string | null }>({ id: null, market: null });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (ready && markets.length && !form.marketSlug) {
      setForm(emptyForm(markets[0].slug));
    }
  }, [ready, markets, form.marketSlug]);

  const activeMarket = markets.find((m) => m.slug === form.marketSlug) || markets[0];

  const marketStats = useMemo(
    () =>
      markets.map((market) => {
        const sold = market.listings.filter((l) => (l.status || "").toLowerCase() === "sold").length;
        return {
          slug: market.slug,
          name: market.name,
          total: market.listings.length,
          sold,
          available: market.listings.length - sold,
        };
      }),
    [markets]
  );

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (creds.username === ADMIN_USERNAME && creds.password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
      setInfo("Logged in as admin. Remember to keep image paths local (/public).");
    } else {
      setError("Invalid credentials. Hint: admin / offmarket2026");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setInfo("");

    const trimmedImages = form.images
      .split(/[,\\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (!trimmedImages.length) {
      setError("Add at least one image path stored in /public (e.g. /markets/istanbul/galata-ferry.jpg).");
      return;
    }
    if (trimmedImages.some((src) => !src.startsWith("/"))) {
      setError("Use local image paths that start with '/'. Remote URLs are blocked for listings.");
      return;
    }

    const highlights = form.highlights
      .split(/[,\\n]/)
      .map((h) => h.trim())
      .filter(Boolean);

    const payload: Omit<Listing, "id"> = {
      title: form.title || "Untitled listing",
      location: form.location || "Location tbc",
      price: form.price || "Price on request",
      size: form.size || "",
      highlights: highlights.length ? highlights : ["Detail pending"],
      status: form.status || "Available",
      images: trimmedImages,
    };

    if (editing.id && editing.market) {
      updateListing(editing.market, editing.id, payload as Listing);
      setInfo("Listing updated.");
    } else {
      addListing(form.marketSlug, payload as Listing);
      setInfo("Listing added.");
    }

    setForm(emptyForm(form.marketSlug));
    setEditing({ id: null, market: null });
  };

  const handleEdit = (marketSlug: string, listing: Listing) => {
    setEditing({ id: listing.id, market: marketSlug });
    setForm({
      marketSlug,
      title: listing.title,
      location: listing.location,
      price: listing.price,
      size: listing.size,
      highlights: listing.highlights.join(", "),
      status: listing.status || "Available",
      images: listing.images.join(", "),
    });
    setInfo("Editing listing. Save to apply changes.");
  };

  const handleDelete = (marketSlug: string, id: string) => {
    deleteListing(marketSlug, id);
    if (editing.id === id) {
      setForm(emptyForm(marketSlug));
      setEditing({ id: null, market: null });
    }
    setInfo("Listing removed.");
  };

  const toggleSold = (marketSlug: string, listing: Listing) => {
    const nextStatus = (listing.status || "").toLowerCase() === "sold" ? "Available" : "Sold";
    setStatus(marketSlug, listing.id, nextStatus);
    setInfo(`Status set to ${nextStatus}.`);
  };

  if (!ready) {
    return (
      <main style={{ padding: "5rem 3rem", background: "var(--cream)", minHeight: "100vh" }}>
        <div style={{ color: "var(--muted)" }}>Loading markets…</div>
      </main>
    );
  }

  if (!authed) {
    return (
      <main style={{ padding: "6rem 3rem", background: "var(--cream)", minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <form
          onSubmit={handleLogin}
          style={{
            background: "white",
            border: "1px solid var(--border)",
            padding: "2rem",
            width: "360px",
            boxShadow: "0 18px 40px rgba(26,46,74,0.12)",
            borderRadius: "14px",
          }}
        >
          <div style={{ fontFamily: "var(--display-font)", fontSize: "1.8rem", color: "var(--navy)", marginBottom: "1rem" }}>Admin</div>
          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)" }}>
            Username
            <input
              type="text"
              value={creds.username}
              onChange={(e) => setCreds({ ...creds, username: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", marginTop: "0.3rem", border: "1px solid var(--border)", borderRadius: "10px" }}
              autoComplete="username"
            />
          </label>
          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.9rem" }}>
            Password
            <input
              type="password"
              value={creds.password}
              onChange={(e) => setCreds({ ...creds, password: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", marginTop: "0.3rem", border: "1px solid var(--border)", borderRadius: "10px" }}
              autoComplete="current-password"
            />
          </label>
          {error && <div style={{ color: "#b00020", marginTop: "0.8rem", fontSize: "0.85rem" }}>{error}</div>}
          <button
            type="submit"
            style={{
              marginTop: "1.2rem",
              width: "100%",
              padding: "0.85rem",
              background: "var(--navy)",
              color: "white",
              borderRadius: "12px",
              border: "none",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
          <p style={{ color: "var(--muted)", marginTop: "0.75rem", fontSize: "0.8rem" }}>
            Route only: http://localhost:3000/admin. No navigation links are exposed on the public site.
          </p>
        </form>
      </main>
    );
  }

  return (
    <main style={{ padding: "4.5rem 3rem", background: "var(--cream)", minHeight: "100vh" }}>
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <div>
          <div style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", fontSize: "0.7rem", fontWeight: 700 }}>
            Admin Dashboard
          </div>
          <h1 style={{ margin: "0.3rem 0", color: "var(--navy)", fontFamily: "var(--display-font)", fontWeight: 300 }}>Manage Listings</h1>
          <p style={{ color: "var(--muted)", maxWidth: "720px" }}>
            Changes are saved locally (browser storage) and instantly reflected on the homepage and market detail pages. Keep image paths in
            <code style={{ marginLeft: "0.3rem" }}>/public</code>.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          {pill("var(--gold-light)", "Logged in")}
          <a href="/#cities" style={{ color: "var(--navy)", fontSize: "0.85rem" }}>
            View site
          </a>
        </div>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "1.6rem",
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            padding: "1.6rem",
            boxShadow: "0 14px 28px rgba(26,46,74,0.08)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.6rem" }}>
            <h2 style={{ margin: 0, fontFamily: "var(--display-font)", fontWeight: 300, color: "var(--navy)" }}>
              {editing.id ? "Edit Listing" : "Add Listing"}
            </h2>
            {editing.id && pill("var(--gold-light)", "Editing")}
          </div>
          <form onSubmit={handleSubmit} style={{ marginTop: "1rem", display: "grid", gap: "0.9rem" }}>
            <label style={{ display: "grid", gap: "0.3rem", fontSize: "0.85rem", color: "var(--muted)" }}>
              Market
              <select
                value={form.marketSlug}
                onChange={(e) => setForm({ ...form, marketSlug: e.target.value })}
                style={{ padding: "0.75rem", borderRadius: "10px", border: "1px solid var(--border)" }}
              >
                {markets.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: "grid", gap: "0.3rem", fontSize: "0.85rem", color: "var(--muted)" }}>
              Title
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={{ padding: "0.75rem", borderRadius: "10px", border: "1px solid var(--border)" }}
                placeholder="Bosphorus Waterfront Yalı"
              />
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              <label style={{ display: "grid", gap: "0.3rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                Location
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  style={{ padding: "0.75rem", borderRadius: "10px", border: "1px solid var(--border)" }}
                  placeholder="Arnavutköy quay"
                />
              </label>
              <label style={{ display: "grid", gap: "0.3rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                Price
                <input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  style={{ padding: "0.75rem", borderRadius: "10px", border: "1px solid var(--border)" }}
                  placeholder="€6.8M"
                />
              </label>
            </div>
            <label style={{ display: "grid", gap: "0.3rem", fontSize: "0.85rem", color: "var(--muted)" }}>
              Size
              <input
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                style={{ padding: "0.75rem", borderRadius: "10px", border: "1px solid var(--border)" }}
                placeholder="620 m² · 7+2"
              />
            </label>
            <label style={{ display: "grid", gap: "0.3rem", fontSize: "0.85rem", color: "var(--muted)" }}>
              Highlights (comma or new-line separated)
              <textarea
                value={form.highlights}
                onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                rows={3}
                style={{ padding: "0.75rem", borderRadius: "10px", border: "1px solid var(--border)", resize: "vertical" }}
                placeholder="Private pier, Historic façade restored 2025, Direct sea frontage"
              />
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              <label style={{ display: "grid", gap: "0.3rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                Status
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  style={{ padding: "0.75rem", borderRadius: "10px", border: "1px solid var(--border)" }}
                >
                  <option>Available</option>
                  <option>Sold</option>
                  <option>Quiet listing</option>
                  <option>New instruction</option>
                </select>
              </label>
              <label style={{ display: "grid", gap: "0.3rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                Images (comma / newline, must start with /)
                <textarea
                  value={form.images}
                  onChange={(e) => setForm({ ...form, images: e.target.value })}
                  rows={2}
                  style={{ padding: "0.75rem", borderRadius: "10px", border: "1px solid var(--border)", resize: "vertical" }}
                  placeholder="/markets/istanbul/galata-ferry.jpg"
                />
              </label>
            </div>
            {error && <div style={{ color: "#b00020", fontSize: "0.85rem" }}>{error}</div>}
            {info && !error && <div style={{ color: "var(--navy)", fontSize: "0.85rem" }}>{info}</div>}
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <button
                type="submit"
                style={{
                  padding: "0.85rem 1.4rem",
                  background: "var(--navy)",
                  color: "white",
                  borderRadius: "10px",
                  border: "none",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {editing.id ? "Save changes" : "Add listing"}
              </button>
              {editing.id && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing({ id: null, market: null });
                    setForm(emptyForm(form.marketSlug));
                  }}
                  style={{
                    padding: "0.85rem 1.4rem",
                    background: "transparent",
                    color: "var(--navy)",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                  }}
                >
                  Cancel edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div
          style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            padding: "1.6rem",
            boxShadow: "0 14px 28px rgba(26,46,74,0.08)",
            display: "grid",
            gap: "0.75rem",
          }}
        >
          <h3 style={{ margin: 0, fontFamily: "var(--display-font)", fontWeight: 300, color: "var(--navy)" }}>Market snapshot</h3>
          {marketStats.map((stat) => (
            <div
              key={stat.slug}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.65rem 0.4rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div style={{ color: "var(--navy)", fontWeight: 600 }}>{stat.name}</div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                {stat.available} available | {stat.sold} sold | {stat.total} total
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "2rem", display: "grid", gap: "1.2rem" }}>
        {markets.map((market) => (
          <div key={market.slug} style={{ background: "white", border: "1px solid var(--border)", borderRadius: "14px", padding: "1.4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
              <div>
                <h3 style={{ margin: 0, color: "var(--navy)", fontFamily: "var(--display-font)", fontWeight: 300 }}>{market.name}</h3>
                <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{market.areas}</div>
              </div>
              {pill("var(--gold-light)", `${market.listings.length} listings`)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "0.9rem" }}>
              {market.listings.map((listing) => (
                <div
                  key={listing.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "var(--cream)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      height: "140px",
                      background: `url('${listing.images[0] || PLACEHOLDER_IMAGE}') center/cover no-repeat`,
                      position: "relative",
                    }}
                  >
                    {listing.status && (
                      <span
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "rgba(0,0,0,0.6)",
                          color: "white",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "6px",
                          fontSize: "0.7rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {listing.status}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "0.9rem", display: "grid", gap: "0.35rem", flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "var(--navy)" }}>{listing.title}</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{listing.location}</div>
                    <div style={{ color: "var(--navy)", fontSize: "0.9rem" }}>{listing.price}</div>
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", padding: "0.9rem" }}>
                    <button
                      onClick={() => handleEdit(market.slug, listing)}
                      style={{
                        flex: 1,
                        padding: "0.6rem",
                        borderRadius: "10px",
                        border: "1px solid var(--border)",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleSold(market.slug, listing)}
                      style={{
                        flex: 1,
                        padding: "0.6rem",
                        borderRadius: "10px",
                        border: "1px solid var(--border)",
                        background: "var(--gold-light)",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      {(listing.status || "").toLowerCase() === "sold" ? "Mark available" : "Mark sold"}
                    </button>
                    <button
                      onClick={() => handleDelete(market.slug, listing.id)}
                      style={{
                        padding: "0.6rem",
                        borderRadius: "10px",
                        border: "1px solid #c53030",
                        background: "#fff5f5",
                        color: "#a00",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
