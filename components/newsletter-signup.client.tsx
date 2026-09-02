"use client";

import { useActionState } from "react";
import {
  type SubscribeState,
  subscribeNewsletter,
} from "@/app/(front)/subscribe/actions";
import { cn } from "@/lib/utils";

type NewsletterSignupProps = {
  /** footer = compact dark chrome; page = full light form */
  variant?: "footer" | "page";
  className?: string;
  showName?: boolean;
};

const initial: SubscribeState = { status: "idle" };

export default function NewsletterSignup({
  variant = "page",
  className,
  showName = variant === "page",
}: NewsletterSignupProps) {
  const [state, formAction, isPending] = useActionState(
    subscribeNewsletter,
    initial,
  );

  const isFooter = variant === "footer";

  if (state.status === "success") {
    return (
      <p
        className={cn(
          isFooter
            ? "text-sm text-brand-tint"
            : "font-serif text-lg text-heading italic",
          className,
        )}
        role="status"
      >
        {state.message ?? "You're on the list."}
      </p>
    );
  }

  return (
    <form
      key={state.formKey ?? "subscribe"}
      action={formAction}
      className={cn(
        isFooter
          ? "flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-stretch"
          : "flex max-w-md flex-col gap-3",
        className,
      )}
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`company-${variant}`}>Company</label>
        <input
          id={`company-${variant}`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {showName ? (
        <div>
          {!isFooter ? (
            <label
              htmlFor={`firstName-${variant}`}
              className="mb-1.5 block text-xs font-extrabold tracking-wide text-dek uppercase"
            >
              First name{" "}
              <span className="font-medium normal-case text-muted-2">
                (optional)
              </span>
            </label>
          ) : null}
          <input
            id={`firstName-${variant}`}
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder={isFooter ? "First name (optional)" : undefined}
            defaultValue={state.firstName}
            className={fieldClass(isFooter)}
          />
        </div>
      ) : null}

      <div
        className={cn(!isFooter && "contents", isFooter && "min-w-0 flex-1")}
      >
        {!isFooter ? (
          <label
            htmlFor={`email-${variant}`}
            className="mb-1.5 block text-xs font-extrabold tracking-wide text-dek uppercase"
          >
            Email
          </label>
        ) : null}
        <input
          id={`email-${variant}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={isFooter ? "you@example.com" : undefined}
          defaultValue={state.email}
          className={cn(fieldClass(isFooter), isFooter && "w-full")}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "shrink-0 text-sm font-bold tracking-wide uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-60",
          isFooter
            ? "bg-brand px-4 py-2.5 text-white hover:bg-brand-dark"
            : "bg-brand px-6 py-3.5 text-white hover:bg-brand-dark",
        )}
      >
        {isPending ? "Joining…" : "Subscribe"}
      </button>

      {state.status === "error" && state.message ? (
        <p
          className={cn(
            "text-xs font-bold",
            isFooter ? "basis-full text-brand-tint" : "text-brand",
          )}
          role="alert"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function fieldClass(isFooter: boolean) {
  return isFooter
    ? "w-full rounded-sm border border-slate-600 bg-ink px-3 py-2 text-[14px] text-brand-tint outline-none placeholder:text-slate-500 focus:border-brand-tint"
    : "w-full rounded-sm border border-border px-3 py-2 text-[15px] text-heading outline-none focus:border-brand focus:ring-1 focus:ring-brand";
}
