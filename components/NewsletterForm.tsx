"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="font-body text-small text-text-primary">
        You&apos;re subscribed. Watch your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 min-w-0 px-3 py-2 text-small font-body border border-border bg-bg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-hover rounded-lg"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary px-4 py-2 text-xs disabled:opacity-60"
      >
        {status === "loading" ? "..." : "Sign up"}
      </button>
      {status === "error" && (
        <p role="alert" className="sr-only">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
