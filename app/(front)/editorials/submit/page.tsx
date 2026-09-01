"use client";

import Link from "next/link";
import { useActionState } from "react";
import { H1, Kicker, Lead, Muted, P } from "@/components/typography";
import { cn } from "@/lib/utils";
import { submitEditorial } from "./actions";

const LABEL_CLASS =
  "mb-1.5 block text-xs font-extrabold tracking-wide text-slate-600 uppercase";
const INPUT_CLASS =
  "w-full rounded-sm border border-slate-300 px-3 py-2 text-[15px] text-slate-900 outline-none focus:border-brand focus:ring-1 focus:ring-brand";

export default function SubmitEditorialPage() {
  const [state, formAction, isPending] = useActionState(submitEditorial, {
    status: "idle",
  });

  if (state.status === "success") {
    return (
      <main className="container mx-auto px-6 pt-11 pb-24">
        <div className="mx-auto max-w-190">
          <Kicker section="Opinion" />
          <H1 className="mt-3.5 font-extrabold">Submission received</H1>
          <Lead className="mt-4">
            Thanks — your draft is in our queue. We'll reach out at the email
            you provided if we have questions or need sourcing before it can
            run. Publication isn't guaranteed; we choose what runs.
          </Lead>
          <Link
            href="/editorials"
            className="mt-8 inline-block text-[13px] font-bold tracking-wide text-brand uppercase"
          >
            &larr; Back to the submission guide
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 pt-11 pb-24">
      <div className="mx-auto max-w-190">
        <Kicker section="Opinion" />
        <H1 className="mt-3.5 font-extrabold">Submit an Editorial</H1>
        <Lead className="mt-4">
          Read the{" "}
          <Link href="/editorials" className="font-bold text-brand underline">
            submission guide
          </Link>{" "}
          first, especially the sourcing requirements — a submission without
          sources for its factual claims will be sent back.
        </Lead>

        <form action={formAction} className="mt-10 space-y-7">
          {/* Honeypot — real visitors never see this field. */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Field
            id="name"
            name="name"
            label="Your name"
            hint="As you want it published."
            errors={state.fieldErrors?.name}
          />

          <Field
            id="email"
            name="email"
            type="email"
            label="Contact email"
            hint="Not published — for follow-up only."
            errors={state.fieldErrors?.email}
          />

          <Field
            id="title"
            name="title"
            label="Suggested title"
            required={false}
            errors={state.fieldErrors?.title}
          />

          <Field
            id="thesis"
            name="thesis"
            label="Your point, in one sentence"
            as="textarea"
            rows={2}
            errors={state.fieldErrors?.thesis}
          />

          <Field
            id="body"
            name="body"
            label="Draft text"
            as="textarea"
            rows={16}
            errors={state.fieldErrors?.body}
          />

          <Field
            id="sources"
            name="sources"
            label="Sources"
            hint="One link or citation per line — at least one is required."
            as="textarea"
            rows={5}
            errors={state.fieldErrors?.sources}
          />

          {state.status === "error" && state.message ? (
            <P className="mt-0 font-bold text-brand">{state.message}</P>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2.5 bg-brand px-6 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Submitting…" : "Submit for review"}
          </button>
        </form>
      </div>
    </main>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  hint?: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  required?: boolean;
  errors?: string[];
};

function Field({
  id,
  name,
  label,
  hint,
  type = "text",
  as = "input",
  rows,
  required = true,
  errors,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
        {required ? null : (
          <span className="ml-1 font-medium normal-case text-slate-400">
            (optional)
          </span>
        )}
      </label>
      {hint ? <Muted className="mb-1.5 text-xs">{hint}</Muted> : null}
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          className={cn(INPUT_CLASS, "resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          className={INPUT_CLASS}
        />
      )}

      {errors?.length ? (
        <p className="mt-1.5 text-xs font-bold text-brand">{errors[0]}</p>
      ) : null}
    </div>
  );
}
