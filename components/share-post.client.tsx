"use client";

import { useId, useRef, useState } from "react";
import { Eyebrow } from "@/components/typography";
import {
  emailShareUrl,
  facebookShareUrl,
  linkedInShareUrl,
  shareText,
  xShareUrl,
} from "@/lib/share-urls";
import { cn } from "@/lib/utils";

type SharePostProps = {
  url: string;
  title: string;
  text?: string;
  className?: string;
};

const LINK_CLASS_NAME =
  "inline-flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-[12px] font-bold tracking-wide text-dek uppercase transition-colors hover:bg-tint hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const buttonClassName = cn(
  LINK_CLASS_NAME,
  "border-0 bg-transparent cursor-pointer",
);

export default function SharePost({
  url,
  title,
  text,
  className,
}: SharePostProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  // Holds the "Copied"/"failed" reset timer started from click handlers only.
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusId = useId();

  const payload = { url, title, text };

  function scheduleCopyReset() {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setCopyState("idle");
      resetTimerRef.current = null;
    }, 2000);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
      scheduleCopyReset();
    } catch {
      // Clipboard can fail without permission or a secure context.
      setCopyState("failed");
      scheduleCopyReset();
    }
  }

  async function shareNative() {
    if (typeof navigator.share !== "function") {
      await copyLink();
      return;
    }

    try {
      await navigator.share({
        title,
        text: shareText({ title, text }),
        url,
      });
    } catch (error) {
      // User-cancelled share sheets should be silent.
      if (error instanceof DOMException && error.name === "AbortError") return;
      await copyLink();
    }
  }

  return (
    <section
      className={cn("border-t border-border pt-5", className)}
      aria-labelledby="share-post-heading"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Eyebrow id="share-post-heading">Share this story</Eyebrow>
        <ul className="flex flex-wrap items-center gap-0.5">
          <li>
            <button
              type="button"
              className={buttonClassName}
              onClick={() => {
                void shareNative();
              }}
            >
              <ShareIcon className="size-3.5" />
              Share
            </button>
          </li>
          <li>
            <button
              type="button"
              className={buttonClassName}
              onClick={() => {
                void copyLink();
              }}
              aria-describedby={statusId}
            >
              <LinkIcon className="size-3.5" />
              {copyState === "copied" ? "Copied" : "Copy link"}
            </button>
          </li>
          <li>
            <a
              href={xShareUrl(payload)}
              className={LINK_CLASS_NAME}
              target="_blank"
              rel="noopener noreferrer"
            >
              <XIcon className="size-3.5" />
              <span className="sr-only">Share on </span>X
            </a>
          </li>
          <li>
            <a
              href={facebookShareUrl(payload)}
              className={LINK_CLASS_NAME}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="size-3.5" />
              Facebook
            </a>
          </li>
          <li>
            <a
              href={linkedInShareUrl(payload)}
              className={LINK_CLASS_NAME}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className="size-3.5" />
              LinkedIn
            </a>
          </li>
          <li>
            <a href={emailShareUrl(payload)} className={LINK_CLASS_NAME}>
              <EmailIcon className="size-3.5" />
              Email
            </a>
          </li>
        </ul>
      </div>
      <p id={statusId} className="sr-only" aria-live="polite">
        {copyState === "copied"
          ? "Link copied to clipboard"
          : copyState === "failed"
            ? "Could not copy link"
            : ""}
      </p>
    </section>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.64 9.13 8.4 9.93v-7.03H7.9v-2.9h2.36V9.84c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.9h-2.18V22c4.76-.8 8.4-4.94 8.4-9.93z" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}
