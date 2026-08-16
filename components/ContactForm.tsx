"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-ink/15 p-8">
        <p className="font-display text-xl mb-2">Message sent.</p>
        <p className="font-body text-sm text-slate">
          We reply to most notes within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block font-body text-sm mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full border border-ink/20 bg-paper px-4 py-3 font-body text-sm focus:outline-none focus:border-rust"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-body text-sm mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-ink/20 bg-paper px-4 py-3 font-body text-sm focus:outline-none focus:border-rust"
        />
      </div>
      <div>
        <label htmlFor="reason" className="block font-body text-sm mb-1.5">
          This is about
        </label>
        <select
          id="reason"
          name="reason"
          className="w-full border border-ink/20 bg-paper px-4 py-3 font-body text-sm focus:outline-none focus:border-rust"
        >
          <option>Manuscript submission</option>
          <option>Editorial services</option>
          <option>Press / media</option>
          <option>Something else</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block font-body text-sm mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full border border-ink/20 bg-paper px-4 py-3 font-body text-sm focus:outline-none focus:border-rust"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full sm:w-auto disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
      {status === "error" && (
        <p role="alert" className="font-body text-sm text-rust">
          Something went wrong on our end — please try again or email us
          directly.
        </p>
      )}
    </form>
  );
}
