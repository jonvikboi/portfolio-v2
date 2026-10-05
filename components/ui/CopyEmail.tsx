"use client";

import { useState } from "react";

export default function CopyEmail({ email, label, className = "" }: { email: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const roll = "block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)]";

  return (
    <button
      type="button"
      onClick={copy}
      data-cursor="Copy"
      aria-label={`Copy email address ${email} to clipboard`}
      className={`relative inline-flex overflow-hidden text-left align-bottom ${className}`}
    >
      <span className={`${roll} ${copied ? "-translate-y-full" : ""}`}>
        <span className="link">{label ?? email}</span>
      </span>
      <span aria-hidden className={`${roll} absolute left-0 top-0 whitespace-nowrap text-primary ${copied ? "translate-y-0" : "translate-y-full"}`}>
        Copied!
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email copied" : ""}
      </span>
    </button>
  );
}
