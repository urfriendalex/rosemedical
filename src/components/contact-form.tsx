"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { localized } from "@/lib/content";
import type { Locale, UiStrings } from "@/lib/types";

export function ContactForm({
  locale,
  labels,
}: {
  locale: Locale;
  labels: UiStrings["contactForm"];
}) {
  const copy = {
    name: localized(labels.name, locale),
    email: localized(labels.email, locale),
    company: localized(labels.company, locale),
    message: localized(labels.message, locale),
    submit: localized(labels.submit, locale),
    sending: localized(labels.sending, locale),
    success: localized(labels.success, locale),
    error: localized(labels.error, locale),
  };
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, locale }),
    });

    if (response.ok) {
      form.reset();
      setState("success");
      return;
    }

    setState("error");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-foreground">
          {copy.name}
          <input
            name="name"
            required
            className="h-[52px] rounded-full border border-border bg-white px-5 text-base outline-none transition focus:border-accent/35 focus:ring-4 focus:ring-accent/10"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          {copy.email}
          <input
            name="email"
            type="email"
            required
            className="h-[52px] rounded-full border border-border bg-white px-5 text-base outline-none transition focus:border-accent/35 focus:ring-4 focus:ring-accent/10"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-foreground">
        {copy.company}
        <input
          name="company"
          className="h-[52px] rounded-full border border-border bg-white px-5 text-base outline-none transition focus:border-accent/35 focus:ring-4 focus:ring-accent/10"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-foreground">
        {copy.message}
        <textarea
          name="message"
          required
          rows={5}
          className="resize-none rounded-[28px] border border-border bg-white px-5 py-4 text-base outline-none transition focus:border-accent/35 focus:ring-4 focus:ring-accent/10"
        />
      </label>
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-white transition hover:bg-foreground/90 disabled:cursor-wait disabled:opacity-60"
      >
        <Send aria-hidden size={16} />
        {state === "sending" ? copy.sending : copy.submit}
      </button>
      {state === "success" ? <p className="text-sm text-accent">{copy.success}</p> : null}
      {state === "error" ? <p className="text-sm text-red-700">{copy.error}</p> : null}
    </form>
  );
}
