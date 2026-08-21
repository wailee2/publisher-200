"use client";

import { useState } from "react";
import { PillButton } from "@/components/PillButton";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

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
      <div className="border border-border rounded-xl p-8">
        <p className="font-display text-large font-semibold text- mb-2">Message sent.</p>
        <p className="font-body text-small text-text-secondary">
          We reply to most notes within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Full Name*"
        required
        className="w-full border border-border rounded-lg bg-bg px-4 py-3.5 font-body text-small text- placeholder:text-text-muted focus:outline-none focus:border-border-hover"
      />
      <input
        name="email"
        type="email"
        placeholder="Email*"
        required
        className="w-full border border-border rounded-lg bg-bg px-4 py-3.5 font-body text-small text- placeholder:text-text-muted focus:outline-none focus:border-border-hover"
      />
      <input
        name="subject"
        placeholder="Subject*"
        required
        className="w-full border border-border rounded-lg bg-bg px-4 py-3.5 font-body text-small text- placeholder:text-text-muted focus:outline-none focus:border-border-hover"
      />
      <textarea
        name="message"
        placeholder="Message*"
        required
        rows={6}
        className="w-full border border-border rounded-lg bg-bg px-4 py-3.5 font-body text-small placeholder:text-text-muted focus:outline-none focus:border-border-hover"
      />
      <PillButton
        variant="pill-primary"
        type="submit"
        loading={status === "loading"}
        loadingText="Sending..."
        className="btn-pill-primary w-full text-small flex justify-between disabled:opacity-60"
      >
        Send message
      </PillButton>
      {status === "error" && (
        <p role="alert" className=" text-small ">
          Something went wrong on our end — please try again or email us directly.
        </p>
      )}
    </form>
  );
}
