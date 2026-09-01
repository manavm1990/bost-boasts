import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function ActionBox({
  title = "Take Action",
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div"> & { title?: string }) {
  return (
    <div className={cn("my-6 bg-ink px-6 py-6", className)} {...props}>
      <h3 className="mb-4 font-sans text-xs font-extrabold tracking-wide text-brand-tint uppercase">
        {title}
      </h3>
      <div className="text-sm text-white [&_li]:mt-3 [&_strong]:text-white [&_ul]:ml-5 [&_ul]:list-disc">
        {children}
      </div>
    </div>
  );
}

export function Blockquote({
  className,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "border-l-2 border-slate-300 pl-6 font-serif italic text-slate-700",
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn(
        "font-sans text-xs font-extrabold tracking-wide text-slate-400 uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function FactBox({
  title = "The Record",
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div"> & { title?: string }) {
  return (
    <div
      className={cn(
        "my-6 border-l-4 border-brand bg-brand-tint px-6 py-5",
        className,
      )}
      {...props}
    >
      <h3 className="mb-3 font-serif text-base font-bold text-brand">
        {title}
      </h3>
      <div className="text-sm text-slate-800 [&_li]:mt-2 [&_ul]:ml-5 [&_ul]:list-disc">
        {children}
      </div>
    </div>
  );
}

export function H1({ className, ...props }: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className={cn(
        "font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance text-slate-900",
        className,
      )}
      {...props}
    />
  );
}

export function H2({ className, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn(
        "font-serif text-3xl font-semibold tracking-tight text-balance text-slate-900",
        className,
      )}
      {...props}
    />
  );
}

export function H3({ className, ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn(
        "font-serif text-2xl font-semibold text-balance text-slate-900",
        className,
      )}
      {...props}
    />
  );
}

export function H4({ className, ...props }: ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      className={cn(
        "font-serif text-xl font-semibold text-balance text-slate-900",
        className,
      )}
      {...props}
    />
  );
}

export function Kicker({
  section,
  category,
  className,
  ...props
}: ComponentPropsWithoutRef<"p"> & { section: string; category?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-xs font-bold tracking-wide text-brand uppercase",
        className,
      )}
      {...props}
    >
      {category ? (
        <>
          <span>{category}</span>
          <span className="text-slate-300">|</span>
        </>
      ) : null}
      <span>{section}</span>
    </p>
  );
}

export function Large({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("text-lg font-semibold text-slate-900", className)}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-xl leading-8 text-slate-600 text-pretty", className)}
      {...props}
    />
  );
}

export function List({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className={cn(
        "my-4 ml-6 list-disc text-slate-700 [&>li]:mt-2",
        className,
      )}
      {...props}
    />
  );
}

export function Muted({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-sm text-slate-500", className)} {...props} />;
}

export function P({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "text-base leading-7 text-slate-700 [&:not(:first-child)]:mt-4",
        className,
      )}
      {...props}
    />
  );
}

export function PullQuote({
  attribution,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"blockquote"> & { attribution?: string }) {
  return (
    <blockquote
      className={cn(
        "my-5 border-l-[3px] border-brand bg-white py-3 pl-5 font-serif italic text-slate-800",
        className,
      )}
      {...props}
    >
      <p>{children}</p>
      {attribution ? (
        <footer className="mt-2 font-sans text-sm text-slate-500 not-italic">
          — {attribution}
        </footer>
      ) : null}
    </blockquote>
  );
}

export function OpinionBadge({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-xs border border-slate-400 px-1.5 py-0.5 text-[10px] font-extrabold tracking-wide text-slate-500 uppercase",
        className,
      )}
      {...props}
    >
      Opinion
    </span>
  );
}

export function SectionHeading({
  className,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn(
        "mt-10 mb-5 border-t-[3px] border-slate-900 pt-5 font-sans text-lg font-extrabold tracking-wide text-slate-900 uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function Small({
  className,
  ...props
}: ComponentPropsWithoutRef<"small">) {
  return (
    <small
      className={cn(
        "text-sm font-medium leading-none text-slate-700",
        className,
      )}
      {...props}
    />
  );
}
